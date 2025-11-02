import { Course } from "@/types/courses";


export const dataDetailCourse: Course[] = [
  {
    id: 2,
    author_id: 101,
    img: "https://images.unsplash.com/photo-1603574670812-d24560880210?q=80&w=1600&auto=format&fit=crop",
    title: "PTE Foundation – Lấy lại căn bản & phát âm chuẩn",
    slug: "pte-foundation-speaking-basics",
    level: "Beginner (Cơ bản)",
    duration: "6 tuần",
    schedule: "2-4-6 (Sáng) hoặc 3-5-CN (Tối)",
    tuition: "4.500.000 – 5.500.000đ",
    summary:
      "Khóa nền tảng giúp học viên làm quen format PTE, luyện phát âm và kỹ năng paraphrase cơ bản.",
    content: `
      <h2>Giới thiệu khóa học</h2>
      <p>Phù hợp cho học viên mới bắt đầu hoặc mất gốc. Học toàn diện 4 kỹ năng theo chuẩn PTE 2025, đặc biệt chú trọng <strong>Speaking clarity</strong> và <strong>Grammar accuracy</strong>.</p>

      <h3>Lộ trình 6 tuần</h3>
      <ul>
        <li>Tuần 1-2: Phát âm chuẩn âm cuối & nối âm</li>
        <li>Tuần 3: Speaking – Repeat Sentence & RA</li>
        <li>Tuần 4: Writing basics – Sentence structure, cohesion</li>
        <li>Tuần 5-6: Mini mock + chữa chi tiết</li>
      </ul>

      <figure class="image">
        <img src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop" alt="PTE Foundation class" />
        <figcaption>Giờ luyện phát âm trực tuyến</figcaption>
      </figure>

      <h3>Tài liệu học tập</h3>
      <p>Bộ <a href="#">Pronunciation & Grammar Basics PDF</a> gồm 100+ bài tập nghe-nói thực hành.</p>

      <h3>Lịch học</h3>
      <table>
        <thead><tr><th>Lớp</th><th>Lịch</th><th>Hình thức</th><th>Học phí</th></tr></thead>
        <tbody>
          <tr><td>Foundation A</td><td>Sáng 2-4-6</td><td>Online</td><td>4.500.000đ</td></tr>
          <tr><td>Foundation B</td><td>Tối 3-5-CN</td><td>Offline (HCMC)</td><td>5.500.000đ</td></tr>
        </tbody>
      </table>
    `
  },
  {
    id: 3,
    author_id: 102,
    img: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?q=80&w=1600&auto=format&fit=crop",
    title: "PTE Mock Test Pro – Luyện đề & chữa chi tiết theo AI",
    slug: "pte-mock-test-pro",
    level: "Intermediate – Advanced",
    duration: "3 buổi test (tùy gói)",
    schedule: "Linh hoạt – Đặt lịch online",
    tuition: "1.200.000 – 3.000.000đ",
    summary:
      "Khóa luyện đề chuyên sâu với hệ thống chấm tự động theo tiêu chí PTE, có chữa từng câu bởi giảng viên.",
    content: `
      <h2>Giới thiệu khóa học</h2>
      <p>Thi thử như thật, phân tích điểm yếu từng kỹ năng bằng AI scoring – luyện tập tập trung và tiết kiệm thời gian.</p>

      <h3>Nội dung chính</h3>
      <ul>
        <li>3 bài full test format mới</li>
        <li>Report chi tiết từng kỹ năng</li>
        <li>Feedback cá nhân hóa theo mục tiêu</li>
      </ul>

      <div class="embed">
        <iframe src="https://www.youtube.com/embed/M7lc1UVf-VE" title="PTE Mock Test Demo" allowfullscreen></iframe>
      </div>

      <h3>Học phí & Lịch học</h3>
      <table>
        <thead><tr><th>Gói</th><th>Test</th><th>Hình thức</th><th>Phí</th></tr></thead>
        <tbody>
          <tr><td>Basic</td><td>1 test</td><td>Online</td><td>1.200.000đ</td></tr>
          <tr><td>Pro</td><td>3 test + chữa</td><td>Online</td><td>3.000.000đ</td></tr>
        </tbody>
      </table>
    `
  },
  {
    id: 4,
    author_id: 103,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop",
    title: "IELTS Writing Fix – Sửa lỗi tư duy & cấu trúc bài viết",
    slug: "ielts-writing-fix",
    level: "Intermediate (5.5–7.0)",
    duration: "4 tuần",
    schedule: "3 buổi/tuần (Tối 2-4-6)",
    tuition: "3.500.000đ",
    summary:
      "Chương trình chữa lỗi viết chuyên sâu – từ idea đến coherence, áp dụng được ngay cho Task 1 & 2.",
    content: `
      <h2>Giới thiệu khóa học</h2>
      <p>Tập trung sửa từng lỗi <strong>logic, cohesion, vocabulary</strong> giúp bài viết tăng 0.5–1.0 band thật.</p>

      <h3>Lộ trình 4 tuần</h3>
      <ul>
        <li>Tuần 1: Coherence & Cohesion – sửa logic đoạn</li>
        <li>Tuần 2: Grammar range & collocation</li>
        <li>Tuần 3: Task 1 & Task 2 feedback</li>
        <li>Tuần 4: Mock test + marking</li>
      </ul>
    `
  },
  {
    id: 5,
    author_id: 104,
    img: "https://images.unsplash.com/photo-1616627457734-2f0d5b3dba4b?q=80&w=1600&auto=format&fit=crop",
    title: "PTE Listening Intensive – Focus 79+",
    slug: "pte-listening-intensive",
    level: "Upper-Intermediate (6.0+)",
    duration: "3 tuần",
    schedule: "Tối 2-4-6 (Online)",
    tuition: "3.000.000đ",
    summary:
      "Rèn luyện kỹ năng nghe chính xác, tập trung các dạng khó như WFD, SST, HIW và LFIB.",
    content: `
      <h2>Giới thiệu</h2>
      <p>Khoá học 3 tuần giúp nâng band Listening nhanh nhất với phương pháp <strong>Dictation + Active Listening</strong>.</p>
    `
  },
  {
    id: 6,
    author_id: 101,
    img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1600&auto=format&fit=crop",
    title: "PTE Speaking Challenge – 7 ngày nói chuẩn giọng máy",
    slug: "pte-speaking-challenge",
    level: "All levels",
    duration: "7 ngày",
    schedule: "Học linh hoạt qua app + feedback GV",
    tuition: "1.200.000đ",
    summary:
      "Mini course 7 ngày giúp cải thiện fluency, pronunciation và response time đạt chuẩn AI scoring.",
    content: `
      <h2>Tổng quan</h2>
      <p>Thử thách nói tiếng Anh mỗi ngày cùng giáo viên và phần mềm ghi âm tự động chấm điểm.</p>
    `
  },
  {
    id: 7,
    author_id: 106,
    img: "https://images.unsplash.com/photo-1584697964354-75b8b4f9f3d5?q=80&w=1600&auto=format&fit=crop",
    title: "IELTS Speaking Clinic – Chữa lỗi phát âm & fluency",
    slug: "ielts-speaking-clinic",
    level: "Intermediate – Advanced",
    duration: "4 buổi workshop",
    schedule: "Cuối tuần (T7 & CN)",
    tuition: "2.200.000đ",
    summary:
      "Workshop sửa phát âm từng cá nhân, luyện phản xạ nói tự nhiên theo tiêu chí examiner.",
    content: `
      <h2>Giới thiệu</h2>
      <p>Dành cho người muốn đạt band 7.0+ Speaking – luyện theo phản xạ & feedback trực tiếp 1-1.</p>
    `
  },
  {
    id: 8,
    author_id: 107,
    img: "https://images.unsplash.com/photo-1573497019236-17f8177b81c2?q=80&w=1600&auto=format&fit=crop",
    title: "PTE Crash Course – Luyện cấp tốc 10 ngày",
    slug: "pte-crash-course-10days",
    level: "Upper-Intermediate (6.5+)",
    duration: "10 ngày",
    schedule: "Học mỗi ngày (Online)",
    tuition: "4.200.000đ",
    summary:
      "Khoá học rút gọn 10 ngày cho người cần thi gấp, tập trung kỹ thuật làm bài nhanh và mẹo scoring.",
    content: `
      <h2>Tổng quan</h2>
      <p>Phù hợp học viên đã có nền tảng, muốn boost điểm nhanh. Bao gồm <strong>tips độc quyền</strong> và <strong>template scoring</strong>.</p>
    `
  },
  {
    id: 9,
    author_id: 108,
    img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1600&auto=format&fit=crop",
    title: "IELTS Academic Bootcamp – 8 tuần band 7.0+",
    slug: "ielts-academic-bootcamp",
    level: "Intermediate – Advanced (6.0–7.5)",
    duration: "8 tuần",
    schedule: "3 buổi/tuần (Tối 2-4-6 hoặc 3-5-CN)",
    tuition: "7.000.000đ",
    summary:
      "Chương trình toàn diện 8 tuần – luyện Writing, Speaking, Listening & Reading theo format IDP 2025.",
    content: `
      <h2>Giới thiệu khóa học</h2>
      <p>Phù hợp học viên mục tiêu band 6.5–7.5, với chiến lược giải đề, vocabulary chuyên đề và feedback chi tiết.</p>
    `
  }
];
