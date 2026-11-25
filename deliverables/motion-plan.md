# Motion & Interactive Experience Plan — 杭州恒达减速机械厂

## 1. Selected Motion Scenes (4 Scenes)
1. **Narrative (MOT-HD-01) — Adaptive-Contrast 3-Slide Customer Banner Carousel** (/ Hero)
   - Smooth crossfade + subtle typographic stagger on slide change, per-slide safe-zone contrast adaptation, keyboard/touch/pause controls, static first frame under prefers-reduced-motion.
2. **Industry Signature (MOT-HD-02) — Three.js Real-Time Meshing 3D Worm Gear Speed Reducer Explorer** (/ & /manufacturing)
   - Procedural Three.js PBR 3D cylindrical worm shaft meshing at 90° with a machined bronze worm wheel inside switchable **NMRV (Aluminum)**, **WP (Zhenyu Green Cast Iron)**, and **WD (Army Yellow Cast Iron)** housings.
   - Interactive gear ratio slider (10:1 to 60:1) visibly modulating output wheel RPM vs input worm speed, cutaway housing toggle to inspect internal bronze meshing, pointer drag orbit, capped DPR (<= 2), automatic pause when offscreen or tab hidden, and crisp static render fallback under prefers-reduced-motion.
3. **Content (MOT-HD-03) — Progressive Viewport Reveal with Strict Zero-Premature-Completion Lifecycle** (All public routes)
   - Native IntersectionObserver (once: true locked ONLY upon real viewport entry; strictly NO 15-second or global timeout marking offscreen sections as revealed; progressive visibility fallback separated from hasAnimated state).
4. **Interaction (MOT-HD-04) — Industrial Micro-Feedback** (All public routes)
   - 4-6px card lift on hover, product detail gallery switcher, accessible FAQ accordion morph, navigation active indicators, and live 4-digit CAPTCHA RFQ form feedback.

## 2. External Fresh Candidates Evaluated (3 Candidates >= 2 Required)
- **EXT-HD-01**: Three.js r170+ procedural PBR gear meshing kinematics (helical worm + bronze wheel) — **ADOPTED** — Directly fulfills owner's Three.js directive and visually explains cylindrical worm reduction mechanics better than static CSS.
- **EXT-HD-02**: Native `IntersectionObserver` per-block viewport lifecycle — **ADOPTED** — Guarantees `VIS-MOTION-NO-PREMATURE-COMPLETION` compliance and zero-jank 390px performance.
- **EXT-HD-03**: Full-screen ambient WebGL particle mesh background — **REJECTED** — Distracts from technical product specifications and degrades mobile 390px readability.

## 3. Cooldown & Differentiation Check (vs `motion-usage-log.md`)
- Compared against recent verified builds (`qiuxintitanium.com` static titanium forging inspector, `shenghaopackaging.com` packaging box viewer, `longxiangglobal.com` charcoal process): our **kinematic 90° worm-and-wheel real-time meshing + gear ratio speed modulation + cutaway housing explorer** is functionally and visually distinct and tailored specifically to worm gear speed reducers.

## 4. Desktop, 390px & Reduced-Motion Readiness
- **Desktop (>= 1280px)**: PASS — Full 60fps capped DPR WebGL canvas, staggered 3-col cards, keyboard-accessible carousel & accordion.
- **Mobile (390px)**: PASS — Compact 320px WebGL viewport with touch drag, zero horizontal overflow, reduced travel distance (`12px`).
- **prefers-reduced-motion**: PASS — Disables auto-carousel, stops continuous worm rotation (renders crisp static cutaway frame), reveals all content immediately without opacity lock.
