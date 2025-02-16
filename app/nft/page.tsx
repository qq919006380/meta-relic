'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NFT_TAGS, NFT_TRAIT_LAYERS } from '../constants';

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

interface Filters {
  编号?: string;
  佩饰?: string;
  头?: string;
  眼睛?: string;
  身体?: string;
  鼻子?: string;
}

export default function NFTPage() {
  const [metadata, setMetadata] = useState<NFTMetadata[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [filteredNFTs, setFilteredNFTs] = useState<NFTMetadata[]>([]);

  useEffect(() => {
    fetch('/metadata/metadata.json')
      .then(res => res.json())
      .then(data => {
        setMetadata(data);
        setFilteredNFTs(data);
      })
      .catch(err => console.error('Error loading metadata:', err));
  }, []);

  useEffect(() => {
    let filtered = metadata;

    // 编号筛选（支持多选）
    if (filters.编号) {
      const selectedTags = filters.编号.split(',').filter(Boolean);
      if (selectedTags.length > 0) {
        filtered = filtered.filter(nft =>
          selectedTags.some(tag => nft.name.includes(tag))
        );
      }
    }

    // 属性筛选
    Object.entries(filters).forEach(([key, value]) => {
      if (key !== '编号' && value) {
        filtered = filtered.filter(nft =>
          nft.attributes.some(attr =>
            attr.trait_type === key && attr.value === value
          )
        );
      }
    });

    setFilteredNFTs(filtered);
  }, [filters, metadata]);

  const handleFilterChange = (key: string, value: string) => {
    if (key === '编号') {
      setFilters(prev => {
        const currentTags = prev.编号 ? prev.编号.split(',') : [];
        const tagIndex = currentTags.indexOf(value);

        let newTags;
        if (tagIndex === -1) {
          // 添加新标签
          newTags = [...currentTags, value];
        } else {
          // 移除已选标签
          newTags = currentTags.filter((_, index) => index !== tagIndex);
        }

        return {
          ...prev,
          编号: newTags.join(',')
        };
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: value || undefined
      }));
    }
  };

  if (!metadata.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-museum-sand text-museum-cream flex flex-col">
      <nav className="bg-museum-stone/60 p-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <Link href="/" className="flex justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={547}
                height={238}
                className="rounded-lg w-[100px]"
              />
            </Link>

            <div className="flex-1 flex flex-wrap justify-center gap-2 items-center">
              <div className='text-museum-slate'>搜索</div>
              {NFT_TAGS.map((tagName) => {
                const isSelected = filters.编号?.split(',').includes(tagName);
                const tagCount = metadata.filter(nft => nft.name.includes(tagName)).length;
                return (
                  <button
                    key={tagName}
                    onClick={() => handleFilterChange('编号', tagName)}
                    className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-museum-stone text-museum-cream'
                        : 'bg-museum-ink/80 text-museum-sand'
                    }`}
                  >
                    {tagName} ({tagCount})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 container mx-auto px-4">
        <p className="text-museum-slate text-sm mb-2 text-right">
          {filters.编号 ? '搜索结果' : '总共'}：{filteredNFTs.length} 个
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredNFTs.map((nft, index) => (
            <div
              key={nft.name}
              className="bg-museum-slate/30 rounded-lg overflow-hidden hover:bg-museum-stone/40 cursor-pointer transition-transform"
            >
              <div className="relative aspect-square">
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
                      className="absolute top-0 left-0"
                    />
                  );
                })}
                <div className="absolute z-10 bottom-0 left-0 right-0 bg-museum-ink/40 backdrop-blur-sm p-2">
                  <h3 className="text-center text-museum-cream font-medium">{nft.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}