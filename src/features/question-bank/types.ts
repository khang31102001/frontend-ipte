import type { BaseEntity, ListQuery } from "@/core/api";
import type { PteSkill, PteTargetScore, QuestionType } from "@/shared/domain/pte";

export const DIFFICULTIES = ["easy", "medium", "hard"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];
export const DIFFICULTY_LABELS: Record<Difficulty, string> = { easy: "Dễ", medium: "Trung bình", hard: "Khó" };

export const QUESTION_STATUSES = ["draft", "published", "archived"] as const;
export type QuestionStatus = (typeof QUESTION_STATUSES)[number];
export const QUESTION_STATUS_LABELS: Record<QuestionStatus, string> = {
  draft: "Nháp",
  published: "Đã đăng",
  archived: "Lưu trữ",
};

/** Dạng câu hỏi có danh sách lựa chọn (trắc nghiệm / chọn đáp án). */
export const OPTION_QUESTION_TYPES: readonly QuestionType[] = [
  "reading_mc_multiple",
  "reading_mc_single",
  "listening_mc_multiple",
  "listening_mc_single",
  "highlight_correct_summary",
  "select_missing_word",
];

export const isOptionQuestion = (type: QuestionType): boolean => OPTION_QUESTION_TYPES.includes(type);

/** Dạng câu hỏi dùng file âm thanh / hình ảnh. */
export const MEDIA_QUESTION_TYPES: readonly QuestionType[] = [
  "repeat_sentence",
  "describe_image",
  "retell_lecture",
  "answer_short_question",
  "summarize_group_discussion",
  "summarize_spoken_text",
  "listening_mc_multiple",
  "listening_fill_in_the_blanks",
  "highlight_correct_summary",
  "listening_mc_single",
  "select_missing_word",
  "highlight_incorrect_words",
  "write_from_dictation",
];

export interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

/** Câu hỏi trong ngân hàng đề (chỉ để quản trị nội dung, không dùng làm bài thi trực tiếp). */
export interface Question extends BaseEntity {
  code: string;
  skill: PteSkill;
  type: QuestionType;
  /** Đề bài / hướng dẫn. */
  prompt: string;
  /** Đoạn văn / transcript / nội dung cần đọc. */
  content?: string;
  /** Âm thanh hoặc hình ảnh đi kèm. */
  mediaUrl?: string;
  options: QuestionOption[];
  /** Đáp án mẫu / đáp án điền / thứ tự đúng. */
  answerKey?: string;
  difficulty: Difficulty;
  targetBand?: PteTargetScore;
  tags: string[];
  status: QuestionStatus;
  createdByName: string;
}

export interface QuestionQuery extends ListQuery {
  skill?: PteSkill;
  type?: QuestionType;
  difficulty?: Difficulty;
  status?: QuestionStatus;
}
