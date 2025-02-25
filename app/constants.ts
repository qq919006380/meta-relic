export const NFT_TAGS = ['守', '兴', '勇', '忠', '勤', '福'] as const;

export const NFT_TRAIT_LAYERS = [
  { trait: '身体', zIndex: 1 },
  { trait: '头', zIndex: 2 },
  { trait: '眼睛', zIndex: 3 },
  { trait: '鼻子', zIndex: 4 },
  { trait: '佩饰', zIndex: 5 },
] as const;

export const NFT_TAGS_MAP = {
  '守': '兢兢业业',
  '兴': '蒸蒸日上',
  '勇': '智勇双全',
  '忠': '忠肝义胆',
  '勤': '勤勤恳恳',
  '福': '福星高照',
} as const;

export const BOTTOM_TAGS = [
  { cn: '呈祥靈物', en: 'SPIRITUALTHING' },
  { cn: '驱邪治魔', en: 'PROTECTION E' },
  { cn: '司仪神仙', en: 'IMMORTAL GOD' },
] as const;