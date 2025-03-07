"use client";

import React, { Suspense, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { FBXLoader } from 'three-stdlib';
import * as THREE from 'three';
import Base from './components/Base';
import Baseplate from './components/Baseplate';
import Ground from './components/Ground';
import DecorativePillar from './components/DecorativePillar';
import MemorialArchway from './components/MemorialArchway';
import Pavilion from './components/Pavilion';
import StoneBridge from './components/StoneBridge';
import Censer from './components/Censer';
import Background from './components/Background';
import Mountain from './components/Mountain';
import StoneDog from './components/StoneDog';
import Tower from './components/Tower';
import TreeRight from './components/TreeRight';
import TreeLeft from './components/TreeLeft';
import Lantern from './components/Lantern';
import Cloud from './components/Cloud';
import MountainBg from './components/MountainBg';
import CloudPattern from './components/CloudPattern';
import LandscapeStone from './components/LandscapeStone';
// 手动贴图模型组件
function Model() {
  // 加载FBX模型
  const fbx = useLoader(FBXLoader, '/models/IP1/IP1.fbx');
  
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
      body: textureLoader.load('/models/IP1/IP1.fbm/身体.png'),
      head: textureLoader.load('/models/IP1/IP1.fbm/头部.png'),
      eyes: textureLoader.load('/models/IP1/IP1.fbm/眼睛.png'),
      nose: textureLoader.load('/models/IP1/IP1.fbm/鼻子.png'),
      bell: textureLoader.load('/models/IP1/IP1.fbm/铃铛.png')
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
      <Base />
      
      {/* 装饰纹样底盘 */}
      <Baseplate />
      
      {/* 地面 - 模拟古代地砖 */}
      <Ground />
      
      {/* 传统装饰柱 - 东 */}
      <DecorativePillar position={[6, -1, -2]} />
      
      {/* 传统装饰柱 - 西 */}
      <DecorativePillar position={[-6, -1, -2]} />

      {/* 传统中式牌坊 - 背景 */}
      <MemorialArchway />
      
      {/* 古代亭子 - 右侧 */}
      <Pavilion />
      
      {/* 古代石桥 - 左侧 */}
      <StoneBridge />
      
      {/* 香炉 - 模型前方 */}
      <Censer />
      
      {/* 远景背景 - 传统山水画风格 */}
      <Background />
      
      {/* 远景山脉 - 左侧 */}
      <Mountain position={[-10, 2, -14]} opacity={0.6} args={[8, 7, 16, 1, true]} />
      
      {/* 远景山脉 - 右侧 */}
      <Mountain position={[10, 1, -14]} opacity={0.5} args={[10, 5, 16, 1, true]} />
      
      {/* 点缀小石狗装饰 - 左侧 */}
      <StoneDog position={[-3, -0.95, 2]} />
      
      {/* 点缀小石狗装饰 - 右侧 */}
      <StoneDog position={[3, -0.95, 2]} />
      
      {/* 添加远处的塔楼 - 远景点缀 */}
      <Tower/>
      
      {/* 传统松树群 - 右前方 */}
      <TreeRight/>
      
      {/* 传统松树群 - 左前方 */}
      <TreeLeft/>
      
      {/* 传统灯笼 - 成对放置 */}
      <Lantern/>
      
      {/* 云雾效果 - 远景装饰 */}
      <Cloud/>
      
      {/* 更多远景山脉 - 层叠效果 */}
      <MountainBg/>
      
      {/* 装饰云纹图案 - 地面上 */}
      <CloudPattern/>
      
      {/* 景观石 - 右侧装饰 */}
      <LandscapeStone position1={[6, -1, 6]} position2={[0.8, 0.6, 0.3]} position3={[-0.5, 0.3, 0.5]} args1={[1.2]} args2={[0.7]} args3={[0.6]} />
      
      {/* 景观石 - 左侧装饰 */}
      <LandscapeStone position1={[-6, -1, 6]} position2={[0.6, 0.7, -0.2]} position3={[-0.7, 0.4, 0.3]} args1={[1]} args2={[0.6]} args3={[0.5]} />
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
        {/* <Environment preset="sunset" /> */}
        <Environment files="/models/venice_sunset_1k.hdr" />
        
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