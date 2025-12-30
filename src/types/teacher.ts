export interface Teacher {
  teacherId: number;
  userId: number;
  bio: string;
  name: string;
  content?: string;
  image: string;
  overallScore?: string;
  listeningScore?: string;
  speakingScore?: string;
  readingScore?: string;
  writingScore?: string;
  createdAt?: string;   // ISO datetime string
  createdBy?: string;   // ISO datetime string
  updatedAt?: string;
  updatedBy?: string;
  version: number;
  slug: string;
}

export interface TeacherItemsRes {
  items: Teacher[];
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
}
