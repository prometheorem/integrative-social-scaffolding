export interface AnatomyTag {
  structureId: string;
  structureName: string;
  type: 'muscle' | 'ligament' | 'fascia' | 'joint';
  status: 'normal' | 'tight' | 'weak' | 'restricted';
  notes?: string;
}

export interface MovementTest {
  id: string;
  name: string;
  description: string;
  predictedRom: number;
  actualRom?: number;
  compensations: Compensation[];
  matchPercent?: number;
}

export interface Compensation {
  id: string;
  description: string;
  causedBy: string[];  // structureIds
  visualIndicator: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  targetStructures: string[];
  indication: string[];      // status patterns that trigger this
  contraindication: string[];
  reps: string;
  sets: string;
  hold: string;
  progression: string;
  videoUrl?: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  email?: string;
  createdAt: Date;
  tags: AnatomyTag[];
  tests: MovementTest[];
  prescribedExercises: Exercise[];
}

export interface PosturalChain {
  id: string;
  name: string;
  description: string;
  structures: string[];
  typicalDysfunction: string;
}
