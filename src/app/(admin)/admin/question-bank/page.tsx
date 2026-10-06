import type { Metadata } from "next";
import { QuestionBankPage } from "@/features/question-bank";

export const metadata: Metadata = { title: "Ngân hàng câu hỏi" };

export default function Page() {
  return <QuestionBankPage />;
}
