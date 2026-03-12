import { Exercise, AnatomyTag, MovementTest } from '@/types';

// Exercise database - MVP: 15-20 core exercises
export const exercises: Exercise[] = [
  {
    id: 'hip-flexor-stretch-kneeling',
    name: 'Kneeling Hip Flexor Stretch',
    description: 'Half-kneeling position, posterior pelvic tilt, shift forward until stretch felt in front of hip',
    targetStructures: ['psoas_major_left', 'psoas_major_right', 'iliacus_left', 'iliacus_right'],
    indication: ['psoas_major_left:tight', 'psoas_major_right:tight', 'anterior_pelvic_tilt'],
    contraindication: ['hip_flexion_restricted'],
    reps: '1',
    sets: '2-3',
    hold: '30-45 seconds',
    progression: 'Add posterior pelvic tilt cue, then progress to standing version'
  },
  {
    id: 'glute-bridge',
    name: 'Glute Bridge',
    description: 'Supine, feet flat, lift hips by squeezing glutes, avoid lumbar extension',
    targetStructures: ['gluteus_maximus_left', 'gluteus_maximus_right'],
    indication: ['gluteus_maximus_left:weak', 'gluteus_maximus_right:weak', 'anterior_pelvic_tilt'],
    contraindication: ['spinal_flexion_restricted'],
    reps: '10-15',
    sets: '2-3',
    hold: '2 seconds at top',
    progression: 'Single leg bridge, then weighted bridge'
  },
  {
    id: 'deep-neck-flexor-chin-tuck',
    name: 'Deep Neck Flexor Chin Tuck',
    description: 'Supine or standing, gently nod chin toward throat without lifting head',
    targetStructures: ['longus_colli', 'longus_capitis', 'rectus_capitis_anterior'],
    indication: ['forward_head_posture', 'upper_crossed'],
    contraindication: ['cervical_extension_restricted'],
    reps: '10',
    sets: '2-3',
    hold: '5 seconds',
    progression: 'Add resistance band, then progress to quadruped position'
  },
  {
    id: 'thoracic-extension-over-roller',
    name: 'Thoracic Extension Over Roller',
    description: 'Roller at mid-back, support head, extend over roller without lumbar compensation',
    targetStructures: ['thoracic_spine', 'pectoralis_minor_left', 'pectoralis_minor_right'],
    indication: ['thoracic_kyphosis', 'upper_crossed', 'pectoralis_minor_left:tight'],
    contraindication: ['spinal_extension_restricted'],
    reps: '8-10',
    sets: '1-2',
    hold: '3 seconds',
    progression: 'Arms overhead, then foam roller at lower thoracic'
  },
  {
    id: 'cat-cow',
    name: 'Cat-Cow (Spinal Mobility)',
    description: 'Quadruped, flex and extend spine sequentially from tailbone to neck',
    targetStructures: ['lumbar_spine', 'thoracic_spine', 'cervical_spine'],
    indication: ['lumbar_stiffness', 'thoracic_stiffness', 'segmental_mobility_loss'],
    contraindication: ['acute_pain'],
    reps: '10',
    sets: '2',
    hold: '2 seconds each position',
    progression: 'Slow down, emphasize segmental control'
  },
  {
    id: 'lower-trap-y-raise',
    name: 'Lower Trapezius Y-Raise',
    description: 'Prone or incline, arms in Y position, lift chest and arms using lower traps',
    targetStructures: ['trapezius_lower_left', 'trapezius_lower_right', 'serratus_anterior_left', 'serratus_anterior_right'],
    indication: ['upper_crossed', 'scapular_winging', 'trapezius_lower_left:weak'],
    contraindication: ['shoulder_flexion_restricted'],
    reps: '10-12',
    sets: '2-3',
    hold: '2 seconds',
    progression: 'Add light dumbbells, progress to standing'
  },
  {
    id: 'hip-hinge-pattern',
    name: 'Hip Hinge Pattern',
    description: 'Standing, dowel on back (3 points of contact), hinge at hips without spinal flexion',
    targetStructures: ['gluteus_maximus_left', 'gluteus_maximus_right', 'hamstrings_left', 'hamstrings_right'],
    indication: ['poor_hip_hinge', 'lumbar_flexion_dominant'],
    contraindication: ['acute_lumbar_pain'],
    reps: '10',
    sets: '2-3',
    hold: '1 second',
    progression: 'Add load (kettlebell), then single-leg RDL'
  },
  {
    id: 'side-lying-clamshell',
    name: 'Side-Lying Clamshell',
    description: 'Side-lying, heels together, open top knee without rolling pelvis',
    targetStructures: ['gluteus_medius_left', 'gluteus_medius_right', 'piriformis_left', 'piriformis_right'],
    indication: ['hip_abductor_weakness', 'knee_valgus', ' Trendelenburg'],
    contraindication: ['hip_pain'],
    reps: '15-20',
    sets: '2-3',
    hold: '2 seconds',
    progression: 'Add resistance band around knees'
  },
  {
    id: 'suboccipital-release',
    name: 'Suboccipital Release',
    description: 'Supine, tennis balls at base of skull, gently nod and rotate',
    targetStructures: ['rectus_capitis_posterior_major', 'obliquus_capitis_superior', 'suboccipital_group'],
    indication: ['forward_head_posture', 'tension_headaches', 'upper_cervical_stiffness'],
    contraindication: ['acute_cervical_pain', 'vertebral_artery_issues'],
    reps: '1',
    sets: '2-3',
    hold: '60-90 seconds',
    progression: 'Manual therapist release, then self-mobilization'
  },
  {
    id: 'wall-angel',
    name: 'Wall Angel',
    description: 'Standing against wall, maintain contact (head, shoulders, low back), slide arms up/down',
    targetStructures: ['serratus_anterior_left', 'serratus_anterior_right', 'lower_trapezius', 'thoracic_spine'],
    indication: ['rounded_shoulders', 'upper_crossed', 'scapular_dyskinesis'],
    contraindication: ['shoulder_flexion_restricted'],
    reps: '10',
    sets: '2',
    hold: '5 seconds at top',
    progression: 'Add small weights, move away from wall'
  },
  {
    id: 'bird-dog',
    name: 'Bird Dog',
    description: 'Quadruped, extend opposite arm and leg without spinal rotation or sagging',
    targetStructures: ['multifidus', 'transverse_abdominis', 'gluteus_maximus', 'erector_spinae'],
    indication: ['core_instability', 'lumbar_instability', 'poor_motor_control'],
    contraindication: ['acute_lumbar_pain', 'wrist_pain'],
    reps: '8-10 each side',
    sets: '2-3',
    hold: '5-10 seconds',
    progression: 'Add band resistance, progress to plank variations'
  },
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    description: 'Supine, arms up, knees bent 90°, slowly extend opposite limbs while maintaining lumbar contact',
    targetStructures: ['transverse_abdominis', 'rectus_abdominis', 'iliopsoas_control'],
    indication: ['anterior_pelvic_tilt', 'lumbar_instability', 'poor_core_control'],
    contraindication: ['acute_lumbar_pain'],
    reps: '8-10 each side',
    sets: '2-3',
    hold: '3 seconds',
    progression: 'Add band resistance, straighten limbs further'
  },
  {
    id: 'standing-calf-stretch',
    name: 'Standing Calf Stretch',
    description: 'Hands on wall, one leg back, heel down, knee straight (gastroc) or bent (soleus)',
    targetStructures: ['gastrocnemius_left', 'gastrocnemius_right', 'soleus_left', 'soleus_right'],
    indication: ['ankle_dorsiflexion_limited', 'tight_calves', 'pronation'],
    contraindication: ['achilles_tendinopathy'],
    reps: '1',
    sets: '2-3',
    hold: '30-45 seconds each position',
    progression: 'Elevate forefoot, add load'
  },
  {
    id: 'piriformis-stretch-supine',
    name: 'Supine Piriformis Stretch',
    description: 'Supine, ankle on opposite knee, pull thigh toward chest',
    targetStructures: ['piriformis_left', 'piriformis_right', 'deep_external_rotators'],
    indication: ['piriformis_tight', 'sciatic_symptoms', 'hip_external_rotation_limited'],
    contraindication: ['hip_flexion_restricted', 'acute_sciatica'],
    reps: '1',
    sets: '2-3',
    hold: '30-45 seconds',
    progression: 'Progress to seated figure-4, then standing'
  },
  {
    id: 'scapular-pushup-plus',
    name: 'Scapular Push-Up Plus',
    description: 'High plank, keep arms straight, sink and elevate shoulder blades (retraction/protraction)',
    targetStructures: ['serratus_anterior_left', 'serratus_anterior_right', 'lower_trapezius'],
    indication: ['scapular_winging', 'serratus_weakness', 'pushup_dysfunction'],
    contraindication: ['wrist_pain', 'shoulder_impingement'],
    reps: '10-12',
    sets: '2-3',
    hold: '2 seconds at end range',
    progression: 'Add push-up, then decline position'
  },
  {
    id: '90-90-hip-switch',
    name: '90/90 Hip Switch',
    description: 'Seated 90/90 position, lift and rotate to other 90/90 without using hands',
    targetStructures: ['hip_external_rotators', 'hip_internal_rotators', 'gluteus_medius'],
    indication: ['hip_rotation_limited', 'hip_mobility_loss', 'gait_dysfunction'],
    contraindication: ['hip_pain', 'knee_pain'],
    reps: '10 each direction',
    sets: '2',
    hold: '1 second',
    progression: 'Add forward lean, then add load'
  },
  {
    id: 't-spine-rotation-open-book',
    name: 'T-Spine Open Book',
    description: 'Side-lying, knees bent, open top arm across body following with eyes',
    targetStructures: ['thoracic_spine', 'thoracic_rotators', 'pectoralis_group'],
    indication: ['thoracic_rotation_limited', 'rib_stiffness', 'golf_rotation_loss'],
    contraindication: ['spinal_rotation_restricted'],
    reps: '8-10 each side',
    sets: '2',
    hold: '3 seconds',
    progression: 'Straighten legs, add resistance'
  },
  {
    id: 'neck-rotation-self-mobilization',
    name: 'Neck Rotation Self-Mobilization',
    description: 'Seated, hand on head, gently rotate and apply overpressure at end range',
    targetStructures: ['cervical_rotators', 'scalenes', 'sternocleidomastoid'],
    indication: ['cervical_rotation_limited', 'stiff_neck', 'upper_cervical_stiffness'],
    contraindication: ['acute_cervical_pain', 'dizziness'],
    reps: '10 each direction',
    sets: '2',
    hold: '3 seconds',
    progression: 'Add resistance band, segmental focus'
  }
];

// Rule engine: Convert tags + test results → exercise prescription
export function generateExercises(
  tags: AnatomyTag[],
  tests: MovementTest[]
): Exercise[] {
  const prescribed: Exercise[] = [];
  const tagKeys = tags.map(t => `${t.structureId}:${t.status}`);
  
  // Add global postural pattern tags
  const hasForwardHead = tags.some(t => 
    ['upper_crossed', 'forward_head_posture'].includes(t.structureId)
  );
  const hasAnteriorTilt = tags.some(t => 
    t.structureId === 'anterior_pelvic_tilt'
  );
  const hasUpperCrossed = tags.some(t => 
    t.structureId === 'upper_crossed'
  );
  
  if (hasForwardHead) tagKeys.push('forward_head_posture');
  if (hasAnteriorTilt) tagKeys.push('anterior_pelvic_tilt');
  if (hasUpperCrossed) tagKeys.push('upper_crossed');
  
  // Score each exercise by match count
  const scored = exercises.map(ex => {
    let score = 0;
    let matchedIndications: string[] = [];
    
    for (const indication of ex.indication) {
      if (tagKeys.includes(indication)) {
        score++;
        matchedIndications.push(indication);
      }
    }
    
    // Check contraindications
    const hasContraindication = ex.contraindication.some(c => tagKeys.includes(c));
    
    return { exercise: ex, score, matchedIndications, hasContraindication };
  });
  
  // Filter out contraindicated, sort by score, take top 6
  return scored
    .filter(s => !s.hasContraindication)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(s => s.exercise);
}
