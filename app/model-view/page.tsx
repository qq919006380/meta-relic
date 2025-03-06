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

export default function ModelViewPage() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        shadows
      >
        {/* 环境光照 */}
        <ambientLight intensity={0.7} />
        
        {/* 定向光 */}
        <directionalLight
          position={[5, 8, 3]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        {/* 背光源增强轮廓感 */}
        <directionalLight 
          position={[-3, 2, -3]} 
          intensity={0.6} 
          color="#FFF1DB" 
        />
        
        {/* 点光源 - 增加亮度 */}
        <pointLight position={[-5, 5, -5]} intensity={1} />
        
        {/* 环境贴图 - 增加真实感 */}
        <Environment preset="sunset" />
        
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}