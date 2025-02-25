import Image from 'next/image';
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog"
import { NFT_TAGS_MAP, NFT_TRAIT_LAYERS, BOTTOM_TAGS } from '../../constants';
import { NFTMetadata } from '@/app/nft/type';

interface NFTIntroDialogProps {
  nft: NFTMetadata | null;
  onOpenChange: (open: boolean) => void;
}

export function NFTIntroDialog({ nft, onOpenChange }: NFTIntroDialogProps) {
  if (!nft) return null;

  // 获取NFT名字中的两个字符
  const tags = nft.name.split(' ')[0].split('');
  const [firstTag, secondTag] = tags;

  return (
    <Dialog open={!!nft} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">
        {nft.name} - NFT Details
      </DialogTitle>
      <DialogContent className="max-w-[600px] min-h-[380px] p-0 gap-0 bg-[#a2855d] border-museum-stone/30 overflow-hidden [&>button]:hidden">
        <div className="relative">
          {/* 顶部标题 */}
          <div className="bg-museum-ink text-white h-[27%] flex items-center">
            <h2 className="text-6xl py-2 px-2 font-bold tracking-wider font-condensed flex justify-between w-full"
              style={{
                fontFamily: "'Oswald', sans-serif",
                WebkitTextStroke: '6px white',
              }}>
              <span>L</span><span>E</span><span>I</span><span>&nbsp;</span>
              <span>Z</span><span>H</span><span>O</span><span>U</span><span>&nbsp;</span>
              <span>D</span><span>O</span><span>G</span><span>&nbsp;</span>
              <span>S</span><span>T</span><span>O</span><span>N</span><span>E</span>
            </h2>
          </div>

          {/* 主要内容区域 */}
          <div className="relative p-2">
            <div className="w-[55%]">
              {/* 中文标题 */}
              <h1 className="text-5xl font-zhanku mb-1 text-museum-ink">雷州石狗</h1>

              {/* 英文描述 */}
              <p className="text-[#593f15] font-bold mb-2 leading-relaxed font-serif text-[8px]">
                The Leizhou culture is a rich in content,<br />
                has a long history of regional culture<br />
                and it generated and it is closely related<br />
                Leizhou stone dog culture is particularly prominent
              </p>

              {/* NFT名称 */}
              <h3 className="text-4xl font-zhanku mb-2 text-museum-ink">姓名：{tags}</h3>

              {/* 成语展示 */}
              <div className="mb-4">
                <div className="text-3xl font-zhanku bg-museum-ink/100 text-[#a2855d] px-1 inline-block">
                  {NFT_TAGS_MAP[firstTag as keyof typeof NFT_TAGS_MAP]}
                  <span className="mx-2"></span>
                  {NFT_TAGS_MAP[secondTag as keyof typeof NFT_TAGS_MAP]}
                </div>
              </div>

              {/* 底部成语 */}
              <div className="flex space-x-8 text-center font-bold text-[#4b3107]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                {
                  BOTTOM_TAGS.map((tag) => {
                    return (
                      <div key={tag.en} className="border-[2px] rounded-[17px] border-[#a08d77] border-t-0 border-b-0 p-1">
                        <div className="text-xs flex justify-center w-full">
                          <span>{tag.cn}</span>
                        </div>
                        <div className="text-[10px] flex justify-center w-full">
                          <span>{tag.en}</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          {/* 右侧图片 */}
          <div className="absolute right-0 top-4 w-[45%] h-full z-10">
            <div className="relative w-full h-full">
              {NFT_TRAIT_LAYERS.map(({ trait, zIndex }) => {
                const path = nft.image[trait];
                if (!path) return null;
                return (
                  <Image
                    key={trait}
                    src={path}
                    alt={trait}
                    fill
                    style={{ objectFit: 'contain', zIndex }}
                    className="absolute bottom-0 right-0"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 