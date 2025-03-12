"use client";

import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Text, useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
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
import StoneDog from '../model-view/components/StoneDog';

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
  response: string;
}

// 调用deepseek API
async function callDeepSeekAPI(messages: any[]) {
  try {
    const response = await fetch('/api/deepseek', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    return null;
  }
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

// 寺庙组件
function Temple({ position = [0, 0, -15], scale = 1 }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* 寺庙台基 - 更宽更大的基座 */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[16, 0.5, 12]} />
        <meshStandardMaterial color="#d9d0c1" roughness={0.8} />
      </mesh>

      {/* 第二层台基 */}
      <mesh position={[0, 0.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[14, 0.4, 10]} />
        <meshStandardMaterial color="#c9bfb0" roughness={0.7} />
      </mesh>

      {/* 正门台阶 */}
      <mesh position={[0, 0.3, 5.2]} receiveShadow castShadow>
        <boxGeometry args={[8, 0.6, 2.5]} />
        <meshStandardMaterial color="#c9bfb0" roughness={0.7} />
      </mesh>

      {/* 主殿 */}
      <mesh position={[0, 2.2, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 3, 8]} />
        <meshStandardMaterial color="#a0522d" roughness={0.6} />
      </mesh>

      {/* 传统中式屋顶 - 主体 */}
      <group position={[0, 3.8, 0]}>
        {/* 主屋顶 */}
        <mesh position={[0, 0.4, 0]} receiveShadow castShadow>
          <boxGeometry args={[13, 0.4, 9]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} />
        </mesh>

        {/* 屋顶上部 - 弯曲效果 */}
        <mesh position={[0, 0.9, 0]} receiveShadow castShadow>
          <boxGeometry args={[12, 0.6, 8]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} />
        </mesh>

        {/* 屋顶尖顶 */}
        <mesh position={[0, 1.4, 0]} receiveShadow castShadow>
          <boxGeometry args={[10, 0.6, 6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} />
        </mesh>

        {/* 翘角效果 - 前方 */}
        <mesh position={[0, 1, 4.2]} rotation={[0.3, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[10, 0.3, 1.5]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} />
        </mesh>

        {/* 翘角效果 - 后方 */}
        <mesh position={[0, 1, -4.2]} rotation={[-0.3, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[10, 0.3, 1.5]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} />
        </mesh>

        {/* 翘角效果 - 左侧 */}
        <mesh position={[6.2, 1, 0]} rotation={[0, 0, 0.3]} receiveShadow castShadow>
          <boxGeometry args={[1.5, 0.3, 6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} />
        </mesh>

        {/* 翘角效果 - 右侧 */}
        <mesh position={[-6.2, 1, 0]} rotation={[0, 0, -0.3]} receiveShadow castShadow>
          <boxGeometry args={[1.5, 0.3, 6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} />
        </mesh>
      </group>

      {/* 屋顶装饰 - 中央正脊 */}
      <mesh position={[0, 5.4, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 0.5, 0.5]} />
        <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* 屋顶装饰 - 琉璃瓦效果 */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 5.7, -3 + i * 1.5]} receiveShadow castShadow>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* 宝顶 */}
      <group position={[0, 5.9, 0]}>
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[0.5, 0.6, 0.8, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.8, 0]} receiveShadow castShadow>
          <coneGeometry args={[0.4, 1, 8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* 前柱子 - 8根柱子 */}
      {[-5, -3, 3, 5].map((x, i) => (
        <group key={i}>
          {/* 前排柱子 */}
          <mesh position={[x, 2, 4]} receiveShadow castShadow>
            <cylinderGeometry args={[0.35, 0.4, 3.4, 8]} />
            <meshStandardMaterial color="#8d6e63" roughness={0.6} />
          </mesh>
          {/* 后排柱子 */}
          <mesh position={[x, 2, -4]} receiveShadow castShadow>
            <cylinderGeometry args={[0.35, 0.4, 3.4, 8]} />
            <meshStandardMaterial color="#8d6e63" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* 门 - 改用中式红色大门 */}
      <group position={[0, 1.8, 4.01]}>
        {/* 门框 */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[4.1, 3.2, 0.3]} />
          <meshStandardMaterial color="#5c3a21" roughness={0.8} />
        </mesh>
        {/* 左门扇 */}
        <mesh position={[-1, 0, 0.2]} receiveShadow castShadow>
          <boxGeometry args={[1.8, 3, 0.1]} />
          <meshStandardMaterial color="#b71c1c" roughness={0.7} />
        </mesh>
        {/* 右门扇 */}
        <mesh position={[1, 0, 0.2]} receiveShadow castShadow>
          <boxGeometry args={[1.8, 3, 0.1]} />
          <meshStandardMaterial color="#b71c1c" roughness={0.7} />
        </mesh>
        {/* 门环装饰 */}
        {[-1, 1].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.3]} receiveShadow castShadow>
            <torusGeometry args={[0.3, 0.05, 16, 16]} />
            <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* 窗户 - 传统中式花窗 */}
      {[-4, 4].map((x, i) => (
        <group key={i} position={[x, 2.2, 4.01]}>
          {/* 窗框 */}
          <mesh receiveShadow castShadow>
            <boxGeometry args={[1.8, 1.8, 0.1]} />
            <meshStandardMaterial color="#5c3a21" roughness={0.7} />
          </mesh>
          {/* 窗格 - 横向 */}
          {[0.4, 0, -0.4].map((y, j) => (
            <mesh key={j} position={[0, y, 0.06]} receiveShadow castShadow>
              <boxGeometry args={[1.7, 0.1, 0.02]} />
              <meshStandardMaterial color="#8d6e63" roughness={0.5} />
            </mesh>
          ))}
          {/* 窗格 - 纵向 */}
          {[0.4, 0, -0.4].map((x, j) => (
            <mesh key={j + 3} position={[x, 0, 0.06]} receiveShadow castShadow>
              <boxGeometry args={[0.1, 1.7, 0.02]} />
              <meshStandardMaterial color="#8d6e63" roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}

      {/* 石狮子 */}
      {[-5, 5].map((x, i) => (
        <group key={i} position={[x, 0.9, 5]}>
          {/* 狮子身体 */}
          <mesh receiveShadow castShadow>
            <boxGeometry args={[1, 1, 1.6]} />
            <meshStandardMaterial color="#917c6f" roughness={0.8} />
          </mesh>
          {/* 狮子头 */}
          <mesh position={[0, 0.5, 0.6]} receiveShadow castShadow>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial color="#917c6f" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* 香炉 */}
      <group position={[0, 1.2, 6]}>
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[0.8, 0.6, 1.2, 16]} />
          <meshStandardMaterial color="#5c5c5c" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* 香炉盖 */}
        <mesh position={[0, 0.8, 0]} receiveShadow castShadow>
          <coneGeometry args={[0.6, 0.5, 16]} />
          <meshStandardMaterial color="#5c5c5c" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* 香 */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[(i - 2) * 0.2, 1.2, 0]} rotation={[0.1 * (i - 2), 0, 0]} receiveShadow castShadow>
            <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
            <meshStandardMaterial color="#a1887f" roughness={0.8} />
          </mesh>
        ))}
        {/* 烟雾 */}
        <group position={[0, 1.8, 0]}>
          {[...Array(4)].map((_, i) => (
            <mesh key={i} position={[0, i * 0.2, 0]} receiveShadow={false}>
              <sphereGeometry args={[0.25 + i * 0.1, 8, 8]} />
              <meshStandardMaterial
                color="#e0e0e0"
                transparent
                opacity={0.4 - i * 0.1}
                roughness={1}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* 神龛/佛像 */}
      <group position={[0, 2, -3]}>
        {/* 底座 */}
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[3, 0.5, 1.5]} />
          <meshStandardMaterial color="#8B4513" roughness={0.7} />
        </mesh>
        {/* 佛像轮廓 */}
        <mesh position={[0, 1.3, 0]} receiveShadow castShadow>
          <boxGeometry args={[1.5, 2, 0.8]} />
          <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>
      {/* 灯笼  */}
      {[-6, 6].map((x, i) => (
        <group key={i} position={[x, 3, 4.5]}>
          <mesh receiveShadow castShadow>
            <cylinderGeometry args={[0.4, 0.4, 1, 8]} />
            <meshStandardMaterial color="#b71c1c" roughness={0.7} emissive="#ff5252" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[0, -0.6, 0]} receiveShadow castShadow>
            <boxGeometry args={[0.1, 0.2, 0.1]} />
            <meshStandardMaterial color="#FFD700" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.6, 0]} receiveShadow castShadow>
            <boxGeometry args={[0.2, 0.1, 0.2]} />
            <meshStandardMaterial color="#5c3a21" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* 围栏/栏杆 */}
      <group position={[0, 0.9, 0]}>
        {/* 前栏杆 */}
        <mesh position={[0, 0, 4.8]} receiveShadow castShadow>
          <boxGeometry args={[12, 0.1, 0.1]} />
          <meshStandardMaterial color="#a0522d" roughness={0.7} />
        </mesh>

        {/* 后栏杆 */}
        <mesh position={[0, 0, -4.8]} receiveShadow castShadow>
          <boxGeometry args={[12, 0.1, 0.1]} />
          <meshStandardMaterial color="#a0522d" roughness={0.7} />
        </mesh>

        {/* 左栏杆 */}
        <mesh position={[5.8, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.1, 0.1, 10]} />
          <meshStandardMaterial color="#a0522d" roughness={0.7} />
        </mesh>

        {/* 右栏杆 */}
        <mesh position={[-5.8, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.1, 0.1, 10]} />
          <meshStandardMaterial color="#a0522d" roughness={0.7} />
        </mesh>

        {/* 栏杆柱子 - 周围分布 */}
        {[...Array(10)].map((_, i) => (
          <mesh key={i} position={[-5.8 + i * 1.3, -0.1, 4.8]} receiveShadow castShadow>
            <boxGeometry args={[0.15, 0.8, 0.15]} />
            <meshStandardMaterial color="#a0522d" roughness={0.7} />
          </mesh>
        ))}

        {/* 后栏杆柱子 */}
        {[...Array(10)].map((_, i) => (
          <mesh key={i + 10} position={[-5.8 + i * 1.3, -0.1, -4.8]} receiveShadow castShadow>
            <boxGeometry args={[0.15, 0.8, 0.15]} />
            <meshStandardMaterial color="#a0522d" roughness={0.7} />
          </mesh>
        ))}

        {/* 左右栏杆柱子 */}
        {[...Array(8)].map((_, i) => (
          <group key={i + 20}>
            <mesh position={[5.8, -0.1, -4.8 + i * 1.25]} receiveShadow castShadow>
              <boxGeometry args={[0.15, 0.8, 0.15]} />
              <meshStandardMaterial color="#a0522d" roughness={0.7} />
            </mesh>
            <mesh position={[-5.8, -0.1, -4.8 + i * 1.25]} receiveShadow castShadow>
              <boxGeometry args={[0.15, 0.8, 0.15]} />
              <meshStandardMaterial color="#a0522d" roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 牌匾 */}
      <group position={[0, 4, 4.8]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[4, 1, 0.2]} />
          <meshStandardMaterial color="#5c3a21" roughness={0.7} />
        </mesh>
        {/* 牌匾装饰边框 */}
        <mesh position={[0, 0, 0.05]} receiveShadow castShadow>
          <boxGeometry args={[3.8, 0.8, 0.05]} />
          <meshStandardMaterial color="#FFD700" metalness={0.4} roughness={0.6} />
        </mesh>
      </group>

      {/* 屋檐下的雕花装饰 */}
      <group position={[0, 3.75, 0]}>
        {/* 前檐装饰 */}
        <mesh position={[0, 0, 4.5]} receiveShadow castShadow>
          <boxGeometry args={[12, 0.3, 0.6]} />
          <meshStandardMaterial color="#8d6e63" roughness={0.7} />
        </mesh>
        {/* 后檐装饰 */}
        <mesh position={[0, 0, -4.5]} receiveShadow castShadow>
          <boxGeometry args={[12, 0.3, 0.6]} />
          <meshStandardMaterial color="#8d6e63" roughness={0.7} />
        </mesh>
        {/* 左右檐装饰 */}
        <mesh position={[6, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.6, 0.3, 10]} />
          <meshStandardMaterial color="#8d6e63" roughness={0.7} />
        </mesh>
        <mesh position={[-6, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[0.6, 0.3, 10]} />
          <meshStandardMaterial color="#8d6e63" roughness={0.7} />
        </mesh>
      </group>

      {/* 石阶路径 */}
      <mesh position={[0, -0.1, 12]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#c9bfb0" roughness={0.8} />
      </mesh>

      {/* 香火钱箱 */}
      <mesh position={[2, 1, 6]} receiveShadow castShadow>
        <boxGeometry args={[1, 0.7, 0.7]} />
        <meshStandardMaterial color="#5c3a21" roughness={0.6} />
      </mesh>

      {/* 内部地板纹理 - 红色地砖 */}
      <mesh position={[0, 0.96, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[11.5, 7.5]} />
        <meshStandardMaterial color="#6d4c41" roughness={0.7} />
      </mesh>

      {/* 装饰性藻井(天花板) */}
      <mesh position={[0, 3.7, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow castShadow>
        <circleGeometry args={[3, 16]} />
        <meshStandardMaterial color="#FFD700" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
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

      if (coinRef.current.position.y > -0.6) {
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

// 蝴蝶
function Butterfly({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // 蝴蝶飞舞动画
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.1;
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* 蝴蝶翅膀 */}
      <mesh castShadow>
        <boxGeometry args={[0.2, 0.01, 0.3]} />
        <meshStandardMaterial color="#4169E1" transparent opacity={0.6} />
      </mesh>
      <mesh castShadow rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.2, 0.01, 0.3]} />
        <meshStandardMaterial color="#4169E1" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// 花瓣
function FloatingPetal({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // 花瓣飘落动画
      meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() + position[0]) * 0.1;
      meshRef.current.position.x = position[0] + Math.cos(clock.getElapsedTime() * 0.5) * 0.1;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={[0, 0, Math.PI / 4]} castShadow>
      <planeGeometry args={[0.1, 0.1]} />
      <meshStandardMaterial color="#FFB7C5" side={THREE.DoubleSide} transparent opacity={0.8} />
    </mesh>
  );
}

// 莲花组件
function LotusFlower({ position = [0, 0, 0], scale = 1, rotation = 0, bloomLevel = 1 }) {
  // 基础颜色
  const petalColor = "#f8bbd0";
  const centerColor = "#fdd835";
  const stemColor = "#2e7d32";
  const leafColor = "#1b5e20";

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={[scale, scale, scale]}>
      {/* 莲茎 */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.05, 0.3, 8]} />
        <meshStandardMaterial color={stemColor} roughness={0.8} />
      </mesh>

      {/* 莲花底座 */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.08, 0.08, 8]} />
        <meshStandardMaterial color="#43a047" roughness={0.7} />
      </mesh>

      {/* 花瓣 - 第一层（底层） */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.22;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={`petal1-${i}`} position={[x, 0, z]} rotation={[0.3, angle, 0]}>
            <mesh castShadow>
              <coneGeometry args={[0.12, 0.25, 5, 1, true]} />
              <meshStandardMaterial
                color={petalColor}
                roughness={0.6}
                side={THREE.DoubleSide}
                emissive={petalColor}
                emissiveIntensity={0.05}
              />
            </mesh>
          </group>
        );
      })}

      {/* 花瓣 - 第二层（中层） - 仅在bloom级别 >= 1时显示 */}
      {bloomLevel >= 1 && [...Array(8)].map((_, i) => {
        const angle = ((i / 8) * Math.PI * 2) + (Math.PI / 8);
        const radius = 0.15;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={`petal2-${i}`} position={[x, 0.08, z]} rotation={[0.1, angle, 0]}>
            <mesh castShadow>
              <coneGeometry args={[0.1, 0.22, 5, 1, true]} />
              <meshStandardMaterial
                color={petalColor}
                roughness={0.6}
                side={THREE.DoubleSide}
                emissive={petalColor}
                emissiveIntensity={0.08}
              />
            </mesh>
          </group>
        );
      })}

      {/* 花瓣 - 第三层（内层） - 仅在bloom级别 >= 2时显示 */}
      {bloomLevel >= 2 && [...Array(5)].map((_, i) => {
        const angle = ((i / 5) * Math.PI * 2);
        const radius = 0.08;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={`petal3-${i}`} position={[x, 0.15, z]} rotation={[0, angle, 0]}>
            <mesh castShadow>
              <coneGeometry args={[0.07, 0.18, 5, 1, true]} />
              <meshStandardMaterial
                color={petalColor}
                roughness={0.6}
                side={THREE.DoubleSide}
                emissive={petalColor}
                emissiveIntensity={0.1}
              />
            </mesh>
          </group>
        );
      })}

      {/* 莲蓬中心 */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <sphereGeometry args={[0.08, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={centerColor} roughness={0.7} />
      </mesh>

      {/* 莲蓬中心的装饰点 */}
      {[...Array(12)].map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / 12);
        const theta = Math.sqrt(12 * Math.PI) * phi;
        const x = 0.06 * Math.cos(theta) * Math.sin(phi);
        const y = 0.16 + (0.06 * Math.cos(phi));
        const z = 0.06 * Math.sin(theta) * Math.sin(phi);

        return (
          <mesh key={`seed-${i}`} position={[x, y, z]} castShadow>
            <sphereGeometry args={[0.01, 4, 4]} />
            <meshStandardMaterial color="#bf360c" roughness={0.7} />
          </mesh>
        );
      })}
    </group>
  );
}

// 莲叶组件
function LotusLeaf({ position = [0, 0, 0], scale = 1, rotation = 0 }) {
  const leafColor = "#1b5e20";

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={[scale, scale, scale]}>
      {/* 叶柄 */}
      <mesh position={[0, -0.1, -0.15]} rotation={[Math.PI / 8, 0, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#2e7d32" roughness={0.8} />
      </mesh>

      {/* 叶片 - 使用圆盘几何体和材质的双面属性表示 */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2 - 0.2, 0, 0]} castShadow>
        <circleGeometry args={[0.35, 16]} />
        <meshStandardMaterial
          color={leafColor}
          roughness={0.7}
          side={THREE.DoubleSide}
          flatShading={true}
        />
      </mesh>

      {/* 叶片纹理 - 用线条表示叶脉 */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI;
        return (
          <mesh
            key={`vein-${i}`}
            position={[Math.cos(angle) * 0.15, 0.051, Math.sin(angle) * 0.15]}
            rotation={[Math.PI / 2 - 0.2, 0, angle]}
            castShadow
          >
            <boxGeometry args={[0.3, 0.005, 0.005]} />
            <meshStandardMaterial color="#0d3311" roughness={0.8} />
          </mesh>
        );
      })}

      {/* 叶片边缘褶皱效果 */}
      <mesh position={[0, 0.052, 0]} rotation={[Math.PI / 2 - 0.2, 0, 0]} castShadow>
        <ringGeometry args={[0.32, 0.35, 16, 8]} />
        <meshStandardMaterial
          color="#144a14"
          roughness={0.7}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0.7}
        />
      </mesh>

      {/* 叶片上的水珠 */}
      {[...Array(3)].map((_, i) => {
        const r = Math.random() * 0.2;
        const theta = Math.random() * Math.PI * 2;
        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);
        return (
          <mesh key={`waterdrop-${i}`} position={[x, 0.07, z]} castShadow>
            <sphereGeometry args={[0.02 + Math.random() * 0.01, 8, 8]} />
            <meshPhysicalMaterial
              color="#ffffff"
              roughness={0}
              metalness={0}
              transmission={1}
              thickness={0.3}
              clearcoat={1}
              clearcoatRoughness={0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// 莲花组 - 组合多个莲花和叶子
function LotusGroup({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* 莲花 - 不同的开放程度和旋转角度 */}
      <LotusFlower
        position={[0.3, 0.6, 0.2]}
        scale={0.9}
        rotation={Math.PI / 6}
        bloomLevel={2}
      />
      <LotusFlower
        position={[-0.5, 0.6, -0.3]}
        scale={0.8}
        rotation={Math.PI / 3}
        bloomLevel={1}
      />
      <LotusFlower
        position={[0.1, 0.6, -0.7]}
        scale={1.1}
        rotation={Math.PI / 2}
        bloomLevel={2}
      />

      {/* 莲叶 - 不同的大小和旋转角度 */}
      <LotusLeaf
        position={[-0.3, 0.6, 0.1]}
        scale={1.2}
        rotation={Math.PI / 4}
      />
      <LotusLeaf
        position={[0.6, 0.6, -0.4]}
        scale={1.4}
        rotation={Math.PI / 2}
      />
      <LotusLeaf
        position={[-0.7, 0.6, -0.6]}
        scale={1.3}
        rotation={-Math.PI / 3}
      />
      <LotusLeaf
        position={[0.4, 0.6, 0.7]}
        scale={1.1}
        rotation={-Math.PI / 6}
      />
    </group>
  );
}

// 简化的场景组件
function WishPoolScene({ onCoinThrow }: { onCoinThrow: () => void }) {
  // 定义池子半径，用于避免物体生成在池中
  const POOL_RADIUS = 6;

  // 判断位置是否在池子范围内
  const isInPoolArea = (x: number, z: number, buffer = 0) => {
    return Math.sqrt(x * x + z * z) < (POOL_RADIUS + buffer);
  };

  // 生成池外随机位置
  const generateOutsidePoolPosition = (maxDistance: number, buffer = 0) => {
    let x, z;
    do {
      x = (Math.random() - 0.5) * maxDistance * 2;
      z = (Math.random() - 0.5) * maxDistance * 2;
    } while (isInPoolArea(x, z, buffer));

    return [x, 0, z] as [number, number, number];
  };

  // 使用useMemo缓存随机生成的元素
  const trees = React.useMemo(() =>
    [...Array(20)].map((_, i) => (
      <Tree
        key={i}
        position={generateOutsidePoolPosition(30, 1)}
        scale={0.8 + Math.random() * 0.4}
      />
    ))
    , []);

  const rocks = React.useMemo(() =>
    [...Array(15)].map((_, i) => (
      <Rock
        key={i}
        position={generateOutsidePoolPosition(20, 1)}
        scale={0.5 + Math.random() * 1}
      />
    ))
    , []);

  const grasses = React.useMemo(() =>
    [...Array(100)].map((_, i) => (
      <Grass
        key={i}
        position={generateOutsidePoolPosition(25, 1)}
      />
    ))
    , []);

  // 修改静态硬币的位置和材质
  const coins = React.useMemo(() =>
    [...Array(100)].map((_, i) => {
      const radius = Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const scale = 0.1 + Math.random() * 0.15;
      const rotation = Math.random() * Math.PI;

      return (
        <mesh
          key={i}
          position={[x, 0.4, z]} // 提高位置，使其更接近水面
          rotation={[0, 0, rotation]}
          scale={[scale, scale, scale]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[1, 1, 0.1, 16]} />
          <meshStandardMaterial
            color={Math.random() > 0.3 ? "#FFD700" : "#E6BE8A"}
            metalness={0.9}
            roughness={0.1}
            emissive={Math.random() > 0.5 ? "#FFD700" : "#000000"} // 增加发光硬币的比例
            emissiveIntensity={0.4} // 增强发光强度
          />
        </mesh>
      );
    })
    , []);

  // 修改漂浮愿望的位置和材质
  const wishes = React.useMemo(() =>
    [...Array(50)].map((_, i) => {
      const radius = Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      // const y = -0.5 + Math.random() * 0.1; // 提高位置
      const rotation = Math.random() * Math.PI * 2;

      return (
        <Float
          key={i}
          speed={1}
          rotationIntensity={1}
          floatIntensity={0.8} // 增强浮动效果
          position={[x, 0.6, z]}
        >
          <mesh rotation={[-Math.PI / 2, 0, rotation]} castShadow>
            <planeGeometry args={[0.3, 0.3]} />
            <meshStandardMaterial
              color="#f5e6cc"
              transparent
              opacity={0.95} // 提高不透明度
              side={THREE.DoubleSide}
              emissive="#f5e6cc"
              emissiveIntensity={0.3} // 增强发光效果
            />
          </mesh>
        </Float>
      );
    })
    , []);

  // 蝴蝶
  const butterfly = React.useMemo(() => {
    [...Array(5)].map((_, i) => (
      <Butterfly
        key={`butterfly-${i}`}
        position={[
          Math.sin(i * Math.PI * 0.4) * 6,
          1.5 + Math.random(),
          Math.cos(i * Math.PI * 0.4) * 6
        ]}
      />
    ))
  }, [])

  // 花瓣
  const petal = React.useMemo(() => {
    [...Array(20)].map((_, i) => (
      <FloatingPetal
        key={`petal-${i}`}
        position={[
          (Math.random() - 0.5) * 12,
          2 + Math.random() * 2,
          (Math.random() - 0.5) * 12
        ]}
      />
    ))
  }, [])

  return (
    <>
      {/* 天空和环境 */}
      <Environment files="/models/venice_sunset_1k.hdr" />
      {/* <fog attach="fog" args={['#FBF8F1', 15, 30]} /> */}

      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#E8DFD3" />
      </mesh>

      {/* 远景山脉 */}
      <Mountain position={[-20, -1, -20]} scale={4} />
      <Mountain position={[-15, -1, -25]} scale={3.5} />
      <Mountain position={[20, -1, -20]} scale={4.5} />

      {/* 使用缓存的随机元素 */}
      {trees}
      {rocks}
      {grasses}

      {/* 添加寺庙 - 放在许愿池后面 */}
      <Temple position={[0, -0.1, -15]} scale={1.2} />

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
          <SimpleStoneDog position={config.position} rotation={config.rotation} />

          {/* 装饰柱 */}
          <group position={config.position} rotation={[0, config.rotation + Math.PI / 4, 0]}>
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

      {/* 添加莲花组 - 在水面上分布几组 */}
      <LotusGroup position={[-2.5, 0, -2.5]} />
      <LotusGroup position={[2.5, 0, 2.5]} />
      <LotusGroup position={[-2.5, 0, 2.5]} />
      <LotusGroup position={[2.5, 0, -2.5]} />

      {/* 单独添加几朵莲花和莲叶，增加变化 */}
      <LotusFlower position={[0, 0.6, 0]} scale={1.2} bloomLevel={2} />
      <LotusLeaf position={[1, 0.6, 0]} scale={1.5} rotation={Math.PI / 4} />
      <LotusLeaf position={[-1, 0.6, 0]} scale={1.3} rotation={-Math.PI / 4} />
      <LotusLeaf position={[0, 0.6, 1.5]} scale={1.4} rotation={Math.PI} />

      {/* 使用缓存的硬币和纸条 */}
      {coins}
      {wishes}
      {butterfly}
      {petal}


      {/* 增强环境光效果 */}
      <ambientLight intensity={0.5} color="#FFF1DB" />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.4}
        color="#FFE0B2"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* 添加点光源制造氛围 */}
      <pointLight position={[0, 3, 0]} intensity={1.5} color="#FFD54F" distance={15} />
      <pointLight position={[8, 2, 8]} intensity={1} color="#FFA07A" distance={10} />
      <pointLight position={[-8, 2, -8]} intensity={1} color="#FFA07A" distance={10} />
    </>
  );
}

// 1. 使用React.memo包装场景组件，避免不必要的重渲染
const MemoizedWishPoolScene = React.memo(WishPoolScene);

// 2. 分离表单状态和3D场景状态
export default function WishPoolPage() {
  // 3D场景相关状态
  const [showCoin, setShowCoin] = useState(false);
  const [isWishComplete, setIsWishComplete] = useState(false);
  // 添加新状态来存储API返回的响应
  const [wishResponse, setWishResponse] = useState<string>('');
  // 添加状态控制愿望列表的显示
  const [showWishList, setShowWishList] = useState(false);
  // 添加状态控制动画
  const [showAddAnimation, setShowAddAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  // 添加加载状态
  const [isLoading, setIsLoading] = useState(false);
  // 添加API调用标记，防止重复调用
  const isApiCallingRef = useRef(false);

  // 设置愿望上限
  const WISH_LIMIT = 20;

  // 从localStorage加载已完成的愿望
  const [completedWishes, setCompletedWishes] = useState<CompletedWish[]>([]);
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  // 使用useEffect在客户端加载localStorage数据
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishes = localStorage.getItem('completedWishes');
      if (savedWishes) {
        setCompletedWishes(JSON.parse(savedWishes));
      }
    }
  }, []); // 只在组件挂载时运行

  // 当completedWishes变化时，保存到localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('completedWishes', JSON.stringify(completedWishes));
    }
  }, [completedWishes]);

  // 表单相关状态 - 使用useRef代替useState减少重渲染
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDog, setSelectedDog] = useState<StoneDog>(STONE_DOGS[0]);
  const wishRef = useRef('');
  const nameRef = useRef('');
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 处理许愿
  const handleMakeWish = () => {
    if (!wishRef.current.trim()) return;

    // 检查是否达到愿望上限
    if (completedWishes.length >= WISH_LIMIT) {
      setShowLimitWarning(true);
      setTimeout(() => setShowLimitWarning(false), 3000);
      // 关闭对话框，让警告可见
      setIsDialogOpen(false);
      return;
    }

    // 显示投币动画
    setShowCoin(true);

    // 关闭对话框
    setIsDialogOpen(false);
  };

  // 投币动画完成 - 修改为等API调用成功后再添加愿望
  const handleCoinAnimationComplete = useCallback(async () => {
    // 防止重复调用API
    if (isApiCallingRef.current) return;
    isApiCallingRef.current = true;

    setShowCoin(false);
    setIsWishComplete(true);
    setIsLoading(true); // 开始加载

    // 准备新愿望对象，但暂不添加到列表
    const newWish = {
      id: Date.now(),
      dogId: selectedDog.id,
      dogName: selectedDog.name,
      wish: wishRef.current,
      name: nameRef.current || '匿名',
      date: new Date().toLocaleDateString('zh-CN'),
      response: '' // 新增属性用于存储API响应
    };

    // 调用API获取个性化响应
    try {
      const messages = [
        { role: "system", content: "你是一位古老的石狗守护神，负责守护人们的愿望。请用简短优美的语言回应这个愿望，不超过30个字。语气要温暖、神秘且充满希望。" },
        { role: "user", content: `我的愿望是：${wishRef.current}，我选择了${selectedDog.name}作为守护者。` }
      ];

      const response = await callDeepSeekAPI(messages);
      if (response && response.content) {
        newWish.response = response.content;
        setWishResponse(response.content);
      } else {
        // 如果API调用失败，使用默认响应
        const defaultResponse = `您的心愿已投入许愿池，由${selectedDog.name}守护。`;
        newWish.response = defaultResponse;
        setWishResponse(defaultResponse);
      }

      // API调用成功后，检查是否有重复愿望，然后添加到列表
      setCompletedWishes(prev => {
        // 检查是否已经存在相同内容的愿望
        const exists = prev.some(wish =>
          wish.wish === newWish.wish &&
          wish.dogId === newWish.dogId
        );
        if (exists) return prev;

        // 触发添加动画
        if (sidebarRef.current) {
          const rect = sidebarRef.current.getBoundingClientRect();
          setAnimationPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          });
          setShowAddAnimation(true);
          setTimeout(() => setShowAddAnimation(false), 1000);
        }

        // 自动显示侧边栏
        setShowWishList(true);

        return [newWish, ...prev];
      });

    } catch (error) {
      console.error('获取愿望响应失败:', error);
      const defaultResponse = `您的心愿已投入许愿池，由${selectedDog.name}守护。`;
      newWish.response = defaultResponse;
      setWishResponse(defaultResponse);

      // 即使API调用失败，也添加愿望到列表
      setCompletedWishes(prev => {
        const exists = prev.some(wish =>
          wish.wish === newWish.wish &&
          wish.dogId === newWish.dogId
        );
        if (exists) return prev;
        return [newWish, ...prev];
      });
    } finally {
      setIsLoading(false); // 结束加载
      isApiCallingRef.current = false; // 重置API调用标记
    }

    // 重置状态
    setTimeout(() => {
      setIsWishComplete(false);
      setWishResponse('');
    }, 5000); // 延长显示时间，让用户有足够时间阅读响应
  }, [selectedDog, wishRef, nameRef]);

  // 删除愿望
  const handleDeleteWish = (id: number) => {
    setCompletedWishes(prev => prev.filter(wish => wish.id !== id));
  };

  // 4. 使用useCallback优化事件处理函数
  const handleWishChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    wishRef.current = e.target.value;
  }, []);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    nameRef.current = e.target.value;
  }, []);

  const handleDogSelect = useCallback((dog: StoneDog) => {
    setSelectedDog(dog);
  }, []);

  // 切换愿望列表显示
  const toggleWishList = useCallback(() => {
    setShowWishList(prev => !prev);
  }, []);

  return (
    <div className="w-full h-screen relative bg-gradient-to-b from-[#FBF8F1] to-[#F5F0E6] overflow-hidden">
      {/* 3D 场景 */}
      <Canvas
        camera={{ position: [5, 5, 10], fov: 45 }}
        shadows
        className="absolute inset-0"
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
          {/* 使用记忆化的场景组件 */}
          <MemoizedWishPoolScene
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
          maxDistance={35}
          maxPolarAngle={Math.PI / 2 - 0.1}
          autoRotate={!isDialogOpen}
          autoRotateSpeed={0.2}
        />
      </Canvas>

      {/* 侧边愿望列表 */}
      <motion.div
        ref={sidebarRef}
        className="fixed top-15 right-0 bottom-0 h-[92vh] w-full md:w-80 bg-white/90 backdrop-blur-md shadow-lg z-10 overflow-hidden"
        initial={{ x: '100%' }}
        animate={{ x: showWishList ? '0%' : '100%' }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-6 space-y-4 h-full flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-zhanku text-[#3a2b23]">我的愿望</h3>
            <button
              onClick={toggleWishList}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#8B4513]/10 text-[#8B4513] hover:bg-[#8B4513]/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between bg-[#f8f5f0] px-3 py-2 rounded-lg">
            <span className="text-[#5d4037] font-medium">愿望总数</span>
            <span className="text-[#8B4513] font-bold">{completedWishes.length}/{WISH_LIMIT}</span>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-3">
              {completedWishes.length === 0 ? (
                <div className="text-center py-8 text-[#8d765e]">
                  <p>还没有许下愿望</p>
                  <p className="text-sm mt-2">点击"许下心愿"按钮开始</p>
                </div>
              ) : (
                completedWishes.map(w => (
                  <div
                    key={w.id}
                    className="text-sm text-[#5d4037] bg-[#f8f5f0] p-3 pl-4 pr-10 rounded-lg border-l-4 border-[#8B4513] hover:shadow-md transition-shadow relative"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#8B4513]"></div>
                        <span className="font-medium">{w.name}</span>
                      </div>
                      <span className="text-xs text-[#8d765e] bg-white/50 px-2 py-0.5 rounded-full">
                        {w.date}
                      </span>
                    </div>
                    <p className="pl-5 py-1">{w.wish}</p>
                    <p className="pl-5 py-1 text-[#5d4037] italic text-xs">{w.response}</p>
                    <div className="text-xs text-[#8d765e] mt-1 flex justify-between items-center">
                      <span className="pl-5">由 <span className="text-[#8B4513] font-medium">{w.dogName}</span> 守护</span>
                      <span className="text-[#8B4513]/70 text-xs">#{w.id.toString().slice(-4)}</span>
                    </div>

                    {/* 删除按钮 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWish(w.id);
                      }}
                      className="absolute top-3 right-3 w-7 h-7 rounded-md bg-[#f8f0e3] border border-[#8B4513]/30 flex items-center justify-center text-[#8B4513] hover:bg-[#8B4513]/10 transition-colors"
                      title="删除愿望"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 侧边栏触发按钮 - 无论是否有愿望都显示 */}
      {!showWishList && (
        <motion.button
          onClick={toggleWishList}
          className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-[#8B4513] text-white py-3 px-2 rounded-l-lg shadow-lg z-10"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="writing-vertical text-sm mt-2">我的愿望</div>
            {completedWishes.length > 0 && (
              <div className="flex items-center justify-center w-6 h-6 bg-white text-[#8B4513] rounded-full text-xs mt-2 font-bold">
                {completedWishes.length}
              </div>
            )}
          </div>
        </motion.button>
      )}

      {/* 界面元素 */}
      <div className="absolute top-16 inset-0 pointer-events-none flex flex-col items-center justify-between p-6">
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

        {/* 中间区域 - 愿望完成通知或加载状态 */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-xl shadow-xl max-w-md"
          >
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8B4513] mb-3"></div>
              <h2 className="text-xl font-zhanku text-[#3a2b23] mb-2">
                {selectedDog.name}正在守护您的愿望...
              </h2>
              <p className="text-[#5d4037] text-center">
                请稍候，您的心愿正在被石狗守护神接收
              </p>
            </div>
          </motion.div>
        ) : isWishComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-xl shadow-xl max-w-md"
          >
            <h2 className="text-xl font-zhanku text-[#3a2b23] mb-2">
              愿望已被{selectedDog.name}接收！
            </h2>
            <p className="text-[#5d4037]">
              {wishResponse || `您的心愿已投入许愿池，由${selectedDog.name}守护。`}
            </p>
            <div className="mt-3 text-xs text-[#8d765e] italic">
              - {selectedDog.name}
            </div>
          </motion.div>
        )}

        {/* 愿望上限警告 */}
        {showLimitWarning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 px-8 py-6 rounded-xl shadow-xl max-w-md"
          >
            <h2 className="text-xl font-medium mb-2">愿望数量已达上限！</h2>
            <p>您最多可以保存 {WISH_LIMIT} 条愿望，请删除一些旧愿望后再试。</p>
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
        </div>
      </div>

      {/* 愿望添加动画 - 从中心到侧边栏的动画 */}
      <AnimatePresence>
        {showAddAnimation && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            initial={{
              opacity: 1,
              scale: 1,
              x: window.innerWidth / 2,
              y: window.innerHeight / 2
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [1, 1.2, 0.8],
              x: animationPosition.x,
              y: animationPosition.y
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              times: [0, 0.6, 1]
            }}
          >
            <div className="bg-[#8B4513] text-white p-3 rounded-full shadow-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 许愿对话框 - 使用React.memo优化 */}
      <WishDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedDog={selectedDog}
        onDogSelect={handleDogSelect}
        onWishChange={handleWishChange}
        onNameChange={handleNameChange}
        onSubmit={handleMakeWish}
      />

      {/* 添加CSS样式 */}
      <style jsx global>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.4);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 69, 19, 0.5);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 69, 19, 0.7);
        }
      `}</style>
    </div>
  );
}

// 5. 分离对话框组件并使用React.memo
const WishDialog = React.memo(function WishDialog({
  isOpen,
  onOpenChange,
  selectedDog,
  onDogSelect,
  onWishChange,
  onNameChange,
  onSubmit
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDog: StoneDog;
  onDogSelect: (dog: StoneDog) => void;
  onWishChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}) {
  // 使用useState来跟踪输入值，确保组件内部状态更新
  const [wishText, setWishText] = useState('');
  const [nameText, setNameText] = useState('');

  // 处理输入变化，同时更新本地状态和父组件状态
  const handleWishChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWishText(e.target.value);
    onWishChange(e);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameText(e.target.value);
    onNameChange(e);
  };

  // 处理提交，提交后重置表单
  const handleSubmit = () => {
    onSubmit();
    // 表单数据会在对话框关闭后重置
  };

  // 当对话框打开状态变化时，重置表单
  useEffect(() => {
    if (!isOpen) {
      // 对话框关闭时重置表单
      setWishText('');
      setNameText('');
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#f5f0e6] border-[#8d765e]/30 rounded-xl max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-zhanku text-[#3a2b23]">
            石狗许愿
          </DialogTitle>
          <DialogDescription className="text-[#5d4037]">
            选择一位石狗守护者，写下您的心愿，投入许愿池。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#3a2b23]">您的名字（选填）</Label>
            <Input
              id="name"
              value={nameText}
              onChange={handleNameChange}
              placeholder="匿名"
              className="bg-white/80 border-[#8d765e]/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wish" className="text-[#3a2b23]">您的愿望</Label>
            <Textarea
              id="wish"
              value={wishText}
              onChange={handleWishChange}
              placeholder="写下您的心愿..."
              className="min-h-[100px] bg-white/80 border-[#8d765e]/20"
            />
          </div>

          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-[#8B4513]"></div>
              <span className="text-[#3a2b23] font-medium">当前守护者:</span>
              <span className="text-[#3a2b23] pl-2 font-bold">{selectedDog.name}</span>
            </div>
          </div>

          {/* 选择守护者 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STONE_DOGS.map(dog => (
              <div
                key={dog.id}
                onClick={() => onDogSelect(dog)}
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
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={!wishText.trim()} // 使用本地状态控制按钮禁用
            className="bg-[#8B4513] hover:bg-[#A0522D] text-white"
          >
            投入愿望
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}); 