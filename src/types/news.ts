
export type ISODateString = string; 
export interface News {
  newsId: number;
  categoryId: number;
  image: string | null;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;

  status?: string;
  publishedAt?: ISODateString | null;

  tags?: string[];
  keywords?: string[];

  createdAt?: ISODateString | null;
  updatedAt?: ISODateString | null;
  createdBy?: string;
  updatedBy?: string;

  version?: number;

  isProminent?: boolean;
  categoryType?: string;

  isFeatured?: boolean;
  isDisabled?: boolean;

  metaTitle?: string | null;
  metaDescription?: string | null;

  audience?: string[]; 
  schemaEnabled: boolean;
  schemaMode?: string;
  schemaData: Record<string, unknown> | null; 

  seoScore: number | null;

  startDate: ISODateString | null;
  endDate: ISODateString | null;

  deleteImageUrl: string | null;
  author: string | null; 
}



export interface NewsListRes {
    items: News[]
    page: number | null
    pageSize: number | null
    total: number | null
    totalPages: number | null
}


