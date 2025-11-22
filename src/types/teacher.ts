export interface Teacher {
  teacher_id: number;
  user_id: number;
  bio: string;
  name: string;
  content?: string;
  image: string;
  overall_score: string;
  listening_score: string;
  speaking_score: string;
  reading_score: string;
  writing_score: string;
  created_at: string;   // ISO datetime string
  updated_at: string;   // ISO datetime string
  created_by: string;
  updated_by: string;
  version: number;
  slug: string;
}
