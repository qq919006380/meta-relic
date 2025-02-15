import fs from 'fs';
import path from 'path';

interface NFTMetadata {
  name: string;
  description: string;
  image: {
    [key: string]: string;
  };
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

const IMAGES_DIR = path.join(process.cwd(), 'public', 'metadata','img');
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'metadata');
const TOTAL_NFTS = 100;

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 读取特征目录，过滤掉 .DS_Store 文件
const traitFolders = fs.readdirSync(IMAGES_DIR)
  .filter(folder => folder !== '.DS_Store');

console.log('Available folders:', traitFolders); // 现在应该只显示实际的特征文件夹

// 收集所有特征的图片
const traitImages: Record<string, string[]> = {};

traitFolders.forEach(folder => {
  const folderPath = path.join(IMAGES_DIR, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    const images = fs.readdirSync(folderPath)
      .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    traitImages[folder] = images;
  }
});

// 随机选择一个特征
function getRandomTrait(traitType: string): string {
  const traits = traitImages[traitType];
  return traits[Math.floor(Math.random() * traits.length)];
}

// 生成所有随机组合的 metadata
const allMetadata: NFTMetadata[] = [];

for (let i = 1; i <= TOTAL_NFTS; i++) {
  const metadata: NFTMetadata = {
    name: '', // 暂时为空，稍后设置
    description: '', // 暂时为空，稍后设置
    image: {},
    attributes: []
  };

  // 为每个特征类型随机选择一个特征
  traitFolders.forEach(traitType => {
    const selectedTrait = getRandomTrait(traitType);
    metadata.image[traitType] = `/metadata/img/${traitType}/${selectedTrait}`;
    metadata.attributes.push({
      trait_type: traitType,
      value: path.parse(selectedTrait).name
    });
  });

  // 获取头和鼻子的特征值
  const headValue = metadata.attributes.find(attr => attr.trait_type === '头')?.value || '';
  const noseValue = metadata.attributes.find(attr => attr.trait_type === '鼻子')?.value || '';
  
  // 组合名字
  metadata.name = `${headValue}${noseValue} #${i}`;
  metadata.description = `${metadata.name} - A unique combination of traits`;

  allMetadata.push(metadata);
}

// 写入 metadata 文件
const metadataPath = path.join(OUTPUT_DIR, 'metadata.json');
fs.writeFileSync(
  metadataPath,
  JSON.stringify(allMetadata, null, 2)
);

console.log('Generated metadata.json with 100 random combinations'); 