export const CATEGORIES = {
  animals: { name: 'Animals 🦁', icon: '🦁' },
  vehicles: { name: 'Vehicles 🚀', icon: '🚀' },
  nature: { name: 'Nature ☀️', icon: '☀️' },
  food: { name: 'Food 🍕', icon: '🍕' },
  fantasy: { name: 'Fantasy 🦄', icon: '🦄' }
};

export const TEMPLATES = {
  // --- ANIMALS ---
  lion: {
    name: 'Happy Lion 🦁',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <circle cx="400" cy="300" r="180" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="300" cy="180" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="500" cy="180" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="310" r="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="360" cy="280" r="15" fill="#000000" />
      <circle cx="440" cy="280" r="15" fill="#000000" />
      <polygon points="380,330 420,330 400,355" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <path d="M 400 355 L 400 390 Q 370 410 350 390 Q 400 410 400 390 Q 430 410 450 390" stroke="#000000" stroke-width="10" fill="none" />
    </svg>`
  },
  elephant: {
    name: 'Cute Elephant 🐘',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Body -->
      <rect x="250" y="240" width="320" height="220" rx="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Legs -->
      <rect x="290" y="440" width="65" height="100" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="485" y="440" width="65" height="100" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Head -->
      <circle cx="250" cy="250" r="110" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Ears -->
      <ellipse cx="140" cy="230" rx="70" ry="90" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eye -->
      <circle cx="280" cy="220" r="15" fill="#000000" />
      <!-- Trunk -->
      <path d="M 280 290 Q 380 340 360 410 Q 350 440 320 420" stroke="#000000" stroke-width="12" fill="none" />
    </svg>`
  },
  panda: {
    name: 'Chubby Panda 🐼',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Ears -->
      <circle cx="280" cy="160" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="520" cy="160" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Body -->
      <circle cx="400" cy="380" r="160" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Head -->
      <circle cx="400" cy="240" r="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eyes Patches -->
      <ellipse cx="350" cy="240" rx="25" ry="35" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <ellipse cx="450" cy="240" rx="25" ry="35" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <circle cx="350" cy="240" r="10" fill="#000000" />
      <circle cx="450" cy="240" r="10" fill="#000000" />
      <!-- Nose -->
      <ellipse cx="400" cy="285" rx="15" ry="10" fill="#000000" />
    </svg>`
  },
  penguin: {
    name: 'Happy Penguin 🐧',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Feet -->
      <ellipse cx="330" cy="510" rx="45" ry="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="470" cy="510" rx="45" ry="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Body -->
      <ellipse cx="400" cy="310" rx="150" ry="200" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Belly -->
      <ellipse cx="400" cy="330" rx="100" ry="150" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Wings -->
      <ellipse cx="230" cy="320" rx="30" ry="95" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="570" cy="320" rx="30" ry="95" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eyes -->
      <circle cx="360" cy="200" r="12" fill="#000000" />
      <circle cx="440" cy="200" r="12" fill="#000000" />
      <!-- Beak -->
      <polygon points="380,225 420,225 400,255" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
    </svg>`
  },
  frog: {
    name: 'Jumping Frog 🐸',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Legs -->
      <ellipse cx="230" cy="420" rx="60" ry="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="570" cy="420" rx="60" ry="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Body -->
      <ellipse cx="400" cy="380" rx="160" ry="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="400" cy="380" rx="90" ry="70" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Eyes -->
      <circle cx="320" cy="220" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="480" cy="220" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="320" cy="220" r="15" fill="#000000" />
      <circle cx="480" cy="220" r="15" fill="#000000" />
      <!-- Mouth -->
      <path d="M 330 310 Q 400 360 470 310" stroke="#000000" stroke-width="12" fill="none" />
    </svg>`
  },
  bear: {
    name: 'Friendly Bear 🐻',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Ears -->
      <circle cx="280" cy="180" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="520" cy="180" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Body -->
      <circle cx="400" cy="400" r="150" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Head -->
      <circle cx="400" cy="260" r="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eyes -->
      <circle cx="355" cy="230" r="12" fill="#000000" />
      <circle cx="445" cy="230" r="12" fill="#000000" />
      <!-- Snout -->
      <ellipse cx="400" cy="285" rx="45" ry="30" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <ellipse cx="400" cy="275" rx="15" ry="10" fill="#000000" />
      <path d="M 400 285 L 400 305" stroke="#000000" stroke-width="8" />
    </svg>`
  },
  cat: {
    name: 'Little Kitty 🐱',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Ears -->
      <polygon points="270,220 270,100 350,170" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <polygon points="530,220 530,100 450,170" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Body -->
      <ellipse cx="400" cy="410" rx="130" ry="110" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Head -->
      <circle cx="400" cy="250" r="110" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eyes -->
      <circle cx="360" cy="220" r="15" fill="#000000" />
      <circle cx="440" cy="220" r="15" fill="#000000" />
      <!-- Nose/Mouth -->
      <polygon points="390,250 410,250 400,260" fill="#000000" />
      <path d="M 400 260 Q 385 275 370 265 M 400 260 Q 415 275 430 265" stroke="#000000" stroke-width="8" fill="none" />
      <!-- Whiskers -->
      <line x1="280" y1="260" x2="220" y2="250" stroke="#000000" stroke-width="8" />
      <line x1="280" y1="280" x2="210" y2="280" stroke="#000000" stroke-width="8" />
      <line x1="520" y1="260" x2="580" y2="250" stroke="#000000" stroke-width="8" />
      <line x1="520" y1="280" x2="590" y2="280" stroke="#000000" stroke-width="8" />
    </svg>`
  },
  dog: {
    name: 'Playful Puppy 🐶',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Ears -->
      <ellipse cx="260" cy="220" rx="35" ry="85" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" transform="rotate(15 260 220)" />
      <ellipse cx="540" cy="220" rx="35" ry="85" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" transform="rotate(-15 540 220)" />
      <!-- Body -->
      <ellipse cx="400" cy="400" rx="140" ry="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Head -->
      <circle cx="400" cy="260" r="110" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eyes -->
      <circle cx="360" cy="230" r="15" fill="#000000" />
      <circle cx="440" cy="230" r="15" fill="#000000" />
      <!-- Snout -->
      <ellipse cx="400" cy="290" rx="40" ry="25" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="280" r="12" fill="#000000" />
    </svg>`
  },
  rabbit: {
    name: 'Bunny Rabbit 🐰',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Long Ears -->
      <ellipse cx="340" cy="120" rx="30" ry="110" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="460" cy="120" rx="30" ry="110" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Inner Ears -->
      <ellipse cx="340" cy="120" rx="15" ry="80" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <ellipse cx="460" cy="120" rx="15" ry="80" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <!-- Body -->
      <circle cx="400" cy="400" r="140" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Head -->
      <circle cx="400" cy="260" r="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eyes -->
      <circle cx="360" cy="240" r="12" fill="#000000" />
      <circle cx="440" cy="240" r="12" fill="#000000" />
      <!-- Nose/Mouth -->
      <polygon points="390,265 410,265 400,275" fill="#000000" />
    </svg>`
  },
  monkey: {
    name: 'Cheeky Monkey 🐒',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Ears -->
      <circle cx="270" cy="240" r="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="530" cy="240" r="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Body -->
      <ellipse cx="400" cy="400" rx="130" ry="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Head -->
      <circle cx="400" cy="250" r="110" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Face Patch -->
      <path d="M 330 250 A 45 45 0 0 1 400 220 A 45 45 0 0 1 470 250 C 470 300 330 300 330 250 Z" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <!-- Eyes -->
      <circle cx="370" cy="240" r="12" fill="#000000" />
      <circle cx="430" cy="240" r="12" fill="#000000" />
      <!-- Smile -->
      <path d="M 360 280 Q 400 310 440 280" stroke="#000000" stroke-width="10" fill="none" />
    </svg>`
  },
  butterfly: {
    name: 'Lovely Butterfly 🦋',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Wings Left -->
      <path d="M 380 300 C 200 120 120 240 220 320 C 120 400 200 480 380 340" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Wings Right -->
      <path d="M 420 300 C 600 120 680 240 580 320 C 680 400 600 480 420 340" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Antennae -->
      <path d="M 390 180 Q 360 120 330 140" stroke="#000000" stroke-width="8" fill="none" />
      <path d="M 410 180 Q 440 120 470 140" stroke="#000000" stroke-width="8" fill="none" />
      <!-- Body -->
      <rect x="385" y="160" width="30" height="280" rx="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eyes -->
      <circle cx="392" cy="180" r="4" fill="#000000" />
      <circle cx="408" cy="180" r="4" fill="#000000" />
    </svg>`
  },
  bee: {
    name: 'Buzzy Bee 🐝',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Wings -->
      <ellipse cx="370" cy="170" rx="50" ry="70" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" transform="rotate(-30 370 170)" />
      <ellipse cx="430" cy="170" rx="50" ry="70" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" transform="rotate(30 430 170)" />
      <!-- Body -->
      <ellipse cx="400" cy="320" rx="130" ry="170" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" transform="rotate(90 400 320)" />
      <!-- Stripes (clickable sections) -->
      <path d="M 330 220 L 330 420" stroke="#000000" stroke-width="20" fill="none" />
      <path d="M 400 190 L 400 450" stroke="#000000" stroke-width="20" fill="none" />
      <path d="M 470 220 L 470 420" stroke="#000000" stroke-width="20" fill="none" />
      <!-- Eyes -->
      <circle cx="510" cy="290" r="10" fill="#000000" />
      <path d="M 520 330 Q 530 340 520 350" stroke="#000000" stroke-width="8" fill="none" />
    </svg>`
  },
  fish: {
    name: 'Happy Fish 🐟',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Tail Fin -->
      <polygon points="150,300 50,180 90,300 50,420" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Body -->
      <ellipse cx="380" cy="300" rx="200" ry="130" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eye -->
      <circle cx="490" cy="270" r="15" fill="#000000" />
      <!-- Gill line -->
      <path d="M 430 200 Q 400 300 430 400" stroke="#000000" stroke-width="10" fill="none" />
      <!-- Fin Top -->
      <path d="M 330 174 Q 300 100 240 120" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
    </svg>`
  },
  turtle: {
    name: 'Tiny Turtle 🐢',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Flippers/Feet -->
      <ellipse cx="230" cy="220" rx="60" ry="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" transform="rotate(-30 230 220)" />
      <ellipse cx="570" cy="220" rx="60" ry="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" transform="rotate(30 570 220)" />
      <ellipse cx="250" cy="420" rx="55" ry="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" transform="rotate(30 250 420)" />
      <ellipse cx="550" cy="420" rx="55" ry="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" transform="rotate(-30 550 420)" />
      <!-- Head -->
      <circle cx="400" cy="150" r="65" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eyes -->
      <circle cx="375" cy="135" r="8" fill="#000000" />
      <circle cx="425" cy="135" r="8" fill="#000000" />
      <!-- Shell Body -->
      <ellipse cx="400" cy="330" rx="190" ry="140" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Shell Patterns -->
      <circle cx="400" cy="330" r="60" stroke="#000000" stroke-width="8" fill="none" />
    </svg>`
  },
  owl: {
    name: 'Wise Owl 🦉',
    category: 'animals',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Body -->
      <ellipse cx="400" cy="340" rx="140" ry="180" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eyes Circles -->
      <circle cx="340" cy="240" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="460" cy="240" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="340" cy="240" r="15" fill="#000000" />
      <circle cx="460" cy="240" r="15" fill="#000000" />
      <!-- Beak -->
      <polygon points="385,270 415,270 400,300" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Wings -->
      <ellipse cx="235" cy="350" rx="35" ry="90" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" transform="rotate(10 235 350)" />
      <ellipse cx="565" cy="350" rx="35" ry="90" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" transform="rotate(-10 565 350)" />
    </svg>`
  },

  // --- VEHICLES ---
  rocket: {
    name: 'Space Rocket 🚀',
    category: 'vehicles',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Fins -->
      <polygon points="260,420 200,500 300,480" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <polygon points="540,420 600,500 500,480" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Center Fin -->
      <polygon points="400,450 370,530 430,530" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Main Body -->
      <path d="M 300 420 L 300 240 Q 300 80 400 60 Q 500 80 500 240 L 500 420 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Window -->
      <circle cx="400" cy="220" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="220" r="35" stroke="#000000" stroke-width="6" fill="#ffffff" class="fillable" />
    </svg>`
  },
  airplane: {
    name: 'Toy Airplane ✈️',
    category: 'vehicles',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Tail wing -->
      <polygon points="180,260 120,160 160,260" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Main Cabin Body -->
      <ellipse cx="380" cy="300" rx="250" ry="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Main Wings -->
      <polygon points="400,320 330,480 430,480" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <polygon points="400,280 330,120 430,120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Propeller -->
      <ellipse cx="630" cy="300" rx="15" ry="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  helicopter: {
    name: 'Helicopter 🚁',
    category: 'vehicles',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Tail Rotor -->
      <line x1="200" y1="300" x2="100" y2="300" stroke="#000000" stroke-width="12" />
      <ellipse cx="100" cy="300" rx="10" ry="30" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Cabin -->
      <circle cx="420" cy="320" r="130" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Windshield -->
      <path d="M 420 190 A 130 130 0 0 1 550 320 L 420 320 Z" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Landing Skids -->
      <line x1="330" y1="450" x2="330" y2="480" stroke="#000000" stroke-width="12" />
      <line x1="510" y1="450" x2="510" y2="480" stroke="#000000" stroke-width="12" />
      <rect x="250" y="480" width="340" height="20" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Rotor Shaft & Blades -->
      <line x1="420" y1="190" x2="420" y2="150" stroke="#000000" stroke-width="12" />
      <rect x="200" y="135" width="440" height="15" rx="5" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
    </svg>`
  },
  car: {
    name: 'Little Car 🚗',
    category: 'vehicles',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Roof/Cabin -->
      <path d="M 280 300 L 350 200 L 530 200 L 600 300 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Main Car Body -->
      <rect x="200" y="300" width="460" height="110" rx="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Windows -->
      <rect x="360" y="215" width="70" height="70" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <rect x="450" y="215" width="70" height="70" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <!-- Wheels -->
      <circle cx="290" cy="410" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="290" cy="410" r="20" fill="#000000" />
      <circle cx="570" cy="410" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="570" cy="410" r="20" fill="#000000" />
    </svg>`
  },
  bus: {
    name: 'School Bus 🚌',
    category: 'vehicles',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Main Body -->
      <rect x="150" y="160" width="500" height="240" rx="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Windows -->
      <rect x="190" y="190" width="65" height="75" rx="5" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <rect x="280" y="190" width="65" height="75" rx="5" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <rect x="370" y="190" width="65" height="75" rx="5" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <rect x="460" y="190" width="65" height="75" rx="5" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <rect x="550" y="190" width="65" height="75" rx="5" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <!-- Wheels -->
      <circle cx="270" cy="400" r="55" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="270" cy="400" r="20" fill="#000000" />
      <circle cx="530" cy="400" r="55" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="530" cy="400" r="20" fill="#000000" />
    </svg>`
  },
  train: {
    name: 'Choo-Choo Train 🚂',
    category: 'vehicles',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Cabin -->
      <rect x="400" y="200" width="180" height="200" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="430" y="230" width="120" height="85" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <!-- Boiler -->
      <rect x="220" y="270" width="180" height="130" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Front Cowcatcher -->
      <polygon points="220,400 150,400 220,330" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Chimney -->
      <rect x="260" y="190" width="50" height="80" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Wheels -->
      <circle cx="280" cy="440" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="450" cy="440" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="540" cy="440" r="45" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  truck: {
    name: 'Big Dump Truck 🚚',
    category: 'vehicles',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Dump bed -->
      <polygon points="160,200 480,200 480,360 160,360" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Cabin -->
      <path d="M 480 360 L 480 250 L 560 250 L 640 310 L 640 360 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="500" y="270" width="60" height="60" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <!-- Wheels -->
      <circle cx="260" cy="410" r="55" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="410" r="55" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="560" cy="410" r="55" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  ship: {
    name: 'Sailing Ship ⛵',
    category: 'vehicles',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Hull -->
      <polygon points="180,360 620,360 560,460 240,460" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Mast -->
      <line x1="400" y1="360" x2="400" y2="120" stroke="#000000" stroke-width="12" />
      <!-- Sails -->
      <path d="M 400 140 Q 300 240 400 330 Z" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <path d="M 420 160 Q 500 240 420 310 Z" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
    </svg>`
  },
  submarine: {
    name: 'Yellow Submarine submarine',
    category: 'vehicles',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Periscope -->
      <path d="M 400 200 L 400 130 L 440 130" stroke="#000000" stroke-width="12" fill="none" />
      <!-- Main Hull -->
      <ellipse cx="400" cy="320" rx="220" ry="110" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Portholes -->
      <circle cx="300" cy="320" r="30" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="320" r="30" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <circle cx="500" cy="320" r="30" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Propeller -->
      <polygon points="180,320 140,280 140,360" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
    </svg>`
  },
  tractor: {
    name: 'Farm Tractor 🚜',
    category: 'vehicles',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Cab -->
      <rect x="420" y="180" width="160" height="180" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Front Engine -->
      <rect x="250" y="270" width="170" height="90" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Chimney Exhaust -->
      <line x1="300" y1="270" x2="300" y2="190" stroke="#000000" stroke-width="10" />
      <!-- Large Rear Wheel -->
      <circle cx="500" cy="400" r="90" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="500" cy="400" r="30" fill="#000000" />
      <!-- Small Front Wheel -->
      <circle cx="300" cy="410" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="300" cy="410" r="15" fill="#000000" />
    </svg>`
  },

  // --- NATURE & WEATHER ---
  sun: {
    name: 'Bright Sun ☀️',
    category: 'nature',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Rays -->
      <line x1="400" y1="100" x2="400" y2="170" stroke="#000000" stroke-width="12" stroke-linecap="round" />
      <line x1="400" y1="430" x2="400" y2="500" stroke="#000000" stroke-width="12" stroke-linecap="round" />
      <line x1="200" y1="300" x2="270" y2="300" stroke="#000000" stroke-width="12" stroke-linecap="round" />
      <line x1="530" y1="300" x2="600" y2="300" stroke="#000000" stroke-width="12" stroke-linecap="round" />
      <line x1="260" y1="160" x2="310" y2="210" stroke="#000000" stroke-width="12" stroke-linecap="round" />
      <line x1="490" y1="390" x2="540" y2="440" stroke="#000000" stroke-width="12" stroke-linecap="round" />
      <line x1="540" y1="160" x2="490" y2="210" stroke="#000000" stroke-width="12" stroke-linecap="round" />
      <line x1="310" y1="390" x2="260" y2="440" stroke="#000000" stroke-width="12" stroke-linecap="round" />
      <!-- Center Circle -->
      <circle cx="400" cy="300" r="110" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  cloud: {
    name: 'Fluffy Cloud ☁️',
    category: 'nature',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Cloud Bubbles -->
      <path d="M 250 380 Q 200 320 250 260 Q 300 200 380 240 Q 450 160 520 220 Q 600 240 580 330 Q 620 380 550 410 L 250 410 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  rainbow: {
    name: 'Magical Rainbow 🌈',
    category: 'nature',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Rainbow Arcs (drawn as nested shapes) -->
      <path d="M 150 450 A 250 250 0 0 1 650 450" stroke="#000000" stroke-width="40" fill="none" />
      <path d="M 200 450 A 200 200 0 0 1 600 450" stroke="#000000" stroke-width="40" fill="none" />
      <path d="M 250 450 A 150 150 0 0 1 550 450" stroke="#000000" stroke-width="40" fill="none" />
      <!-- Clouds at end -->
      <circle cx="160" cy="450" r="55" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <circle cx="640" cy="450" r="55" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
    </svg>`
  },
  tree: {
    name: 'Tall Green Tree 🌳',
    category: 'nature',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Trunk -->
      <rect x="365" y="360" width="70" height="180" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Foliage circles -->
      <circle cx="340" cy="270" r="85" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="460" cy="270" r="85" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="180" r="95" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  flower: {
    name: 'Cute Flower 🌸',
    category: 'nature',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Petals -->
      <circle cx="330" cy="230" r="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="470" cy="230" r="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="330" cy="370" r="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="470" cy="370" r="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Center -->
      <circle cx="400" cy="300" r="90" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  cactus: {
    name: 'Desert Cactus 🌵',
    category: 'nature',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Main trunk -->
      <rect x="360" y="160" width="80" height="340" rx="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Left arm -->
      <path d="M 360 330 L 290 330 A 30 30 0 0 1 260 300 L 260 210" stroke="#000000" stroke-width="12" stroke-linecap="round" fill="none" />
      <rect x="245" y="200" width="30" height="30" rx="5" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Right arm -->
      <path d="M 440 280 L 510 280 A 30 30 0 0 0 540 250 L 540 180" stroke="#000000" stroke-width="12" stroke-linecap="round" fill="none" />
      <rect x="525" y="170" width="30" height="30" rx="5" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Pot -->
      <polygon points="320,480 480,480 450,560 350,560" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  star: {
    name: 'Shining Star ⭐',
    category: 'nature',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Star Polygon -->
      <polygon points="400,80 480,240 650,250 520,360 560,530 400,440 240,530 280,360 150,250 320,240" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  moon: {
    name: 'Sleepy Moon 🌙',
    category: 'nature',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Crescent shape -->
      <path d="M 480 140 A 180 180 0 1 0 480 460 A 140 140 0 1 1 480 140" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  mushroom: {
    name: 'Forest Mushroom 🍄',
    category: 'nature',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Stem -->
      <rect x="360" y="340" width="80" height="190" rx="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Cap -->
      <path d="M 200 340 C 200 180 600 180 600 340 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Dots -->
      <circle cx="300" cy="250" r="20" stroke="#000000" stroke-width="6" fill="#ffffff" class="fillable" />
      <circle cx="480" cy="270" r="20" stroke="#000000" stroke-width="6" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="220" r="15" stroke="#000000" stroke-width="6" fill="#ffffff" class="fillable" />
    </svg>`
  },
  mountain: {
    name: 'Snowy Mountain 🏔️',
    category: 'nature',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Big Mountain -->
      <polygon points="400,120 150,500 650,500" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Snow cap -->
      <polygon points="400,120 340,220 370,240 400,210 430,240 460,220" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
    </svg>`
  },

  // --- FOOD ---
  pizza: {
    name: 'Yummy Pizza 🍕',
    category: 'food',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Crust -->
      <path d="M 220 180 Q 400 130 580 180 L 400 500 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Cheese boundary -->
      <path d="M 240 200 Q 400 160 560 200 L 400 470 Z" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <!-- Pepperoni -->
      <circle cx="340" cy="260" r="20" stroke="#000000" stroke-width="6" fill="#ffffff" class="fillable" />
      <circle cx="460" cy="260" r="20" stroke="#000000" stroke-width="6" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="340" r="20" stroke="#000000" stroke-width="6" fill="#ffffff" class="fillable" />
    </svg>`
  },
  cupcake: {
    name: 'Sweet Cupcake 🧁',
    category: 'food',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Cup/Base -->
      <polygon points="260,340 540,340 490,520 310,520" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Cup stripes -->
      <line x1="370" y1="340" x2="370" y2="520" stroke="#000000" stroke-width="6" />
      <line x1="430" y1="340" x2="430" y2="520" stroke="#000000" stroke-width="6" />
      <!-- Frosting bubbles -->
      <path d="M 240 340 C 200 240 320 200 360 250 C 400 170 500 220 540 260 C 580 300 560 350 540 340 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Cherry -->
      <circle cx="400" cy="180" r="30" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <path d="M 400 150 Q 420 100 450 110" stroke="#000000" stroke-width="6" fill="none" />
    </svg>`
  },
  icecream: {
    name: 'Ice Cream Cone 🍦',
    category: 'food',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Cone -->
      <polygon points="300,340 500,340 400,550" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Cone lines -->
      <line x1="330" y1="400" x2="470" y2="400" stroke="#000000" stroke-width="6" />
      <line x1="360" y1="460" x2="440" y2="460" stroke="#000000" stroke-width="6" />
      <!-- Scoop 1 (Bottom) -->
      <circle cx="400" cy="310" r="85" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Scoop 2 (Top) -->
      <circle cx="400" cy="200" r="75" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  burger: {
    name: 'Big Burger 🍔',
    category: 'food',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Top Bun -->
      <path d="M 230 250 C 230 130 570 130 570 250 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Lettuce -->
      <rect x="200" y="250" width="400" height="30" rx="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Meat Patty -->
      <rect x="215" y="290" width="370" height="60" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Bottom Bun -->
      <rect x="230" y="360" width="340" height="70" rx="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  apple: {
    name: 'Red Apple 🍎',
    category: 'food',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Leaf -->
      <path d="M 400 170 Q 450 110 420 80 Q 370 140 400 170" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Stem -->
      <path d="M 400 200 Q 390 140 410 130" stroke="#000000" stroke-width="10" fill="none" />
      <!-- Apple lobes -->
      <path d="M 400 230 C 370 200 260 200 250 330 C 240 440 370 480 400 450 C 430 480 560 440 550 330 C 540 200 430 200 400 230 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  strawberry: {
    name: 'Strawberry 🍓',
    category: 'food',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Leaves on top -->
      <polygon points="340,160 400,200 370,140" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <polygon points="460,160 400,200 430,140" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <polygon points="400,200 400,130 380,150" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Strawberry body -->
      <path d="M 330 190 C 250 200 260 380 400 500 C 540 380 550 200 470 190 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Seeds -->
      <circle cx="360" cy="270" r="6" fill="#000000" />
      <circle cx="440" cy="270" r="6" fill="#000000" />
      <circle cx="380" cy="330" r="6" fill="#000000" />
      <circle cx="420" cy="330" r="6" fill="#000000" />
      <circle cx="400" cy="400" r="6" fill="#000000" />
    </svg>`
  },
  watermelon: {
    name: 'Watermelon Slice 🍉',
    category: 'food',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Outer Rind -->
      <path d="M 180 250 A 220 220 0 0 0 620 250 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Inner Flesh -->
      <path d="M 210 250 A 190 190 0 0 0 590 250 Z" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Seeds -->
      <circle cx="350" cy="320" r="10" fill="#000000" />
      <circle cx="450" cy="320" r="10" fill="#000000" />
      <circle cx="400" cy="380" r="10" fill="#000000" />
    </svg>`
  },
  pineapple: {
    name: 'Sweet Pineapple 🍍',
    category: 'food',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Leaf crown -->
      <path d="M 400 200 C 370 120 330 100 350 60 C 390 140 400 200 400 200 Z" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <path d="M 400 200 C 430 120 470 100 450 60 C 410 140 400 200 400 200 Z" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Oval Body -->
      <rect x="290" y="190" width="220" height="320" rx="110" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Cross hatch pattern -->
      <line x1="330" y1="200" x2="470" y2="480" stroke="#000000" stroke-width="6" />
      <line x1="470" y1="200" x2="330" y2="480" stroke="#000000" stroke-width="6" />
    </svg>`
  },
  cherry: {
    name: 'Sweet Cherries 🍒',
    category: 'food',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Cherry 1 -->
      <circle cx="300" cy="380" r="75" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Cherry 2 -->
      <circle cx="500" cy="380" r="75" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Stems -->
      <path d="M 300 305 Q 350 200 420 180" stroke="#000000" stroke-width="10" fill="none" />
      <path d="M 500 305 Q 450 200 420 180" stroke="#000000" stroke-width="10" fill="none" />
    </svg>`
  },
  donut: {
    name: 'Glazed Donut 🍩',
    category: 'food',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Main Donut Outer -->
      <circle cx="400" cy="300" r="160" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Frosting Layer -->
      <path d="M 280 220 Q 300 240 330 210 Q 370 190 400 220 Q 440 240 480 200 Q 520 230 540 270 Q 580 320 520 370 Q 480 350 430 380 Q 370 410 320 370 Q 250 350 250 300 Z" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <!-- Inner Hole -->
      <circle cx="400" cy="300" r="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },

  // --- FANTASY ---
  unicorn: {
    name: 'Magic Unicorn 🦄',
    category: 'fantasy',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Head -->
      <path d="M 260 260 L 320 150 Q 380 150 440 200 L 460 300 Q 480 370 430 380 L 350 360 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Horn -->
      <polygon points="360,150 370,30 400,140" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Mane -->
      <path d="M 260 260 Q 200 320 280 380 Q 220 440 320 480 L 320 350 Z" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Eye -->
      <circle cx="410" cy="240" r="10" fill="#000000" />
      <!-- Muzzle -->
      <circle cx="420" cy="330" r="6" fill="#000000" />
    </svg>`
  },
  castle: {
    name: 'Fairytale Castle 🏰',
    category: 'fantasy',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Left Tower -->
      <rect x="200" y="240" width="80" height="260" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <polygon points="180,240 240,120 300,240" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Right Tower -->
      <rect x="520" y="240" width="80" height="260" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <polygon points="500,240 560,120 620,240" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Center Wall -->
      <rect x="280" y="320" width="240" height="180" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Battlements -->
      <rect x="300" y="280" width="40" height="40" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <rect x="380" y="280" width="40" height="40" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <rect x="460" y="280" width="40" height="40" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Gate -->
      <path d="M 360 500 L 360 410 Q 400 370 440 410 L 440 500 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  dragon: {
    name: 'Baby Dragon 🐉',
    category: 'fantasy',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Wings -->
      <path d="M 280 270 Q 150 180 180 340 L 280 320 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M 520 270 Q 650 180 620 340 L 520 320 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Body -->
      <circle cx="400" cy="380" r="130" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Head -->
      <circle cx="400" cy="220" r="90" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eyes -->
      <circle cx="365" cy="200" r="12" fill="#000000" />
      <circle cx="435" cy="200" r="12" fill="#000000" />
      <!-- Snout -->
      <ellipse cx="400" cy="255" rx="40" ry="25" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Horns -->
      <polygon points="340,145 320,80 370,135" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <polygon points="460,145 480,80 430,135" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
    </svg>`
  },
  wizard: {
    name: 'Wizard Hat 🧙',
    category: 'fantasy',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Hat Rim -->
      <ellipse cx="400" cy="460" rx="240" ry="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Hat Cone -->
      <path d="M 220 440 L 400 100 Q 420 90 410 110 L 580 440 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Star on Hat -->
      <polygon points="400,230 415,270 450,270 420,290 435,330 400,310 365,330 380,290 350,270 385,270" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
    </svg>`
  },
  crown: {
    name: 'Royal Crown 👑',
    category: 'fantasy',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Crown Shape -->
      <path d="M 180 460 L 140 220 L 280 350 L 400 160 L 520 350 L 660 220 L 620 460 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Jewels on peaks -->
      <circle cx="140" cy="220" r="15" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="160" r="15" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <circle cx="660" cy="220" r="15" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <!-- Center jewel -->
      <ellipse cx="400" cy="380" rx="25" ry="35" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
    </svg>`
  },
  mermaid: {
    name: 'Little Mermaid 🧜',
    category: 'fantasy',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Tail fin -->
      <path d="M 380 450 L 330 520 L 400 490 L 470 520 L 420 450 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Tail -->
      <path d="M 400 290 Q 460 360 400 450" stroke="#000000" stroke-width="12" fill="none" />
      <!-- Head -->
      <circle cx="400" cy="180" r="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Hair -->
      <path d="M 330 180 C 330 100 470 100 470 180 Q 480 230 460 270 Q 320 230 330 180 Z" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <!-- Eyes -->
      <circle cx="380" cy="175" r="6" fill="#000000" />
      <circle cx="420" cy="175" r="6" fill="#000000" />
    </svg>`
  },
  robot: {
    name: 'Cute Robot 🤖',
    category: 'fantasy',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Head -->
      <rect x="300" y="160" width="200" height="130" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eyes -->
      <circle cx="350" cy="225" r="25" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <circle cx="450" cy="225" r="25" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <circle cx="350" cy="225" r="8" fill="#000000" />
      <circle cx="450" cy="225" r="8" fill="#000000" />
      <!-- Neck -->
      <rect x="370" y="290" width="60" height="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Body -->
      <rect x="260" y="320" width="280" height="180" rx="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Chest screen -->
      <rect x="300" y="360" width="200" height="90" rx="10" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
    </svg>`
  },
  ghost: {
    name: 'Spooky Ghost 👻',
    category: 'fantasy',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Ghost body -->
      <path d="M 280 420 L 280 240 C 280 120 520 120 520 240 L 520 420 Q 490 390 460 420 Q 430 390 400 420 Q 370 390 340 420 Q 310 390 280 420 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eyes -->
      <ellipse cx="360" cy="220" rx="15" ry="25" fill="#000000" />
      <ellipse cx="440" cy="220" rx="15" ry="25" fill="#000000" />
      <!-- Mouth -->
      <circle cx="400" cy="280" r="20" fill="#000000" />
    </svg>`
  },
  ufo: {
    name: 'Space UFO 🛸',
    category: 'fantasy',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Light Beam -->
      <polygon points="340,360 460,360 580,550 220,550" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Dome -->
      <path d="M 300 260 C 300 130 500 130 500 260 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Alien -->
      <ellipse cx="400" cy="220" rx="30" ry="25" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <circle cx="385" cy="215" r="6" fill="#000000" />
      <circle cx="415" cy="215" r="6" fill="#000000" />
      <!-- Main Saucer Body -->
      <ellipse cx="400" cy="300" rx="240" ry="70" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Lights -->
      <circle cx="230" cy="300" r="15" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <circle cx="310" cy="315" r="15" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="320" r="15" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <circle cx="490" cy="315" r="15" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <circle cx="570" cy="300" r="15" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
    </svg>`
  },
  treasure: {
    name: 'Treasure Chest 🏴‍☠️',
    category: 'fantasy',
    svg: `<svg viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="0" y="0" width="800" height="600" fill="none" />
      <!-- Chest Base -->
      <rect x="230" y="320" width="340" height="200" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Chest Lid -->
      <path d="M 230 320 C 230 180 570 180 570 320 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Metal Bands -->
      <rect x="290" y="210" width="40" height="310" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <rect x="470" y="210" width="40" height="310" stroke="#000000" stroke-width="8" fill="#ffffff" class="fillable" />
      <!-- Keyhole Lock -->
      <rect x="375" y="300" width="50" height="60" rx="10" stroke="#000000" stroke-width="10" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="320" r="8" fill="#000000" />
      <line x1="400" y1="320" x2="400" y2="345" stroke="#000000" stroke-width="6" />
    </svg>`
  }
};
