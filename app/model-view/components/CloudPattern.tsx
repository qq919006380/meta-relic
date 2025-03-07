"use client";

export default function CloudPattern() {
    return (
        <>
            {/* 装饰云纹图案 - 地面上 */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.09, 0]} receiveShadow>
                <ringGeometry args={[8, 8.5, 64]} />
                <meshStandardMaterial
                    color="#CD7F32"
                    roughness={0.7}
                    metalness={0.3}
                    opacity={0.6}
                    transparent={true}
                />
            </mesh>
        </>
    )
}