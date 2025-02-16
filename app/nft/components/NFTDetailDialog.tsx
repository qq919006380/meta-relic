import Image from 'next/image';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { NFT_TRAIT_LAYERS } from '../../constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toPng } from 'html-to-image';
import { useRef } from 'react';

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

interface NFTDetailDialogProps {
  nft: NFTMetadata | null;
  onOpenChange: (open: boolean) => void;
  allMetadata: NFTMetadata[];
}

// 创建一个新的 helper 函数来获取所有特质选项
function getTraitOptions(metadata: NFTMetadata[], traitType: string): string[] {
  const options = new Set<string>();
  metadata.forEach(nft => {
    const trait = nft.attributes.find(attr => attr.trait_type === traitType);
    if (trait) {
      options.add(trait.value);
    }
  });
  return Array.from(options);
}

export function NFTDetailDialog({ nft, onOpenChange, allMetadata }: NFTDetailDialogProps) {
  if (!nft) return null;
  
  // 添加状态来跟踪每个特质的当前值
  const [currentTraits, setCurrentTraits] = useState(() => {
    // 初始化为 NFT 当前的特质
    return nft.attributes.reduce((acc, attr) => {
      acc[attr.trait_type] = attr.value;
      return acc;
    }, {} as Record<string, string>);
  });

  const imageRef = useRef<HTMLDivElement>(null);

  // 处理特质切换
  const handleTraitChange = (traitType: string, value: string) => {
    setCurrentTraits(prev => ({
      ...prev,
      [traitType]: value
    }));
  };

  const handleExport = async () => {
    if (!imageRef.current) return;
    // console.log('imageRef.current', imageRef.current);
    // return;
    try {
      const dataUrl = await toPng(imageRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        cacheBust: true,
      });
      
      // 检查是否支持原生分享API
      if (navigator.share) {
        // 将 base64 转换为 Blob
        const blob = await fetch(dataUrl).then(res => res.blob());
        const file = new File([blob], `${nft.name}.png`, { type: 'image/png' });
        
        try {
          await navigator.share({
            files: [file],
            title: nft.name,
          });
          return;
        } catch (err) {
          console.log('分享失败，回退到下载', err);
        }
      }
      
      // 如果不支持分享或分享失败，回退到下载
      const link = document.createElement('a');
      link.download = `${nft.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('导出图片失败:', err);
    }
  };

  return (
    <Dialog open={!!nft} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">
        {nft.name} - NFT Details
      </DialogTitle>
      <DialogContent className="max-w-4xl p-0 gap-0 h-[90vh] md:h-auto bg-museum-sand border-museum-stone/30">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full md:h-auto">
          {/* 左侧预览 */}
          <div className="relative md:m-0 m-auto aspect-square bg-museum-stone/10 h-[40vh] md:h-auto flex items-center justify-center">
            <div ref={imageRef} className="relative w-full h-full">
              {NFT_TRAIT_LAYERS.map(({ trait, zIndex }) => {
                // 使用当前选中的特质值来显示图片
                const value = currentTraits[trait];
                if (!value) return null;
                return (
                  <Image
                    key={trait}
                    src={`/metadata/img/${trait}/${value}.png`}
                    alt={trait}
                    fill
                    draggable={false}
                    style={{ objectFit: 'contain', zIndex }}
                    className="absolute top-0 left-0"
                  />
                );
              })}
            </div>
            <Button 
              onClick={handleExport}
              className="absolute z-20 bottom-4 left-4 bg-museum-ink text-museum-sand hover:bg-museum-ink/90"
            >
              导出图片
            </Button>
          </div>

          {/* 右侧属性选择 */}
          <div className="p-4 md:p-6 overflow-y-auto">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-museum-ink">{nft.name}</h2>
            
            <Tabs defaultValue={NFT_TRAIT_LAYERS[0].trait} className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-5 h-auto gap-1 bg-museum-stone/5">
                {NFT_TRAIT_LAYERS.map(({ trait }) => (
                  <TabsTrigger 
                    key={trait} 
                    value={trait}
                    className="text-xs md:text-sm text-museum-slate data-[state=active]:bg-museum-stone/20 data-[state=active]:text-museum-ink"
                  >
                    {trait}
                  </TabsTrigger>
                ))}
              </TabsList>

              {NFT_TRAIT_LAYERS.map(({ trait }) => (
                <TabsContent key={trait} value={trait} className="mt-4">
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {getTraitOptions(allMetadata, trait).map((option) => {
                      const isSelected = currentTraits[trait] === option;
                      return (
                        <div
                          key={option}
                          onClick={() => handleTraitChange(trait, option)}
                          className={`
                            aspect-square p-0 w-full h-full relative overflow-hidden cursor-pointer
                            border border-museum-stone/30 bg-museum-stone/5 rounded-md
                            ${isSelected ? 'ring-2 ring-museum-ink ring-offset-2 ring-offset-museum-sand' : ''}
                          `}
                        >
                          <Image
                            src={`/metadata/img/${trait}/${option}.png`}
                            alt={`${trait} ${option}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 