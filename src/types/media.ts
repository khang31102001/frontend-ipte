



export type MediaType = "IMAGE" | "VIDEO";

export type CategoryType =
  | "STUDENT_STORY"
  // | "HEADER"
  // | "H_MENU_COURSE"
  // | "NEWS"
  ;

export interface IMediaItem {
  id: number;
  title: string;
  description: string;
  imageName: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  deleteImageUrl: string | null;
  mediaType: MediaType;
  categoryId: number | null;
  categoryType: CategoryType;
  isDisabled: boolean;
  isImageChanged: boolean | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  version: number;
}


export type MediaItemsRes = {
  items: IMediaItem[];
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
}
