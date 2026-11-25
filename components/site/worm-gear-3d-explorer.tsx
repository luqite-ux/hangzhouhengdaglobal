'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Eye, Pause, Play, RotateCcw, Sliders } from 'lucide-react'
import { cn } from '@/lib/utils'

type SeriesKey = 'NMRV' | 'WP' | 'WD'

interface SeriesSpec {
  key: SeriesKey
  title: string
  subtitle: string
  housingColor: number
  metalness: number
  roughness: number
  accentColor: number
  finishLabel: string
  materialLabel: string
  mountingLabel: string
}

const SERIES_SPECS: Record<SeriesKey, SeriesSpec> = {
  NMRV: {
    key: 'NMRV',
    title: 'NMRV Series',
    subtitle: 'Silver Die-Cast Aluminum Square Housing',
    housingColor: 0xcbd5e1,
    metalness: 0.72,
    roughness: 0.32,
    accentColor: 0xeab308,
    finishLabel: 'Silver',
    materialLabel: 'Die-Cast Aluminum Alloy',
    mountingLabel: 'Compact Right-Angle Multi-Face',
  },
  WP: {
    key: 'WP',
    title: 'WP Series (WPA/WPO/WPX/WPS)',
    subtitle: 'Zhenyu-Green Heavy-Duty Cast-Iron Housing',
    housingColor: 0x3f5e42,
    metalness: 0.45,
    roughness: 0.52,
    accentColor: 0x94a3b8,
    finishLabel: 'Zhenyu Green',
    materialLabel: 'Rigid Cast Iron',
    mountingLabel: 'WPA / WPO / WPX / WPS',
  },
  WD: {
    key: 'WD',
    title: 'WD Series',
    subtitle: 'Army-Yellow Cylindrical Worm Cast-Iron Housing',
    housingColor: 0x5c6b3a,
    metalness: 0.42,
    roughness: 0.56,
    accentColor: 0xfacc15,
    finishLabel: 'Army Yellow / Olive',
    materialLabel: 'Rigid Cast Iron',
    mountingLabel: 'Foot-Mounted Cylindrical Worm',
  },
}

export function WormGear3DExplorer() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [series, setSeries] = useState<SeriesKey>('NMRV')
  const [ratio, setRatio] = useState<number>(20)
  const [cutaway, setCutaway] = useState<boolean>(true)
  const [playing, setPlaying] = useState<boolean>(true)
  const [reducedMotion, setReducedMotion] = useState<boolean>(false)
  const [webglError, setWebglError] = useState<boolean>(false)

  const stateRef = useRef({
    series: 'NMRV' as SeriesKey,
    ratio: 20,
    cutaway: true,
    playing: true,
    rotY: 0.52,
    rotX: 0.28,
    dragging: false,
    lastX: 0,
    lastY: 0,
    inView: true,
    resetRequested: false,
  })

  useEffect(() => {
    stateRef.current.series = series
    stateRef.current.ratio = ratio
    stateRef.current.cutaway = cutaway
    stateRef.current.playing = playing
  }, [series, ratio, cutaway, playing])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReducedMotion(true)
      setPlaying(false)
      stateRef.current.playing = false
    }
  }, [])

  useEffect(() => {
    const host = containerRef.current
    if (!host) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      setWebglError(true)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(host.clientWidth || 640, host.clientHeight || 420)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    host.innerHTML = ''
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      36,
      (host.clientWidth || 640) / (host.clientHeight || 420),
      0.1,
      100,
    )
    camera.position.set(0, 1.35, 6.4)
    camera.lookAt(0, 0.05, 0)

    // Studio three-point industrial lighting
    const hemi = new THREE.HemisphereLight(0xf8fafc, 0x1e293b, 1.15)
    scene.add(hemi)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(5, 7, 6)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.95)
    fillLight.position.set(-6, 3, 4)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xfde68a, 0.75)
    rimLight.position.set(0, -4, -6)
    scene.add(rimLight)

    // Root assembly for orbit drag
    const assembly = new THREE.Group()
    scene.add(assembly)

    // Subtle technical base plate grid
    const grid = new THREE.GridHelper(6.5, 16, 0x334155, 0x1e293b)
    grid.position.y = -1.65
    assembly.add(grid)

    // --- 1. Hardened Steel Helical Worm Shaft (rotates around X axis) ---
    const wormGroup = new THREE.Group()
    wormGroup.position.set(0, -0.78, 0)
    assembly.add(wormGroup)

    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.22,
    })
    const darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      metalness: 0.82,
      roughness: 0.35,
    })

    // Main shaft cylinder along X
    const shaftGeo = new THREE.CylinderGeometry(0.24, 0.24, 3.8, 28)
    shaftGeo.rotateZ(Math.PI / 2)
    const shaftMesh = new THREE.Mesh(shaftGeo, steelMat)
    wormGroup.add(shaftMesh)

    // Worm thread core & helical ribs
    const threadCount = 8
    for (let i = 0; i < threadCount; i++) {
      const x = -0.84 + i * 0.24
      const ringGeo = new THREE.TorusGeometry(0.32, 0.085, 14, 32)
      ringGeo.rotateY(Math.PI / 2)
      ringGeo.rotateX(0.16) // subtle helix lead angle
      const ring = new THREE.Mesh(ringGeo, steelMat)
      ring.position.x = x
      wormGroup.add(ring)
    }

    // Input flange coupling on left end
    const couplingGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.26, 24)
    couplingGeo.rotateZ(Math.PI / 2)
    const coupling = new THREE.Mesh(couplingGeo, darkSteelMat)
    coupling.position.x = -1.78
    wormGroup.add(coupling)

    // --- 2. Precision Machined Bronze Worm Wheel (rotates around Z axis at 90 degrees) ---
    const wheelGroup = new THREE.Group()
    wheelGroup.position.set(0, 0.42, 0)
    assembly.add(wheelGroup)

    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0xd4943a,
      metalness: 0.86,
      roughness: 0.26,
    })
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.78,
      roughness: 0.32,
    })

    // Bronze gear rim
    const rimGeo = new THREE.CylinderGeometry(0.92, 0.92, 0.44, 40)
    rimGeo.rotateX(Math.PI / 2)
    wheelGroup.add(new THREE.Mesh(rimGeo, bronzeMat))

    // 28 precision outer gear teeth
    const teethCount = 28
    const toothGeo = new THREE.BoxGeometry(0.11, 0.16, 0.46)
    for (let i = 0; i < teethCount; i++) {
      const angle = (i / teethCount) * Math.PI * 2
      const tooth = new THREE.Mesh(toothGeo, bronzeMat)
      tooth.position.set(Math.cos(angle) * 0.96, Math.sin(angle) * 0.96, 0)
      tooth.rotation.z = angle + Math.PI / 2
      wheelGroup.add(tooth)
    }

    // Inner cast hub + hollow output bore + visual rotation marker
    const hubGeo = new THREE.CylinderGeometry(0.56, 0.56, 0.52, 32)
    hubGeo.rotateX(Math.PI / 2)
    wheelGroup.add(new THREE.Mesh(hubGeo, hubMat))

    const boreGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.58, 24)
    boreGeo.rotateX(Math.PI / 2)
    wheelGroup.add(new THREE.Mesh(boreGeo, new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 })))

    // Keyway / crimson indicator bar on hub so speed reduction is visually obvious
    const indicatorMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, metalness: 0.3, roughness: 0.4 })
    const indicator = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.09, 0.56), indicatorMat)
    indicator.position.set(0.32, 0, 0)
    wheelGroup.add(indicator)

    // --- 3. Switchable Industrial Housing Shell (Cutaway / Solid) ---
    const housingGroup = new THREE.Group()
    assembly.add(housingGroup)

    const housingMat = new THREE.MeshStandardMaterial({
      color: SERIES_SPECS.NMRV.housingColor,
      metalness: SERIES_SPECS.NMRV.metalness,
      roughness: SERIES_SPECS.NMRV.roughness,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    })

    const accentMat = new THREE.MeshStandardMaterial({
      color: SERIES_SPECS.NMRV.accentColor,
      metalness: 0.25,
      roughness: 0.45,
    })

    // Main square/industrial housing body
    const bodyBox = new THREE.Mesh(new THREE.BoxGeometry(2.35, 2.55, 1.55), housingMat)
    bodyBox.position.set(0, 0.02, 0)
    housingGroup.add(bodyBox)

    // Mounting feet
    const footGeo = new THREE.BoxGeometry(2.75, 0.26, 1.85)
    const feet = new THREE.Mesh(footGeo, housingMat)
    feet.position.set(0, -1.38, 0)
    housingGroup.add(feet)

    // Cooling fins on right side
    for (let i = -3; i <= 3; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.75, 0.08), housingMat)
      fin.position.set(1.22, 0.12, i * 0.2)
      housingGroup.add(fin)
    }

    // Input motor flange collar
    const flangeGeo = new THREE.CylinderGeometry(0.86, 0.86, 0.16, 32)
    flangeGeo.rotateZ(Math.PI / 2)
    const flange = new THREE.Mesh(flangeGeo, housingMat)
    flange.position.set(-1.32, -0.78, 0)
    housingGroup.add(flange)

    // Top accent cap / breather plug
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.18, 20), accentMat)
    cap.position.set(0, 1.38, 0)
    housingGroup.add(cap)

    // Crisp technical wireframe overlay for precision mechanical read
    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2.36, 2.56, 1.56)),
      new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.35 }),
    )
    wire.position.set(0, 0.02, 0)
    housingGroup.add(wire)

    // Pointer orbit controls
    const onPointerDown = (e: PointerEvent) => {
      stateRef.current.dragging = true
      stateRef.current.lastX = e.clientX
      stateRef.current.lastY = e.clientY
      host.setPointerCapture?.(e.pointerId)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!stateRef.current.dragging) return
      const dx = e.clientX - stateRef.current.lastX
      const dy = e.clientY - stateRef.current.lastY
      stateRef.current.lastX = e.clientX
      stateRef.current.lastY = e.clientY
      stateRef.current.rotY += dx * 0.008
      stateRef.current.rotX = Math.max(-0.85, Math.min(0.85, stateRef.current.rotX + dy * 0.008))
    }
    const onPointerUp = () => {
      stateRef.current.dragging = false
    }

    host.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    // Offscreen pause observer
    const io = new IntersectionObserver(
      (entries) => {
        stateRef.current.inView = entries.some((entry) => entry.isIntersecting)
      },
      { threshold: 0.05 },
    )
    io.observe(host)

    // Resize observer
    const ro = new ResizeObserver(() => {
      if (!host) return
      const w = host.clientWidth || 640
      const h = host.clientHeight || 420
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    ro.observe(host)

    let raf = 0
    let lastTime = performance.now()
    let appliedSeries: SeriesKey = 'NMRV'

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      const st = stateRef.current
      if (st.resetRequested) {
        st.rotY = 0.52
        st.rotX = 0.28
        st.resetRequested = false
      }

      if (appliedSeries !== st.series) {
        const spec = SERIES_SPECS[st.series]
        housingMat.color.setHex(spec.housingColor)
        housingMat.metalness = spec.metalness
        housingMat.roughness = spec.roughness
        accentMat.color.setHex(spec.accentColor)
        appliedSeries = st.series
      }

      const targetOpacity = st.cutaway ? 0.26 : 0.94
      housingMat.opacity += (targetOpacity - housingMat.opacity) * 0.14
      housingMat.depthWrite = !st.cutaway

      if (!st.inView || document.hidden) return

      if (st.playing) {
        const wormRadPerSec = 5.2
        wormGroup.rotation.x += wormRadPerSec * dt
        // Real kinematic ratio: wheel angular velocity = worm angular velocity / ratio
        wheelGroup.rotation.z -= (wormRadPerSec / (st.ratio / 4)) * dt
        if (!st.dragging) {
          st.rotY += 0.12 * dt
        }
      }

      assembly.rotation.y += (st.rotY - assembly.rotation.y) * 0.12
      assembly.rotation.x += (st.rotX - assembly.rotation.x) * 0.12
      renderer.render(scene, camera)
    }

    // Initial synchronous render for static reduced-motion view
    assembly.rotation.y = stateRef.current.rotY
    assembly.rotation.x = stateRef.current.rotX
    renderer.render(scene, camera)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      host.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      renderer.dispose()
    }
  }, [])

  const activeSpec = SERIES_SPECS[series]
  const inputRpm = 1400
  const outputRpm = Math.round((inputRpm / ratio) * 10) / 10

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-navy text-white shadow-xl">
      <div className="grid lg:grid-cols-12">
        {/* Left: Interactive Three.js WebGL Stage */}
        <div className="relative flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-3.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-primary" aria-hidden="true" />
              <span className="font-mono uppercase tracking-wider text-slate-300">
                Interactive 3D Worm Gear Kinematics · Three.js
              </span>
            </div>
            <span className="text-slate-400">Drag to orbit 360°</span>
          </div>

          <div
            ref={containerRef}
            className="relative h-[320px] w-full cursor-grab active:cursor-grabbing sm:h-[400px] lg:h-[440px]"
            aria-label="Interactive 3D cylindrical worm gear speed reducer meshing demonstrator"
          >
            {webglError ? (
              <div className="flex h-full items-center justify-center p-8 text-center text-sm text-slate-300">
                Interactive 3D preview requires WebGL. Use the series controls to compare NMRV, WP, and WD configurations.
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-slate-950/60 px-5 py-3 text-xs">
            <div className="flex items-center gap-4 font-mono tabular">
              <span className="text-slate-400">
                Input: <strong className="text-white">{inputRpm} RPM</strong>
              </span>
              <span className="text-slate-400">
                Ratio: <strong className="text-amber-400">{ratio}:1</strong>
              </span>
              <span className="text-slate-400">
                Output: <strong className="text-emerald-400">{outputRpm} RPM</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCutaway((v) => !v)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition',
                  cutaway
                    ? 'border-primary bg-primary/20 text-white'
                    : 'border-white/15 bg-white/5 text-slate-300 hover:bg-white/10',
                )}
              >
                <Eye className="size-3.5" aria-hidden="true" />
                {cutaway ? 'Cutaway On' : 'Solid Housing'}
              </button>
              <button
                type="button"
                onClick={() => setPlaying((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
                aria-label={playing ? 'Pause rotation' : 'Resume rotation'}
              >
                {playing ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
                {playing ? 'Pause' : 'Play'}
              </button>
              <button
                type="button"
                onClick={() => {
                  stateRef.current.resetRequested = true
                }}
                className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/10"
                aria-label="Reset 3D camera angle"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Engineering Series & Ratio Control Panel */}
        <div className="flex flex-col justify-between border-t border-white/10 bg-slate-900/95 p-6 sm:p-8 lg:col-span-5 lg:border-l lg:border-t-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              90° Right-Angle Reduction
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-white">
              Inspect Housing &amp; Meshing
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Switch between our three cylindrical worm gear series and adjust the reduction ratio to see how the hardened steel worm drives the bronze worm wheel at 90 degrees.
            </p>

            {/* Series switcher */}
            <div className="mt-6">
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Select Reducer Series
              </span>
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                {(['NMRV', 'WP', 'WD'] as SeriesKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSeries(key)}
                    className={cn(
                      'rounded-lg border px-3 py-2.5 text-sm font-semibold transition',
                      series === key
                        ? 'border-primary bg-primary text-white shadow-sm'
                        : 'border-white/15 bg-white/5 text-slate-200 hover:bg-white/10',
                    )}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            {/* Ratio slider */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-slate-400">
                  <Sliders className="size-3.5" aria-hidden="true" />
                  Speed Reduction Ratio
                </span>
                <span className="font-mono font-semibold text-amber-400 tabular">{ratio}:1</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={ratio}
                onChange={(e) => setRatio(Number(e.target.value))}
                aria-label="Speed reduction ratio"
                className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-primary"
              />
              <div className="mt-1 flex justify-between font-mono text-[11px] text-slate-500">
                <span>10:1 Faster</span>
                <span>30:1 Balanced</span>
                <span>60:1 High Torque</span>
              </div>
            </div>

            {/* Active Series Readout */}
            <dl className="mt-6 space-y-2.5 rounded-xl border border-white/10 bg-white/5 p-4 text-xs">
              <div className="flex justify-between gap-3">
                <dt className="text-slate-400">Selected Family</dt>
                <dd className="font-medium text-white text-right">{activeSpec.title}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate-400">Housing Material</dt>
                <dd className="font-medium text-white text-right">{activeSpec.materialLabel}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate-400">Standard Finish</dt>
                <dd className="font-medium text-white text-right">{activeSpec.finishLabel}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-slate-400">Mounting</dt>
                <dd className="font-medium text-white text-right">{activeSpec.mountingLabel}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
            <span>{reducedMotion ? 'Static cutaway mode (reduced motion)' : 'Real-time WebGL kinematics'}</span>
            <a
              href={`/products/${series === 'NMRV' ? 'nmrv-series-worm-gear-reducer' : series === 'WP' ? 'wp-series-worm-gear-reducer' : 'wd-worm-gear-reducer'}`}
              className="font-semibold text-white underline-offset-4 hover:text-primary hover:underline"
            >
              View {series} Specs &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
