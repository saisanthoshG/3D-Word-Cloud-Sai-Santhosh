import { OrbitControls, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Word = {
  word: string;
  weight: number; // normalized 0 → 1
};

function WordCloud({ words }: { words: Word[] }) {
  const groupRef = useRef<THREE.Group>(null);

  // Slow rotation animation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map((w, i) => {
        // Distribute words on a sphere
        const radius = 5;
        const phi = Math.acos(1 - (2 * (i + 1)) / words.length);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        const fontSize = 0.4 + w.weight * 1.6;
        const visualWeight = Math.min(w.weight, 0.85);

        const color = new THREE.Color().setHSL(
          0.58, // blue hue
          0.85, // saturation
          0.3 + visualWeight * 0.3, // controlled lightness
        );

        return (
          <Text
            key={i}
            position={[x, y, z]}
            fontSize={fontSize}
            anchorX="center"
            anchorY="middle"
          >
            {w.word}

            {/* 🔑 IMPORTANT: lighting-independent material */}
            <meshBasicMaterial color={color} />
          </Text>
        );
      })}
    </group>
  );
}

export default function WordCloud3D({ words }: { words: Word[] }) {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
      <OrbitControls enableZoom={false} />
      <WordCloud words={words} />
    </Canvas>
  );
}
