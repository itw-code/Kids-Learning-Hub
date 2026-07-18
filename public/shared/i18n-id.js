/**
 * shared/i18n-id.js
 * Global I18n Dictionary for Bahasa Indonesia
 * 
 * Provides centralized text resources, speech synthesis pronunciations, 
 * and user-facing hints for Vanilla JS sub-apps.
 */

window.I18N = {
  locale: 'id-ID',
  general: {
    back: 'Kembali',
    stars: 'Bintang',
    congratulations: 'Selamat! 🎉',
    excellent: 'Hebat! 👍',
    smart: 'Pintar! 🧠',
    tryAgain: 'Coba lagi yuk!',
    score: 'Skor Anda:',
    correct: 'Benar!',
    wrong: 'Salah, coba lagi!'
  },
  
  // Alphabet Game I18n keys
  alphabet: {
    title: 'Buku Huruf',
    subtitle: 'Sentuh huruf untuk mendengar bunyinya!',
    instruction: 'Sentuh huruf di bawah ini:',
    backButton: 'Kembali ke Menu',
    phrases: {
      A: 'A untuk Apel',
      B: 'B untuk Bola',
      C: 'C untuk Cacing',
      D: 'D untuk Domba',
      E: 'E pour Elang',
      F: 'F untuk Foto',
      G: 'G untuk Gajah',
      H: 'H untuk Harimau',
      I: 'I untuk Ikan',
      J: 'J untuk Jerapah',
      K: 'K untuk Kucing',
      L: 'L untuk Lemon',
      M: 'M untuk Monyet',
      N: 'N untuk Nyamuk',
      O: 'O untuk Obat',
      P: 'P untuk Pisang',
      Q: 'Q untuk Quran',
      R: 'R untuk Rumah',
      S: 'S untuk Singa',
      T: 'T untuk Topi',
      U: 'U untuk Ular',
      V: 'V untuk Vas',
      W: 'W untuk Wortel',
      X: 'X untuk Xylophone',
      Y: 'Y untuk Yoyo',
      Z: 'Z untuk Zebra'
    }
  },

  // Numbers Game I18n keys
  numbers: {
    title: 'Belajar Angka',
    subtitle: 'Berapa banyak benda yang kamu lihat?',
    countInstruction: 'Hitung benda-benda ini dan klik angka yang cocok!',
    correctAnswer: 'Luar biasa! Jawabanmu benar!',
    wrongAnswer: 'Ups! Kurang tepat. Coba hitung sekali lagi.',
    nextLevel: 'Pertanyaan berikutnya!'
  },

  // Spelling Game I18n keys
  spelling: {
    title: 'Eja Kata',
    subtitle: 'Geser huruf ke tempat yang tepat untuk mengeja kata!',
    helpText: 'Dengarkan petunjuk suara lalu susun hurufnya.',
    words: {
      bed: { display: 'KASUR', phonetic: 'k a s u r', audioHint: 'Kasur. Tempat untuk tidur.' },
      boy: { display: 'ANAK', phonetic: 'a n a k', audioHint: 'Anak laki-laki.' },
      cat: { display: 'KUCING', phonetic: 'k u c i n g', audioHint: 'Kucing. Binatang peliharaan bersuara meong.' },
      cow: { display: 'SAPI', phonetic: 's a p i', audioHint: 'Sapi. Binatang yang menghasilkan susu.' },
      dog: { display: 'ANJING', phonetic: 'a n j i n g', audioHint: 'Anngjing. Binatang setia bersuara guk guk.' },
      girl: { display: 'Gadis', phonetic: 'g a d i s', audioHint: 'Gadis. Anak perempuan.' },
      mouse: { display: 'TIKUS', phonetic: 't i k u s', audioHint: 'Tikus. Binatang pengerat kecil.' },
      sun: { display: 'MATAHARI', phonetic: 'm a t a h a r i', audioHint: 'Matahari. Sumber cahaya di siang hari.' }
    }
  },

  // Shapes Game I18n keys
  shapes: {
    title: 'Bentuk & Warna',
    subtitle: 'Pasangkan bentuk ke lubang yang sesuai!',
    instruction: 'Geser bentuk ke bayangan yang cocok.',
    names: {
      circle: 'Lingkaran',
      square: 'Persegi',
      triangle: 'Segitiga',
      hexagon: 'Segienam',
      star: 'Bintang'
    },
    colors: {
      red: 'Merah',
      blue: 'Biru',
      green: 'Hijau',
      yellow: 'Kuning',
      purple: 'Ungu',
      orange: 'Jingga'
    }
  }
};
