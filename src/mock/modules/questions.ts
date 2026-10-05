import { questionSchema, type QuestionInput } from "@/features/question-bank/schemas";
import { isOptionQuestion, type Difficulty, type Question, type QuestionOption } from "@/features/question-bank/types";
import { QUESTION_TYPES, QUESTION_TYPE_META, type PteTargetScore, type QuestionType } from "@/shared/domain/pte";
import { COLLECTIONS } from "../collections";
import { writeAudit } from "../engine/audit";
import { collection, registerCollection } from "../engine/db";
import { queryList } from "../engine/list";
import { defineResource } from "../engine/resource";
import { addRoutes } from "../engine/router";
import { createRng, isoDaysAgo, pad, type Rng } from "../seed/random";

const QUESTIONS = COLLECTIONS.questions;

interface Topic {
  name: string;
  passage: string;
  sentence: string;
  keyword: string;
}

const TOPICS: Topic[] = [
  {
    name: "renewable energy",
    passage:
      "Renewable energy sources such as solar and wind have grown rapidly over the past decade. Governments encourage investment through subsidies, while falling costs make these technologies competitive with fossil fuels. However, storage and grid stability remain significant challenges.",
    sentence: "The university library extended its opening hours during the examination period.",
    keyword: "solar",
  },
  {
    name: "sleep and memory",
    passage:
      "Researchers have found that sleep plays a crucial role in consolidating memories. During deep sleep, the brain replays recent experiences and strengthens important neural connections. Students who sleep well after studying tend to recall information more accurately.",
    sentence: "Regular exercise improves both physical health and mental well-being.",
    keyword: "memory",
  },
  {
    name: "urban planning",
    passage:
      "Cities worldwide are rethinking how public space is used. Pedestrian zones, protected cycle lanes and green rooftops reduce pollution and improve quality of life. Critics argue that such projects can raise housing costs and displace long-term residents.",
    sentence: "Please submit your assignment before the end of the semester.",
    keyword: "pedestrian",
  },
  {
    name: "coral reefs",
    passage:
      "Coral reefs support roughly a quarter of all marine species despite covering less than one percent of the ocean floor. Rising sea temperatures cause bleaching, which weakens the coral and threatens the ecosystems that depend on it.",
    sentence: "The marine biology department received a generous research grant.",
    keyword: "bleaching",
  },
  {
    name: "artificial intelligence",
    passage:
      "Artificial intelligence is transforming industries from healthcare to finance. Algorithms can now detect diseases in medical images and flag unusual transactions. Yet questions about bias, transparency and accountability continue to shape the public debate.",
    sentence: "Our professor encouraged us to challenge established theories.",
    keyword: "algorithms",
  },
  {
    name: "ancient trade routes",
    passage:
      "The Silk Road connected East and West for centuries, carrying not only silk and spices but also ideas, religions and technologies. Merchants who travelled these routes often acted as cultural intermediaries between distant civilisations.",
    sentence: "The museum offers guided tours every weekend afternoon.",
    keyword: "merchants",
  },
];

const MEDIA_AUDIO = (code: string) => `https://cdn.pteipass.vn/question-bank/audio/${code}.mp3`;
const MEDIA_IMAGE = (code: string) => `https://cdn.pteipass.vn/question-bank/images/${code}.png`;

function blankify(text: string, word: string): string {
  return text.replace(new RegExp(`\\b${word}\\b`, "i"), "_____");
}

function options(texts: string[], correct: number[]): QuestionOption[] {
  return texts.map((text, i) => ({ text, isCorrect: correct.includes(i) }));
}

type Built = Pick<Question, "prompt" | "content" | "options" | "answerKey" | "mediaUrl">;

function build(type: QuestionType, topic: Topic, code: string, rng: Rng): Built {
  const empty: Built = { prompt: "", options: [] };
  switch (type) {
    case "read_aloud":
      return { ...empty, prompt: "Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible.", content: topic.passage };
    case "repeat_sentence":
      return { ...empty, prompt: "You will hear a sentence. Please repeat the sentence exactly as you hear it.", content: topic.sentence, mediaUrl: MEDIA_AUDIO(code), answerKey: topic.sentence };
    case "describe_image":
      return { ...empty, prompt: "Look at the graph below. In 25 seconds, please speak into the microphone and describe in detail what the graph is showing. You will have 40 seconds to give your response.", mediaUrl: MEDIA_IMAGE(code), answerKey: `The graph illustrates trends related to ${topic.name}; the key point is the steady increase between the first and last year.` };
    case "retell_lecture":
      return { ...empty, prompt: "You will hear a lecture. After listening to the lecture, please retell what you have just heard in your own words.", content: topic.passage, mediaUrl: MEDIA_AUDIO(code) };
    case "answer_short_question":
      return { ...empty, prompt: "You will hear a question. Please give a simple and short answer. Often just one or a few words is enough.", content: `Which word describes ${topic.name}?`, mediaUrl: MEDIA_AUDIO(code), answerKey: topic.keyword };
    case "respond_to_situation":
      return { ...empty, prompt: "Read the situation below and respond. You have 20 seconds to prepare and 40 seconds to speak.", content: `You are a student and your tutor has asked you to present on ${topic.name} next week, but you have another deadline. Explain the situation and suggest an alternative.` };
    case "summarize_group_discussion":
      return { ...empty, prompt: "Three people discuss a topic. After listening, summarise the discussion, including the different views.", content: `Discussion about ${topic.name}`, mediaUrl: MEDIA_AUDIO(code) };
    case "summarize_written_text":
      return { ...empty, prompt: "Read the passage below and summarise it using one sentence (5–75 words). Type your response in the box at the bottom of the screen.", content: topic.passage, answerKey: `${topic.name[0]?.toUpperCase()}${topic.name.slice(1)} is changing quickly, bringing clear benefits as well as challenges that still need to be solved.` };
    case "write_essay":
      return { ...empty, prompt: `Some people believe that ${topic.name} should be a government priority, while others disagree. Discuss both views and give your own opinion. (200–300 words, 20 minutes)` };
    case "rw_fill_in_the_blanks":
      return { ...empty, prompt: "In the text below some words are missing. Choose the correct word from the drop-down list for each gap.", content: blankify(topic.passage, topic.keyword), answerKey: topic.keyword };
    case "reading_mc_multiple":
      return { ...empty, prompt: "Read the text and answer the question by selecting all the correct responses.", content: `${topic.passage}\n\nWhich of the following statements are supported by the text?`, options: options([`${topic.name} is attracting growing attention`, "The topic has no practical challenges", "There are debates about its consequences", "It only affects rural areas"], [0, 2]) };
    case "reorder_paragraphs":
      return { ...empty, prompt: "The text boxes in the left panel have been placed in a random order. Restore the original order by dragging the text boxes from the left panel to the right panel.", content: topic.passage.split(". ").map((s, i) => `${String.fromCharCode(65 + i)}. ${s.replace(/\.$/, "")}.`).join("\n"), answerKey: "A-B-C" };
    case "reading_fill_in_the_blanks":
      return { ...empty, prompt: "Below is a text with blanks. Drag a word from the box below to the appropriate place in the text.", content: blankify(topic.passage, topic.keyword), answerKey: topic.keyword };
    case "reading_mc_single":
      return { ...empty, prompt: "Read the text and answer the multiple-choice question by selecting the correct response.", content: `${topic.passage}\n\nWhat is the main idea of the passage?`, options: options([`It discusses the importance and challenges of ${topic.name}`, "It describes a personal travel experience", "It proves that the topic is unimportant", "It lists historical dates only"], [0]) };
    case "summarize_spoken_text":
      return { ...empty, prompt: "You will hear a short lecture. Write a summary for a fellow student who was not present. You should write 50–70 words.", content: topic.passage, mediaUrl: MEDIA_AUDIO(code), answerKey: `The lecture explains that ${topic.name} is developing rapidly, highlighting key benefits while noting remaining difficulties.` };
    case "listening_mc_multiple":
      return { ...empty, prompt: "Listen to the recording and answer the question by selecting all the correct responses.", mediaUrl: MEDIA_AUDIO(code), content: `What did the speaker mention about ${topic.name}?`, options: options(["Its recent growth", "A historical origin", "Public debate", "Its price in 1990"], [0, 2]) };
    case "listening_fill_in_the_blanks":
      return { ...empty, prompt: "You will hear a recording. Type the missing words in each blank.", mediaUrl: MEDIA_AUDIO(code), content: blankify(topic.passage, topic.keyword), answerKey: topic.keyword };
    case "highlight_correct_summary":
      return { ...empty, prompt: "You will hear a recording. Click on the paragraph that best relates to the recording.", mediaUrl: MEDIA_AUDIO(code), options: options([`A balanced overview of ${topic.name}, covering progress and challenges.`, "A complaint about a delayed train.", "A recipe for traditional soup.", "An advertisement for a new phone."], [0]) };
    case "listening_mc_single":
      return { ...empty, prompt: "Listen to the recording and answer the multiple-choice question by selecting the correct response.", mediaUrl: MEDIA_AUDIO(code), content: "What is the speaker's main purpose?", options: options([`To inform listeners about ${topic.name}`, "To sell a product", "To apologise for a mistake", "To invite listeners to a party"], [0]) };
    case "select_missing_word":
      return { ...empty, prompt: "You will hear a recording about a topic. At the end of the recording the last word or group of words has been replaced by a beep. Select the correct option to complete the recording.", mediaUrl: MEDIA_AUDIO(code), options: options([topic.keyword, "umbrella", "yesterday", "mountain"], [0]) };
    case "highlight_incorrect_words":
      return { ...empty, prompt: "You will hear a recording. Below is a transcription; some words differ from what the speaker said. Click on the words that are different.", mediaUrl: MEDIA_AUDIO(code), content: topic.passage, answerKey: `${topic.keyword}, ${rng.pick(["challenges", "decade", "technologies"])}` };
    case "write_from_dictation":
      return { ...empty, prompt: "You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can.", mediaUrl: MEDIA_AUDIO(code), answerKey: topic.sentence };
  }
}

function seedQuestions(): Question[] {
  const rng = createRng(333);
  const out: Question[] = [];
  let n = 0;
  const difficulties: Difficulty[] = ["easy", "medium", "hard"];
  const bands: PteTargetScore[] = [36, 42, 50, 58, 65, 79];
  for (const type of QUESTION_TYPES) {
    for (let i = 0; i < 3; i++) {
      n += 1;
      const topic = TOPICS[(n + i) % TOPICS.length] as Topic;
      const code = `Q-${pad(n, 4)}`;
      const built = build(type, topic, code, rng);
      out.push({
        id: `qst-${pad(n, 4)}`,
        code,
        skill: QUESTION_TYPE_META[type].skill,
        type,
        ...built,
        difficulty: difficulties[i % 3] as Difficulty,
        targetBand: rng.pick(bands),
        tags: [topic.name, QUESTION_TYPE_META[type].skill],
        status: n % 11 === 0 ? "draft" : n % 17 === 0 ? "archived" : "published",
        createdByName: rng.pick(["Nguyễn Thu Hà", "Trần Minh Khôi", "Lê Phương Anh"]),
        createdAt: isoDaysAgo(rng.int(10, 200)),
        updatedAt: isoDaysAgo(rng.int(1, 10)),
      });
    }
  }
  return out;
}

export function registerQuestionsModule(): void {
  registerCollection<Question>(QUESTIONS, seedQuestions);

  const listCfg = {
    searchFields: ["code", "prompt", "content", "tags"] as const,
    filters: { skill: "skill", type: "type", difficulty: "difficulty", status: "status" },
    sortable: ["code", "type", "skill", "difficulty", "targetBand", "status", "createdAt", "updatedAt"],
    defaultSort: { sortBy: "createdAt", sortOrder: "desc" as const },
  };

  addRoutes(
    {
      method: "GET",
      pattern: "/questions/export",
      permission: "question.export",
      handler: (req) => {
        const q = new URLSearchParams(req.query);
        q.delete("page");
        q.set("pageSize", "200");
        writeAudit(req.actor, { action: "export", resource: "question", entityId: "-", entityLabel: "Xuất ngân hàng câu hỏi" });
        return queryList(collection<Question>(QUESTIONS), { ...req, query: q }, listCfg);
      },
    },
    ...defineResource<Question, QuestionInput>({
      path: "/questions",
      permission: "question",
      collection: QUESTIONS,
      idPrefix: "qst",
      label: "câu hỏi",
      entityName: (q) => `${q.code} – ${q.prompt.slice(0, 50)}`,
      createSchema: questionSchema,
      list: listCfg,
      build: (input, base, actor) => {
        const max = collection<Question>(QUESTIONS).reduce((m, q) => Math.max(m, Number(q.code.replace(/\D/g, "")) || 0), 0);
        return {
          ...input,
          ...base,
          code: `Q-${pad(max + 1, 4)}`,
          options: isOptionQuestion(input.type) ? input.options : [],
          createdByName: actor?.userName ?? "Hệ thống",
        };
      },
      merge: (current, input) => ({ ...current, ...input, options: isOptionQuestion(input.type) ? input.options : [] }),
    }),
  );
}
