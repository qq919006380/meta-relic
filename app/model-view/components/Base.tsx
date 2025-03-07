"use client";

export default function Base() {
    return (
        <>
            {/* 传统风格底座 */}
            <mesh position={[0, -1.02, 0]} receiveShadow >
                <cylinderGeometry args={[2.2, 2.5, 0.15, 64]} />
                <meshStandardMaterial
                    color="#B87333" // 铜色
                    roughness={0.6}
                    metalness={0.4}
                    envMapIntensity={0.8}
                />
            </mesh>
        </>
    )
}