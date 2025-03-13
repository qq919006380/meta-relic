"use client";

import SimpleStoneDog from "./SimpleStoneDog";

export default function WishPool() {
    return (
        <>
            {/* 许愿池外围 - 凸起的边缘 */}
            <mesh position={[0, 0.1, 0]} receiveShadow>
                <cylinderGeometry args={[6, 6.5, 0.2, 32]} />
                <meshStandardMaterial color="#9C8C7C" roughness={0.7} />
            </mesh>

            {/* 方形许愿池 */}
            {/* 池底 */}
            <mesh position={[0, -0.4, 0]} receiveShadow>
                <boxGeometry args={[8, 0.2, 8]} />
                <meshStandardMaterial color="#7A6246" roughness={0.8} />
            </mesh>

            {/* 池壁 - 四个边缘 */}
            {/* 前边缘 */}
            <mesh position={[0, 0, 4]} receiveShadow>
                <boxGeometry args={[8, 3, 0.4]} />
                <meshStandardMaterial color="#9C8C7C" roughness={0.7} />
            </mesh>
            {/* 后边缘 */}
            <mesh position={[0, 0, -4]} receiveShadow>
                <boxGeometry args={[8, 3, 0.4]} />
                <meshStandardMaterial color="#9C8C7C" roughness={0.7} />
            </mesh>
            {/* 左边缘 */}
            <mesh position={[-4, 0, 0]} receiveShadow>
                <boxGeometry args={[0.4, 3, 8]} />
                <meshStandardMaterial color="#9C8C7C" roughness={0.7} />
            </mesh>
            {/* 右边缘 */}
            <mesh position={[4, 0, 0]} receiveShadow>
                <boxGeometry args={[0.4, 3, 8]} />
                <meshStandardMaterial color="#9C8C7C" roughness={0.7} />
            </mesh>

            {/* 四个角落的石狗和石柱 */}
            {[
                { position: [3.8, 1, 3.8], rotation: Math.PI * 0.25 },    // 右前（朝东南）
                { position: [-3.8, 1, 3.8], rotation: -Math.PI * 0.25 },   // 左前（朝西南）
                { position: [-3.8, 1, -3.8], rotation: -Math.PI * 0.75 }, // 左后（朝西北）
                { position: [3.8, 1, -3.8], rotation: Math.PI * 0.75 }   // 右后（朝东北）
            ].map((config, i) => (
                <group key={i}>
                    {/* 石狗 */}
                    <SimpleStoneDog position={config.position as [number, number, number]} rotation={config.rotation} />

                    {/* 装饰柱 */}
                    <group position={config.position as [number, number, number]} rotation={[0, config.rotation + Math.PI / 4, 0]}>
                        <mesh castShadow>
                            <boxGeometry args={[0.4, 1.5, 0.4]} />
                            <meshStandardMaterial color="#8B7355" roughness={0.7} />
                        </mesh>
                        <mesh position={[0, 0.85, 0]} castShadow>
                            <boxGeometry args={[0.6, 0.2, 0.6]} />
                            <meshStandardMaterial color="#A0522D" roughness={0.6} />
                        </mesh>
                        <mesh position={[0, 1, 0]} castShadow>
                            <sphereGeometry args={[0.2, 16, 16]} />
                            <meshStandardMaterial color="#CD853F" metalness={0.5} roughness={0.5} />
                        </mesh>
                    </group>
                </group>
            ))}

            {/* 水面 - 调整为方形 */}
            <mesh position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[7.6, 7.6]} />
                <meshPhysicalMaterial
                    color="#4FA4FF"
                    transparent={true}
                    opacity={0.9}
                    roughness={0.1}
                    metalness={0.2}
                    clearcoat={1.0}
                    clearcoatRoughness={0.1}
                />
            </mesh>
        </>
    )
}