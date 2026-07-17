# Kids Learning Hub 🚀

Welcome to the **Kids Learning Hub**! This is a simple, completely **ad-free**, and fully responsive web-based educational portal designed specifically for children to learn and play safely. It gathers multiple educational applications under a single centralized dashboard and can be installed as a **Progressive Web App (PWA)** on tablets, phones, and desktops.

---

## 🎮 Core Applications

The hub hosts five interactive educational games:

1.  **🔤 Alphabet Fun (`apps/alphabet`)**
    *   Interactive A–Z touch/drag grid.
    *   Supports toggling between Uppercase and Lowercase letters.
    *   Speech Synthesis using the browser's native Web Speech API.
    *   Dual speech modes: **Letter Name** (e.g., "Bee") or **Letter Name + Phonics** (e.g., "Bee... buh").
2.  **🔢 Numbers Fun (`apps/numbers`)**
    *   Covers basic counting, shape identification, number tracing, pattern recognition ("What comes next?"), and visual addition/subtraction.
    *   Features two difficulty levels (Easy & Hard).
3.  **✏️ Spelling Fun (`apps/spelling`)**
    *   Learn spelling through multiple sub-games: **Spell the Word** (arrange letter blocks), **Find the Missing Letter**, **Spell the Color**, and **Read & Match** (match simple sentences to visual cards).
4.  **📐 Shapes & Colors (`apps/shapes`)**
    *   Includes interactive shape grids, matching activities, sorting exercises, and silhouette puzzle matching games.
5.  **🎨 Coloring Book (`apps/coloring`)**
    *   A robust React-based drawing app with multiple modes: **Crayon Brush** (free-form drawing using a canvas mask) and **Tap to Fill** (fills SVGs directly).
    *   Includes 50+ categorized SVG templates (Animals, Vehicles, Foods, Outer Space).
    *   Color-change resilience that preserves coloring states across parent component re-renders.

---

## 🌟 Key Features

*   **🛡️ 100% Safe & Ad-Free:** Zero third-party ads, zero tracking scripts, and zero in-app purchases. Created specifically for grandchildren and young learners.
*   **📱 Mobile & Tablet Optimized:** Fully responsive grid layouts that adapt to both portrait and landscape screen orientations.
*   **💾 Progressive Web App (PWA):** Equipped with a service worker (`sw.js`) and manifest (`manifest.json`), allowing users to "Add to Home Screen" for a borderless, fullscreen native app experience.
*   **🎵 Background Music & Audio:** Built-in children's tracks (`apps/music`) and friendly audio feedback for correct/incorrect answers.

---

## 🏗️ Architecture & Development

The repository is organized as a multi-app monorepo.

```
Kids-Learning-Hub/
├── apps/
│   ├── alphabet/       # Static HTML/JS/CSS Alphabet game
│   ├── coloring/       # React + Vite compiled Coloring Book
│   ├── music/          # Audio files for background songs
│   ├── numbers/        # Static HTML/JS/CSS Numbers game
│   ├── shapes/         # Static HTML/JS/CSS Shapes game
│   ├── spelling/       # Static HTML/JS/CSS Spelling game
│   └── Helper-Scripts/ # Shared modules (speech, stickers, styles)
├── docs/               # Technical documents & guides
├── tests/              # Playwright browser integration tests
├── build.sh            # Packaging and distribution build pipeline
└── index.html          # Hub entrance portal (landing page)
```

### Running Locally

Since the applications utilize the **Web Speech API** (for speech synthesis) and **Service Workers** (for offline PWA capabilities), the browser requires them to be served from a secure origin or local server (`http://localhost`):

1.  **Start a Local Server:**
    *   Using Python:
        ```bash
        python -m http.server 8000
        ```
    *   Using Node (`serve`):
        ```bash
        npx serve .
        ```
2.  **Access the Hub:** Open your browser and navigate to `http://localhost:8000`.

### Build & Compilation (React Coloring Book)

If you modify the Coloring Book app under `apps/coloring`, you must compile it:

```bash
# Navigate to the coloring app directory
cd apps/coloring

# Install dependencies and build
npm install
npm run build
```

Alternatively, you can compile and package the entire portal using the root build script (which compiles the React coloring app and copies all static assets into a production-ready `/dist` folder):

```bash
# Run build pipeline
chmod +x build.sh
./build.sh
```

---

## 🧪 Quality Assurance (Automated Tests)

This repository includes a comprehensive automated browser testing suite powered by [Playwright](https://playwright.dev/). It validates multi-layered canvas drawing (`CanvasMask.jsx`), SVG element manipulation (`TapToFill.jsx`), network offline caching (`sw.js`), and audio playback events.

*   **Install Test Runner:**
    ```bash
    npm install
    ```
*   **Run Integration Tests:**
    ```bash
    npm test
    ```
*   **Run in Playwright UI Mode:**
    ```bash
    npm run test:ui
    ```

For detailed information regarding test strategies and verification methods, read the [Automated Testing Guide](docs/automated_testing_guide.md).

---

## 🤝 Credits & Base Repositories

This project builds upon the hard work of the open-source community:

*   **Base Repository:** This project was originally cloned and adapted from the excellent **[nuken/Kids-Learning-Hub](https://github.com/nuken/Kids-Learning-Hub)** repository. We extend our immense gratitude to its original creator, **nuken**, and all its contributors for designing the original Alphabet, Numbers, Shapes, Spelling baseline applications, and central navigation concept.
*   **Key Libraries:**
    *   [React](https://react.dev) & [Vite](https://vite.dev) (Powering the coloring sub-app).
    *   [Playwright](https://playwright.dev) (Enabling robust E2E test suites).
    *   [FontAwesome](https://fontawesome.com) (Icons used across sub-pages and floating home navigation).
    *   [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) (Native browser text-to-speech).
