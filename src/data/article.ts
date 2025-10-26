interface Article {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  featured?: boolean
}

const SAMPLE_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Lương thợ hàn ở Úc là bao nhiêu? Hé lộ lương theo bằng và ngành",
    excerpt:
      'Nghề hàn đang trở thành lựa chọn "hot" nhờ cầu đông cao và nhập gia đình. Vậy lương thợ hàn ở Úc thực tế là bao nhiêu? Bài viết sẽ cập nhật bằng lương mới nhất 2025, so...',
    image: "/graduation-caps-celebration.jpg",
    category: "Study Abroad",
    featured: true,
  },
  {
    id: "2",
    title: "Định Cư Ngành Thợ Hàn Tại Úc: Điều Kiến Và Lộ",
    excerpt:
      "Năm 2025, định cư ngành thợ hàn tại Úc trở thành lựa chọn hấp dẫn khi lương ổn định và cơ hội phát triển...",
    image: "/welding-work-australia.jpg",
    category: "Settlement",
  },
  {
    id: "3",
    title: "Visa 482 Ngành Thợ Hàn Tại Úc: Cập Nhật Điều Kiến",
    excerpt:
      "Bạn là thợ hàn và muốn tìm cơ hội đối đãi tại một quốc gia phát triển? Đây chính là cơ hội để bạn chính...",
    image: "/visa-application-process.jpg",
    category: "Work Visa",
  },
  {
    id: "4",
    title: "Cấp Nhật Địa Điểm Thi CCL Và Hướng Dẫn Ôn Luyện",
    excerpt:
      "Năm 2025, định cư ngành thợ hàn tại Úc trở thành lựa chọn hấp dẫn khi lương ổn định và cơ hội phát triển...",
    image: "/exam-center-location.jpg",
    category: "Exam Prep",
  },
  {
    id: "5",
    title: "Định Cư Ngành Thợ Hàn Tại Úc: Điều Kiến Và Lộ",
    excerpt:
      "Năm 2025, định cư ngành thợ hàn tại Úc trở thành lựa chọn hấp dẫn khi lương ổn định và cơ hội phát triển...",
    image: "/australia-settlement.jpg",
    category: "Settlement",
  },
  {
    id: "6",
    title: "Visa 482 Ngành Thợ Hàn Tại Úc: Cập Nhật Điều Kiến",
    excerpt:
      "Bạn là thợ hàn và muốn tìm cơ hội đối đãi tại một quốc gia phát triển? Đây chính là cơ hội để bạn chính...",
    image: "/work-visa-australia.jpg",
    category: "Work Visa",
  },
  {
    id: "7",
    title: "Cấp Nhật Địa Điểm Thi CCL Và Hướng Dẫn Ôn Luyện",
    excerpt:
      "Năm 2025, định cư ngành thợ hàn tại Úc trở thành lựa chọn hấp dẫn khi lương ổn định và cơ hội phát triển...",
    image: "/english-test-preparation.jpg",
    category: "Exam Prep",
  },
  {
    id: "8",
    title: "Định Cư Ngành Thợ Hàn Tại Úc: Điều Kiến Và Lộ",
    excerpt:
      "Năm 2025, định cư ngành thợ hàn tại Úc trở thành lựa chọn hấp dẫn khi lương ổn định và cơ hội phát triển...",
    image: "/australia-career-path.jpg",
    category: "Settlement",
  },
  {
    id: "9",
    title: "Visa 482 Ngành Thợ Hàn Tại Úc: Cập Nhật Điều Kiến",
    excerpt:
      "Bạn là thợ hàn và muốn tìm cơ hội đối đãi tại một quốc gia phát triển? Đây chính là cơ hội để bạn chính...",
    image: "/visa-requirements.jpg",
    category: "Work Visa",
  },
]