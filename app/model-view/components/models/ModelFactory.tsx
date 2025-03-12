"use client";

import React, { useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three-stdlib';
import * as THREE from 'three';
import { applyModelTextures, MODEL_CONFIGS } from '../../utils/modelUtils';

interface AllModelsProps {
  activeModelId: string;
  onLoad?: (modelId: string) => void;
}

// 所有可用的模型ID
const ALL_MODEL_IDS = Object.keys(MODEL_CONFIGS);

export default function AllModels({ activeModelId, onLoad }: AllModelsProps) {
  const [loadedModels, setLoadedModels] = useState<Record<string, boolean>>({});
  
  // 为每个模型加载FBX
  return (
    <>
      {ALL_MODEL_IDS.map(modelId => {
        // 加载FBX模型
        const fbx = useLoader(FBXLoader, `/models/${modelId}/${modelId}.fbx`);
        
        // 应用贴图
        useEffect(() => {
          if (!fbx || loadedModels[modelId]) return;
          
          try {
            console.log(`应用${modelId}的贴图...`);
            applyModelTextures(fbx, modelId);
            
            // 标记为已加载
            setLoadedModels(prev => ({...prev, [modelId]: true}));
            onLoad?.(modelId);
          } catch (error) {
            console.error(`应用贴图时发生错误 ${modelId}:`, error);
          }
        }, [fbx, modelId]);
        
        // 仅当是活动模型时显示
        return (
          <primitive 
            key={modelId}
            object={fbx} 
            visible={modelId === activeModelId}
          />
        );
      })}
    </>
  );
} 