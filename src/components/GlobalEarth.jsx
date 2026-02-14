import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { JOURNEY_DATA } from '../data/journeyData';

const GLOBE_RADIUS = 3.5;

// Coordinates
export const latLonToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
};

const NightGlobe = ({ activeStep }) => {
    // Holographic Style: Use Specular (Land/Water mask) as Emissive
    const landMap = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');
    const bumpMap = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg');

    return (
        <group>
            {/* Holographic Sphere */}
            <mesh rotation={[0, 0, 0]}>
                <sphereGeometry args={[GLOBE_RADIUS, 128, 128]} />
                <meshStandardMaterial
                    color="#050510" // Deep dark blue base
                    emissive="#204060" // Glowing blue land
                    emissiveMap={landMap}
                    emissiveIntensity={0.5} // Visible glow
                    roughness={0.4}
                    metalness={0.6}
                    bumpMap={bumpMap}
                    bumpScale={0.05}
                />
            </mesh>

            {/* Grid Overlay for "Tech" feel */}
            <mesh scale={[1.001, 1.001, 1.001]}>
                <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
                <meshBasicMaterial color="#0044aa" wireframe transparent opacity={0.03} />
            </mesh>

            {/* Atmosphere Glow Outer */}
            <mesh scale={[1.02, 1.02, 1.02]}>
                <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
                <meshLambertMaterial
                    color="#4488ff"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Markers */}
            {JOURNEY_DATA.map((item, index) => {
                if (item.id === 'intro') return null;
                const isActive = activeStep === index;
                const pos = latLonToVector3(item.coordinates[0], item.coordinates[1], GLOBE_RADIUS);
                return <Marker key={item.id} position={pos} color={item.color} isActive={isActive} />;
            })}
        </group>
    );
};

const Marker = ({ position, color, isActive }) => {
    // Minimalist glowing dot
    const scale = isActive ? 1.5 : 0.8;
    const opacity = isActive ? 1.0 : 0.4;

    return (
        <group position={position}>
            {/* Glow Sprite */}
            <mesh lookAt={() => new THREE.Vector3(0, 0, 0)}>
                <sphereGeometry args={[0.04 * scale, 16, 16]} />
                <meshBasicMaterial color={color} toneMapped={false} transparent opacity={opacity} />
            </mesh>
            {isActive && (
                <pointLight color={color} distance={2} decay={2} intensity={2} />
            )}
            {/* Ring */}
            <mesh lookAt={() => new THREE.Vector3(0, 0, 0)}>
                <ringGeometry args={[0.06 * scale, 0.08 * scale, 32]} />
                <meshBasicMaterial color={color} transparent opacity={opacity * 0.5} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

const CinematicCamera = ({ activeStep }) => {
    useFrame((state) => {
        const item = JOURNEY_DATA[activeStep] || JOURNEY_DATA[0];
        const targetPos = latLonToVector3(item.coordinates[0], item.coordinates[1], GLOBE_RADIUS);

        // Smooth cinematic zoom amounts
        const isIntro = item.id === 'intro';

        const minDist = GLOBE_RADIUS + (isIntro ? 8.0 : 3.5);
        const maxDist = GLOBE_RADIUS + 12.0;

        const currentPos = state.camera.position.clone();
        const currentDir = currentPos.clone().normalize();
        const targetDir = targetPos.clone().normalize();

        // Ultra smooth rotation
        currentDir.lerp(targetDir, 0.03).normalize();

        // Zoom curve
        const align = currentDir.dot(targetDir);
        const zoomOut = Math.pow(1 - align, 2) * 40;
        const targetDist = Math.min(minDist + zoomOut, maxDist);

        const newDist = THREE.MathUtils.lerp(currentPos.length(), targetDist, 0.03);

        state.camera.position.copy(currentDir.multiplyScalar(newDist));
        state.camera.lookAt(0, 0, 0);
    });
    return null;
};

const GlobalEarth = ({ activeStep = 0 }) => {
    return (
        <div className="fixed inset-0 z-0 bg-[#020202]">
            <Canvas camera={{ position: [0, 0, 10], fov: 35 }} gl={{ antialias: true, toneMapping: THREE.ReinhardToneMapping }}>
                <color attach="background" args={['#020202']} />
                <fog attach="fog" args={['#020202', 10, 50]} />

                <ambientLight intensity={0.1} />
                <pointLight position={[20, 10, 10]} intensity={1.5} color="#aaddff" />
                <pointLight position={[-20, 0, -10]} intensity={0.5} color="#cc66ff" />

                <Suspense fallback={null}>
                    <Stars radius={200} depth={50} count={8000} factor={3} saturation={0} fade />
                    <NightGlobe activeStep={activeStep} />
                    <CinematicCamera activeStep={activeStep} />
                </Suspense>
            </Canvas>
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
        </div>
    );
};

export default GlobalEarth;
