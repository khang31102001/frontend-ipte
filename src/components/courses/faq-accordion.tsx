"use client"

import { useState } from "react"

const faqs = [
  {
    question: "Khóa học này phù hợp với trình độ nào?",
    answer:
      "Khóa học PTE Academic chuyên sâu phù hợp với học viên có trình độ tiếng Anh từ trung bình trở lên. Nếu bạn có nền tảng tiếng Anh cơ bản và muốn đạt điểm PTE từ 50 trở lên, khóa học này sẽ giúp bạn nâng cao kỹ năng và làm quen với cấu trúc đề thi PTE. Chúng tôi cũng có khóa học nâng cao cho những ai muốn đạt điểm 79+ để đáp ứng yêu cầu định cư hoặc học bổng.",
  },
  {
    question: "Tôi có thể học online không?",
    answer:
      "Có, khóa học thực tế kế có thể học online và offline. Lớp online được tổ chức trực tiếp qua Zoom với thời gian linh hoạt, cho phép bạn học từ bất kỳ đâu. Bạn sẽ được cung cấp tài liệu học tập và có thể tương tác trực tiếp với giảng viên. Ngoài ra, chúng tôi cũng có các lớp học trực tiếp tại trung tâm nếu bạn muốn trải nghiệm học tập tập trung hơn.",
  },
  {
    question: "Khóa học có cam kết đầu ra không?",
    answer:
      "Chúng tôi cam kết với học viên về chất lượng đào tạo và phương pháp học tập hiệu quả. Nếu bạn hoàn thành đầy đủ khóa học, tham gia đầy đủ các buổi học và làm bài tập theo yêu cầu, chúng tôi cam kết bạn sẽ đạt được mục tiêu điểm số đã đề ra. Trong trường hợp không đạt, bạn có thể học lại miễn phí hoặc được hoàn lại học phí theo chính sách của chúng tôi.",
  },
  {
    question: "Học phí có bao gồm tài liệu không?",
    answer:
      "Có, học phí đã bao gồm toàn bộ tài liệu học tập cần thiết. Bạn sẽ nhận được sách giáo trình độc quyền của iPTE, tài liệu luyện tập, đề thi thử và quyền truy cập vào nền tảng học trực tuyến với hơn 3 bài luyện tập. Ngoài ra, bạn còn được cung cấp các tài liệu bổ trợ như từ vựng theo chủ đề, mẫu câu trả lời và video hướng dẫn chi tiết cho từng phần thi.",
  },
]

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Câu hỏi thường gặp</h2>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-primary-foreground text-foreground rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left font-semibold py-5 px-6 flex items-center justify-between hover:bg-accent/5 transition-colors"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-5 text-muted-foreground leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
