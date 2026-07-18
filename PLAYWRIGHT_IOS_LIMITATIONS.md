# Playwright iOS/iPad Emulation Limitations

While Playwright's WebKit desktop engine provides excellent coverage for layout and styling verification, it possesses several critical testing gaps compared to a physical iOS/iPad Safari environment. Below is a detailed breakdown of these limitations.

---

## 1. Hardware & OS-Level Autoplay Restrictions
*   **Emulated Behavior**: Playwright configures Chromium/WebKit with flags like `--autoplay-policy=no-user-gesture-required`. This allows audio elements and `AudioContext` streams to play immediately.
*   **Physical iPad Safari Reality**: iOS Safari strictly blocks all programmatic audio until an explicit, synchronous touch event (`touchstart` or `click`) is fired. Asynchronous calls inside fetch responses or delayed timeouts will trigger silent failures. Playwright cannot detect these autoplay blocker bugs.

## 2. Native Safari Gesture and Viewport Physics
*   **Emulated Behavior**: Playwright translates pointer coordinates into simulated tap coordinates.
*   **Physical iPad Safari Reality**: iOS enforces proprietary scrolling physics:
    *   **Elastic Scroll-Bounce**: Pulling past scroll boundaries triggers rubber-banding, which can displace absolute-positioned canvas containers.
    *   **Safari Toolbar Resizing**: Swiping or scrolling down shrinks or hides Safari's top/bottom navigation chrome, causing spontaneous shifts in viewport heights (`100vh`).
    *   **Multi-touch Pinch & Scale**: System-level zoom overlays bypass standard DOM preventDefault handlers unless the CSS `touch-action: none` rules are perfect.

## 3. PWA System Dialogs & App Launch Lifecycles
*   **Emulated Behavior**: Playwright reads the manifest structure and service worker cache responses.
*   **Physical iPad Safari Reality**:
    *   **"Add to Home Screen" Prompt**: The native action sheet prompting the child to pin the app is managed strictly by iPadOS. Playwright cannot test if this prompt renders or triggers.
    *   **Status Bar Blending (`translucent`)**: The status bar styling (`black-translucent` vs `default`) and the viewport padding (`safe-area-inset-top`) can only be visually validated on a real device.
    *   **Offline Standalone Launches**: Running as a pinned standalone app uses an isolated WebKit container with different caching policies than the standard Safari tab.

## 4. Hardware Constraints & Tab Memory Crashing
*   **Emulated Behavior**: Playwright runs the browser on desktop hardware with ample RAM and GPU assets.
*   **Physical iPad Safari Reality**: iPads (especially older school models) have extremely tight RAM limits. Heavy HTML5 `<canvas>` elements, multiple image nodes, or uncollected Konva stages will trigger silent WebKit out-of-memory tab crashes. Playwright will execute these scripts successfully on a PC, hiding critical hardware crashes.
