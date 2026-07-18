export interface AppDictionary {
  hub: {
    title: string;
    subtitle: string;
    apps: {
      alphabet: string;
      numbers: string;
      spelling: string;
      shapes: string;
      coloring: string;
      video: string;
    };
  };
  alphabet: {
    title: string;
    subtitle: string;
    findLetter: string;
    success: string;
    phonicsToggle: string;
    caseToggle: string;
    switchWords: string;
    switchLetters: string;
    switchLowercase: string;
    switchUppercase: string;
  };
  numbers: {
    title: string;
    subtitle: string;
    countPrompt: string;
    patternPrompt: string;
    eggMathTitle: string;
    level1: string;
    level2: string;
    correctPattern: string;
    tryAgain: string;
    successCount: string;
  };
  spelling: {
    title: string;
    hintLabel: string;
    scoreLabel: string;
    successText: string;
    tryAgain: string;
    phoneticMap: Record<string, string>;
    words: {
      id: string;
      word: string;
      displayWord: string;
      image: string;
    }[];
  };
  video: {
    title: string;
    timeUp: string;
    letRest: string;
    timeLeft: string;
    seconds: string;
    locked: string;
    backBtn: string;
  };
}

export const idDict: AppDictionary = {
  hub: {
    title: "Hub Belajar Anak 🚀",
    subtitle: "Permainan seru untuk membantu anak belajar sambil bermain!",
    apps: {
      alphabet: "Belajar Abjad 🔤",
      numbers: "Belajar Angka 🔢",
      spelling: "Mengeja Kata ✏️",
      shapes: "Bentuk & Warna 📐",
      coloring: "Buku Mewarnai 🎨",
      video: "Waktu Video 📺"
    }
  },
  alphabet: {
    title: "Belajar Abjad! 🚀",
    subtitle: "Ketuk atau geser jari untuk menjelajah huruf! ✨",
    findLetter: "Cari huruf:",
    success: "Hebat! Kamu menemukan semua huruf!",
    phonicsToggle: "Ganti ke Phonics",
    caseToggle: "Ganti ke Huruf Kecil",
    switchWords: "Ganti ke Kata 🗣️",
    switchLetters: "Ganti ke Huruf 🔤",
    switchLowercase: "Ganti ke Huruf Kecil",
    switchUppercase: "Ganti ke Huruf Besar"
  },
  numbers: {
    title: "Belajar Angka! 🔢",
    subtitle: "Pilih permainan untuk menghitung, menulis, atau belajar matematika!",
    countPrompt: "Ketuk",
    patternPrompt: "Apa angka berikutnya?",
    eggMathTitle: "Matematika Telur!",
    level1: "Level 1: Mudah",
    level2: "Level 2: Tantangan",
    correctPattern: "Benar sekali! Jawabannya adalah",
    tryAgain: "Ups, coba lagi ya!",
    successCount: "Hebat! Kamu melakukannya!"
  },
  spelling: {
    title: "Mengeja Kata! ✏️",
    hintLabel: "Suara Kata 🔊",
    scoreLabel: "Skor",
    successText: "Luar biasa! Ejaanmu benar!",
    tryAgain: "Belum pas, coba susun lagi ya!",
    phoneticMap: {
      'A': 'ah',
      'B': 'beh',
      'C': 'ceh',
      'D': 'deh',
      'E': 'eh',
      'F': 'ef',
      'G': 'geh',
      'H': 'hah',
      'I': 'ih',
      'J': 'jeh',
      'K': 'kah',
      'L': 'el',
      'M': 'em',
      'N': 'en',
      'O': 'oh',
      'P': 'peh',
      'Q': 'ki',
      'R': 'er',
      'S': 'es',
      'T': 'teh',
      'U': 'uh',
      'V': 've',
      'W': 'we',
      'X': 'eks',
      'Y': 'ye',
      'Z': 'zet'
    },
    words: [
      { id: 'kucing', word: 'KUCING', displayWord: 'Kucing', image: '/assets/id/kucing.jpg' },
      { id: 'anjing', word: 'ANJING', displayWord: 'Anjing', image: '/assets/id/anjing.jpg' },
      { id: 'sapi', word: 'SAPI', displayWord: 'Sapi', image: '/assets/id/sapi.jpg' },
      { id: 'tikus', word: 'TIKUS', displayWord: 'Tikus', image: '/assets/id/tikus.jpg' },
      { id: 'matahari', word: 'MATAHARI', displayWord: 'Matahari', image: '/assets/id/matahari.jpg' },
      { id: 'buku', word: 'BUKU', displayWord: 'Buku', image: '/assets/id/buku.jpg' },
      { id: 'bola', word: 'BOLA', displayWord: 'Bola', image: '/assets/id/bola.jpg' },
      { id: 'meja', word: 'MEJA', displayWord: 'Meja', image: '/assets/id/meja.jpg' }
    ]
  },
  video: {
    title: "Waktu Video! 📺",
    timeUp: "Waktu Habis! ⏰",
    letRest: "Istirahat yuk, matanya perlu istirahat.",
    timeLeft: "Sisa waktu bermain:",
    seconds: "detik",
    locked: "Kunci Layar aktif.",
    backBtn: "Kembali"
  }
};

// Strictly-typed translation helper
export const t = <
  S extends keyof AppDictionary,
  K extends keyof AppDictionary[S]
>(section: S, key: K): AppDictionary[S][K] => {
  return idDict[section][key];
};
