"use client";

interface SimpleStoneDogProps {
    position: [number, number, number];
    rotation: number;
}

export default function SimpleStoneDog({ position, rotation }: SimpleStoneDogProps) {
    return (
        <>
            <group position={position} rotation={[0, rotation, 0]}>
                {/* 身体 */}
                <mesh position={[0, 0.4, 0]} castShadow>
                    <boxGeometry args={[0.8, 0.8, 1.2]} />
                    <meshStandardMaterial color="#8B7355" roughness={0.8} />
                </mesh>
                {/* 头部 */}
                <mesh position={[0, 0.8, 0.5]} castShadow>
                    <boxGeometry args={[0.6, 0.6, 0.6]} />
                    <meshStandardMaterial color="#8B7355" roughness={0.8} />
                </mesh>
                {/* 耳朵 */}
                <mesh position={[0.25, 1.1, 0.5]} castShadow>
                    <boxGeometry args={[0.15, 0.3, 0.15]} />
                    <meshStandardMaterial color="#8B7355" roughness={0.8} />
                </mesh>
                <mesh position={[0.25, 1.1, 0.5]} castShadow>
                    <boxGeometry args={[0.15, 0.3, 0.15]} />
                    <meshStandardMaterial color="#8B7355" roughness={0.8} />
                </mesh>
                {/* 前腿 */}
                <mesh position={[0.3, 0.2, 0.4]} castShadow>
                    <boxGeometry args={[0.2, 0.4, 0.2]} />
                    <meshStandardMaterial color="#8B7355" roughness={0.8} />
                </mesh>
                <mesh position={[-0.3, 0.2, 0.4]} castShadow>
                    <boxGeometry args={[0.2, 0.4, 0.2]} />
                    <meshStandardMaterial color="#8B7355" roughness={0.8} />
                </mesh>
                {/* 后腿 */}
                <mesh position={[0.3, 0.2, -0.4]} castShadow>
                    <boxGeometry args={[0.2, 0.4, 0.2]} />
                    <meshStandardMaterial color="#8B7355" roughness={0.8} />
                </mesh>
                <mesh position={[-0.3, 0.2, -0.4]} castShadow>
                    <boxGeometry args={[0.2, 0.4, 0.2]} />
                    <meshStandardMaterial color="#8B7355" roughness={0.8} />
                </mesh>
                {/* 尾巴 */}
                <mesh position={[0, 0.6, -0.7]} rotation={[0.3, 0, 0]} castShadow>
                    <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
                    <meshStandardMaterial color="#8B7355" roughness={0.8} />
                </mesh>
            </group>
        </>
    )
}