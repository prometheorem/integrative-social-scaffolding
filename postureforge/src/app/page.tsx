'use client';

import { useState } from 'react';
import { AnatomyViewer } from '@/components/anatomy/AnatomyViewer';
import { AnatomyTag, MovementTest, Exercise } from '@/types';
import { generateExercises } from '@/lib/exercises';
import { calculatePredictedRom, movements } from '@/lib/rules';

export default function Home() {
  const [tags, setTags] = useState<AnatomyTag[]>([]);
  const [activeTab, setActiveTab] = useState<'anatomy' | 'movement' | 'exercises'>('anatomy');
  const [selectedMovement, setSelectedMovement] = useState<string>('forward-fold');
  const [actualRom, setActualRom] = useState<number>(0);
  
  const handleTagAdd = (tag: AnatomyTag) => {
    setTags(prev => [...prev, tag]);
  };
  
  const handleTagUpdate = (id: string, updates: Partial<AnatomyTag>) => {
    setTags(prev => prev.map(t => 
      t.structureId === id ? { ...t, ...updates } : t
    ));
  };
  
  const handleTagRemove = (id: string) => {
    setTags(prev => prev.filter(t => t.structureId !== id));
  };
  
  // Calculate movement prediction
  const taggedKeys = tags.map(t => `${t.structureId}:${t.status}`);
  const { predictedRom, activeCompensations } = calculatePredictedRom(selectedMovement, taggedKeys);
  const matchPercent = actualRom > 0 ? Math.round((actualRom / predictedRom) * 100) : null;
  
  // Generate exercises
  const prescribedExercises = generateExercises(tags, []);
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">PostureForge</h1>
            <p className="text-xs text-slate-400">Model. Simulate. Validate. Correct.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('anatomy')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'anatomy' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Anatomy
            </button>
            <button
              onClick={() => setActiveTab('movement')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'movement' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Movement
            </button>
            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'exercises' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Exercises ({prescribedExercises.length})
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto p-4">
        {activeTab === 'anatomy' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-140px)]">
            {/* Sidebar - Tagged structures */}
            <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-auto">
              <h2 className="font-semibold text-white mb-3">Tagged Structures</h2>
              {tags.length === 0 ? (
                <p className="text-sm text-slate-500">Click on structures in the 3D model to tag them</p>
              ) : (
                <div className="space-y-2">
                  {tags.map(tag => (
                    <div 
                      key={tag.structureId}
                      className="p-2 bg-slate-800 rounded border-l-4 border-l-red-500"
                    >
                      <p className="text-sm font-medium text-white">{tag.structureName}</p>
                      <p className="text-xs text-slate-400 capitalize">{tag.status}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-slate-300 mb-2">Quick Actions</h3>
                <button
                  onClick={() => setTags([])}
                  className="w-full px-3 py-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                >
                  Clear All Tags
                </button>
              </div>
            </div>
            
            {/* 3D Viewer */}
            <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
              <AnatomyViewer
                tags={tags}
                onTagAdd={handleTagAdd}
                onTagUpdate={handleTagUpdate}
                onTagRemove={handleTagRemove}
              />
            </div>
          </div>
        )}
        
        {activeTab === 'movement' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Movement selector */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <h2 className="font-semibold text-white mb-4">Movement Simulation</h2>
              
              <div className="space-y-3 mb-6">
                {movements.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMovement(m.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedMovement === m.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-700 bg-slate-800 hover:bg-slate-750'
                    }`}
                  >
                    <p className="font-medium text-white">{m.name}</p>
                    <p className="text-xs text-slate-400">{m.description}</p>
                  </button>
                ))}
              </div>
              
              <div className="border-t border-slate-800 pt-4">
                <label className="text-sm text-slate-300 block mb-2">
                  Actual ROM (degrees)
                </label>
                <input
                  type="range"
                  min="0"
                  max={predictedRom + 30}
                  value={actualRom}
                  onChange={(e) => setActualRom(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0°</span>
                  <span className="text-blue-400 font-medium">{actualRom}°</span>
                  <span>{predictedRom + 30}°</span>
                </div>
              </div>
            </div>
            
            {/* Results */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
              <h2 className="font-semibold text-white mb-4">Analysis</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Predicted ROM</p>
                  <p className="text-3xl font-bold text-white">{predictedRom}°</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">Match</p>
                  <p className={`text-3xl font-bold ${
                    matchPercent && matchPercent >= 90 ? 'text-green-400' :
                    matchPercent && matchPercent >= 70 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {matchPercent ? `${matchPercent}%` : '—'}
                  </p>
                </div>
              </div>
              
              {activeCompensations.length > 0 ? (
                <div>
                  <h3 className="text-sm font-medium text-slate-300 mb-3">Predicted Compensations</h3>
                  <div className="space-y-2">
                    {activeCompensations.map((comp, i) => (
                      <div key={i} className="p-3 bg-red-900/20 border border-red-800/50 rounded">
                        <p className="text-sm text-red-200">{comp.description}</p>
                        <p className="text-xs text-red-400/70 mt-1">{comp.visualIndicator}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500">No compensations predicted with current tags</p>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'exercises' && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <h2 className="font-semibold text-white mb-4">Prescribed Exercises</h2>
            
            {prescribedExercises.length === 0 ? (
              <p className="text-slate-500">Tag structures in the Anatomy tab to generate exercises</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prescribedExercises.map(ex => (
                  <div key={ex.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <h3 className="font-medium text-white mb-2">{ex.name}</h3>
                    <p className="text-sm text-slate-400 mb-3">{ex.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 text-center mb-3">
                      <div className="bg-slate-900 rounded p-2">
                        <p className="text-xs text-slate-500">Sets</p>
                        <p className="text-sm font-medium text-white">{ex.sets}</p>
                      </div>
                      <div className="bg-slate-900 rounded p-2">
                        <p className="text-xs text-slate-500">Reps</p>
                        <p className="text-sm font-medium text-white">{ex.reps}</p>
                      </div>
                      <div className="bg-slate-900 rounded p-2">
                        <p className="text-xs text-slate-500">Hold</p>
                        <p className="text-sm font-medium text-white">{ex.hold}</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-500">
                      <span className="text-slate-400">Progression:</span> {ex.progression}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
