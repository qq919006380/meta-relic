'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
const tag=['守','兴','勇','忠','勤','福']

export default function NFTPage() {
  const [metadata, setMetadata] = useState<NFTMetadata[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [filteredNFTs, setFilteredNFTs] = useState<NFTMetadata[]>([]);
  const [searchText, setSearchText] = useState('');

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

  const handleSearch = () => {
    handleFilterChange('编号', searchText);
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
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {tag.map((tagName) => {
            const isSelected = filters.编号?.split(',').includes(tagName);
            return (
              <button
                key={tagName}
                onClick={() => handleFilterChange('编号', tagName)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isSelected
                    ? 'bg-museum-stone text-museum-cream' 
                    : 'bg-museum-slate text-museum-sand hover:bg-museum-stone'
                }`}
              >
                {tagName}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-4 gap-6">
          {filteredNFTs.map((nft, index) => (
            <div 
              key={nft.name}
              className="bg-museum-stone/60 rounded-lg overflow-hidden hover:scale-105 transition-transform"
            >
              {/* NFT 图片预览 */}
              <div className="relative aspect-square">
                {['身体', '头', '眼睛', '鼻子', '佩饰'].map((trait) => {
                  const path = nft.image[trait];
                  if (!path) return null;
                  return (
                    <Image
                      key={trait}
                      src={path}
                      alt={trait}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="absolute top-0 left-0"
                    />
                  );
                })}
              </div>
              {/* 添加名字显示 */}
              <div className="p-3 text-center">
                <h3 className="text-lg font-semibold text-museum-slate">{nft.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}