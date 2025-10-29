import { Course } from "@/types/courses";
import { CategoryItem, CategoryType } from "@/types/category"; // Giả định

// Giả định dữ liệu Category (để đảm bảo Category? là hợp lệ)
const CATEGORIES: CategoryItem[] = [
    { id: 1, name: "IELTS Luyện Thi", slug: "ielts-luyen-thi", icon: "", parent_id: null, category_type: CategoryType.COURSE, children: [] },
    { id: 2, name: "Tiếng Anh Giao Tiếp", slug: "tieng-anh-giao-tiep", icon: "", parent_id: null, category_type: CategoryType.COURSE, children: [] },
    { id: 3, name: "PTE Academic", slug: "pte-academic", icon: "", parent_id: null, category_type: CategoryType.COURSE, children: [] },
];

const findCategory = (id: number): CategoryItem | undefined => {
    return CATEGORIES.find(c => c.id === id);
};

export const get_list_course: Course[] = [
    // --- 4 KHÓA HỌC IELTS (CATEGORY ID 1) ---
    {
        id: 1,
        img: "/images/course/ielts-7-mastery.jpg",
        title: "IELTS 7.0+ Mastery: Chiến Lược Tối Ưu",
        slug: "ielts-7-mastery-toi-uu",
        description: "Khóa học 12 tuần chuyên sâu, tập trung vào kỹ năng viết và nói, đảm bảo đạt band 7.0 trở lên.",
        category_id: 1,
        metaTitle: "Khóa học IELTS 7.0+ Cam kết | Lộ trình 12 tuần",
        metaDescription: "Chinh phục IELTS 7.0+ với chiến lược học tập cá nhân hóa, tài liệu độc quyền và bài kiểm tra thực tế.",
        keywords: ["luyện thi ielts 7.0", "ielts writing", "ielts cấp tốc"]
    },
    {
        id: 2,
        img: "/images/course/ielts-foundation.jpg",
        title: "IELTS Foundation: Nền Tảng 4.5+",
        slug: "ielts-nen-tang-4-5",
        description: "Dành cho người mất gốc hoặc mới làm quen với IELTS, xây dựng từ vựng và ngữ pháp cơ bản.",
        category_id: 1,
        metaTitle: "Khóa học IELTS cơ bản 4.5+ cho người mới bắt đầu",
        metaDescription: "Xây dựng nền tảng IELTS vững chắc. Bắt đầu từ 0 để đạt band 4.5+ sau 8 tuần.",
        keywords: ["ielts cho người mất gốc", "ielts 4.5", "ngữ pháp ielts"]
    },
    {
        id: 3,
        img: "/images/course/ielts-writing-intensive.jpg",
        title: "IELTS Intensive Writing & Speaking",
        slug: "ielts-writing-speaking-chuyen-sau",
        description: "Chỉ tập trung vào 2 kỹ năng khó nhất: Writing Task 1 & 2 và Speaking Part 2 & 3.",
        category_id: 1,
        metaTitle: "Khóa học IELTS Writing Speaking chuyên sâu | Luyện band cao",
        metaDescription: "Luyện tập chuyên sâu kỹ năng viết và nói để nâng điểm nhanh chóng. Giáo viên 8.0+ sửa bài 1-1.",
        keywords: ["luyện ielts writing", "ielts speaking", "khóa học chuyên đề ielts"]
    },
    {
        id: 4,
        img: "/images/course/ielts-online.jpg",
        title: "IELTS Online Toàn Diện: Học mọi lúc, mọi nơi",
        slug: "ielts-online-toan-dien",
        description: "Lớp học trực tuyến linh hoạt, chương trình chuẩn 6.0+, có hỗ trợ qua Zoom và hệ thống LMS.",
        category_id: 1,
        metaTitle: "Khóa học IELTS Online chất lượng cao | Tương tác trực tiếp",
        metaDescription: "Học IELTS trực tuyến với giáo viên hàng đầu. Bài giảng video và tài liệu số không giới hạn.",
        keywords: ["học ielts online", "luyện thi ielts qua mạng", "ielts 6.0"]
    },

    // --- 4 KHÓA HỌC GIAO TIẾP (CATEGORY ID 2) ---
    {
        id: 5,
        img: "/images/course/comm-business.jpg",
        title: "Tiếng Anh Giao Tiếp Công Sở (Business English)",
        slug: "giao-tiep-cong-so-chuyen-nghiep",
        description: "Tập trung vào từ vựng, mẫu câu, và kỹ năng thuyết trình cần thiết trong môi trường làm việc quốc tế.",
        category_id: 2,
        metaTitle: "Tiếng Anh Giao Tiếp Công Sở | Khóa học Business English",
        metaDescription: "Tự tin giao tiếp trong các cuộc họp, email và đàm phán kinh doanh. Phát triển kỹ năng chuyên nghiệp.",
        keywords: ["tiếng anh công sở", "business english", "tiếng anh cho người đi làm"]
    },
    {
        id: 6,
        img: "/images/course/comm-everyday.jpg",
        title: "Giao Tiếp Hàng Ngày Tự Tin (Everyday English)",
        slug: "giao-tiep-hang-ngay-tu-tin",
        description: "Khóa học rèn luyện phản xạ nghe nói, cải thiện phát âm và độ trôi chảy trong các tình huống đời thường.",
        category_id: 2,
        metaTitle: "Khóa học Tiếng Anh Giao Tiếp cơ bản | Everyday English",
        metaDescription: "Học tiếng Anh giao tiếp tự nhiên, cải thiện phát âm và phản xạ. Lớp học tương tác cao.",
        keywords: ["giao tiếp tiếng anh cơ bản", "phản xạ tiếng anh", "tiếng anh đời sống"]
    },
    {
        id: 7,
        img: "/images/course/pronunciation-master.jpg",
        title: "Master Pronunciation: Phát Âm Chuẩn Quốc Tế",
        slug: "master-phat-am-quoc-te",
        description: "Khóa học chuyên biệt sửa lỗi phát âm, luyện ngữ điệu và trọng âm theo chuẩn IPA.",
        category_id: 2,
        metaTitle: "Khóa học Phát Âm Tiếng Anh Chuẩn IPA | Sửa lỗi chuyên sâu",
        metaDescription: "Hoàn thiện phát âm tiếng Anh, luyện ngữ điệu tự nhiên như người bản xứ. Đăng ký ngay lớp Master Pronunciation.",
        keywords: ["luyện phát âm tiếng anh", "học ipa", "cải thiện ngữ điệu"]
    },
    {
        id: 8,
        img: "/images/course/comm-travel.jpg",
        title: "Tiếng Anh Du Lịch và Hội Nhập",
        slug: "tieng-anh-du-lich-hoi-nhap",
        description: "Học các tình huống giao tiếp quan trọng khi đi du lịch, check-in, gọi món, và hỏi đường.",
        category_id: 2,
        metaTitle: "Khóa học Tiếng Anh Du Lịch Cấp Tốc | Hội nhập quốc tế",
        metaDescription: "Tự tin sử dụng tiếng Anh khi du lịch, nắm vững các mẫu câu cần thiết cho mọi tình huống.",
        keywords: ["tiếng anh du lịch", "tiếng anh cho người đi nước ngoài", "giao tiếp cơ bản"]
    },

    // --- 4 KHÓA HỌC PTE (CATEGORY ID 3) ---
    {
        id: 9,
        img: "/images/course/pte-core.jpg",
        title: "PTE Core: Lộ Trình Định Cư (58/65)",
        slug: "pte-core-dinh-cu-58-65",
        description: "Khóa học chuyên biệt cho PTE Core, đảm bảo đạt điểm 58 hoặc 65 cho mục đích định cư Úc/Canada.",
        category_id: 3,

        metaTitle: "Luyện thi PTE Core định cư 58/65 | Cam kết đầu ra",
        metaDescription: "Tập trung vào các phần thi Read Aloud và Repeat Sentence, chiến thuật làm bài PTE Core hiệu quả.",
        keywords: ["luyện thi pte core", "pte định cư", "pte 58"]
    },
    {
        id: 10,
        img: "/images/course/pte-ipass-exclusive.jpg",
        title: "PTE iPASS Độc Quyền: Luyện 8.0+",
        slug: "pte-ipass-doc-quyen-8-0",
        description: "Sử dụng nền tảng iPASS độc quyền, kết hợp với giáo viên 1-1 để đạt mục tiêu PTE 79+ (IELTS 8.0).",
        category_id: 3,
        metaTitle: "Khóa học PTE 79+ (IELTS 8.0) Độc quyền | Nền tảng iPASS",
        metaDescription: "Chinh phục PTE Academic với điểm số cao nhất. Lộ trình cá nhân hóa và công cụ luyện tập AI hiện đại.",
        keywords: ["pte 79+", "luyện pte 8.0", "pte academic"]
    },
    {
        id: 11,
        img: "/images/course/pte-booster.jpg",
        title: "PTE Booster: Giải Đề Cấp Tốc",
        slug: "pte-booster-giai-de-cap-toc",
        description: "Khóa giải đề cấp tốc trong 3 tuần, dành cho học viên đã có nền tảng và cần ôn tập trước ngày thi.",
        category_id: 3,
        metaTitle: "Khóa PTE cấp tốc Giải Đề | Ôn thi 3 tuần",
        metaDescription: "Tăng điểm nhanh chóng với các đề thi PTE mới nhất. Rèn luyện kỹ năng quản lý thời gian thi.",
        keywords: ["pte cấp tốc", "giải đề pte", "ôn thi pte"]
    },
    {
        id: 12,
        img: "/images/course/pte-pronunciation.jpg",
        title: "PTE Speaking Focus: Nâng Cao Phát Âm",
        slug: "pte-speaking-focus-phat-am",
        description: "Tập trung tối ưu hóa điểm số Speaking thông qua các kỹ thuật phát âm và độ lưu loát cho máy tính chấm điểm.",
        category_id: 3,
        metaTitle: "Khóa học PTE Speaking Chuyên sâu | Tối ưu hóa điểm",
        metaDescription: "Khóa học độc quyền cải thiện phát âm và lưu loát cho PTE, đảm bảo điểm số Speaking tối đa.",
        keywords: ["pte speaking", "cải thiện phát âm pte", "lưu loát pte"]
    }
];