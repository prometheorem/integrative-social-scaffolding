# PostureForge

**Model. Simulate. Validate. Correct.**

The first hybrid platform where therapists and users interactively build real postural dysfunctions in 3D, see how they affect movement, validate against their own body, and get precise corrective exercises to restore full function.

## MVP Scope (4-6 weeks)

### Phase 1: Core 3D Anatomy (Week 1-2)
- [ ] Spine + pelvis + shoulders glTF model
- [ ] Click-to-tag (tight=red, weak=green, restricted=yellow)
- [ ] Layer visibility and search
- [ ] Orbit controls, zoom, pan

### Phase 2: Movement Simulation (Week 3)
- [ ] 4 movements: forward fold, squat, overhead reach, neck rotation
- [ ] Rule-based kinematic restrictions
- [ ] Visual compensation chains
- [ ] "What-if" correction sliders

### Phase 3: Validation + Exercise Engine (Week 4)
- [ ] Slider input for ROM (webcam v2)
- [ ] Match % calculation
- [ ] Exercise rule engine (tags + ROM → exercises)
- [ ] 15-20 exercises with progressions

### Phase 4: Export + Polish (Week 5-6)
- [ ] PDF report generation
- [ ] Patient prescription link
- [ ] Landing page + waitlist
- [ ] Clinic outreach

## Tech Stack

- **Framework**: Next.js 15 + React 19 + TypeScript
- **3D**: React Three Fiber + Drei + Three.js
- **Models**: Z-Anatomy glTF (CC-BY)
- **Styling**: Tailwind CSS
- **PDF**: jsPDF + html2canvas
- **ROM**: MediaPipe (v2)

## Project Structure

```
postureforge/
├── src/
│   ├── app/                 # Next.js app router
│   ├── components/
│   │   ├── anatomy/         # 3D model viewer, tagging
│   │   ├── movement/        # Simulation controls
│   │   └── exercises/       # Exercise display
│   ├── lib/
│   │   ├── rules.ts         # Kinematic + exercise rules
│   │   └── exercises.ts     # Exercise database
│   └── types/
│       └── index.ts         # TypeScript definitions
├── public/
│   └── models/              # glTF anatomy files
└── README.md
```

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Data Model

### AnatomyTag
```typescript
{
  structureId: string;      // "psoas_major_left"
  structureName: string;    // "Psoas Major (Left)"
  type: "muscle" | "ligament" | "fascia" | "joint";
  status: "normal" | "tight" | "weak" | "restricted";
  notes?: string;
}
```

### MovementTest
```typescript
{
  id: string;
  name: string;
  predictedRom: number;
  actualRom?: number;
  compensations: string[];
  matchPercent?: number;
}
```

### Exercise
```typescript
{
  id: string;
  name: string;
  targetStructures: string[];
  indication: string[];       // tags that trigger this
  contraindication: string[];
  reps: string;
  sets: string;
  hold: string;
  progression: string;
}
```

## License

MIT
