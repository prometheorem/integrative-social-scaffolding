'use client';

import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, Box, Sphere, Cylinder, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { AnatomyTag } from '@/types';

// Placeholder anatomy structures (will be replaced with glTF)
const ANATOMY_STRUCTURES = [
  // Spine segments
  { id: 'c1', name: 'C1 (Atlas)', type: 'joint', position: [0, 2.2, 0], color: '#e5e5e5' },
  { id: 'c2', name: 'C2 (Axis)', type: 'joint', position: [0, 2.1, 0], color: '#e5e5e5' },
  { id: 'c7', name: 'C7', type: 'joint', position: [0, 1.6, 0.05], color: '#e5e5e5' },
  { id: 't1', name: 'T1', type: 'joint', position: [0, 1.5, 0.1], color: '#e5e5e5' },
  { id: 't12', name: 'T12', type: 'joint', position: [0, 0.8, 0.15], color: '#e5e5e5' },
  { id: 'l1', name: 'L1', type: 'joint', position: [0, 0.6, 0.2], color: '#e5e5e5' },
  { id: 'l5', name: 'L5', type: 'joint', position: [0, -0.1, 0.35], color: '#e5e5e5' },
  
  // Pelvis
  { id: 'sacrum', name: 'Sacrum', type: 'joint', position: [0, -0.2, 0.3], color: '#e5e5e5', scale: [0.8, 0.6, 0.4] },
  { id: 'pelvis_left', name: 'Pelvis (Left)', type: 'joint', position: [-0.4, -0.3, 0.25], color: '#e5e5e5' },
  { id: 'pelvis_right', name: 'Pelvis (Right)', type: 'joint', position: [0.4, -0.3, 0.25], color: '#e5e5e5' },
  
  // Key muscles
  { id: 'psoas_major_left', name: 'Psoas Major (L)', type: 'muscle', position: [-0.15, 0.2, 0.3], color: '#dc2626' },
  { id: 'psoas_major_right', name: 'Psoas Major (R)', type: 'muscle', position: [0.15, 0.2, 0.3], color: '#dc2626' },
  { id: 'gluteus_maximus_left', name: 'Gluteus Maximus (L)', type: 'muscle', position: [-0.5, -0.4, -0.2], color: '#16a34a' },
  { id: 'gluteus_maximus_right', name: 'Gluteus Maximus (R)', type: 'muscle', position: [0.5, -0.4, -0.2], color: '#16a34a' },
  { id: 'trapezius_upper_left', name: 'Upper Trapezius (L)', type: 'muscle', position: [-0.3, 1.4, -0.1], color: '#dc2626' },
  { id: 'trapezius_upper_right', name: 'Upper Trapezius (R)', type: 'muscle', position: [0.3, 1.4, -0.1], color: '#dc2626' },
  { id: 'trapezius_lower_left', name: 'Lower Trapezius (L)', type: 'muscle', position: [-0.25, 0.9, -0.05], color: '#16a34a' },
  { id: 'trapezius_lower_right', name: 'Lower Trapezius (R)', type: 'muscle', position: [0.25, 0.9, -0.05], color: '#16a34a' },
  
  // Shoulders
  { id: 'shoulder_left', name: 'Shoulder (L)', type: 'joint', position: [-0.6, 1.3, 0.1], color: '#e5e5e5' },
  { id: 'shoulder_right', name: 'Shoulder (R)', type: 'joint', position: [0.6, 1.3, 0.1], color: '#e5e5e5' },
];

const STATUS_COLORS = {
  normal: '#e5e5e5',
  tight: '#dc2626',      // red
  weak: '#16a34a',       // green
  restricted: '#ca8a04', // yellow
};

interface AnatomyStructureProps {
  structure: typeof ANATOMY_STRUCTURES[0];
  tag?: AnatomyTag;
  isSelected: boolean;
  onClick: () => void;
}

function AnatomyStructure({ structure, tag, isSelected, onClick }: AnatomyStructureProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const color = tag ? STATUS_COLORS[tag.status] : structure.color;
  const emissive = isSelected ? '#3b82f6' : hovered ? '#60a5fa' : '#000000';
  const emissiveIntensity = isSelected ? 0.5 : hovered ? 0.3 : 0;
  
  // Different geometry based on type
  const renderGeometry = () => {
    switch (structure.type) {
      case 'muscle':
        return (
          <>
            <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
          </>
        );
      case 'joint':
        return <boxGeometry args={structure.scale || [0.15, 0.15, 0.15]} />;
      default:
        return <sphereGeometry args={[0.1, 16, 16]} />;
    }
  };
  
  return (
    <group position={structure.position as [number, number, number]}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        rotation={structure.type === 'muscle' ? [0, 0, Math.PI / 4] : [0, 0, 0]}
      >
        {renderGeometry()}
        <meshStandardMaterial 
          color={color} 
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      
      {(hovered || isSelected) && (
        <Html distanceFactor={10}>
          <div className="bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
            {structure.name}
            {tag && <span className="ml-1 text-slate-400">({tag.status})</span>}
          </div>
        </Html>
      )}
    </group>
  );
}

function Scene({ 
  tags, 
  selectedId, 
  onStructureClick 
}: { 
  tags: AnatomyTag[]; 
  selectedId: string | null;
  onStructureClick: (id: string) => void;
}) {
  const tagMap = new Map(tags.map(t => [t.structureId, t]));
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Grid 
        position={[0, -1, 0]} 
        args={[10, 10]} 
        cellSize={0.5} 
        cellThickness={0.5} 
        cellColor="#334155"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#475569"
        fadeDistance={25}
        fadeStrength={1}
        infiniteGrid
      />
      
      {ANATOMY_STRUCTURES.map(structure => (
        <AnatomyStructure
          key={structure.id}
          structure={structure}
          tag={tagMap.get(structure.id)}
          isSelected={selectedId === structure.id}
          onClick={() => onStructureClick(structure.id)}
        />
      ))}
      
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
        target={[0, 0.5, 0]}
      />
    </>
  );
}

interface AnatomyViewerProps {
  tags: AnatomyTag[];
  onTagAdd: (tag: AnatomyTag) => void;
  onTagUpdate: (id: string, updates: Partial<AnatomyTag>) => void;
  onTagRemove: (id: string) => void;
}

export function AnatomyViewer({ tags, onTagAdd, onTagUpdate, onTagRemove }: AnatomyViewerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const handleStructureClick = (id: string) => {
    setSelectedId(id);
    const existingTag = tags.find(t => t.structureId === id);
    if (!existingTag) {
      const structure = ANATOMY_STRUCTURES.find(s => s.id === id);
      if (structure) {
        onTagAdd({
          structureId: id,
          structureName: structure.name,
          type: structure.type as 'muscle' | 'ligament' | 'fascia' | 'joint',
          status: 'tight',
        });
      }
    }
  };
  
  const selectedStructure = ANATOMY_STRUCTURES.find(s => s.id === selectedId);
  const selectedTag = tags.find(t => t.structureId === selectedId);
  
  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [3, 2, 4], fov: 50 }} className="bg-slate-950">
        <Suspense fallback={null}>
          <Scene 
            tags={tags} 
            selectedId={selectedId}
            onStructureClick={handleStructureClick}
          />
        </Suspense>
      </Canvas>
      
      {/* Selection panel */}
      {selectedStructure && (
        <div className="absolute top-4 right-4 w-64 bg-slate-900/95 border border-slate-700 rounded-lg p-4">
          <h3 className="font-semibold text-white mb-2">{selectedStructure.name}</h3>
          <p className="text-xs text-slate-400 mb-3 capitalize">{selectedStructure.type}</p>
          
          {selectedTag ? (
            <>
              <label className="text-xs text-slate-400 block mb-2">Status</label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {(['normal', 'tight', 'weak', 'restricted'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => onTagUpdate(selectedId!, { status })}
                    className={`px-2 py-1 text-xs rounded capitalize ${
                      selectedTag.status === status
                        ? status === 'tight' ? 'bg-red-600 text-white'
                        : status === 'weak' ? 'bg-green-600 text-white'
                        : status === 'restricted' ? 'bg-yellow-600 text-white'
                        : 'bg-slate-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              
              <label className="text-xs text-slate-400 block mb-1">Notes</label>
              <textarea
                value={selectedTag.notes || ''}
                onChange={(e) => onTagUpdate(selectedId!, { notes: e.target.value })}
                placeholder="Clinical notes..."
                className="w-full h-16 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white placeholder-slate-500 resize-none"
              />
              
              <button
                onClick={() => {
                  onTagRemove(selectedId!);
                  setSelectedId(null);
                }}
                className="mt-3 w-full px-3 py-1.5 bg-red-900/50 hover:bg-red-900 text-red-200 text-xs rounded border border-red-800"
              >
                Remove Tag
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                onTagAdd({
                  structureId: selectedId!,
                  structureName: selectedStructure.name,
                  type: selectedStructure.type as 'muscle' | 'ligament' | 'fascia' | 'joint',
                  status: 'tight',
                });
              }}
              className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded"
            >
              Tag Structure
            </button>
          )}
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-slate-900/95 border border-slate-700 rounded-lg p-3">
        <p className="text-xs font-medium text-slate-300 mb-2">Legend</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-600"></div>
            <span className="text-xs text-slate-400">Tight</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-600"></div>
            <span className="text-xs text-slate-400">Weak</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-yellow-600"></div>
            <span className="text-xs text-slate-400">Restricted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-slate-400"></div>
            <span className="text-xs text-slate-400">Normal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
