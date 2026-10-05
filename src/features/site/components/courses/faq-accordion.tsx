"use client";

import { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  heading?: string;
  faqs: FaqItem[];
}

export function FaqAccordion({ heading = "Câu hỏi thường gặp", faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (faqs.length === 0) return null;

  return (
    <section className="py-16 bg-hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">{heading}</h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className="bg-primary-foreground text-foreground rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="w-full text-left font-semibold py-5 px-6 flex items-center justify-between hover:bg-accent/5 transition-colors"
                >
                  <span>{faq.question}</span>
                  <svg className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ml-4 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
                  <div className="px-6 pb-5 text-muted-foreground leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
