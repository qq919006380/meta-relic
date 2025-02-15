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
    
    // 编号筛选
    if (filters.编号) {
      filtered = filtered.filter(nft => 
        nft.name.includes(filters.编号 || '')
      );
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
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }));
  };

  if (!metadata.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* 左侧筛选栏 */}
      <div className="w-64 bg-[#111111] p-4 space-y-6">
        {/* 编号搜索 */}
        <div>
          <h3 className="text-lg mb-2">编号</h3>
          <input
            type="text"
            placeholder="搜索编号..."
            className="w-full px-3 py-2 bg-[#222222] rounded focus:outline-none"
            onChange={(e) => handleFilterChange('编号', e.target.value)}
          />
        </div>

        {/* 属性筛选 */}
        {['佩饰', '头', '眼睛', '身体', '鼻子'].map((trait) => (
          <div key={trait}>
            <h3 className="text-lg mb-2">{trait}</h3>
            <select
              className="w-full px-3 py-2 bg-[#222222] rounded focus:outline-none"
              onChange={(e) => handleFilterChange(trait, e.target.value)}
            >
              <option value="">全部</option>
              {Array.from(new Set(metadata
                .flatMap(nft => nft.attributes
                  .filter(attr => attr.trait_type === trait)
                  .map(attr => attr.value)
                )
              )).map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-4 gap-6">
          {filteredNFTs.map((nft, index) => (
            <div 
              key={nft.name}
              className="bg-[#111111] rounded-lg overflow-hidden hover:scale-105 transition-transform"
            >
              {/* NFT 图片预览 */}
              <div className="relative aspect-square">
                {Object.entries(nft.image).map(([trait, path]) => (
                  <Image
                    key={trait}
                    src={path}
                    alt={trait}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="absolute top-0 left-0"
                  />
                ))}
              </div>
              {/* NFT 信息 */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
                <div className="space-y-1">
                  {nft.attributes.map((attr) => (
                    <div key={attr.trait_type} className="flex justify-between text-sm">
                      <span className="text-gray-400">{attr.trait_type}</span>
                      <span>{attr.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}