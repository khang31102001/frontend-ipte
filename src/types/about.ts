export interface IAbout {
  aboutId: number;
  image: string;
  slug?: string;
  title?: string;
  description?: string | null;
  content?: string;
  mission?: string | null;
  vision?: string | null;
  video?: string;
  email?: string | null;
  phone?: string | null;
  hotline?: string | null;

  website?: string | null;
  address?: string | null;

  facebookUrl?: string | null;
  zaloUrl?: string | null;

  createdAt?: string;
  updatedAt?: string;

  createdBy?: string | null;
  updatedBy?: string | null;

  version?: number;
  category?: string | null;

  mapUrl?: string | null;
  tiktokUrl?: string | null;
  youtubeUrl?: string | null;
}

export interface IAboutItem {
  items: IAbout[];
  page: number | null;
  page_size: number | null;
  total: number | null;
  total_pages: number | null;
}
