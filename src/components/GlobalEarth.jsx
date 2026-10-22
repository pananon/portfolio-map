import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { JOURNEY_DATA } from '../data/journeyData';
import { CHAPTER_META, SHARED_CITIES, segmentProgress } from '../data/journeyGeo';
import { useReducedMotion } from '../lib/motion';

const RADIUS = 3.5;
const BONE = '#efe9dd';
const SIGNAL = '#ff5a36';
// Specular map from the three.js examples (NASA-derived), served locally.
const GEOGRAPHY_URL = `${import.meta.env.BASE_URL}textures/earth-specular-2048.jpg`;

export const latLonToVector3 = (lat, lon, radius = RADIUS) => {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
};

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 positionView = modelViewMatrix * vec4(position, 1.0);
    vPosition = positionView.xyz;
    gl_Position = projectionMatrix * positionView;
  }
`;
// Ink oceans, warm graphite land, and a bone rim: the globe reads like a printed survey plate.
const fragmentShader = `
  uniform sampler2D geography;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    float land = 1.0 - texture2D(geography, vUv).r;
    vec3 normal = normalize(vNormal);
    float light = 0.5 + 0.5 * max(dot(normal, normalize(vec3(-0.6, 0.8, 1.0))), 0.0);
    vec3 ocean = vec3(0.030, 0.036, 0.038);
    vec3 terrain = vec3(0.290, 0.272, 0.240);
    vec3 color = mix(ocean, terrain, smoothstep(0.08, 0.75, land)) * light;
    float rim = pow(1.0 - max(dot(normal, normalize(-vPosition)), 0.0), 3.0);
    color += vec3(0.42, 0.37, 0.31) * rim * 0.45;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const hasWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

function Geography() {
  const texture = useLoader(THREE.TextureLoader, GEOGRAPHY_URL);
  const uniforms = useMemo(() => ({ geography: { value: texture } }), [texture]);
  return <mesh><sphereGeometry args={[RADIUS, 96, 64]} /><shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} /></mesh>;
}

function AtlasGrid() {
  const lines = useMemo(() => {
    const result = [];
    for (let lat = -60; lat <= 60; lat += 30) result.push(Array.from({ length: 121 }, (_, i) => latLonToVector3(lat, i * 3 - 180, RADIUS + 0.006)));
    for (let lon = -180; lon < 180; lon += 30) result.push(Array.from({ length: 61 }, (_, i) => latLonToVector3(i * 3 - 90, lon, RADIUS + 0.006)));
    return result;
  }, []);
  return lines.map((points, index) => <Line key={index} points={points} color={BONE} transparent opacity={0.07} lineWidth={0.6} />);
}

const N = JOURNEY_DATA.length;
const SEGMENT_POINTS = 64;
const UP = new THREE.Vector3(0, 1, 0);
const COLOR_SIGNAL = new THREE.Color(SIGNAL);
const COLOR_BONE = new THREE.Color(BONE);

// Precomputed so the render loop allocates nothing per frame.
const PINS = CHAPTER_META.map(meta => latLonToVector3(...meta.pin).normalize());

// Arc from chapter k's pin to chapter k+1's pin; short same-city hops stay low.
const ROUTES = JOURNEY_DATA.slice(1, -1).map((_, offset) => {
  const index = offset + 1;
  const start = PINS[index];
  const end = PINS[index + 1];
  const height = Math.min(0.26, start.angleTo(end) * 1.3);
  const points = Array.from({ length: SEGMENT_POINTS }, (_, i) => {
    const t = i / (SEGMENT_POINTS - 1);
    return start.clone().lerp(end, t).normalize().multiplyScalar(RADIUS + 0.02 + Math.sin(t * Math.PI) * height);
  });
  return { index, points };
});

const progressOf = (progress, activeStep, layout, reducedMotion) => {
  if (layout === 'hero') return 0;
  return reducedMotion ? activeStep : progress.current;
};

// Routes draw themselves as you scroll: the onward line grows through the second half of
// each chapter, with a marker at its tip. Travelled routes stay as a quiet trail.
function Routes({ activeStep, layout, progress, reducedMotion }) {
  const lines = useRef([]);
  const marker = useRef();
  useFrame(() => {
    const p = progressOf(progress, activeStep, layout, reducedMotion);
    let tip = null;
    ROUTES.forEach(({ index, points }, i) => {
      const line = lines.current[i];
      if (!line) return;
      const f = segmentProgress(p, index);
      line.geometry.instanceCount = Math.round(f * (SEGMENT_POINTS - 1));
      const travelling = f > 0 && f < 1;
      const arrived = f === 1 && index + 1 === activeStep;
      const lit = travelling || arrived;
      line.material.color.copy(lit ? COLOR_SIGNAL : COLOR_BONE);
      line.material.opacity = lit ? 0.95 : 0.42;
      line.material.linewidth = lit ? 2 : 1;
      if (travelling) tip = points[Math.round(f * (SEGMENT_POINTS - 1))];
    });
    if (marker.current) {
      marker.current.visible = Boolean(tip);
      if (tip) marker.current.position.copy(tip);
    }
  });
  return <group>
    {ROUTES.map(({ index, points }) => <Line key={`preview-${index}`} points={points} color={BONE} lineWidth={0.6} transparent opacity={0.08} />)}
    {ROUTES.map(({ index, points }, i) => <Line key={index} ref={el => { lines.current[i] = el; }} points={points} color={BONE} lineWidth={1} transparent opacity={0.42} />)}
    <mesh ref={marker} visible={false}><sphereGeometry args={[0.03, 16, 16]} /><meshBasicMaterial color="#fff4ea" /></mesh>
  </group>;
}

// A city with several chapters keeps a small centre dot joined to each chapter's pin.
function SharedCities() {
  const lines = useMemo(() => SHARED_CITIES.flatMap(({ city, pins }) => {
    const center = latLonToVector3(...city, RADIUS + 0.012);
    return pins.map(pin => [center, latLonToVector3(...pin, RADIUS + 0.012)]);
  }), []);
  return <group>
    {SHARED_CITIES.map(({ city }) => <mesh key={city.join(',')} position={latLonToVector3(...city, RADIUS + 0.012)}><sphereGeometry args={[0.009, 12, 12]} /><meshBasicMaterial color={BONE} transparent opacity={0.5} /></mesh>)}
    {lines.map((points, i) => <Line key={i} points={points} color={BONE} lineWidth={0.6} transparent opacity={0.28} />)}
  </group>;
}

function Pin({ index, active, visited, reducedMotion, onSelect, drag }) {
  const ring = useRef();
  const meta = CHAPTER_META[index];
  const item = JOURNEY_DATA[index];
  const position = useMemo(() => latLonToVector3(...meta.pin, RADIUS + 0.025), [meta]);
  const quaternion = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), position.clone().normalize()), [position]);
  useFrame(({ clock }) => {
    if (ring.current) ring.current.scale.setScalar(reducedMotion ? 1 : 1 + Math.sin(clock.elapsedTime * 1.6) * 0.14);
  });
  const select = event => {
    event.stopPropagation();
    if (drag.current.moved < 6) onSelect?.(index);
  };
  return <group position={position} quaternion={quaternion}>
    <mesh><sphereGeometry args={[active ? 0.026 : 0.015, 16, 16]} /><meshBasicMaterial color={active ? '#fff4ea' : visited ? '#d8d1c3' : '#7f796e'} /></mesh>
    {/* Generous invisible hit target so pins are easy to click or tap. */}
    <mesh
      onClick={select}
      onPointerOver={event => { event.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = ''; }}
    >
      <sphereGeometry args={[0.075, 12, 12]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
    {active && <mesh ref={ring}><ringGeometry args={[0.05, 0.056, 48]} /><meshBasicMaterial color={SIGNAL} transparent opacity={0.85} side={THREE.DoubleSide} /></mesh>}
    {active && <Html position={[0, 0.12, 0.02]} center style={{ pointerEvents: 'none' }}>
      <div className="atlas-location">{item.location}<span>{meta.cityCount > 1 ? `${meta.cityIndex + 1} of ${meta.cityCount} here` : item.year}</span></div>
    </Html>}
  </group>;
}

function Globe({ activeStep, layout, progress, reducedMotion, onSelect, drag }) {
  return <group>
    <Suspense fallback={<mesh><sphereGeometry args={[RADIUS, 64, 48]} /><meshBasicMaterial color="#1a1c1b" /></mesh>}><Geography /></Suspense>
    <AtlasGrid />
    <SharedCities />
    <Routes activeStep={activeStep} layout={layout} progress={progress} reducedMotion={reducedMotion} />
    {JOURNEY_DATA.slice(1).map((item, offset) => {
      const index = offset + 1;
      const journey = layout === 'journey';
      return <Pin key={item.id} index={index} active={journey && index === activeStep} visited={journey && index < activeStep} reducedMotion={reducedMotion} onSelect={onSelect} drag={drag} />;
    })}
  </group>;
}

// Rates for exponential damping: higher is snappier.
const TRAVEL_RATE = 5;
const ZOOM_RATE = 4.2;
const SPRING_RATE = 3.2;

const restDistance = (index, layout, mobile) => {
  if (layout === 'hero') return mobile ? 18 : 13;
  if (index === 0) return mobile ? 28 : 15.5;
  // Each further chapter in the same city leans in a little closer, so the move is felt.
  const lean = CHAPTER_META[index].cityIndex * (mobile ? 0.6 : 0.5);
  return (mobile ? 8.5 : 6.8) - lean;
};

// The camera follows scroll: within a chapter it rests on the pin, and during the travel
// phase it rides the route to the next pin, lifting in proportion to the hop. Damping keeps
// it smooth, a jump (click or fast scroll) simply retargets, and a drag adds a temporary
// spin that springs back on release.
function Camera({ activeStep, layout, progress, reducedMotion, pointer, drag }) {
  const offset = useRef(new THREE.Vector2());
  const offsetTarget = useRef(new THREE.Vector2());
  const direction = useRef(null);
  const distance = useRef(16);
  const target = useRef(new THREE.Vector3());
  const view = useRef(new THREE.Vector3());
  const right = useRef(new THREE.Vector3());
  const spin = useRef(new THREE.Quaternion());

  useFrame((state, delta) => {
    const { width, height } = state.size;
    const mobile = width < 768;
    const hero = layout === 'hero';
    const dt = Math.min(delta, 0.05);
    const damp = rate => (reducedMotion ? 1 : 1 - Math.exp(-rate * dt));

    const baseX = mobile ? 0 : width * (hero ? -0.2 : 0.22);
    const baseY = mobile ? height * (hero ? 0.2 : 0.29) : 0;
    offsetTarget.current.set(baseX + pointer.current.x * 14, baseY + pointer.current.y * 10);
    offset.current.lerp(offsetTarget.current, damp(4));
    state.camera.setViewOffset(width, height, offset.current.x, offset.current.y, width, height);

    if (!direction.current) {
      direction.current = state.camera.position.clone().normalize();
      distance.current = state.camera.position.length();
    }

    const p = progressOf(progress, activeStep, layout, reducedMotion);
    const k = Math.min(Math.floor(p), N - 1);
    const next = Math.min(k + 1, N - 1);
    const f = hero ? 0 : segmentProgress(p, k);
    target.current.copy(PINS[hero ? 0 : k]).lerp(PINS[hero ? 0 : next], f).normalize();

    const rest = THREE.MathUtils.lerp(restDistance(k, layout, mobile), restDistance(next, layout, mobile), f);
    const arc = hero ? 0 : Math.sin(f * Math.PI) * Math.min(PINS[k].angleTo(PINS[next]) * 7, 4);
    const lag = Math.min(direction.current.angleTo(target.current), 0.9) * (mobile ? 9 : 6);

    direction.current.lerp(target.current, damp(TRAVEL_RATE)).normalize();
    distance.current = THREE.MathUtils.lerp(distance.current, rest + arc + lag, damp(ZOOM_RATE));

    const d = drag.current;
    if (!d.active) {
      const back = damp(SPRING_RATE);
      d.yaw -= d.yaw * back;
      d.pitch -= d.pitch * back;
    }
    // Close-ups turn gently, the wide view turns freely.
    const perPixel = 0.0003 * distance.current;
    const pitch = THREE.MathUtils.clamp(d.pitch * perPixel, -0.6, 0.6);
    d.pitch = pitch / perPixel;
    view.current.copy(direction.current).applyQuaternion(spin.current.setFromAxisAngle(UP, d.yaw * perPixel));
    right.current.crossVectors(view.current, UP).normalize();
    view.current.applyQuaternion(spin.current.setFromAxisAngle(right.current, pitch)).normalize();

    state.camera.position.copy(view.current).multiplyScalar(distance.current);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// In demand mode (reduced motion) render once per state change.
function Invalidator({ deps }) {
  const invalidate = useThree(state => state.invalidate);
  useEffect(() => { invalidate(); }, [invalidate, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function GlobalEarth({ activeStep = 0, layout = 'hero', visible = true, progress, onSelect }) {
  const reducedMotion = useReducedMotion();
  const [supported] = useState(hasWebGL);
  const [lost, setLost] = useState(false);
  const [pageHidden, setPageHidden] = useState(() => document.hidden);
  const [dragging, setDragging] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const drag = useRef({ active: false, moved: 0, yaw: 0, pitch: 0, x: 0, y: 0 });
  const fallbackProgress = useRef(0);
  const progressRef = progress ?? fallbackProgress;
  const interactive = layout === 'journey' && visible;

  useEffect(() => {
    const onVisibility = () => {
      setPageHidden(document.hidden);
      pointer.current.x = 0;
      pointer.current.y = 0;
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Additive pointer drift on fine pointers only; it resets on blur so nothing is left mid-state.
  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return undefined;
    let frame = 0;
    let lastX = 0;
    let lastY = 0;
    const apply = () => {
      frame = 0;
      pointer.current.x = lastX / window.innerWidth - 0.5;
      pointer.current.y = lastY / window.innerHeight - 0.5;
    };
    const onMove = event => {
      lastX = event.clientX;
      lastY = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const reset = () => { pointer.current.x = 0; pointer.current.y = 0; };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('blur', reset);
    document.documentElement.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('blur', reset);
      document.documentElement.removeEventListener('pointerleave', reset);
      reset();
    };
  }, [reducedMotion]);

  // Drag to spin (mouse and pen). Touch only taps pins, so vertical swipes keep scrolling the page.
  useEffect(() => {
    const d = drag.current;
    const end = () => {
      if (!d.active) return;
      d.active = false;
      setDragging(false);
    };
    const onMove = event => {
      if (!d.active) return;
      const dx = event.clientX - d.x;
      const dy = event.clientY - d.y;
      d.x = event.clientX;
      d.y = event.clientY;
      d.moved += Math.abs(dx) + Math.abs(dy);
      // Stored in pixels; the camera converts to an angle scaled by zoom.
      d.yaw -= dx;
      d.pitch += dy;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    window.addEventListener('blur', end);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
      window.removeEventListener('blur', end);
    };
  }, []);

  const onPointerDown = event => {
    const d = drag.current;
    d.moved = 0;
    d.x = event.clientX;
    d.y = event.clientY;
    if (!interactive || reducedMotion || event.pointerType === 'touch' || event.button !== 0) return;
    d.active = true;
    setDragging(true);
  };

  const running = visible && !pageHidden;
  const frameloop = !running ? 'never' : reducedMotion ? 'demand' : 'always';

  return <div
    className="atlas-background"
    data-visible={visible || undefined}
    data-interactive={interactive || undefined}
    data-dragging={dragging || undefined}
    onPointerDown={onPointerDown}
    aria-hidden="true"
  >
    <div className="atlas-ambient" />
    {supported && !lost ? (
      <Canvas
        dpr={[1, 1.5]}
        frameloop={frameloop}
        camera={{ position: latLonToVector3(20.5937, 78.9629, 16).toArray(), fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); setLost(true); }, { once: true });
        }}
      >
        <Globe activeStep={activeStep} layout={layout} progress={progressRef} reducedMotion={reducedMotion} onSelect={onSelect} drag={drag} />
        <Camera activeStep={activeStep} layout={layout} progress={progressRef} reducedMotion={reducedMotion} pointer={pointer} drag={drag} />
        {reducedMotion && <Invalidator deps={[activeStep, layout, running]} />}
      </Canvas>
    ) : (
      <p className="atlas-fallback mono">Interactive globe unavailable on this device. The journey reads in full below.</p>
    )}
    <div className="atlas-vignette" />
  </div>;
}
