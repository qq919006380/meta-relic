"use client";

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Text, useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { FBXLoader } from 'three-stdlib';
import { Water } from 'three-stdlib';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 导入现有的场景组件
import Base from '../model-view/components/Base';
import Baseplate from '../model-view/components/Baseplate';
import Ground from '../model-view/components/Ground';
import DecorativePillar from '../model-view/components/DecorativePillar';
import Background from '../model-view/components/Background';
import StoneDog from '../model-view/components/StoneDog';
import TreeLeft from '../model-view/components/TreeLeft';
import TreeRight from '../model-view/components/TreeRight';
import Lantern from '../model-view/components/Lantern';
import Cloud from '../model-view/components/Cloud';

// 定义石狗类型
const STONE_DOGS = [
  { id: 'guardian', name: '守护石狗', description: '用于保护安全、家庭和健康的愿望', modelId: 'IP1' },
  { id: 'diligent', name: '勤劳石狗', description: '用于学业、工作和事业成功的愿望', modelId: 'IP3' },
  { id: 'loyal', name: '忠诚石狗', description: '用于感情、友谊和忠诚相关的愿望', modelId: 'IP4' },
  { id: 'brave', name: '勇敢石狗', description: '用于克服困难、勇气和挑战的愿望', modelId: 'IP7' },
];

// 类型定义
interface StoneDog {
  id: string;
  name: string;
  description: string;
  modelId: string;
}

interface WishCoinProps {
  position: [number, number, number];
  onAnimationComplete: () => void;
}

interface SimpleStoneDogProps {
  position: [number, number, number];
  rotation: number;
}

interface CompletedWish {
  id: number;
  dogId: string;
  dogName: string;
  wish: string;
  name: string;
  date: string;
}

// 添加自然元素组件
function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position}>
      {/* 树干 */}
      <mesh position={[0, scale * 0.7, 0]} castShadow>
        <cylinderGeometry args={[scale * 0.1, scale * 0.15, scale * 1.4, 8]} />
        <meshStandardMaterial color="#4A3B22" roughness={0.9} />
      </mesh>
      {/* 树冠 */}
      <mesh position={[0, scale * 1.5, 0]} castShadow>
        <coneGeometry args={[scale * 0.6, scale * 1.6, 8]} />
        <meshStandardMaterial color="#1B4D3E" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Rock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} castShadow>
      <dodecahedronGeometry args={[scale * 0.5]} />
      <meshStandardMaterial color="#696969" roughness={0.8} />
    </mesh>
  );
}

function Grass({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 0.2,
            Math.random() * 0.1,
            (Math.random() - 0.5) * 0.2
          ]}
          rotation={[0, Math.random() * Math.PI, 0]}
        >
          <boxGeometry args={[0.02, 0.1, 0.02]} />
          <meshStandardMaterial color="#355E3B" />
        </mesh>
      ))}
    </group>
  );
}

function Mountain({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} castShadow>
      <coneGeometry args={[scale * 2, scale * 3, 4]} />
      <meshStandardMaterial color="#4A5D23" roughness={1} />
    </mesh>
  );
}

// 水池效果组件
function WishingPool() {
  const { scene } = useThree();
  const waterRef = useRef<Water | null>(null);
  
  useEffect(() => {
    const waterGeometry = new THREE.CircleGeometry(3, 32);
    const water = new Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('/textures/waternormals.jpg', function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }),
        sunDirection: new THREE.Vector3(0, 1, 0),
        sunColor: 0xffffff,
        waterColor: 0x89cff0,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
      }
    );

    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.9;

    waterRef.current = water;
    scene.add(water);

    return () => {
      scene.remove(water);
      waterGeometry.dispose();
    };
  }, [scene]);

  useFrame(() => {
    if (waterRef.current) {
      waterRef.current.material.uniforms['time'].value += 0.01;
    }
  });

  return null;
}

// 许愿币组件
function WishCoin({ position, onAnimationComplete }: WishCoinProps) {
  const coinRef = useRef<THREE.Mesh>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  
  useEffect(() => {
    setAnimationStarted(true);
  }, []);
  
  useFrame(() => {
    if (coinRef.current && animationStarted) {
      coinRef.current.rotation.y += 0.1;
      
      if (coinRef.current.position.y > -0.9) {
        coinRef.current.position.y -= 0.05;
      } else {
        onAnimationComplete();
      }
    }
  });
  
  return (
    <mesh ref={coinRef} position={position}>
      <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
      <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

// 简化的石狗模型组件
function SimpleStoneDog({ position, rotation }: SimpleStoneDogProps) {
  return (
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
  );
}

// 漂浮的纸条/愿望
function FloatingWishes() {
  return (
    <>
      {[...Array(15)].map((_, i) => {
        const x = (Math.random() - 0.5) * 5;
        const z = (Math.random() - 0.5) * 5;
        const y = -0.8 + Math.random() * 0.1;
        const rotation = Math.random() * Math.PI * 2;
        
        return (
          <Float 
            key={i}
            speed={1} 
            rotationIntensity={1}
            floatIntensity={0.5}
            position={[x, y, z]}
          >
            <mesh rotation={[-Math.PI / 2, 0, rotation]}>
              <planeGeometry args={[0.3, 0.3]} />
              <meshStandardMaterial 
                color="#f5e6cc" 
                transparent 
                opacity={0.8}
                side={THREE.DoubleSide}
              />
            </mesh>
          </Float>
        );
      })}
    </>
  );
}

// 简化的场景组件
function WishPoolScene({ onCoinThrow }: { onCoinThrow: () => void }) {
  return (
    <>
      {/* 天空和环境 */}
      <Environment preset="sunset" />
      <fog attach="fog" args={['#FBF8F1', 15, 30]} />

      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#E8DFD3" />
      </mesh>

      {/* 远景山脉 */}
      <Mountain position={[-20, -1, -20]} scale={4} />
      <Mountain position={[-15, -1, -25]} scale={3.5} />
      <Mountain position={[20, -1, -20]} scale={4.5} />

      {/* 树木装饰 */}
      {[...Array(20)].map((_, i) => (
        <Tree 
          key={i}
          position={[
            (Math.random() - 0.5) * 30,
            0,
            (Math.random() - 0.5) * 30
          ]}
          scale={0.8 + Math.random() * 0.4}
        />
      ))}

      {/* 岩石装饰 */}
      {[...Array(15)].map((_, i) => (
        <Rock
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            0,
            (Math.random() - 0.5) * 20
          ]}
          scale={0.5 + Math.random() * 1}
        />
      ))}

      {/* 草地装饰 */}
      {[...Array(100)].map((_, i) => (
        <Grass
          key={i}
          position={[
            (Math.random() - 0.5) * 25,
            0,
            (Math.random() - 0.5) * 25
          ]}
        />
      ))}

      {/* 许愿池台阶 */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[4.5, 5, 0.2, 32]} />
        <meshStandardMaterial color="#9C8C7C" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.3, 0]} receiveShadow>
        <cylinderGeometry args={[4, 4.5, 0.2, 32]} />
        <meshStandardMaterial color="#8B7355" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.5, 0]} receiveShadow>
        <cylinderGeometry args={[3.5, 4, 0.2, 32]} />
        <meshStandardMaterial color="#9C8C7C" roughness={0.7} />
      </mesh>

      {/* 许愿池内壁 */}
      <mesh position={[0, 0.7, 0]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.2, 0.4, 32]} />
        <meshStandardMaterial color="#8B7355" roughness={0.7} />
      </mesh>

      {/* 水池效果 */}
      <WishingPool />
      <FloatingWishes />

      {/* 四个石狗 */}
      <SimpleStoneDog position={[3.2, 0, 0]} rotation={-Math.PI/2} />
      <SimpleStoneDog position={[0, 0, -3.2]} rotation={Math.PI} />
      <SimpleStoneDog position={[-3.2, 0, 0]} rotation={Math.PI/2} />
      <SimpleStoneDog position={[0, 0, 3.2]} rotation={0} />

      {/* 角落装饰柱 */}
      {[0, Math.PI/2, Math.PI, -Math.PI/2].map((rotation, i) => (
        <group key={i} position={[Math.sin(rotation) * 4.5, 0, Math.cos(rotation) * 4.5]} rotation={[0, rotation + Math.PI/4, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.4, 1.5, 0.4]} />
            <meshStandardMaterial color="#8B7355" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.85, 0]} castShadow>
            <boxGeometry args={[0.6, 0.2, 0.6]} />
            <meshStandardMaterial color="#A0522D" roughness={0.6} />
          </mesh>
          {/* 顶部装饰 */}
          <mesh position={[0, 1, 0]} castShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#CD853F" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* 水池中央的文字 */}
      <Text
        position={[0, 0.6, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.3}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        福慧石狗池
      </Text>
    </>
  );
}

export default function WishPoolPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState<StoneDog>(STONE_DOGS[0]);
  const [wish, setWish] = useState('');
  const [name, setName] = useState('');
  const [showCoin, setShowCoin] = useState(false);
  const [isWishComplete, setIsWishComplete] = useState(false);
  const [completedWishes, setCompletedWishes] = useState<CompletedWish[]>([]);
  
  // 处理许愿
  const handleMakeWish = () => {
    if (!wish.trim()) return;
    
    // 显示投币动画
    setShowCoin(true);
    
    // 记录愿望
    const newWish = {
      id: Date.now(),
      dogId: selectedDog.id,
      dogName: selectedDog.name,
      wish: wish,
      name: name || '匿名',
      date: new Date().toLocaleDateString('zh-CN')
    };
    
    // 关闭对话框
    setIsDialogOpen(false);
  };
  
  // 投币动画完成
  const handleCoinAnimationComplete = () => {
    setShowCoin(false);
    setIsWishComplete(true);
    
    // 添加到已完成愿望列表
    const newWish = {
      id: Date.now(),
      dogId: selectedDog.id,
      dogName: selectedDog.name,
      wish: wish,
      name: name || '匿名',
      date: new Date().toLocaleDateString('zh-CN')
    };
    setCompletedWishes(prev => [newWish, ...prev]);
    
    // 重置状态
    setTimeout(() => {
      setIsWishComplete(false);
      setWish('');
      setName('');
    }, 3000);
  };

  return (
    <div className="w-full h-screen relative bg-gradient-to-b from-[#FBF8F1] to-[#F5F0E6]">
      {/* 3D 场景 */}
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        shadows
      >
        {/* 场景光源 */}
        <ambientLight intensity={0.4} color="#FFF1DB" />
        <directionalLight
          position={[5, 8, 3]}
          intensity={1.2}
          color="#FFE0B2"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[0, 3, 0]} intensity={1.2} color="#FFD54F" distance={10} />
        
        {/* 环境和雾效 */}
        <Environment files="/models/venice_sunset_1k.hdr" />
        <fog attach="fog" args={["#FBF8F1", 15, 30]} />
        
        <Suspense fallback={null}>
          <WishPoolScene 
            onCoinThrow={() => setShowCoin(true)}
          />
          
          {/* 投币动画 */}
          {showCoin && (
            <WishCoin 
              position={[0, 2, 0]} 
              onAnimationComplete={handleCoinAnimationComplete}
            />
          )}
        </Suspense>
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2 - 0.1}
          autoRotate={!isDialogOpen}
          autoRotateSpeed={0.2}
        />
      </Canvas>
      
      {/* 界面元素 */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-6">
        {/* 顶部标题 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg pointer-events-auto"
        >
          <h1 className="text-2xl md:text-3xl font-zhanku text-[#3a2b23]">
            石狗许愿池
          </h1>
        </motion.div>
        
        {/* 中间区域 - 愿望完成通知 */}
        {isWishComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-xl shadow-xl max-w-md"
          >
            <h2 className="text-xl font-zhanku text-[#3a2b23] mb-2">愿望已被{selectedDog.name}接收！</h2>
            <p className="text-[#5d4037]">您的心愿已投入许愿池，由{selectedDog.name}守护。</p>
          </motion.div>
        )}
        
        {/* 底部按钮 */}
        <div className="w-full max-w-4xl flex flex-col md:flex-row justify-center items-center gap-4 pointer-events-auto">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onClick={() => setIsDialogOpen(true)}
            className="px-6 py-3 bg-[#8B4513] text-white rounded-full shadow-lg 
                      hover:bg-[#A0522D] transition-colors duration-300 
                      text-lg md:text-xl font-zhanku"
          >
            许下心愿
          </motion.button>
          
          {completedWishes.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md rounded-lg p-4 max-w-xs md:max-w-md"
            >
              <h3 className="text-lg font-medium text-[#3a2b23] mb-2">最近的愿望</h3>
              <div className="space-y-2 max-h-28 overflow-y-auto">
                {completedWishes.slice(0, 3).map(w => (
                  <div key={w.id} className="text-sm text-[#5d4037] bg-[#f8f5f0] p-2 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{w.name}</span>
                      <span className="text-xs text-[#8d765e]">{w.date}</span>
                    </div>
                    <p className="truncate">{w.wish}</p>
                    <div className="text-xs text-[#8d765e] mt-1">由{w.dogName}守护</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* 许愿对话框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#f5f0e6] border-[#8d765e]/30 rounded-xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-zhanku text-[#3a2b23]">
              石狗许愿
            </DialogTitle>
            <DialogDescription className="text-[#5d4037]">
              选择一位石狗守护者，写下您的心愿，投入许愿池。
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="wish" className="mt-4">
            <TabsList className="bg-[#e8e0d2] grid grid-cols-2">
              <TabsTrigger value="wish">许愿</TabsTrigger>
              <TabsTrigger value="dogs">选择守护者</TabsTrigger>
            </TabsList>
            
            <TabsContent value="wish" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#3a2b23]">您的名字（选填）</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="匿名"
                  className="bg-white/80 border-[#8d765e]/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="wish" className="text-[#3a2b23]">您的愿望</Label>
                <Textarea 
                  id="wish" 
                  value={wish} 
                  onChange={e => setWish(e.target.value)} 
                  placeholder="写下您的心愿..."
                  className="min-h-[100px] bg-white/80 border-[#8d765e]/20"
                />
              </div>
              
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded-full bg-[#8B4513]"></div>
                  <span className="text-[#3a2b23] font-medium">当前守护者:</span>
                </div>
                <div className="bg-[#8B4513]/10 p-3 rounded-lg">
                  <div className="font-medium text-[#3a2b23]">{selectedDog.name}</div>
                  <div className="text-sm text-[#5d4037]">{selectedDog.description}</div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="dogs" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STONE_DOGS.map(dog => (
                  <div 
                    key={dog.id}
                    onClick={() => setSelectedDog(dog)}
                    className={`p-3 rounded-lg cursor-pointer transition-all
                              ${selectedDog.id === dog.id 
                                ? 'bg-[#8B4513] text-white' 
                                : 'bg-[#8B4513]/10 text-[#3a2b23] hover:bg-[#8B4513]/20'}`}
                  >
                    <div className="font-medium">{dog.name}</div>
                    <div className={`text-sm ${selectedDog.id === dog.id ? 'text-white/80' : 'text-[#5d4037]'}`}>
                      {dog.description}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button 
              onClick={handleMakeWish}
              disabled={!wish.trim()}
              className="bg-[#8B4513] hover:bg-[#A0522D] text-white"
            >
              投入愿望
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 