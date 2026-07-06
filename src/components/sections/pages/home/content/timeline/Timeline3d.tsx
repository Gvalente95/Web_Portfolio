import { Canvas } from "@react-three/fiber";
import { Line, Html, OrbitControls } from "@react-three/drei";

type ItemType = {
  x: number;
  y: number;
  z: number;
  title: string;
  info?: string[];
  key: string;
};

export function Timeline3D({ items }: { items: ItemType[] }) {
  const points = items.map((item) => [0, item.y, item.z] as [number, number, number]);

  return (
    <group
      rotation={[
        -Math.PI * 0.2, // X: tilt backwards
        Math.PI * 0.35, // Y: turn sideways
        Math.PI * 0.08, // Z: slight roll
      ]}
    >
      <Line points={points} lineWidth={2} />

      {items.map((item) => (
        <group key={item.key} position={[0, item.y, item.z]}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial />
          </mesh>

          <mesh position={[item.x / 2, 0, 0]}>
            <boxGeometry args={[Math.abs(item.x), 0.01, 0.01]} />
            <meshBasicMaterial />
          </mesh>

          <Html position={[item.x, 0, 0]} transform={false} center>
            <div className="timeline-card-inner">
              <div className="timeline-title">{item.title}</div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

export function TimelineCanvas({ items }: { items: ItemType[] }) {
  return (
    <div className="timeline-canvas">
      <Canvas camera={{ position: [8, 4, 14], fov: 45 }}>
        <Timeline3D items={items} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
