/**
 * Hằng số miền nghiệp vụ PTE dùng chung giữa các module (học viên, khóa học, lộ trình, ngân hàng câu hỏi, báo cáo).
 * Thuần TypeScript (không React) nên Mock API và FE cùng import được.
 */

export interface Option<T extends string = string> {
  value: T;
  label: string;
}

export function toOptions<T extends string>(labels: Record<T, string>): Option<T>[] {
  return (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }));
}

// ── Điểm PTE ──────────────────────────────────────────────────────────────
export const PTE_TARGET_SCORES = [30, 36, 42, 50, 58, 65, 79] as const;
export type PteTargetScore = (typeof PTE_TARGET_SCORES)[number];

export const PTE_LEVELS = ["none", "30", "36", "42", "50", "58", "65", "79"] as const;
export type PteLevel = (typeof PTE_LEVELS)[number];
export const PTE_LEVEL_LABELS: Record<PteLevel, string> = {
  none: "Chưa có nền tảng",
  "30": "PTE 30",
  "36": "PTE 36",
  "42": "PTE 42",
  "50": "PTE 50",
  "58": "PTE 58",
  "65": "PTE 65",
  "79": "PTE 79+",
};

// ── Kỹ năng ───────────────────────────────────────────────────────────────
export const PTE_SKILLS = ["speaking", "writing", "reading", "listening"] as const;
export type PteSkill = (typeof PTE_SKILLS)[number];
export const PTE_SKILL_LABELS: Record<PteSkill, string> = {
  speaking: "Speaking",
  writing: "Writing",
  reading: "Reading",
  listening: "Listening",
};

// ── Mục đích học & quốc gia ───────────────────────────────────────────────
export const LEARNING_PURPOSES = ["study_abroad", "migration", "work", "scholarship", "other"] as const;
export type LearningPurpose = (typeof LEARNING_PURPOSES)[number];
export const LEARNING_PURPOSE_LABELS: Record<LearningPurpose, string> = {
  study_abroad: "Du học",
  migration: "Định cư",
  work: "Làm việc",
  scholarship: "Học bổng",
  other: "Khác",
};

export const TARGET_COUNTRIES = ["AU", "NZ", "CA", "UK", "US", "VN", "OTHER"] as const;
export type TargetCountry = (typeof TARGET_COUNTRIES)[number];
export const TARGET_COUNTRY_LABELS: Record<TargetCountry, string> = {
  AU: "Úc",
  NZ: "New Zealand",
  CA: "Canada",
  UK: "Anh",
  US: "Mỹ",
  VN: "Việt Nam",
  OTHER: "Khác",
};

export const STUDY_MODES = ["online", "offline", "hybrid"] as const;
export type StudyMode = (typeof STUDY_MODES)[number];
export const STUDY_MODE_LABELS: Record<StudyMode, string> = {
  online: "Online",
  offline: "Tại trung tâm",
  hybrid: "Kết hợp",
};

// ── Hành trình học viên: Lead → Test → Enroll → Learn → Mock → Exam → Result ──
export const JOURNEY_STAGES = ["lead", "test", "enroll", "learn", "mock", "exam", "result"] as const;
export type JourneyStage = (typeof JOURNEY_STAGES)[number];
export const JOURNEY_STAGE_LABELS: Record<JourneyStage, string> = {
  lead: "Lead",
  test: "Test đầu vào",
  enroll: "Ghi danh",
  learn: "Đang học",
  mock: "Thi thử",
  exam: "Thi thật",
  result: "Kết quả",
};

// ── Ngân hàng câu hỏi: dạng câu hỏi theo kỹ năng ──────────────────────────
export const QUESTION_TYPES = [
  // Speaking
  "read_aloud",
  "repeat_sentence",
  "describe_image",
  "retell_lecture",
  "answer_short_question",
  "respond_to_situation",
  "summarize_group_discussion",
  // Writing
  "summarize_written_text",
  "write_essay",
  // Reading
  "rw_fill_in_the_blanks",
  "reading_mc_multiple",
  "reorder_paragraphs",
  "reading_fill_in_the_blanks",
  "reading_mc_single",
  // Listening
  "summarize_spoken_text",
  "listening_mc_multiple",
  "listening_fill_in_the_blanks",
  "highlight_correct_summary",
  "listening_mc_single",
  "select_missing_word",
  "highlight_incorrect_words",
  "write_from_dictation",
] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export const QUESTION_TYPE_META: Record<QuestionType, { skill: PteSkill; label: string }> = {
  read_aloud: { skill: "speaking", label: "Read Aloud" },
  repeat_sentence: { skill: "speaking", label: "Repeat Sentence" },
  describe_image: { skill: "speaking", label: "Describe Image" },
  retell_lecture: { skill: "speaking", label: "Re-tell Lecture" },
  answer_short_question: { skill: "speaking", label: "Answer Short Question" },
  respond_to_situation: { skill: "speaking", label: "Respond to a Situation" },
  summarize_group_discussion: { skill: "speaking", label: "Summarize Group Discussion" },
  summarize_written_text: { skill: "writing", label: "Summarize Written Text" },
  write_essay: { skill: "writing", label: "Write Essay" },
  rw_fill_in_the_blanks: { skill: "reading", label: "Reading & Writing: Fill in the Blanks" },
  reading_mc_multiple: { skill: "reading", label: "Multiple Choice (Multiple) – Reading" },
  reorder_paragraphs: { skill: "reading", label: "Re-order Paragraphs" },
  reading_fill_in_the_blanks: { skill: "reading", label: "Reading: Fill in the Blanks" },
  reading_mc_single: { skill: "reading", label: "Multiple Choice (Single) – Reading" },
  summarize_spoken_text: { skill: "listening", label: "Summarize Spoken Text" },
  listening_mc_multiple: { skill: "listening", label: "Multiple Choice (Multiple) – Listening" },
  listening_fill_in_the_blanks: { skill: "listening", label: "Listening: Fill in the Blanks" },
  highlight_correct_summary: { skill: "listening", label: "Highlight Correct Summary" },
  listening_mc_single: { skill: "listening", label: "Multiple Choice (Single) – Listening" },
  select_missing_word: { skill: "listening", label: "Select Missing Word" },
  highlight_incorrect_words: { skill: "listening", label: "Highlight Incorrect Words" },
  write_from_dictation: { skill: "listening", label: "Write from Dictation" },
};

export const questionTypesBySkill = (skill: PteSkill): QuestionType[] =>
  QUESTION_TYPES.filter((t) => QUESTION_TYPE_META[t].skill === skill);
