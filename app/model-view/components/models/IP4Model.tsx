"use client";

import React, { useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three-stdlib';
import * as THREE from 'three';
import { applyModelTextures } from '../../utils/modelUtils';

interface IP4ModelProps {
  onLoad?: () => void;
}

export default function IP4Model({ onLoad }: IP4ModelProps) {
  const modelId = 'IP4';
  const [isLoaded, setIsLoaded] = useState(false);
  
  // 加载FBX模型
  const fbx = useLoader(FBXLoader, `/models/${modelId}/${modelId}.fbx`);

  // 应用贴图
  useEffect(() => {
    if (!fbx || isLoaded) return;

    try {
      console.log(`开始应用 ${modelId} 的贴图...`);
      applyModelTextures(fbx, modelId);
      setIsLoaded(true);
      onLoad?.();
    } catch (error) {
      console.error(`Error applying textures to model ${modelId}:`, error);
      onLoad?.();
    }
  }, [fbx, modelId, onLoad, isLoaded]);

  return <primitive object={fbx} />;
} 