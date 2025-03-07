"use client";

export default function StoneBridge() {
    return (
        <>
            {/* 古代石桥 - 左侧 */}
            <group position={[-10, -1, -3]} rotation={[0, Math.PI / 4, 0]}>
                {/* 桥身 */}
                <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                    <boxGeometry args={[6, 0.3, 1.5]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.9} metalness={0.1} />
                </mesh>

                {/* 桥拱 */}
                <mesh position={[0, 0, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[1.5, 1.5, 1.5, 16, 1, false, 0, Math.PI]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.9} metalness={0.1} />
                </mesh>

                {/* 桥栏杆 */}
                <mesh position={[-2.5, 1, -0.6]} castShadow>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.1} />
                </mesh>
                <mesh position={[-2.5, 1, 0.6]} castShadow>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.1} />
                </mesh>
                <mesh position={[-1.5, 1, -0.6]} castShadow>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.1} />
                </mesh>
                <mesh position={[-1.5, 1, 0.6]} castShadow>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.1} />
                </mesh>
                <mesh position={[-0.5, 1, -0.6]} castShadow>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.1} />
                </mesh>
                <mesh position={[-0.5, 1, 0.6]} castShadow>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.1} />
                </mesh>
                <mesh position={[0.5, 1, -0.6]} castShadow>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.1} />
                </mesh>
                <mesh position={[0.5, 1, 0.6]} castShadow>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.1} />
                </mesh>
                <mesh position={[1.5, 1, -0.6]} castShadow>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.1} />
                </mesh>
                <mesh position={[1.5, 1, 0.6]} castShadow>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.1} />
                </mesh>
                <mesh position={[2.5, 1, -0.6]} castShadow>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.1} />
                </mesh>
                <mesh position={[2.5, 1, 0.6]} castShadow>
                    <boxGeometry args={[0.2, 0.8, 0.2]} />
                    <meshStandardMaterial color="#7D6B5D" roughness={0.8} metalness={0.1} />
                </mesh>
            </group>
        </>
    )
}