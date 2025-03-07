"use client";

export default function TreeRight() {
    return (
        <>
            {/* 传统松树群 - 右前方 */}
            {[0, 1, 2].map((i) => {
                const x = 8 + i * 1.5;
                const z = 4 - i * 2;
                const scale = 0.8 + Math.random() * 0.4;
                return (
                    <group key={`pine-right-${i}`} position={[x, -1, z]} scale={[scale, scale, scale]}>
                        {/* 树干 */}
                        <mesh castShadow>
                            <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
                            <meshStandardMaterial color="#8B4513" roughness={0.9} metalness={0.1} />
                        </mesh>

                        {/* 树冠 - 多层锥形 */}
                        {[0, 1, 2].map((j) => {
                            return (
                                <mesh key={`pine-crown-${i}-${j}`} position={[0, 1 + j * 0.8, 0]} castShadow>
                                    <coneGeometry args={[0.8 - j * 0.2, 1.2, 8]} />
                                    <meshStandardMaterial color="#006400" roughness={0.8} metalness={0.1} />
                                </mesh>
                            );
                        })}
                    </group>
                );
            })}
        </>
    )
}