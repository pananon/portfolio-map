import React, { useState, useEffect, useMemo, Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from 'react-intersection-observer';
import {
  Building,
  GraduationCap,
  MapPin,
  ArrowDown,
  Globe as GlobeIcon
} from 'lucide-react';

// --- DATA ---
const TIMELINE_DATA = [
  {
    id: 'intro',
    year: 'Start',
    title: 'The Beginning',
    location: 'India',
    coordinates: [20.5937, 78.9629], // Center of India
    type: 'education',
    description: 'A journey of technical excellence across the Indian subcontinent.',
    icon: GlobeIcon,
    color: '#ffffff'
  },
  {
    id: 'school-start',
    year: '2009',
    title: 'Early Foundation',
    location: 'Ambala Cantt',
    coordinates: [30.3752, 76.7821],
    type: 'education',
    description: 'Started my educational journey at KVS Ambala Cantt.',
    icon: GraduationCap,
    color: '#3b82f6'
  },
  {
    id: 'school-end',
    year: '2015',
    title: 'Secondary Education',
    location: 'Basti, UP',
    coordinates: [26.8137, 82.7634],
    type: 'education',
    description: 'Completed schooling with excellence in academics.',
    icon: GraduationCap,
    color: '#f97316'
  },
  {
    id: 'jee-prep',
    year: '2016',
    title: 'Competitive Exams',
    location: 'Kota, Rajasthan',
    coordinates: [25.2138, 75.8648],
    type: 'education',
    description: 'Rigorous preparation for IIT-JEE.',
    icon: MapPin,
    color: '#eab308'
  },
  {
    id: 'college',
    year: '2016 - 2020',
    title: 'B.Tech CS',
    location: 'Noida, UP',
    coordinates: [28.5355, 77.3910],
    type: 'education',
    description: 'B.Tech in Computer Science from JSS Academy.',
    icon: GraduationCap,
    color: '#8b5cf6'
  },
  {
    id: 'work-1',
    year: '2020 - 2021',
    title: 'Software Engineer',
    location: 'Noida',
    coordinates: [28.5700, 77.3200],
    type: 'work',
    description: 'First professional role as a Full Stack Developer.',
    icon: Building,
    color: '#06b6d4'
  },
  {
    id: 'work-2',
    year: '2021 - 2023',
    title: 'Senior Developer',
    location: 'Bengaluru',
    coordinates: [12.9716, 77.5946],
    type: 'work',
    description: 'Building cloud-native applications in the tech capital.',
    icon: Building,
    color: '#10b981'
  },
  {
    id: 'current',
    year: 'Present',
    title: 'Tech Lead',
    location: 'Hyderabad',
    coordinates: [17.3850, 78.4867],
    type: 'work',
    description: 'Driving technical strategy at Microsoft (TechM).',
    icon: Building,
    color: '#22c55e'
  }
];

const GLOBE_RADIUS = 3;

// Precise conversion to align with Three.js SphereGeometry
const latLonToVector3 = (lat, lon, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 90) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
};

// --- 3D COMPONENTS ---

const GlowingEarth = ({ activeStep }) => {
  const colorMap = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
  const specularMap = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg');
  const normalMap = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg');

  return (
    <group rotation={[0, -Math.PI / 2, 0]}>
      {/* Base Earth */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          specularMap={specularMap}
          normalMap={normalMap}
          shininess={10}
        />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshPhongMaterial
          color="#4488ff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <Clouds />

      {/* Surface Markers */}
      {TIMELINE_DATA.map((item, index) => {
        if (item.id === 'intro') return null; // Skip marker for intro view
        const isActive = activeStep === index;
        const pos = latLonToVector3(item.coordinates[0], item.coordinates[1], GLOBE_RADIUS);

        return (
          <Marker3D
            key={item.id}
            position={pos}
            color={item.color}
            isActive={isActive}
            label={item.location}
          />
        );
      })}

      <Arcs data={TIMELINE_DATA.filter(d => d.id !== 'intro')} activeStep={activeStep > 0 ? activeStep - 1 : 0} />
    </group>
  );
};

const Clouds = () => {
  const cloudsMap = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png');
  const mesh = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0002;
    }
  });

  return (
    <mesh ref={mesh} scale={[1.015, 1.015, 1.015]}>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshStandardMaterial
        map={cloudsMap}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};

const Marker3D = ({ position, color, isActive, label }) => {
  // Dynamic scale for "Zoom into location" feel
  // We don't scale marker itself too much, but height helps visibility
  const height = isActive ? 1.5 : 0.4;
  const opacity = isActive ? 0.9 : 0.5;

  const normal = position.clone().normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);

  return (
    <group position={position} quaternion={quaternion}>
      {/* Light Beam */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, height, 8]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>

      {/* Base Ring - Pulses if active */}
      <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.04, isActive ? 0.15 : 0.08, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Target Reticle (Active Only) using HTML for clean overlay or mesh for 3D feel? 
          User asked for zoom, so keeping it 3D is better.
      */}

      {/* Pin Head */}
      <mesh position={[0, height, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>

      {/* Label */}
      {isActive && (
        <Html position={[0, height + 0.3, 0]} center distanceFactor={15}>
          <div className="bg-black/80 backdrop-blur-md text-white/90 text-[10px] font-bold px-3 py-1.5 rounded border border-white/20 whitespace-nowrap shadow-xl flex flex-col items-center">
            <span>{label}</span>
            <div className="w-px h-2 bg-white/20 absolute -bottom-2"></div>
          </div>
        </Html>
      )}
    </group>
  );
};

const Arcs = ({ data, activeStep }) => {
  return (
    <group>
      {data.map((item, i) => {
        if (i >= data.length - 1) return null;
        // Skip arc if distance is very near (same city)
        if (item.coordinates[0] === data[i + 1].coordinates[0] && item.coordinates[1] === data[i + 1].coordinates[1]) return null;

        const start = latLonToVector3(item.coordinates[0], item.coordinates[1], GLOBE_RADIUS);
        const end = latLonToVector3(data[i + 1].coordinates[0], data[i + 1].coordinates[1], GLOBE_RADIUS);
        const isActive = i <= activeStep; // All previous arcs lit? or just current?

        return <ArcCurve key={i} start={start} end={end} isActive={isActive} />;
      })}
    </group>
  );
};

const ArcCurve = ({ start, end, isActive }) => {
  const points = useMemo(() => {
    // Higher arc for longer distance
    const dist = start.distanceTo(end);
    const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(GLOBE_RADIUS + dist * 0.5);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(40);
  }, [start, end]);

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={isActive ? "#60a5fa" : "#333333"} // Blue if active 
        opacity={isActive ? 0.8 : 0.2}
        transparent
        linewidth={1}
      />
    </line>
  );
};

// --- PARALLAX CAMERA CONTROLLER ---
const MapController = ({ activeStep }) => {
  useFrame((state) => {
    // 1. Calculate Target Point in Local Globe Space
    const item = TIMELINE_DATA[activeStep];
    const localTarget = latLonToVector3(item.coordinates[0], item.coordinates[1], GLOBE_RADIUS);

    // 2. Convert to World Space (Apply Globe's Rotation of -90 deg Y)
    // We rotate vectors by applying the axis angle
    const worldTarget = localTarget.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);

    // 3. Determine Zoom Level (Altitude)
    // Close Zoom = 4.0 radius (1.0 altitude above surface)
    // Far Zoom = 8.0 radius (5.0 altitude)
    const minRadius = GLOBE_RADIUS + 2.5; // Zoom into location
    const maxRadius = GLOBE_RADIUS + 7.0; // Zoom out during travel

    // 4. Interpolate Current Direction
    const currentPos = state.camera.position.clone();
    const currentDir = currentPos.clone().normalize();
    const targetDir = worldTarget.clone().normalize();

    // Smoothly rotate direction
    const rotSpeed = 0.03;
    currentDir.lerp(targetDir, rotSpeed).normalize();

    // 5. Calculate "Hop" Zoom Effect
    // Distance from target direction (1.0 is aligned, <1.0 is far)
    const alignment = currentDir.dot(targetDir);
    // alignment 0.99 -> close. 0.8 -> far.
    // curve: from 0 to 1 based on alignment.
    // We want radius to be LARGE when alignment is LOW.
    const zoomFactor = Math.pow(1 - alignment, 2) * 200; // Exponential zoom out
    // Clamp zoom
    const targetRadius = Math.min(minRadius + zoomFactor, maxRadius);

    // Smoothly interpolate radius
    const currentRadius = currentPos.length();
    const newRadius = THREE.MathUtils.lerp(currentRadius, targetRadius, 0.05);

    // 6. Apply Position
    const newPos = currentDir.multiplyScalar(newRadius);
    state.camera.position.copy(newPos);

    // 7. Look at Center (always keeps globe in view)
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// --- MAIN WRAPPER ---
const InteractiveMap = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative w-full">
      <div className="flex flex-col lg:flex-row-reverse">

        {/* 3D Scene */}
        <div className="h-[50vh] lg:h-screen lg:w-3/5 sticky top-0 z-10 lg:order-2 bg-[#050505] overflow-hidden">
          <Canvas camera={{ position: [0, 0, 10], fov: 35 }}> {/* Narrow FOV for cinematic look */}
            <color attach="background" args={['#050505']} />

            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 5, 5]} intensity={2} color="#ffffff" />
            <pointLight position={[-10, -5, -5]} intensity={0.5} color="#4488ff" />

            <Suspense fallback={null}>
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
              <GlowingEarth activeStep={activeStep} />
              <MapController activeStep={activeStep} />
            </Suspense>

            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          </Canvas>

          {/* Vignette & Grain */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_95%)]" />

        </div>

        {/* Narrative Content */}
        <div className="lg:w-2/5 relative z-20 lg:order-1">
          <div className="max-w-lg mx-auto px-6 py-12 lg:py-24 space-y-48 pb-64">
            <div className="space-y-4 pt-12">
              <div className="flex items-center gap-2 text-blue-400 font-mono text-sm tracking-wider">
                <GlobeIcon className="w-4 h-4" />
                <span>GEOSPATIAL JOURNEY</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                India <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Career Path
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Interactive 3D timeline.
                <br />
                <span className="text-sm opacity-60">Scroll to explore &gt;</span>
              </p>
            </div>

            {TIMELINE_DATA.map((item, index) => (
              <NarrativeCard
                key={item.id}
                item={item}
                index={index}
                onActive={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const NarrativeCard = ({ item, index, onActive }) => {
  const { ref, inView } = useInView({ threshold: 0.6, triggerOnce: false });

  useEffect(() => {
    if (inView) onActive();
  }, [inView]);

  if (item.id === 'intro') {
    return <div ref={ref} className="h-10"></div>; // Invisible trigger for intro state
  }

  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-10'}`}>
      <div className="relative pl-8 border-l-2 border-white/10">
        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-[#050505] transition-colors duration-500 ${inView ? 'bg-blue-500' : 'bg-gray-700'}`} />
        <span className="text-sm font-mono text-blue-400 mb-2 block">{item.year}</span>
        <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
        <div className="flex items-center gap-2 text-gray-400 mb-6 font-medium">
          <MapPin className="w-4 h-4" />
          {item.location}
        </div>
        <div className={`glass-dark p-6 rounded-2xl border transition-all duration-500 ${inView ? 'border-white/20 bg-white/5 shadow-2xl scale-[1.02]' : 'border-white/5 bg-transparent'}`}>
          <p className="text-gray-300 leading-relaxed text-lg">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;