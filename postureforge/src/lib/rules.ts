import { Compensation, MovementTest } from '@/types';

// Kinematic rules for movement simulation
// These define how tagged structures restrict movement and cause compensations

export interface KinematicRule {
  movementId: string;
  restrictedBy: string[];      // structureIds that limit this movement
  restrictionAmount: number;   // degrees lost per tight structure
  compensations: CompensationPattern[];
}

export interface CompensationPattern {
  id: string;
  description: string;
  triggeredBy: string[];       // structureIds that cause this
  visualIndicator: string;
  severity: 'mild' | 'moderate' | 'severe';
}

// Movement definitions
export const movements: MovementTest[] = [
  {
    id: 'forward-fold',
    name: 'Standing Forward Fold',
    description: 'Stand with feet hip-width, hinge at hips and reach toward floor',
    predictedRom: 90,  // degrees of hip flexion
    compensations: []
  },
  {
    id: 'squat',
    name: 'Bodyweight Squat',
    description: 'Feet shoulder-width, lower hips until thighs parallel or below',
    predictedRom: 110,  // degrees of knee flexion
    compensations: []
  },
  {
    id: 'overhead-reach',
    name: 'Overhead Reach',
    description: 'Stand tall, raise arms overhead without arching back',
    predictedRom: 180,  // degrees of shoulder flexion
    compensations: []
  },
  {
    id: 'neck-rotation',
    name: 'Neck Rotation',
    description: 'Rotate head left and right without moving shoulders',
    predictedRom: 80,  // degrees each direction
    compensations: []
  }
];

// Compensation patterns
export const compensationPatterns: CompensationPattern[] = [
  {
    id: 'lumbar-flexion-dominant',
    description: 'Rounding lower back to compensate for limited hip hinge',
    triggeredBy: ['hamstrings_left:tight', 'hamstrings_right:tight', 'gluteus_maximus_left:tight', 'gluteus_maximus_right:tight'],
    visualIndicator: 'Spine rounds, pelvis posteriorly tilts early',
    severity: 'moderate'
  },
  {
    id: 'anterior-pelvic-tilt-forward-fold',
    description: 'Excessive anterior pelvic tilt due to tight hip flexors',
    triggeredBy: ['psoas_major_left:tight', 'psoas_major_right:tight', 'rectus_femoris_left:tight', 'rectus_femoris_right:tight'],
    visualIndicator: 'Low back arches, hip flexion appears greater than actual',
    severity: 'mild'
  },
  {
    id: 'knee-valgus-squat',
    description: 'Knees cave inward during squat',
    triggeredBy: ['gluteus_medius_left:weak', 'gluteus_medius_right:weak', 'gluteus_maximus_left:weak', 'gluteus_maximus_right:weak'],
    visualIndicator: 'Knees track inside toes, femoral internal rotation',
    severity: 'moderate'
  },
  {
    id: 'heel-rise-squat',
    description: 'Heels lift off ground during deep squat',
    triggeredBy: ['ankle_dorsiflexion_limited', 'gastrocnemius_left:tight', 'gastrocnemius_right:tight', 'soleus_left:tight', 'soleus_right:tight'],
    visualIndicator: 'Weight shifts to forefoot, balance compromised',
    severity: 'mild'
  },
  {
    id: 'lumbar-hyperlordosis-squat',
    description: 'Excessive low back arch at bottom of squat',
    triggeredBy: ['hip_flexion_limited', 'psoas_major_left:tight', 'psoas_major_right:tight'],
    visualIndicator: 'Butt wink at bottom, then excessive arch on ascent',
    severity: 'moderate'
  },
  {
    id: 'thoracic-extension-compensation-overhead',
    description: 'Arching upper back to reach overhead',
    triggeredBy: ['thoracic_kyphosis', 'pectoralis_minor_left:tight', 'pectoralis_minor_right:tight', 'latissimus_dorsi_left:tight', 'latissimus_dorsi_right:tight'],
    visualIndicator: 'Ribs flare, low back extends, shoulders don\'t fully flex',
    severity: 'moderate'
  },
  {
    id: 'scapular-elevation-overhead',
    description: 'Shrugging shoulders to reach higher',
    triggeredBy: ['upper_trapezius_dominant', 'lower_trapezius_left:weak', 'lower_trapezius_right:weak', 'serratus_anterior_left:weak', 'serratus_anterior_right:weak'],
    visualIndicator: 'Shoulders elevate toward ears, neck shortens',
    severity: 'mild'
  },
  {
    id: 'forward-head-rotation',
    description: 'Chin juts forward during neck rotation',
    triggeredBy: ['upper_cervical_stiffness', 'suboccipital_tight', 'forward_head_posture'],
    visualIndicator: 'Head translates forward instead of rotating purely',
    severity: 'mild'
  },
  {
    id: 'shoulder-elevation-neck-rotation',
    description: 'Shoulder lifts on opposite side during rotation',
    triggeredBy: ['sternocleidomastoid_tight', 'scalene_tight', 'upper_trapezius_tight'],
    visualIndicator: 'Contralateral shoulder elevates to gain range',
    severity: 'mild'
  },
  {
    id: 'pelvic-shift-forward-fold',
    description: 'Pelvis shifts to one side during forward fold',
    triggeredBy: ['adductor_left:tight', 'adductor_right:tight', 'hip_rotator_imbalance'],
    visualIndicator: 'Weight shifts, one side appears shorter',
    severity: 'moderate'
  }
];

// Calculate predicted ROM based on tagged structures
export function calculatePredictedRom(
  movementId: string,
  taggedStructures: string[]
): { predictedRom: number; activeCompensations: Compensation[] } {
  const movement = movements.find(m => m.id === movementId);
  if (!movement) return { predictedRom: 0, activeCompensations: [] };
  
  let predictedRom = movement.predictedRom;
  const activeCompensations: Compensation[] = [];
  
  // Apply restrictions
  const tagSet = new Set(taggedStructures);
  
  // Forward fold restrictions
  if (movementId === 'forward-fold') {
    if (tagSet.has('hamstrings_left:tight') || tagSet.has('hamstrings_right:tight')) {
      predictedRom -= 15;
      activeCompensations.push({
        id: 'lumbar-flexion-dominant',
        description: 'Rounding lower back to compensate for limited hip hinge',
        causedBy: ['hamstrings_left', 'hamstrings_right'],
        visualIndicator: 'Spine rounds, pelvis posteriorly tilts early'
      });
    }
    if (tagSet.has('psoas_major_left:tight') || tagSet.has('psoas_major_right:tight')) {
      predictedRom -= 10;
      activeCompensations.push({
        id: 'anterior-pelvic-tilt-forward-fold',
        description: 'Excessive anterior pelvic tilt due to tight hip flexors',
        causedBy: ['psoas_major_left', 'psoas_major_right'],
        visualIndicator: 'Low back arches, hip flexion appears greater than actual'
      });
    }
  }
  
  // Squat restrictions
  if (movementId === 'squat') {
    if (tagSet.has('gluteus_medius_left:weak') || tagSet.has('gluteus_medius_right:weak')) {
      predictedRom -= 0;  // Doesn't limit depth, causes compensation
      activeCompensations.push({
        id: 'knee-valgus-squat',
        description: 'Knees cave inward during squat',
        causedBy: ['gluteus_medius_left', 'gluteus_medius_right'],
        visualIndicator: 'Knees track inside toes, femoral internal rotation'
      });
    }
    if (tagSet.has('ankle_dorsiflexion_limited') || tagSet.has('gastrocnemius_left:tight')) {
      predictedRom -= 20;
      activeCompensations.push({
        id: 'heel-rise-squat',
        description: 'Heels lift off ground during deep squat',
        causedBy: ['ankle_dorsiflexion_limited', 'gastrocnemius_left', 'gastrocnemius_right'],
        visualIndicator: 'Weight shifts to forefoot, balance compromised'
      });
    }
  }
  
  // Overhead reach restrictions
  if (movementId === 'overhead-reach') {
    if (tagSet.has('thoracic_kyphosis') || tagSet.has('pectoralis_minor_left:tight')) {
      predictedRom -= 25;
      activeCompensations.push({
        id: 'thoracic-extension-compensation-overhead',
        description: 'Arching upper back to reach overhead',
        causedBy: ['thoracic_kyphosis', 'pectoralis_minor_left', 'pectoralis_minor_right'],
        visualIndicator: 'Ribs flare, low back extends, shoulders don\'t fully flex'
      });
    }
    if (tagSet.has('lower_trapezius_left:weak') || tagSet.has('serratus_anterior_left:weak')) {
      activeCompensations.push({
        id: 'scapular-elevation-overhead',
        description: 'Shrugging shoulders to reach higher',
        causedBy: ['lower_trapezius_left', 'lower_trapezius_right', 'serratus_anterior_left', 'serratus_anterior_right'],
        visualIndicator: 'Shoulders elevate toward ears, neck shortens'
      });
    }
  }
  
  // Neck rotation restrictions
  if (movementId === 'neck-rotation') {
    if (tagSet.has('upper_cervical_stiffness') || tagSet.has('forward_head_posture')) {
      predictedRom -= 20;
      activeCompensations.push({
        id: 'forward-head-rotation',
        description: 'Chin juts forward during neck rotation',
        causedBy: ['upper_cervical_stiffness', 'forward_head_posture'],
        visualIndicator: 'Head translates forward instead of rotating purely'
      });
    }
  }
  
  return { predictedRom: Math.max(0, predictedRom), activeCompensations };
}
