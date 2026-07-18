export const EXTRA_CATEGORIES = {
  people: { name: 'Tokoh 👧', icon: '👧' }
};

export const EXTRA_TEMPLATES = {
  giraffe: {
    name: 'Tall Giraffe 🦒',
    category: 'animals',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="360" y="80" width="100" height="280" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="390" cy="130" rx="20" ry="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="420" cy="180" rx="15" ry="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="320" y="320" width="200" height="120" rx="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="340" y="420" width="30" height="120" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="470" y="420" width="30" height="120" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="410" cy="60" r="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  zebra: {
    name: 'Zebra 🦓',
    category: 'animals',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <ellipse cx="400" cy="300" rx="150" ry="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M350 200 Q400 300 350 400" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M400 200 Q450 300 400 400" stroke="#000000" stroke-width="12" fill="none" />
      <circle cx="250" cy="200" r="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="300" y="380" width="40" height="120" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="460" y="380" width="40" height="120" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  tiger: {
    name: 'Tiger 🐅',
    category: 'animals',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="300" y="250" width="250" height="150" rx="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="250" cy="250" r="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="220" cy="230" r="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="280" cy="230" r="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M210 180 Q220 150 240 170" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M290 180 Q280 150 260 170" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="320" y="380" width="40" height="100" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="480" y="380" width="40" height="100" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M350 250 L350 300 M400 250 L400 300 M450 250 L450 300" stroke="#000000" stroke-width="12" />
    </svg>`
  },
  crocodile: {
    name: 'Crocodile 🐊',
    category: 'animals',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M200 300 Q400 250 600 300 Q400 350 200 300" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M150 300 L200 280 L200 320 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="250" cy="270" r="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="300" y="320" width="30" height="50" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="450" y="320" width="30" height="50" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M250 260 L270 240 L290 260 M350 260 L370 240 L390 260 M450 260 L470 240 L490 260" stroke="#000000" stroke-width="12" fill="none" />
    </svg>`
  },
  parrot: {
    name: 'Parrot 🦜',
    category: 'animals',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <ellipse cx="400" cy="350" rx="80" ry="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="180" r="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M440 160 Q480 180 440 200 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M320 300 Q200 350 320 400 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M480 300 Q600 350 480 400 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M380 470 L350 550 L410 470 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M420 470 L450 550 L390 470 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  owl: {
    name: 'Owl 🦉',
    category: 'animals',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="300" y="200" width="200" height="250" rx="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="350" cy="250" r="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="450" cy="250" r="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M380 300 L420 300 L400 340 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M200 250 Q250 350 300 350" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M600 250 Q550 350 500 350" stroke="#000000" stroke-width="12" fill="none" />
      <rect x="350" y="450" width="20" height="50" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="430" y="450" width="20" height="50" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  crab: {
    name: 'Crab 🦀',
    category: 'animals',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <ellipse cx="400" cy="350" rx="150" ry="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="350" cy="200" r="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="450" cy="200" r="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <line x1="350" y1="220" x2="380" y2="270" stroke="#000000" stroke-width="12" />
      <line x1="450" y1="220" x2="420" y2="270" stroke="#000000" stroke-width="12" />
      <path d="M250 350 Q150 250 200 200 Q250 250 250 350" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M550 350 Q650 250 600 200 Q550 250 550 350" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M280 420 Q200 480 250 500" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M330 440 Q250 520 300 540" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M520 420 Q600 480 550 500" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M470 440 Q550 520 500 540" stroke="#000000" stroke-width="12" fill="none" />
    </svg>`
  },
  butterfly: {
    name: 'Butterfly 🦋',
    category: 'animals',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <ellipse cx="400" cy="300" rx="30" ry="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M370 250 C200 100 100 300 370 300" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M370 300 C150 300 200 500 370 380" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M430 250 C600 100 700 300 430 300" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M430 300 C650 300 600 500 430 380" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="250" cy="220" r="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="550" cy="220" r="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M390 180 Q350 100 320 120" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M410 180 Q450 100 480 120" stroke="#000000" stroke-width="12" fill="none" />
    </svg>`
  },
  frog: {
    name: 'Frog 🐸',
    category: 'animals',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <ellipse cx="400" cy="350" rx="150" ry="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="320" cy="250" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="480" cy="250" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M300 380 Q400 450 500 380" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M250 350 Q150 300 150 400 Q150 500 280 420" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M550 350 Q650 300 650 400 Q650 500 520 420" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="350" r="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  turtle_detailed: {
    name: 'Turtle 🐢',
    category: 'animals',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M200 300 Q400 150 600 300 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M200 300 Q400 400 600 300 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="650" cy="300" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M250 350 Q200 450 300 450" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M550 350 Q600 450 500 450" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M350 200 L450 200 L400 280 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M280 250 L350 200 L300 280 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M520 250 L450 200 L500 280 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  whale: {
    name: 'Whale 🐋',
    category: 'animals',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M200 300 Q400 150 600 300 Q750 350 700 400 Q400 500 200 400 Q50 350 200 300" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M200 350 Q400 450 700 380" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M700 380 Q750 250 800 300 Q750 400 700 400" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M700 380 Q750 450 800 500 Q750 400 700 400" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 220 L400 100 M380 120 L400 100 L420 120 M360 150 L400 100 L440 150" stroke="#000000" stroke-width="12" fill="none" />
      <circle cx="300" cy="280" r="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M450 420 Q500 450 550 400 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  dinosaur: {
    name: 'Dinosaur 🦖',
    category: 'animals',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M200 200 Q250 100 350 150 L350 250 Q450 250 550 350 Q650 450 750 350 L700 450 Q500 600 300 450 L300 550 L200 550 L250 450 Q150 400 150 300 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="250" cy="150" r="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 300 L450 250 L450 300 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M500 330 L550 280 L550 330 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M600 360 L650 310 L650 360 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="450" y="450" width="40" height="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  race_car: {
    name: 'Race Car 🏎️',
    category: 'vehicles',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M150 350 L250 250 L550 250 L650 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="100" y="350" width="600" height="80" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="250" cy="430" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="250" cy="430" r="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="550" cy="430" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="550" cy="430" r="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="250" width="100" height="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M650 380 L750 380 L720 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  train: {
    name: 'Train 🚂',
    category: 'vehicles',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="200" y="250" width="300" height="150" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="450" y="150" width="150" height="250" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="480" y="180" width="90" height="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="250" y="150" width="50" height="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="250" cy="400" r="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="370" cy="400" r="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="530" cy="400" r="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M150 400 L200 350 L200 400 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="250" cy="100" r="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="280" cy="60" r="25" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  helicopter: {
    name: 'Helicopter 🚁',
    category: 'vehicles',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <ellipse cx="400" cy="300" rx="150" ry="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 200 L400 150 M250 150 L550 150" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M250 300 L100 280 L100 320 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M100 260 L100 340" stroke="#000000" stroke-width="12" fill="none" />
      <rect x="350" y="400" width="10" height="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="450" y="400" width="10" height="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="300" y="450" width="200" height="20" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 200 Q500 200 550 300 Q400 400 400 200" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  sailboat: {
    name: 'Sailboat ⛵',
    category: 'vehicles',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M200 400 L600 400 L500 500 L300 500 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <line x1="400" y1="100" x2="400" y2="400" stroke="#000000" stroke-width="12" />
      <path d="M420 120 L600 350 L420 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M380 150 L200 350 L380 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 100 L450 70 L400 120 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="350" cy="450" r="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="450" cy="450" r="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  ambulance: {
    name: 'Ambulance 🚑',
    category: 'vehicles',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="150" y="200" width="500" height="200" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="500" y="250" width="150" height="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="300" y="250" width="100" height="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M330 280 L370 280 M350 260 L350 300" stroke="#000000" stroke-width="20" />
      <circle cx="250" cy="400" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="550" cy="400" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="160" width="60" height="40" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  tractor: {
    name: 'Tractor 🚜',
    category: 'vehicles',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="200" y="250" width="200" height="150" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="400" y="150" width="150" height="250" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="420" y="180" width="110" height="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="250" cy="400" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="480" cy="400" r="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="250" y="150" width="30" height="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M480 400 L560 400 M480 400 L480 320 M480 400 L480 480 M480 400 L400 400" stroke="#000000" stroke-width="12" />
    </svg>`
  },
  submarine: {
    name: 'Submarine 🚢',
    category: 'vehicles',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <ellipse cx="400" cy="350" rx="250" ry="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="150" width="100" height="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 150 L400 80 L450 80" stroke="#000000" stroke-width="12" fill="none" />
      <circle cx="250" cy="350" r="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="350" r="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="550" cy="350" r="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M150 350 L50 300 L50 400 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  bicycle: {
    name: 'Bicycle 🚲',
    category: 'vehicles',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <circle cx="250" cy="400" r="80" stroke="#000000" stroke-width="12" fill="none" class="fillable" />
      <circle cx="550" cy="400" r="80" stroke="#000000" stroke-width="12" fill="none" class="fillable" />
      <path d="M250 400 L400 400 L300 250 Z" stroke="#000000" stroke-width="12" fill="none" class="fillable" />
      <path d="M400 400 L500 200 L300 250" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M500 200 L550 400" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M480 200 L550 200" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M280 250 L320 250" stroke="#000000" stroke-width="12" fill="none" />
      <circle cx="400" cy="400" r="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M250 320 L250 480 M170 400 L330 400" stroke="#000000" stroke-width="12" />
      <path d="M550 320 L550 480 M470 400 L630 400" stroke="#000000" stroke-width="12" />
    </svg>`
  },
  hot_air_balloon: {
    name: 'Hot Air Balloon 🎈',
    category: 'vehicles',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M400 100 C200 100 200 350 350 450 L450 450 C600 350 600 100 400 100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 100 C300 100 300 350 350 450" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M400 100 C500 100 500 350 450 450" stroke="#000000" stroke-width="12" fill="none" />
      <rect x="350" y="500" width="100" height="80" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <line x1="350" y1="450" x2="350" y2="500" stroke="#000000" stroke-width="12" />
      <line x1="450" y1="450" x2="450" y2="500" stroke="#000000" stroke-width="12" />
      <path d="M300 250 Q400 200 500 250" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M300 300 Q400 250 500 300" stroke="#000000" stroke-width="12" fill="none" />
    </svg>`
  },
  motorcycle: {
    name: 'Motorcycle 🏍️',
    category: 'vehicles',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <circle cx="250" cy="400" r="70" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="550" cy="400" r="70" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M250 400 L400 400 L350 250 L250 400" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 400 L500 200" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M500 200 L550 400" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M320 250 L400 250 C450 250 450 300 400 300 L320 300 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M480 200 Q500 150 550 180" stroke="#000000" stroke-width="12" fill="none" />
      <rect x="350" y="350" width="100" height="50" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  castle: {
    name: 'Castle 🏰',
    category: 'nature',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="200" y="200" width="100" height="300" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="500" y="200" width="100" height="300" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="300" y="300" width="200" height="200" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M200 200 L250 100 L300 200 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M500 200 L550 100 L600 200 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M350 500 L350 400 A50 50 0 0 1 450 400 L450 500 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="250" width="100" height="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M350 250 L350 220 M400 250 L400 220 M450 250 L450 220" stroke="#000000" stroke-width="12" />
    </svg>`
  },
  rainbow_scene: {
    name: 'Rainbow 🌈',
    category: 'nature',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M100 500 A300 300 0 0 1 700 500" stroke="#000000" stroke-width="20" fill="none" class="fillable" />
      <path d="M150 500 A250 250 0 0 1 650 500" stroke="#000000" stroke-width="20" fill="none" class="fillable" />
      <path d="M200 500 A200 200 0 0 1 600 500" stroke="#000000" stroke-width="20" fill="none" class="fillable" />
      <path d="M250 500 A150 150 0 0 1 550 500" stroke="#000000" stroke-width="20" fill="none" class="fillable" />
      <circle cx="150" cy="500" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="220" cy="480" r="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="650" cy="500" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="580" cy="480" r="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  sunflower: {
    name: 'Sunflower 🌻',
    category: 'nature',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="390" y="300" width="20" height="300" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M390 450 C300 450 250 350 390 400" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M410 500 C500 500 550 400 410 450" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Petals -->
      <ellipse cx="400" cy="150" rx="20" ry="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="400" cy="350" rx="20" ry="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="250" cy="250" rx="80" ry="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="550" cy="250" rx="80" ry="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="290" cy="140" rx="60" ry="20" transform="rotate(45 290 140)" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="510" cy="360" rx="60" ry="20" transform="rotate(45 510 360)" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="510" cy="140" rx="60" ry="20" transform="rotate(-45 510 140)" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="290" cy="360" rx="60" ry="20" transform="rotate(-45 290 360)" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="250" r="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  mushroom_house: {
    name: 'Mushroom 🍄',
    category: 'nature',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M200 350 C200 100 600 100 600 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="300" y="350" width="200" height="200" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M350 550 L350 450 A50 50 0 0 1 450 450 L450 550" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="300" cy="250" r="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="500" cy="250" r="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="180" r="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="320" y="400" width="40" height="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="440" y="400" width="40" height="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  underwater_scene: {
    name: 'Ocean 🌊',
    category: 'nature',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M0 450 Q200 400 400 480 T800 450 L800 600 L0 600 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="300" cy="250" rx="80" ry="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M220 250 L150 200 L150 300 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="350" cy="240" r="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M600 300 Q650 200 700 300 Q650 400 600 300" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M600 300 L550 250 L550 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M100 600 Q150 500 100 400" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M150 600 Q200 500 150 400" stroke="#000000" stroke-width="12" fill="none" />
      <circle cx="450" cy="200" r="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="480" cy="150" r="25" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  mountain_landscape: {
    name: 'Mountain ⛰️',
    category: 'nature',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M100 500 L300 150 L500 500 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M350 500 L550 100 L750 500 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M230 270 L300 150 L370 270 L330 300 L300 250 L270 300 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M480 240 L550 100 L620 240 L580 270 L550 220 L520 270 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="150" cy="150" r="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M0 500 Q400 450 800 500 L800 600 L0 600 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  lighthouse: {
    name: 'Lighthouse 🗼',
    category: 'nature',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M300 500 L350 200 L450 200 L500 500 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="330" y="150" width="140" height="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M330 150 L400 80 L470 150 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M0 500 Q400 450 800 500 L800 600 L0 600 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M315 400 L485 400 M330 300 L470 300" stroke="#000000" stroke-width="12" />
      <rect x="380" y="420" width="40" height="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="175" r="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  windmill: {
    name: 'Windmill 🪕',
    category: 'nature',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M300 500 L350 250 L450 250 L500 500 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M350 250 L400 150 L450 250 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Blades -->
      <path d="M400 250 L400 50 L450 50 L450 230 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 250 L400 450 L350 450 L350 270 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 250 L600 250 L600 300 L420 300 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 250 L200 250 L200 200 L380 200 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="250" r="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="380" y="400" width="40" height="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  garden: {
    name: 'Garden 🪴',
    category: 'nature',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M100 400 L300 400 L250 550 L150 550 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M500 400 L700 400 L650 550 L550 550 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="200" y="200" width="10" height="200" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="600" y="200" width="10" height="200" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="205" cy="150" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="605" cy="150" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="205" cy="100" rx="20" ry="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="205" cy="200" rx="20" ry="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="155" cy="150" rx="40" ry="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="255" cy="150" rx="40" ry="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  treehouse: {
    name: 'Treehouse 🏡',
    category: 'nature',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M350 600 L350 200 L450 200 L450 600 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="200" r="150" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="300" cy="150" r="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="500" cy="150" r="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="300" y="250" width="200" height="150" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M280 250 L400 150 L520 250 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="300" width="50" height="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M450 400 L550 600 M480 400 L580 600" stroke="#000000" stroke-width="12" />
      <path d="M475 450 L505 450 M500 500 L530 500 M525 550 L555 550" stroke="#000000" stroke-width="12" />
    </svg>`
  },
  birthday_cake: {
    name: 'Cake 🎂',
    category: 'food',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="250" y="400" width="300" height="150" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="300" y="250" width="200" height="150" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="380" y="150" width="40" height="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 150 C380 100 420 100 400 50 C380 100 420 100 400 150" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M250 450 Q400 500 550 450" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M300 300 Q400 350 500 300" stroke="#000000" stroke-width="12" fill="none" />
      <circle cx="350" cy="420" r="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="450" cy="420" r="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="270" r="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  ice_cream_sundae: {
    name: 'Ice Cream 🍨',
    category: 'food',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M300 400 L400 550 L500 400 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="350" cy="350" r="70" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="450" cy="350" r="70" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="280" r="70" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="200" r="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M300 400 L500 400" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M320 440 L480 440" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M350 480 L450 480" stroke="#000000" stroke-width="12" fill="none" />
    </svg>`
  },
  pizza_slice: {
    name: 'Pizza 🍕',
    category: 'food',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M200 150 L600 150 Q650 300 400 550 Q150 300 200 150 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M180 120 Q400 80 620 120 L600 150 Q400 120 200 150 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="350" cy="250" r="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="480" cy="280" r="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="380" r="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="300" cy="330" r="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="450" cy="450" r="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  watermelon: {
    name: 'Watermelon 🍉',
    category: 'food',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M150 250 A250 250 0 0 0 650 250 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M180 250 A220 220 0 0 0 620 250 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M300 320 Q310 300 320 320 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 350 Q410 330 420 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M500 320 Q510 300 520 320 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M350 400 Q360 380 370 400 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M450 400 Q460 380 470 400 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  sushi: {
    name: 'Sushi 🍣',
    category: 'food',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="250" y="300" width="300" height="150" rx="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M220 320 Q400 250 580 320 Q620 350 580 380 Q400 450 220 380 Q180 350 220 320 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M280 250 Q400 200 520 250 Q550 270 520 290 Q400 340 280 290 Q250 270 280 250 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="200" width="100" height="300" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  donut: {
    name: 'Donut 🍩',
    category: 'food',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <circle cx="400" cy="300" r="200" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="300" r="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M220 300 Q250 150 400 150 Q550 150 580 300 Q550 400 400 450 Q250 400 220 300 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="300" y="200" width="30" height="10" rx="5" transform="rotate(45 300 200)" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="500" y="250" width="30" height="10" rx="5" transform="rotate(-30 500 250)" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="450" y="180" width="30" height="10" rx="5" transform="rotate(15 450 180)" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="380" width="30" height="10" rx="5" transform="rotate(80 350 380)" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="480" y="350" width="30" height="10" rx="5" transform="rotate(-45 480 350)" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  burger: {
    name: 'Burger 🍔',
    category: 'food',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M200 250 A200 150 0 0 1 600 250 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="200" y="280" width="400" height="40" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M180 340 Q400 370 620 340 L600 380 Q400 410 200 380 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="200" y="410" width="400" height="60" rx="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M200 500 A200 100 0 0 0 600 500 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="350" cy="180" r="5" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="450" cy="150" r="5" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="200" r="5" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  cupcake: {
    name: 'Cupcake 🧁',
    category: 'food',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M250 350 L300 550 L500 550 L550 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M200 350 C200 200 600 200 600 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M250 250 C250 100 550 100 550 250 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="100" r="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M300 350 L330 550 M400 350 L400 550 M500 350 L470 550" stroke="#000000" stroke-width="12" fill="none" />
    </svg>`
  },
  dragon: {
    name: 'Dragon 🐉',
    category: 'fantasy',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M300 350 Q400 500 500 350 Q600 200 700 350" stroke="#000000" stroke-width="12" fill="none" />
      <ellipse cx="400" cy="350" rx="100" ry="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="250" cy="200" r="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M250 260 Q300 350 400 350" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M400 350 L500 150 L600 250 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M300 150 L250 100 L200 150 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="430" width="30" height="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="450" y="430" width="30" height="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M500 350 Q600 450 750 350" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M190 200 L150 200 L170 230 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  mermaid: {
    name: 'Mermaid 🧜‍♀️',
    category: 'fantasy',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <circle cx="400" cy="150" r="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="370" y="210" width="60" height="150" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M370 360 Q300 450 400 550 Q500 450 430 360" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 550 L300 600 L400 500 L500 600 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M370 230 L250 300 M430 230 L550 300" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M340 150 Q300 50 400 100 Q500 50 460 150" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="370" cy="280" r="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="430" cy="280" r="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  wizard: {
    name: 'Wizard 🧙‍♂️',
    category: 'fantasy',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M300 200 L400 50 L500 200 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <ellipse cx="400" cy="200" rx="120" ry="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="260" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M300 310 L500 310 L550 550 L250 550 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <line x1="200" y1="300" x2="200" y2="550" stroke="#000000" stroke-width="12" />
      <path d="M300 350 L200 400 M500 350 L600 400" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M350 260 Q400 400 450 260" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="200" cy="280" r="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  fairy: {
    name: 'Fairy 🧚‍♀️',
    category: 'fantasy',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <circle cx="400" cy="200" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="370" y="250" width="60" height="100" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M370 350 L300 450 L500 450 L430 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Wings -->
      <path d="M370 280 C200 100 100 300 370 320" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M370 320 C150 400 200 500 370 380" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M430 280 C600 100 700 300 430 320" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M430 320 C650 400 600 500 430 380" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <line x1="370" y1="270" x2="250" y2="300" stroke="#000000" stroke-width="12" />
      <line x1="430" y1="270" x2="550" y2="300" stroke="#000000" stroke-width="12" />
      <circle cx="550" cy="280" r="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  phoenix: {
    name: 'Phoenix 🦅',
    category: 'fantasy',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <ellipse cx="400" cy="300" rx="80" ry="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="400" cy="150" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M350 150 L250 120 L360 180 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Wings -->
      <path d="M320 300 C150 100 50 300 320 400" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M480 300 C650 100 750 300 480 400" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Tail -->
      <path d="M400 420 L300 600 L400 500 L500 600 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 100 L380 50 L400 80 L420 50 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  sea_monster: {
    name: 'Sea Monster 🦕',
    category: 'fantasy',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M100 400 Q200 200 300 400 T500 400 T700 400" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M200 400 Q250 100 300 400" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="250" cy="150" r="40" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 400 Q450 250 500 400" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M600 400 Q650 250 700 400" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M700 400 L750 350 L750 450 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="230" cy="140" r="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="270" cy="140" r="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  crystal_cave: {
    name: 'Crystal Cave 💎',
    category: 'fantasy',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M100 600 L150 200 L300 150 L450 200 L500 600 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M200 600 L250 350 L350 300 L400 600 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Crystals -->
      <path d="M300 600 L280 450 L300 400 L320 450 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M200 600 L170 400 L200 350 L230 400 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M400 600 L380 480 L400 430 L420 480 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M550 600 L500 300 L550 200 L600 300 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M650 600 L620 400 L650 350 L680 400 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  magic_potion: {
    name: 'Magic Potion 🧪',
    category: 'fantasy',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <path d="M350 200 L350 100 L450 100 L450 200 L550 450 A150 150 0 0 1 250 450 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="330" y="80" width="140" height="30" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="370" y="30" width="60" height="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M300 400 Q400 380 500 400" stroke="#000000" stroke-width="12" fill="none" />
      <circle cx="380" cy="450" r="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="450" cy="480" r="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="420" cy="350" r="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  astronaut: {
    name: 'Astronaut 👩‍🚀',
    category: 'people',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <circle cx="400" cy="180" r="80" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="150" width="100" height="60" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="320" y="280" width="160" height="180" rx="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="250" y="300" width="60" height="120" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="490" y="300" width="60" height="120" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="340" y="460" width="50" height="100" rx="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="410" y="460" width="50" height="100" rx="15" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="360" y="320" width="80" height="80" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  pirate: {
    name: 'Pirate 🏴‍☠️',
    category: 'people',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <circle cx="400" cy="200" r="60" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M320 180 L480 180 L450 100 L350 100 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="260" width="100" height="150" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="410" width="40" height="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="410" y="410" width="40" height="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M350 280 L280 350 L250 320 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M450 280 L520 350 L550 320 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Eyepatch -->
      <circle cx="380" cy="200" r="15" stroke="#000000" stroke-width="12" fill="#000000" class="fillable" />
      <line x1="340" y1="180" x2="400" y2="220" stroke="#000000" stroke-width="8" />
    </svg>`
  },
  princess: {
    name: 'Princess 👑',
    category: 'people',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <circle cx="400" cy="180" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Crown -->
      <path d="M360 130 L350 80 L380 100 L400 70 L420 100 L450 80 L440 130 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Dress -->
      <path d="M380 230 L420 230 L500 550 L300 550 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Hair -->
      <path d="M350 180 Q300 250 350 300" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M450 180 Q500 250 450 300" stroke="#000000" stroke-width="12" fill="none" />
      <path d="M380 230 L330 300 M420 230 L470 300" stroke="#000000" stroke-width="12" fill="none" />
      <circle cx="380" cy="170" r="5" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="420" cy="170" r="5" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M390 190 Q400 200 410 190" stroke="#000000" stroke-width="12" fill="none" />
    </svg>`
  },
  knight: {
    name: 'Knight ⚔️',
    category: 'people',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <rect x="350" y="120" width="100" height="100" rx="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="360" y="150" width="30" height="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="410" y="150" width="30" height="20" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="320" y="230" width="160" height="150" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="250" y="250" width="50" height="100" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="500" y="250" width="50" height="100" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="340" y="380" width="40" height="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="420" y="380" width="40" height="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="550" y="200" width="20" height="250" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M540 200 L580 200 L560 150 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  chef: {
    name: 'Chef 🧑‍🍳',
    category: 'people',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <circle cx="400" cy="220" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M360 170 C330 100 470 100 440 170 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="270" width="100" height="150" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="360" y="420" width="30" height="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="410" y="420" width="30" height="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M350 300 L280 350 L250 330 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M450 300 L520 350 L550 330 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="380" cy="210" r="5" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <circle cx="420" cy="210" r="5" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Spatula -->
      <rect x="530" y="300" width="10" height="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="510" y="270" width="50" height="30" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  },
  firefighter: {
    name: 'Firefighter 🧑‍🚒',
    category: 'people',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <circle cx="400" cy="220" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Helmet -->
      <path d="M330 200 C330 150 470 150 470 200 L490 220 L310 220 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="340" y="270" width="120" height="160" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="430" width="40" height="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="410" y="430" width="40" height="100" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M340 300 L260 380 L230 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M460 300 L540 380 L570 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Hose -->
      <path d="M550 360 Q650 450 500 550" stroke="#000000" stroke-width="20" fill="none" />
    </svg>`
  },
  superhero: {
    name: 'Superhero 🦸‍♀️',
    category: 'people',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <circle cx="400" cy="150" r="50" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="360" y="130" width="80" height="30" rx="10" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="350" y="210" width="100" height="150" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="360" y="360" width="30" height="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <rect x="410" y="360" width="30" height="120" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Cape -->
      <path d="M350 220 L200 450 L350 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M450 220 L600 450 L450 350 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Arms -->
      <path d="M350 250 L280 200 L250 230 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <path d="M450 250 L520 200 L550 230 Z" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
      <!-- Emblem -->
      <polygon points="400,240 430,270 400,300 370,270" stroke="#000000" stroke-width="12" fill="#ffffff" class="fillable" />
    </svg>`
  }
};
