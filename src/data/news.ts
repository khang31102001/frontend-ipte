import { Post } from "@/types/post";

// Giả định Categories
const CATEGORIES = [
    { id: 201, name: "Tin tức Du học", slug: "tin-tuc-du-hoc", category_type: "news_type" },
    { id: 202, name: "Mẹo học PTE/IELTS", slug: "meo-hoc-pte-ielts", category_type: "news_type" },
    { id: 203, name: "Tin tức Định cư", slug: "tin-tuc-dinh-cu", category_type: "news_type" },
];

const findCategory = (id: number) => CATEGORIES.find(c => c.id === id);

// Giả định Tags
const TAGS = {
    visa: { id: 10, name: "Visa Úc", slug: "visa-uc" },
    ielts_tips: { id: 11, name: "Mẹo IELTS", slug: "meo-ielts" },
    pte_change: { id: 12, name: "Thay đổi PTE", slug: "thay-doi-pte" },
    canada_imm: { id: 13, name: "Định cư Canada", slug: "dinh-cu-canada" },
};

// ... (Giả định CATEGORIES và TAGS đã được định nghĩa ở trên)

export const news_list_data: Post[] = [
    {
        id: 101,
        author_id: 301,
        img: "/news/cover/visa-update-australia.jpg",
        title: "Cập nhật quan trọng về quy trình xét duyệt visa du học Úc 2025",
        slug: "cap-nhat-visa-du-hoc-uc-2025",
        summary: "Bộ Di trú Úc vừa công bố thay đổi lớn trong yêu cầu tài chính và quy trình nộp hồ sơ, ảnh hưởng trực tiếp đến du học sinh Việt Nam.",
        content: "Nội dung chi tiết về thay đổi GS (Genuine Student) và yêu cầu chứng minh tài chính mới. Phân tích tác động và lời khuyên từ chuyên gia.",
        category_id: 201, // Tin tức Du học

        created_at: "2025-10-05T10:00:00Z",
        updated_at: "2025-10-06T11:00:00Z",
        type: "news",
        status: "Published",
        isFeatured: true,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Cập nhật Visa Du học Úc 2025 Mới Nhất | Ảnh hưởng thế nào?",
        metaDescription: "Những thay đổi quan trọng về luật visa du học Úc bạn cần biết để chuẩn bị hồ sơ tốt nhất.",
        tags: [TAGS.visa],
        keywords: ["visa du học úc", "quy trình xét duyệt visa", "tin du học 2025"]
    },
    {
        id: 102,
        author_id: 302,
        img: "/news/cover/pte-changes-2026.jpg",
        title: "PTE Academic sẽ có thay đổi format từ đầu năm 2026?",
        slug: "pte-academic-thay-doi-format-2026",
        summary: "Nghiên cứu mới chỉ ra khả năng Pearson PTE sẽ tinh chỉnh cấu trúc bài thi để tăng tính ứng dụng trong môi trường học thuật.",
        content: "Phân tích các dự đoán về việc giảm bớt thời gian thi và tập trung vào các kỹ năng cốt lõi. Học viên cần chuẩn bị gì?",
        category_id: 202, // Mẹo học PTE/IELTS
        created_at: "2025-09-28T09:30:00Z",
        updated_at: "2025-09-28T09:30:00Z",
        type: "news",
        status: "Published",
        isFeatured: true,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Dự đoán Thay đổi Format PTE Academic 2026 | Nắm bắt thông tin",
        metaDescription: "Cập nhật các tin đồn và thông tin chính thức về cấu trúc bài thi PTE mới nhất.",
        tags: [TAGS.pte_change],
        keywords: ["thay đổi pte", "format pte mới", "tin tức pte"]
    },
    {
        id: 103,
        author_id: 301,
        img: "/news/cover/canada-migration.jpg",
        title: "Cơ hội định cư Canada qua diện tay nghề cho ngành IT",
        slug: "dinh-cu-canada-dien-it",
        summary: "Chính phủ Canada mở rộng chương trình Express Entry cho các chuyên gia công nghệ, là cơ hội lớn cho du học sinh Việt Nam.",
        content: "Yêu cầu chi tiết về kinh nghiệm làm việc, điểm CRS cần thiết và quy trình nộp hồ sơ định cư diện tay nghề IT.",
        category_id: 203, // Tin tức Định cư
        created_at: "2025-09-15T14:00:00Z",
        updated_at: "2025-09-15T14:00:00Z",
        type: "news",
        status: "Published",
        isFeatured: true,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Định cư Canada diện IT: Lộ trình và Yêu cầu mới nhất",
        metaDescription: "Tìm hiểu cơ hội định cư Canada theo diện tay nghề IT. Hướng dẫn chi tiết nộp hồ sơ Express Entry.",
        tags: [TAGS.canada_imm],
        keywords: ["định cư canada", "express entry", "định cư diện tay nghề"]
    },
    {
        id: 104,
        author_id: 303,
        img: "/news/cover/ielts-speaking-tips.jpg",
        title: "5 Mẹo giúp tăng band Speaking IELTS ngay lập tức",
        slug: "5-meo-tang-band-speaking-ielts",
        summary: "Áp dụng 5 mẹo đơn giản về ngữ điệu, từ vựng và trả lời để cải thiện điểm Speaking của bạn trong vòng 1 tuần.",
        content: "Tập trung vào tính lưu loát, từ vựng ít phổ biến, và cách phát triển ý trả lời Part 2/3 hiệu quả.",
        category_id: 202, // Mẹo học PTE/IELTS
        created_at: "2025-09-10T08:00:00Z",
        updated_at: "2025-09-10T08:00:00Z",
        type: "news",
        status: "Published",
        isFeatured: false,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "5 Mẹo IELTS Speaking Tăng Band Nhanh Chóng",
        metaDescription: "Bí quyết cải thiện điểm IELTS Speaking chỉ trong 7 ngày, tập trung vào kỹ thuật và tâm lý phòng thi.",
        tags: [TAGS.ielts_tips],
        keywords: ["mẹo ielts speaking", "tăng band ielts", "luyện ielts cấp tốc"]
    },
    {
        id: 105,
        author_id: 302,
        img: "/news/cover/study-in-uk.jpg",
        title: "Học bổng du học Anh Quốc 2026: Danh sách các trường có hỗ trợ tốt nhất",
        slug: "hoc-bong-du-hoc-anh-quoc-2026",
        summary: "Tổng hợp các suất học bổng giá trị từ 50% đến 100% của các trường đại học top đầu tại UK cho năm học 2026.",
        content: "Yêu cầu hồ sơ, deadline nộp và bí quyết săn học bổng thành công từ các cựu du học sinh.",
        category_id: 201, // Tin tức Du học
        created_at: "2025-08-25T13:30:00Z",
        updated_at: "2025-08-25T13:30:00Z",
        type: "news",
        status: "Published",
        isFeatured: false,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Tổng hợp Học bổng Du học Anh 2026 | Danh sách các trường",
        metaDescription: "Cơ hội nhận học bổng du học Anh giá trị cao cho sinh viên Việt Nam. Hướng dẫn chi tiết cách apply.",
        keywords: ["học bổng du học anh", "du học uk", "săn học bổng"]
    },
    {
        id: 106,
        author_id: 303,
        img: "/news/cover/pte-scoring.jpg",
        title: "Giải mã thuật toán chấm điểm PTE Write Essay và Summarize Written Text",
        slug: "giai-ma-thuat-toan-pte-writing",
        summary: "Phân tích cách AI của PTE chấm điểm hai phần thi viết, tập trung vào độ chính xác của ngữ pháp và từ vựng.",
        content: "Hướng dẫn tối ưu hóa bài viết để đạt điểm cao, tránh các lỗi phổ biến mà máy tính dễ trừ điểm.",
        category_id: 202, // Mẹo học PTE/IELTS
        created_at: "2025-08-01T17:00:00Z",
        updated_at: "2025-08-01T17:00:00Z",
        type: "news",
        status: "Published",
        isFeatured: false,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Thuật toán chấm điểm PTE Writing | Cách làm bài Write Essay hiệu quả",
        metaDescription: "Tìm hiểu bí mật chấm điểm PTE Write Essay và Summarize Written Text để tối đa hóa điểm số.",
        tags: [TAGS.pte_change],
        keywords: ["thuật toán pte", "pte writing", "mẹo thi pte"]
    },
    {
        id: 107,
        author_id: 301,
        img: "/news/cover/aus-pr.jpg",
        title: "Tiểu bang nào ở Úc đang cần lao động nhất trong năm 2026?",
        slug: "tieu-bang-uc-can-lao-dong-2026",
        summary: "Phân tích nhu cầu lao động theo ngành nghề tại các bang như Victoria, NSW và South Australia, mở ra cơ hội định cư.",
        content: "Danh sách ngành nghề ưu tiên, yêu cầu visa và cơ hội tìm việc làm tại các bang có chính sách định cư hấp dẫn.",
        category_id: 203, // Tin tức Định cư
        created_at: "2025-07-20T11:45:00Z",
        updated_at: "2025-07-20T11:45:00Z",
        type: "news",
        status: "Published",
        isFeatured: false,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Tiểu bang Úc cần lao động nhất 2026 | Cơ hội định cư PR",
        metaDescription: "Cập nhật danh sách các ngành nghề thiếu hụt lao động tại Úc, giúp bạn định hướng du học và định cư.",
        tags: [TAGS.visa],
        keywords: ["định cư úc", "việc làm úc", "visa 189 190"]
    },
    {
        id: 108,
        author_id: 303,
        img: "/news/cover/ielts-reading-trick.jpg",
        title: "Bí quyết làm nhanh IELTS Reading: 3 kỹ thuật 'Scanning' và 'Skimming'",
        slug: "bi-quyet-lam-nhanh-ielts-reading",
        summary: "Hướng dẫn chi tiết cách áp dụng Skimming và Scanning hiệu quả để hoàn thành bài Reading mà vẫn đạt điểm cao.",
        content: "Giải thích rõ ràng về hai kỹ thuật, kèm theo bài tập thực hành cụ thể giúp tăng tốc độ đọc hiểu.",
        category_id: 202, // Mẹo học PTE/IELTS
        created_at: "2025-07-05T15:00:00Z",
        updated_at: "2025-07-05T15:00:00Z",
        type: "news",
        status: "Published",
        isFeatured: false,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Kỹ thuật Skimming Scanning IELTS Reading Hiệu quả",
        metaDescription: "Mẹo làm nhanh bài IELTS Reading, giúp bạn quản lý thời gian và tìm đáp án chính xác.",
        tags: [TAGS.ielts_tips],
        keywords: ["mẹo ielts reading", "skimming scanning", "luyện ielts"]
    }
];