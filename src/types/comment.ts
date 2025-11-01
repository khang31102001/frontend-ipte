export interface Comment {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  rating?: number; // 1-5 stars
  createdAt: string;
  updatedAt?: string;
  likes: number;
  replies?: Comment[];
  parentId?: string;
}

export interface CommentFormData {
  content: string;
  rating?: number;
}
