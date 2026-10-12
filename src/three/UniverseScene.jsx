import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Html, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { bodies, spaceColors } from '../data/universe.js';

// Position of a body at time t (seconds). Moons orbit their parent.
function positionAt(body, t, out = new THREE.Vector3()) {
  const a = (body.phase || 0) + body.speed * t;
  out.set(Math.cos(a) * body.radius, Math.sin(a) * body.radius * (body.tilt || 0.08), Math.sin(a) * body.radius);
  if (body.parent) {
    const parent = bodies.find((b) => b.id === body.parent);
    out.add(positionAt(parent, t));
  }
  return out;
}

function OrbitRing({ radius, tilt = 0.08, color = '#3a3330', dashed }) {
  const geometry = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 160; i++) {
      const a = (i / 160) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius * tilt, Math.sin(a) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius, tilt]);
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={dashed ? 0.35 : 0.55} />
    </line>
  );
}

function StationModel({ url, size }) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(), [scene]);
  const box = useMemo(() => new THREE.Box3().setFromObject(clone), [clone]);
  const scale = (size * 2.2) / Math.max(...box.getSize(new THREE.Vector3()).toArray(), 0.001);
  return <primitive object={clone} scale={scale} />;
}

function BodyMesh({ body, hovered, glbUrl }) {
  const color = spaceColors[body.color];
  const emissive = hovered ? 0.55 : 0.18;
  switch (body.kind) {
    case 'sun':
      return (
        <group>
          <mesh>
            <icosahedronGeometry args={[body.size, 6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1.4 : 0.9} roughness={0.35} />
          </mesh>
          <mesh scale={1.35}>
            <sphereGeometry args={[body.size, 32, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.08} />
          </mesh>
        </group>
      );
    case 'station':
      if (glbUrl)
        return (
          <Suspense fallback={null}>
            <StationModel url={glbUrl} size={body.size} />
          </Suspense>
        );
      return (
        <group rotation={[0.5, 0, 0.2]}>
          <mesh>
            <torusGeometry args={[body.size, body.size * 0.16, 12, 48]} />
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} emissive={'#ffffff'} emissiveIntensity={emissive * 0.3} />
          </mesh>
          <mesh>
            <boxGeometry args={[body.size * 0.55, body.size * 0.55, body.size * 0.55]} />
            <meshStandardMaterial color={'#9B1B14'} metalness={0.4} roughness={0.4} emissive={'#9B1B14'} emissiveIntensity={emissive} />
          </mesh>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]} position={[Math.cos((i * Math.PI) / 2) * body.size * 0.6, Math.sin((i * Math.PI) / 2) * body.size * 0.6, 0]}>
              <boxGeometry args={[body.size * 0.5, body.size * 0.04, body.size * 0.04]} />
              <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
            </mesh>
          ))}
        </group>
      );
    case 'satellite':
      return (
        <group>
          <mesh>
            <octahedronGeometry args={[body.size, 0]} />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.25} emissive={'#ffffff'} emissiveIntensity={emissive * 0.4} />
          </mesh>
          <mesh position={[body.size * 1.6, 0, 0]}>
            <boxGeometry args={[body.size * 1.6, body.size * 0.05, body.size * 0.8]} />
            <meshStandardMaterial color={'#7484DA'} metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[-body.size * 1.6, 0, 0]}>
            <boxGeometry args={[body.size * 1.6, body.size * 0.05, body.size * 0.8]} />
            <meshStandardMaterial color={'#7484DA'} metalness={0.6} roughness={0.3} />
          </mesh>
        </group>
      );
    case 'comet':
      return (
        <group>
          <mesh>
            <dodecahedronGeometry args={[body.size, 0]} />
            <meshStandardMaterial color={color} emissive={'#F5F3E8'} emissiveIntensity={hovered ? 1.2 : 0.7} />
          </mesh>
          <mesh position={[0, 0, body.size * 2.6]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[body.size * 0.9, body.size * 5, 16, 1, true]} />
            <meshBasicMaterial color={'#DE5248'} transparent opacity={0.25} side={THREE.DoubleSide} />
          </mesh>
        </group>
      );
    default:
      return (
        <group>
          <mesh>
            <sphereGeometry args={[body.size, 48, 32]} />
            <meshStandardMaterial
              color={body.locked || body.secret ? '#5a5552' : color}
              emissive={color}
              emissiveIntensity={body.locked || body.secret ? emissive * 0.4 : emissive}
              roughness={0.55}
              metalness={0.15}
              wireframe={!!body.secret && !hovered}
            />
          </mesh>
          {body.locked && (
            <mesh rotation={[Math.PI / 2.4, 0, 0]}>
              <torusGeometry args={[body.size * 1.55, 0.012, 8, 96]} />
              <meshBasicMaterial color={color} transparent opacity={0.85} />
            </mesh>
          )}
        </group>
      );
  }
}

function Body({ body, label, sub, badge, onSelect, clock, paused, glbUrl }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, dt) => {
    if (!ref.current) return;
    positionAt(body, clock.current, tmp);
    ref.current.position.copy(tmp);
    if (!paused) ref.current.rotation.y += dt * 0.25;
  });
  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(body, ref.current.getWorldPosition(new THREE.Vector3()));
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = '';
      }}
    >
      <BodyMesh body={body} hovered={hovered} glbUrl={glbUrl} />
      {/* Invisible, larger hit target than the mark. */}
      <mesh visible={false}>
        <sphereGeometry args={[Math.max(body.size * 1.8, 0.45), 12, 8]} />
      </mesh>
      <Html center distanceFactor={9} position={[0, body.size + 0.45, 0]} style={{ pointerEvents: 'none' }} zIndexRange={[10, 0]}>
        <div className={'space-label' + (hovered ? ' hot' : '') + (body.locked ? ' locked' : '') + (body.secret ? ' secret' : '')}>
          {badge && <i>{badge}</i>}
          <b>{label}</b>
          {hovered && <small>{sub}</small>}
        </div>
      </Html>
    </group>
  );
}

// Desktop: shift the projection so the system sits right of the headline (orbits stay centred on the sun).
// Phones: centred and pulled back.
function World({ children }) {
  const { size, camera } = useThree();
  const wide = size.width > 900;
  React.useEffect(() => {
    camera.position.set(0, wide ? 6.2 : 9, wide ? 12.5 : 17);
    if (wide) camera.setViewOffset(size.width, size.height, -size.width * 0.2, 0, size.width, size.height);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }, [wide, size.width, size.height]);
  return <group>{children}</group>;
}

function Rig({ clock, paused, flight }) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3());
  useFrame((_, dt) => {
    if (!paused) clock.current += Math.min(dt, 0.05) * 0.6;
    if (flight.current) {
      const { to } = flight.current;
      const dest = to.clone().add(new THREE.Vector3(0, 0.6, 2.2));
      camera.position.lerp(dest, 1 - Math.pow(0.0008, dt));
      look.current.lerp(to, 1 - Math.pow(0.0008, dt));
      camera.lookAt(look.current);
    }
  });
  return null;
}

export default function UniverseScene({ paused, visible = true, t, onNavigate, glbUrl }) {
  const clock = useRef(0);
  const flight = useRef(null);
  const controls = useRef(null);
  const [flying, setFlying] = useState(false);

  const select = (body, pos) => {
    if (paused) return onNavigate(body.to);
    flight.current = { to: pos };
    setFlying(true);
    setTimeout(() => onNavigate(body.to), 850);
  };

  const label = (b) => (typeof b.name === 'string' ? b.name : t(b.name));

  return (
    <Canvas
      className="universe-canvas"
      dpr={[1, 1.5]}
      frameloop={(paused || !visible) && !flying ? 'demand' : 'always'}
      camera={{ position: [0, 6.2, 12.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={0.9} />
      <Stars radius={60} depth={40} count={2600} factor={3.2} saturation={0} fade speed={paused ? 0 : 0.6} />
      <World>
      <pointLight position={[0, 0, 0]} intensity={60} color={'#ffb8a8'} distance={30} />
      {bodies.filter((b) => b.radius && !b.parent).map((b) => (
        <OrbitRing key={'o' + b.id} radius={b.radius} tilt={b.tilt || 0.08} dashed={b.locked || b.kind === 'comet'} color={b.locked ? '#7484DA' : '#4a4240'} />
      ))}
      {bodies.map((b) => (
        <Body
          key={b.id}
          body={b}
          label={label(b)}
          sub={t(b.sub)}
          badge={b.locked ? '🔒' : b.secret ? '?' : null}
          onSelect={select}
          clock={clock}
          paused={paused}
          glbUrl={b.kind === 'station' ? glbUrl : null}
        />
      ))}
      </World>
      <Rig clock={clock} paused={paused} flight={flight} />
      <OrbitControls ref={controls} enablePan={false} enableZoom={false} enabled={!flying} autoRotate={!paused && !flying} autoRotateSpeed={0.12} minPolarAngle={0.5} maxPolarAngle={1.45} />
    </Canvas>
  );
}
