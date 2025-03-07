"use client";

export default function Baseplate() {
    return (
        <>
            {/* 装饰纹样底盘 */}
            <mesh position={[0, -1, 0]} receiveShadow>
                <cylinderGeometry args={[2, 2, 0.05, 64]} />
                <meshStandardMaterial
                    color="#CD7F32" // 浅铜色
                    roughness={0.5}
                    metalness={0.6}
                    envMapIntensity={1}
                />
            </mesh>
        </>
    )
}