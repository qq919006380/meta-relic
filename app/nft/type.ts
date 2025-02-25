export interface NFTMetadata {
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

  export interface Filters {
    编号?: string;
    佩饰?: string;
    头?: string;
    眼睛?: string;
    身体?: string;
    鼻子?: string;
  }