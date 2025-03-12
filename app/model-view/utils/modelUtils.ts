import * as THREE from 'three';

// Define more specific texture mapping types
export type MeshTextureMapping = {
  meshName: string;
  texturePath: string;
  materialProps?: {
    roughness?: number;
    metalness?: number;
    transparent?: boolean;
    alphaTest?: number;
    side?: THREE.Side;
  };
};

// Define model-specific texture mappings
export type ModelTextureConfig = {
  meshMappings: MeshTextureMapping[];
  defaultTexture?: string; // For any unmapped meshes
  scale?: [number, number, number];
  position?: [number, number, number];
};

// Complete mapping of all models and their textures
export const MODEL_CONFIGS: Record<string, ModelTextureConfig> = {
  'IP1': {
    scale: [0.005, 0.005, 0.005],
    position: [0, -1, 0],
    meshMappings: [
      { 
        meshName: '身体002', 
        texturePath: '/models/IP1/IP1.fbm/身体.png',
        materialProps: { roughness: 0.7, metalness: 0.2 }
      },
      { 
        meshName: '头001', 
        texturePath: '/models/IP1/IP1.fbm/头部.png',
        materialProps: { roughness: 0.7, metalness: 0.2 }
      },
      {
        meshName: '鼻子001',
        texturePath: '/models/IP1/IP1.fbm/鼻子.png',
        materialProps: { roughness: 0.7, metalness: 0.2 }
      },
      {
        meshName: '鼻子002',
        texturePath: '/models/IP1/IP1.fbm/鼻子.png',
        materialProps: { roughness: 0.7, metalness: 0.2 }
      },
      {
        meshName: '铃铛002',
        texturePath: '/models/IP1/IP1.fbm/铃铛.png',
        materialProps: { roughness: 0.7, metalness: 0.2 }
      },
    ],
    // defaultTexture: '/models/IP1/IP1.fbm/身体.png'
  },
  'IP3': {
    scale: [0.005, 0.005, 0.005],
    position: [0, -1, 0],
    meshMappings: [
     
      { 
        meshName: '第三个ip003', 
        texturePath: '/models/IP3/IP3.fbm/头部.png',
        materialProps: { roughness: 0.7, metalness: 0.2 }
      },
      { 
        meshName: '第三个ip004', 
        texturePath: '/models/IP3/IP3.fbm/铃铛.png',
        materialProps: { roughness: 0.4, metalness: 0.6 }
      },
      { 
        meshName: '第三个ip005', 
        texturePath: '/models/IP3/IP3.fbm/眼睛.png',
        materialProps: { roughness: 0.5, metalness: 0.3 }
      },
      { 
        meshName: '第三个ip006', 
        texturePath: '/models/IP3/IP3.fbm/鼻子.png',
        materialProps: { roughness: 0.6, metalness: 0.2 }
      },
      { 
        meshName: '第三个ip', 
        texturePath: '/models/IP3/IP3.fbm/身体.png',
        materialProps: { roughness: 0.7, metalness: 0.2 }
      },
    ],
    // defaultTexture: '/models/IP3/IP3.fbm/身体.png'
  },
  'IP4': {
    scale: [0.005, 0.005, 0.005],
    position: [0, -1, 0],
    meshMappings: [
      { 
        meshName: '身体', 
        texturePath: '/models/IP4/IP4.fbm/身体.png',
        materialProps: { roughness: 0.7, metalness: 0.2 }
      },
      { 
        meshName: '嘴巴', 
        texturePath: '/models/IP4/IP4.fbm/头部.png',
        materialProps: { roughness: 0.7, metalness: 0.2 }
      },
      // Add other specific mappings for IP4
    ],
    defaultTexture: '/models/IP4/IP4.fbm/身体.png'
  },
  'IP7': {
    scale: [0.005, 0.005, 0.005],
    position: [0, -1, 0],
    meshMappings: [
      { 
        meshName: '身体', 
        texturePath: '/models/IP7/IP7.fbm/身体.png',
        materialProps: { roughness: 0.7, metalness: 0.2 }
      },
      { 
        meshName: '头部', 
        texturePath: '/models/IP7/IP7.fbm/头部.png',
        materialProps: { roughness: 0.7, metalness: 0.2 }
      },
      // Add other specific mappings for IP7
    ],
    defaultTexture: '/models/IP7/IP7.fbm/身体.png'
  }
};

// Helper function to apply textures based on the model config
export function applyModelTextures(fbx: THREE.Group, modelId: string) {
  const config = MODEL_CONFIGS[modelId];
  if (!config) {
    console.error(`No texture configuration found for model: ${modelId}`);
    return;
  }

  // Apply scale and position
  if (config.scale) {
    fbx.scale.set(...config.scale);
  }
  
  if (config.position) {
    fbx.position.set(...config.position);
  }

  // Create texture cache to avoid loading the same texture multiple times
  const textureCache: Record<string, THREE.Texture> = {};

  // Function to get or load a texture
  const getTexture = (path: string): THREE.Texture => {
    if (!textureCache[path]) {
      const texture = new THREE.TextureLoader().load(path);
      texture.colorSpace = THREE.SRGBColorSpace;
      textureCache[path] = texture;
    }
    return textureCache[path];
  };

  // Log all mesh names for debugging
  console.log('Available meshes in model:', modelId);
  fbx.traverse(child => {
    if (child instanceof THREE.Mesh) {
      console.log('- Mesh:', child.name);
    }
  });

  // Apply textures to meshes
  fbx.traverse(child => {
    if (child instanceof THREE.Mesh) {
      // Ensure proper rendering
      child.geometry.computeVertexNormals();
      child.castShadow = true;
      child.receiveShadow = true;

      // Find matching texture mapping
      const mapping = config.meshMappings.find(m => 
        child.name.includes(m.meshName) || 
        child.name.toLowerCase() === m.meshName.toLowerCase()
      );

      if (mapping) {
        console.log(`Applying texture to mesh: ${child.name} -> ${mapping.texturePath}`);
        
        // Create material with the specified texture
        child.material = new THREE.MeshStandardMaterial({
          map: getTexture(mapping.texturePath),
          side: THREE.DoubleSide,
          transparent: false,
          alphaTest: 0.5,
          ...mapping.materialProps
        });
      } else if (config.defaultTexture) {
        console.log(`Using default texture for unmapped mesh: ${child.name}`);
        
        // Apply default texture
        child.material = new THREE.MeshStandardMaterial({
          map: getTexture(config.defaultTexture),
          roughness: 0.7,
          metalness: 0.2,
          side: THREE.DoubleSide
        });
      } else {
        console.warn(`No texture mapping found for mesh: ${child.name}`);
      }
    }
  });
} 