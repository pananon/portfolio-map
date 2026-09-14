import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import { JOURNEY_DATA } from '../data/journeyData';

const RADIUS = 3.5;
const GOLD = '#d9bd89';
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
const fragmentShader = `
  uniform sampler2D geography;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    float land = 1.0 - texture2D(geography, vUv).r;
    vec3 normal = normalize(vNormal);
    float light = 0.55 + 0.45 * max(dot(normal, normalize(vec3(-0.7, 0.9, 1.0))), 0.0);
    vec3 ocean = vec3(0.025, 0.070, 0.090);
    vec3 terrain = vec3(0.23, 0.34, 0.34);
    vec3 color = mix(ocean, terrain, smoothstep(0.08, 0.75, land)) * light;
    float rim = pow(1.0 - max(dot(normal, normalize(-vPosition)), 0.0), 3.0);
    color += vec3(0.15, 0.33, 0.37) * rim * 0.55;
    gl_FragColor = vec4(color, 1.0);
  }
`;

function Geography() {
  const texture = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');
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
  return lines.map((points, index) => <Line key={index} points={points} color="#719595" transparent opacity={0.10} lineWidth={0.6} />);
}

function Routes({ activeStep }) {
  const routes = useMemo(() => JOURNEY_DATA.slice(1, -1).flatMap((chapter, index) => {
    const next = JOURNEY_DATA[index + 2];
    const start = latLonToVector3(...chapter.coordinates).normalize();
    const end = latLonToVector3(...next.coordinates).normalize();
    if (start.distanceTo(end) < 0.001) return [];
    const points = Array.from({ length: 49 }, (_, i) => {
      const t = i / 48;
      return start.clone().lerp(end, t).normalize().multiplyScalar(RADIUS + 0.02 + Math.sin(t * Math.PI) * 0.12);
    });
    return [{ points, step: index + 1 }];
  }), []);
  return routes.map(({ points, step }) => <Line key={step} points={points} color={GOLD} lineWidth={step === activeStep ? 1.5 : 0.7} transparent opacity={activeStep === 0 ? 0.35 : step === activeStep ? 0.85 : 0.15} />);
}

function Location({ coordinates, active, label, reducedMotion }) {
  const ring = useRef();
  const position = useMemo(() => latLonToVector3(...coordinates, RADIUS + 0.025), [coordinates]);
  const quaternion = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), position.clone().normalize()), [position]);
  useFrame(({ clock }) => {
    if (ring.current) {
      const pulse = reducedMotion ? 1 : 1 + Math.sin(clock.elapsedTime * 1.4) * 0.15;
      ring.current.scale.setScalar(pulse);
    }
  });
  return <group position={position} quaternion={quaternion}>
    <mesh><sphereGeometry args={[active ? 0.025 : 0.013, 16, 16]} /><meshBasicMaterial color={active ? '#fff0d5' : '#b8c7c3'} /></mesh>
    {active && <mesh ref={ring}><ringGeometry args={[0.048, 0.053, 48]} /><meshBasicMaterial color={GOLD} transparent opacity={0.8} side={THREE.DoubleSide} /></mesh>}
    {active && <Html position={[0, 0.11, 0.02]} center occlude style={{ pointerEvents: 'none' }}><div className="atlas-location">{label}<span>SELECTED LOCATION</span></div></Html>}
  </group>;
}

function Globe({ activeStep, reducedMotion }) {
  const places = useMemo(() => [...new Map(JOURNEY_DATA.slice(1).map(item => [item.coordinates.join(','), item])).values()], []);
  const selected = JOURNEY_DATA[activeStep];
  return <group>
    <Suspense fallback={<mesh><sphereGeometry args={[RADIUS, 64, 48]} /><meshBasicMaterial color="#233a40" /></mesh>}><Geography /></Suspense>
    <AtlasGrid />
    <Routes activeStep={activeStep} />
    {places.map(place => <Location key={place.coordinates.join(',')} coordinates={place.coordinates} label={selected.location} active={activeStep > 0 && place.coordinates.join(',') === selected.coordinates.join(',')} reducedMotion={reducedMotion} />)}
  </group>;
}

function Camera({ activeStep, reducedMotion }) {
  const offset = useRef(new THREE.Vector2());
  useFrame((state, delta) => {
    const { width, height } = state.size;
    const mobile = width < 768;
    const ease = reducedMotion ? 1 : 1 - Math.exp(-2.1 * Math.min(delta, 0.1));
    offset.current.lerp(new THREE.Vector2(mobile ? 0 : width * 0.22, mobile ? height * 0.29 : 0), ease);
    state.camera.setViewOffset(width, height, offset.current.x, offset.current.y, width, height);
    const item = JOURNEY_DATA[activeStep];
    const target = latLonToVector3(...item.coordinates).normalize();
    const current = state.camera.position.clone();
    const direction = current.clone().normalize();
    const distance = mobile ? 28 : activeStep === 0 ? 15.5 : 14;
    const travelling = 1 - direction.dot(target);
    direction.lerp(target, ease).normalize();
    state.camera.position.copy(direction.multiplyScalar(THREE.MathUtils.lerp(current.length(), distance + travelling * 6, ease)));
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function GlobalEarth({ activeStep = 0 }) {
  const reducedMotion = useReducedMotion();
  return <div className="atlas-background" aria-hidden="true">
    <div className="atlas-ambient" />
    <Canvas dpr={[1, 1.5]} camera={{ position: latLonToVector3(20.5937, 78.9629, 16).toArray(), fov: 38 }} gl={{ antialias: true, alpha: true }}>
      <Globe activeStep={activeStep} reducedMotion={reducedMotion} />
      <Camera activeStep={activeStep} reducedMotion={reducedMotion} />
    </Canvas>
    <div className="atlas-vignette" />
  </div>;
}

