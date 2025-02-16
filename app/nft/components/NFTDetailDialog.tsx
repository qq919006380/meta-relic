import Image from 'next/image';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { NFT_TRAIT_LAYERS } from '../../constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

  return (
    <Dialog open={!!nft} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 gap-0 h-[90vh] md:h-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full md:h-auto">
          {/* 左侧预览 */}
          <div className="relative md:m-0 m-auto aspect-square bg-museum-stone/30 h-[40vh] md:h-auto flex items-center justify-center">
            {NFT_TRAIT_LAYERS.map(({ trait, zIndex }) => {
              const path = nft.image[trait];
              if (!path) return null;
              return (
                <Image
                  key={trait}
                  src={path}
                  alt={trait}
                  fill
                  draggable={false}
                  style={{ objectFit: 'contain', zIndex }}
                  className="absolute top-0 left-0"
                />
              );
            })}
          </div>

          {/* 右侧属性选择 */}
          <div className="p-4 md:p-6 overflow-y-auto">
            <h2 className="text-lg md:text-xl font-bold mb-4">{nft.name}</h2>
            
            <Tabs defaultValue={NFT_TRAIT_LAYERS[0].trait} className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-5 h-auto gap-1">
                {NFT_TRAIT_LAYERS.map(({ trait }) => (
                  <TabsTrigger 
                    key={trait} 
                    value={trait}
                    className="text-xs md:text-sm data-[state=active]:bg-museum-stone/20"
                  >
                    {trait}
                  </TabsTrigger>
                ))}
              </TabsList>

              {NFT_TRAIT_LAYERS.map(({ trait }) => (
                <TabsContent key={trait} value={trait} className="mt-4">
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {getTraitOptions(allMetadata, trait).map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        className="aspect-square p-0 w-full h-full relative overflow-hidden"
                      >
                        <Image
                          src={`/metadata/img/${trait}/${option}.png`}
                          alt={`${trait} ${option}`}
                          fill
                          className="object-cover"
                        />
                      </Button>
                    ))}
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