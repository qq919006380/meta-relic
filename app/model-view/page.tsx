"use client";

import React, { Suspense, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { FBXLoader } from 'three-stdlib';
import * as THREE from 'three';

// 手动贴图模型组件
function Model() {
  // 加载FBX模型
  const fbx = useLoader(FBXLoader, '/models/u.fbx');
  
  // 调整模型整体缩放和位置
  fbx.scale.set(0.005, 0.005, 0.005);
  fbx.position.set(0, -1, 0);
  
  // 手动加载贴图
  useEffect(() => {
    if (!fbx) return;
    
    console.log('开始手动加载贴图...');
    
    // 创建纹理加载器
    const textureLoader = new THREE.TextureLoader();
    
    // 加载所有贴图
    const textures = {
      body: textureLoader.load('/models/u.fbm/身体.jpg'),
      head: textureLoader.load('/models/u.fbm/头部uv.jpg'),
      eyes: textureLoader.load('/models/u.fbm/眼睛.jpg'),
      nose: textureLoader.load('/models/u.fbm/鼻子.jpg'),
      bell: textureLoader.load('/models/u.fbm/铃铛贴图.jpg')
    };
    
    // 设置贴图颜色空间
    Object.values(textures).forEach(texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
    });
    
    // 输出模型结构以便调试
    console.log('模型结构:');
    fbx.traverse(child => {
      if (child instanceof THREE.Mesh) {
        console.log('网格名称:', child.name);
      }
    });
    
    // 在fbx.traverse之前添加
    console.log('所有网格名称:');
    fbx.traverse(child => {
      if (child instanceof THREE.Mesh) {
        console.log('完整网格名称:', child.name);
      }
    });
    
    // 将贴图应用到模型
    fbx.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // 确保法线计算正确
        child.geometry.computeVertexNormals();
        
        // 设置双面渲染，解决某些面反向问题
        child.material.side = THREE.DoubleSide;
        
        // 设置阴影
        child.castShadow = true;
        child.receiveShadow = true;
        
        const meshName = child.name.toLowerCase();
        
        // 根据网格名称应用不同贴图
        if (meshName.includes('body') || meshName.includes('身体')) {
          child.material = new THREE.MeshStandardMaterial({
            map: textures.body,
            roughness: 0.7,
            metalness: 0.2,
            side: THREE.DoubleSide,  // 双面渲染
            transparent: false,      // 确保不透明
            alphaTest: 0.5           // 处理半透明边缘
          });
        } 
        else if (meshName.includes('head') || meshName.includes('头')) {
          child.material = new THREE.MeshStandardMaterial({
            map: textures.head,
            roughness: 0.7,
            metalness: 0.2
          });
        }
        else if (meshName.includes('eye') || meshName.includes('眼')) {
          child.material = new THREE.MeshStandardMaterial({
            map: textures.eyes,
            roughness: 0.5,
            metalness: 0.3
          });
        }
        else if (meshName.includes('nose') || meshName.includes('鼻')) {
          child.material = new THREE.MeshStandardMaterial({
            map: textures.nose,
            roughness: 0.6,
            metalness: 0.2
          });
        }
        else if (meshName.includes('bell') || meshName.includes('铃铛')) {
          child.material = new THREE.MeshStandardMaterial({
            map: textures.bell,
            roughness: 0.4,
            metalness: 0.6
          });
        }
        // 对于其他部分
        else {
          console.log('未匹配的网格:', child.name);
          // 默认使用身体贴图
          child.material = new THREE.MeshStandardMaterial({
            map: textures.body,
            roughness: 0.7,
            metalness: 0.2
          });
        }
        
        console.log(`贴图应用到: ${child.name}`);
      }
    });
    
  }, [fbx]);
  
  return <primitive object={fbx} />;
}

// 添加一个场景组件，包含地面和环境元素
function Scene() {
  return (
    <>
      {/* 传统风格底座 */}
      <mesh position={[0, -1.02, 0]} receiveShadow>
        <cylinderGeometry args={[2.2, 2.5, 0.15, 64]} />
        <meshStandardMaterial 
          color="#B87333" // 铜色
          roughness={0.6}
          metalness={0.4}
          envMapIntensity={0.8}
        />
      </mesh>
      
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
      
      {/* 地面 - 模拟古代地砖 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
        <planeGeometry args={[30, 30, 10, 10]} />
        <meshStandardMaterial 
          color="#F5F0E6" // 浅褐色背景
          roughness={0.9}
          metalness={0.1}
          wireframe={false}
        />
      </mesh>
      
      {/* 传统装饰柱 - 东 */}
      <group position={[6, -1, -2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.5, 4, 16]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.2} />
        </mesh>
        {/* 柱子顶部装饰 */}
        <mesh position={[0, 2.1, 0]} castShadow>
          <boxGeometry args={[1.2, 0.2, 1.2]} />
          <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>
      
      {/* 传统装饰柱 - 西 */}
      <group position={[-6, -1, -2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.4, 0.5, 4, 16]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.2} />
        </mesh>
        {/* 柱子顶部装饰 */}
        <mesh position={[0, 2.1, 0]} castShadow>
          <boxGeometry args={[1.2, 0.2, 1.2]} />
          <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>
      
      {/* 香炉 - 模型前方 */}
      <group position={[0, -1, 3]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.4, 0.6, 16]} />
          <meshStandardMaterial color="#B87333" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* 炉盖 */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <coneGeometry args={[0.3, 0.3, 16]} />
          <meshStandardMaterial color="#B87333" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* 香火效果 - 使用粒子或光效果模拟 */}
        <pointLight position={[0, 0.7, 0]} intensity={0.6} color="#FF9E5E" distance={1.5} />
      </group>
      
      {/* 远景背景 - 传统山水画风格 */}
      <mesh position={[0, 0, -15]} rotation={[0, 0, 0]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial 
          color="#F5F0E6" 
          side={THREE.DoubleSide}
          roughness={1}
          metalness={0}
          opacity={0.8}
          transparent={true}
        />
      </mesh>
      
      {/* 远景山脉 - 左侧 */}
      <mesh position={[-10, 2, -14]} rotation={[0, Math.PI/6, 0]}>
        <coneGeometry args={[8, 7, 16, 1, true]} />
        <meshStandardMaterial 
          color="#8B4513" 
          opacity={0.6}
          transparent={true}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* 远景山脉 - 右侧 */}
      <mesh position={[10, 1, -14]} rotation={[0, -Math.PI/6, 0]}>
        <coneGeometry args={[10, 5, 16, 1, true]} />
        <meshStandardMaterial 
          color="#8B4513" 
          opacity={0.5}
          transparent={true}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* 点缀小石狗装饰 - 左侧 */}
      <mesh position={[-3, -0.95, 2]} rotation={[0, Math.PI/4, 0]} scale={[0.3, 0.3, 0.3]} castShadow>
        <boxGeometry args={[0.8, 0.6, 1.2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} metalness={0.1} />
      </mesh>
      
      {/* 点缀小石狗装饰 - 右侧 */}
      <mesh position={[3, -0.95, 2]} rotation={[0, -Math.PI/4, 0]} scale={[0.3, 0.3, 0.3]} castShadow>
        <boxGeometry args={[0.8, 0.6, 1.2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} metalness={0.1} />
      </mesh>
    </>
  );
}

export default function ModelViewPage() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#FBF8F1] to-[#F5F0E6]">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        shadows
      >
        {/* 柔和环境光 */}
        <ambientLight intensity={0.4} color="#FFF1DB" />
        
        {/* 主光源 - 模拟傍晚阳光 */}
        <directionalLight
          position={[5, 8, 3]}
          intensity={1.2}
          color="#FFE0B2"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* 侧光源 - 增强轮廓感 */}
        <directionalLight 
          position={[-3, 2, -3]} 
          intensity={0.7} 
          color="#E1BEE7" 
        />
        
        {/* 点光源 - 增强模型关键部位亮度 */}
        <pointLight position={[-2, 3, 2]} intensity={0.8} color="#FFD54F" />
        
        {/* 环境贴图 - 使用中国传统风格环境 */}
        <Environment preset="sunset" />
        
        {/* 轻雾效果 - 增加传统山水画氛围 */}
        <fog attach="fog" args={["#FBF8F1", 15, 30]} />
        
        <Suspense fallback={null}>
          <Scene />
          <Model />
        </Suspense>
        
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}