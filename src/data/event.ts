import { Post } from "@/types/post";

// Giả định Categories
const CATEGORIES = [
    { id: 301, name: "Workshop IELTS", slug: "workshop-ielts", category_type: "event_type" },
    { id: 302, name: "Hội thảo Du học", slug: "hoi-thao-du-hoc", category_type: "event_type" },
    { id: 303, name: "Sự kiện PTE", slug: "su-kien-pte", category_type: "event_type" },
];

const findCategory = (id: number) => CATEGORIES.find(c => c.id === id);

// Giả định Tags
const TAGS = {
    free: { id: 20, name: "Miễn phí", slug: "mien-phi" },
    ielts_writing: { id: 21, name: "IELTS Writing", slug: "ielts-writing" },
    pte_speaking: { id: 22, name: "PTE Speaking", slug: "pte-speaking" },
    visa_info: { id: 23, name: "Thông tin Visa", slug: "thong-tin-visa" },
};

// ... (Giả định CATEGORIES và TAGS đã được định nghĩa ở trên)

export const event_list_data: Post[] = [
    {
        id: 201,
        author_id: 401,
        img: "/events/cover/ielts-writing-masterclass.jpg",
        title: "Masterclass IELTS Writing Task 2: Chinh phục Band 7+",
        slug: "masterclass-ielts-writing-band-7",
        summary: "Workshop chuyên sâu, hướng dẫn chiến lược phát triển ý và sử dụng từ vựng nâng cao cho bài viết IELTS Task 2.",
        content: "Sự kiện kéo dài 3 giờ do thầy A - Examiner cũ hướng dẫn. Có phần chữa bài trực tiếp cho học viên.",
        category_id: 301, // Workshop IELTS
        created_at: "2025-10-10T14:00:00Z",
        updated_at: "2025-10-10T14:00:00Z",
        type: "event",
        status: "Published",
        isFeatured: true,
        // Thuộc tính Sự kiện BẮT BUỘC
        startDate: "2025-11-05T19:00:00+07:00", // 19h ngày 05/11
        endDate: "2025-11-05T22:00:00+07:00",
        metaTitle: "Workshop IELTS Writing Task 2 Band 7+ | Đăng ký miễn phí",
        metaDescription: "Tham gia Masterclass Writing Task 2, học chiến lược từ Examiner và nhận tài liệu độc quyền.",
        tags: [TAGS.free, TAGS.ielts_writing],
        keywords: ["workshop ielts", "luyện viết ielts", "ielts writing task 2"]
    },
    {
        id: 202,
        author_id: 402,
        img: "/events/cover/study-abroad-fair.jpg",
        title: "Hội thảo Du học Úc & Canada 2026: Kết nối trực tiếp với trường",
        slug: "hoi-thao-du-hoc-uc-canada-2026",
        summary: "Cơ hội gặp gỡ đại diện hơn 20 trường đại học hàng đầu từ Úc và Canada, tư vấn hồ sơ và học bổng.",
        content: "Sự kiện lớn nhất năm, cung cấp thông tin mới nhất về chính sách visa, việc làm sau tốt nghiệp và cơ hội định cư.",
        category_id: 302, // Hội thảo Du học
        created_at: "2025-10-01T09:00:00Z",
        updated_at: "2025-10-01T09:00:00Z",
        type: "event",
        status: "Published",
        isFeatured: true,
        startDate: "2025-11-15T09:00:00+07:00", // Sáng ngày 15/11
        endDate: "2025-11-15T16:00:00+07:00",
        metaTitle: "Hội thảo Du học Úc & Canada 2026 | Gặp gỡ đại diện trường",
        metaDescription: "Tìm hiểu mọi thông tin về du học, visa và học bổng 2026. Đăng ký tham gia ngay để nhận quà tặng.",
        tags: [TAGS.free, TAGS.visa_info],
        keywords: ["hội thảo du học", "du học úc", "du học canada"]
    },
    {
        id: 203,
        author_id: 403,
        img: "/events/cover/pte-speaking-fix.jpg",
        title: "Sự kiện PTE: Sửa lỗi Phát âm (Speaking) trong 90 phút",
        slug: "pte-sua-loi-phat-am-90-phut",
        summary: "Buổi live stream tập trung vào các lỗi phát âm cơ bản khiến máy tính trừ điểm Speaking PTE, và cách khắc phục.",
        content: "Buổi học online miễn phí, tương tác trực tiếp, chuyên gia sẽ phân tích giọng của học viên.",
        category_id: 303, // Sự kiện PTE
        created_at: "2025-09-20T16:00:00Z",
        updated_at: "2025-09-20T16:00:00Z",
        type: "event",
        status: "Published",
        isFeatured: false,
        startDate: "2025-10-25T20:00:00+07:00", // Tối ngày 25/10 (Online)
        endDate: "2025-10-25T21:30:00+07:00",
        metaTitle: "Live Stream Sửa Lỗi Phát Âm PTE Speaking Cấp Tốc",
        metaDescription: "Tham gia sự kiện online để được chuyên gia sửa lỗi phát âm PTE, giúp tối ưu điểm Speaking.",
        tags: [TAGS.free, TAGS.pte_speaking],
        keywords: ["sự kiện pte", "luyện speaking pte", "phát âm pte"]
    },
    {
        id: 204,
        author_id: 401,
        img: "/events/cover/ielts-reading-strategies.jpg",
        title: "Workshop: 3 Chiến thuật làm bài IELTS Reading Band 8+",
        slug: "workshop-3-chien-thuat-ielts-reading-band-8",
        summary: "Tìm hiểu các kỹ thuật Skimming, Scanning nâng cao và cách xử lý các dạng bài Matching Heading khó nhất.",
        content: "Buổi workshop giới hạn số lượng, tập trung vào luyện tập tốc độ và độ chính xác.",
        category_id: 301,
        created_at: "2025-09-18T10:00:00Z",
        updated_at: "2025-09-18T10:00:00Z",
        type: "event",
        status: "Published",
        isFeatured: false,
        startDate: "2025-11-20T18:30:00+07:00",
        endDate: "2025-11-20T21:00:00+07:00",
        metaTitle: "Workshop IELTS Reading Band 8+ | Học chiến thuật nâng cao",
        metaDescription: "Nắm vững 3 chiến thuật làm bài Reading để chinh phục band điểm cao. Đăng ký tham dự có phí.",
        tags: [TAGS.ielts_writing], // Dùng tag chung cho ielts tips
        keywords: ["ielts reading", "workshop ielts", "kỹ thuật làm bài ielts"]
    },
    {
        id: 205,
        author_id: 402,
        img: "/events/cover/pte-ipass-launch.jpg",
        title: "Lễ ra mắt nền tảng luyện thi PTE iPASS 3.0",
        slug: "le-ra-mat-pte-ipass-3-0",
        summary: "Giới thiệu các tính năng mới của hệ thống iPASS, bao gồm AI chấm điểm tiên tiến và kho đề cập nhật.",
        content: "Sự kiện trực tuyến dành cho học viên và đối tác, có phần hỏi đáp trực tiếp với đội ngũ phát triển.",
        category_id: 303,
        created_at: "2025-09-01T15:00:00Z",
        updated_at: "2025-09-01T15:00:00Z",
        type: "event",
        status: "Published",
        isFeatured: true,
        startDate: "2025-10-10T19:00:00+07:00",
        endDate: "2025-10-10T20:30:00+07:00",
        metaTitle: "Ra mắt Nền tảng PTE iPASS 3.0 | Công nghệ AI mới nhất",
        metaDescription: "Khám phá công nghệ luyện thi PTE tiên tiến nhất, giúp bạn đạt mục tiêu điểm số nhanh chóng.",
        tags: [TAGS.pte_speaking],
        keywords: ["pte ipass", "công nghệ pte", "sự kiện pte"]
    },
    {
        id: 206,
        author_id: 403,
        img: "/events/cover/visa-seminar-canada.jpg",
        title: "Seminar: Cơ hội và Thách thức Visa Định cư Canada 2026",
        slug: "seminar-visa-dinh-cu-canada-2026",
        summary: "Phân tích các chương trình định cư mới, cập nhật luật Express Entry và tỉnh bang đề cử (PNP).",
        content: "Có sự tham gia của luật sư di trú và các chuyên gia tư vấn hàng đầu. Yêu cầu đặt chỗ trước.",
        category_id: 302,
        created_at: "2025-08-20T11:00:00Z",
        updated_at: "2025-08-20T11:00:00Z",
        type: "event",
        status: "Published",
        isFeatured: false,
        startDate: "2025-12-01T14:00:00+07:00",
        endDate: "2025-12-01T17:00:00+07:00",
        metaTitle: "Seminar Visa Định cư Canada 2026 | Tư vấn luật di trú",
        metaDescription: "Cập nhật chính sách định cư Canada mới nhất, giải đáp thắc mắc về Express Entry và PNP.",
        tags: [TAGS.visa_info],
        keywords: ["seminar định cư", "visa canada", "chương trình pnp"]
    },
    {
        id: 207,
        author_id: 401,
        img: "/events/cover/ielts-speaking-strategy.jpg",
        title: "Workshop Giao tiếp: Tự tin nói IELTS Speaking Part 3",
        slug: "workshop-ielts-speaking-part-3",
        summary: "Hướng dẫn cách phát triển ý mở rộng và sử dụng ngôn ngữ học thuật để chinh phục giám khảo IELTS Part 3.",
        content: "Thực hành trả lời các câu hỏi khó, học cách duy trì cuộc hội thoại tự nhiên và học thuật.",
        category_id: 301,
        created_at: "2025-08-10T17:00:00Z",
        updated_at: "2025-08-10T17:00:00Z",
        type: "event",
        status: "Published",
        isFeatured: false,
        startDate: "2025-12-10T19:30:00+07:00",
        endDate: "2025-12-10T21:00:00+07:00",
        metaTitle: "Workshop IELTS Speaking Part 3 | Chiến lược band 7+",
        metaDescription: "Tham gia để cải thiện kỹ năng phản xạ và phát triển ý cho IELTS Speaking Part 3.",
        tags: [TAGS.ielts_writing],
        keywords: ["ielts speaking part 3", "chiến lược nói ielts", "workshop ielts"]
    },
    {
        id: 208,
        author_id: 403,
        img: "/events/cover/pte-free-test.jpg",
        title: "Ngày Hội Thi Thử PTE Miễn Phí (Full Mock Test)",
        slug: "ngay-hoi-thi-thu-pte-mien-phi",
        summary: "Cơ hội thi thử PTE Full Mock Test miễn phí tại trung tâm, có chấm điểm và nhận phân tích chi tiết kết quả.",
        content: "Thi thử trên máy tính, môi trường thi thật, giúp học viên làm quen với áp lực thời gian.",
        category_id: 303,
        created_at: "2025-07-25T10:00:00Z",
        updated_at: "2025-07-25T10:00:00Z",
        type: "event",
        status: "Published",
        isFeatured: false,
        startDate: "2025-12-25T09:00:00+07:00",
        endDate: "2025-12-25T12:00:00+07:00",
        metaTitle: "Đăng ký Thi Thử PTE Miễn Phí | Nhận kết quả chi tiết",
        metaDescription: "Tham gia ngày hội thi thử PTE Full Mock Test, đánh giá chính xác trình độ hiện tại của bạn.",
        tags: [TAGS.free],
        keywords: ["thi thử pte", "pte mock test", "sự kiện pte miễn phí"]
    }
];