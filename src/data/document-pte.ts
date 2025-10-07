import { Post } from "@/types/post";
// Giả định Categories
const CATEGORIES = [
    { id: 101, name: "Ebook Ngữ Pháp", slug: "ebook-ngu-phap", category_type: "document_type" },
    { id: 102, name: "Bài Test IELTS", slug: "bai-test-ielts", category_type: "document_type" },
    { id: 103, name: "Tài liệu PTE", slug: "tai-lieu-pte", category_type: "document_type" },
];

const findCategory = (id: number) => CATEGORIES.find(c => c.id === id);

// Giả định Tags
const TAGS = {
    grammar: { id: 1, name: "Ngữ pháp cơ bản", slug: "ngu-phap-co-ban" },
    ielts_mock: { id: 2, name: "IELTS Mock Test", slug: "ielts-mock-test" },
    pte_tips: { id: 3, name: "Mẹo thi PTE", slug: "meo-thi-pte" },
    writing: { id: 4, name: "Học Viết", slug: "hoc-viet" },
};

// import { Category } from "./category";
// import { Tag } from "./tag";
// ... (Giả định CATEGORIES và TAGS đã được định nghĩa ở trên)

export const document_list_data: Post[] = [
    {
        id: 1,
        author_id: 201,
        img: "/docs/cover/grammar-a-z.jpg",
        title: "Ebook Ngữ Pháp Tiếng Anh A-Z (2025 Edition)",
        slug: "ebook-ngu-phap-a-z",
        summary: "Tổng hợp toàn bộ kiến thức ngữ pháp từ cơ bản đến nâng cao, có kèm bài tập thực hành.",
        content: "Tài liệu này là cẩm nang không thể thiếu cho người học tiếng Anh, bao gồm 12 chương và hơn 500 bài tập.",
        category_id: 101, // Ebook Ngữ Pháp
       
        created_at: "2025-09-01T10:00:00Z",
        updated_at: "2025-09-15T10:00:00Z",
        type: "document",
        status: "Published",
        isFeatured: true,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Tải Ebook Ngữ Pháp Tiếng Anh A-Z Miễn Phí",
        metaDescription: "Download miễn phí Ebook Ngữ Pháp Tiếng Anh đầy đủ nhất, chuẩn bị cho mọi kỳ thi.",
        tags: [TAGS.grammar],
        keywords: ["ebook ngữ pháp", "ngữ pháp tiếng anh", "tài liệu tiếng anh cơ bản"]
    },
    {
        id: 2,
        author_id: 202,
        img: "/docs/cover/ielts-mock-test-15.jpg",
        title: "IELTS Full Mock Test Vol. 15 (Kèm Audio)",
        slug: "ielts-full-mock-test-vol-15",
        summary: "Bộ đề thi thử IELTS mới nhất năm 2025, có đáp án chi tiết và file nghe chất lượng cao.",
        content: "Thử sức với bộ đề mô phỏng kỳ thi thật, giúp bạn làm quen với cấu trúc đề và quản lý thời gian.",
        category_id: 102, // Bài Test IELTS
        created_at: "2025-10-01T15:30:00Z",
        updated_at: "2025-10-01T15:30:00Z",
        type: "document",
        status: "Published",
        isFeatured: true,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Download IELTS Mock Test Mới Nhất 2025 | Miễn phí",
        metaDescription: "Tải ngay 4 kỹ năng Listening, Reading, Writing, Speaking Full Mock Test IELTS Vol. 15.",
        tags: [TAGS.ielts_mock, TAGS.writing],
        keywords: ["mock test ielts", "bài thi thử ielts", "tài liệu luyện nghe ielts"]
    },
    {
        id: 3,
        author_id: 203,
        img: "/docs/cover/pte-vocabs.jpg",
        title: "PTE Vocab List: Top 500 Từ Vựng Thường Gặp",
        slug: "pte-vocab-list-top-500",
        summary: "Danh sách 500 từ vựng cốt lõi thường xuyên xuất hiện trong các bài thi PTE gần đây.",
        content: "Tài liệu được phân loại theo chủ đề, kèm theo ví dụ và audio minh họa.",
        category_id: 103, // Tài liệu PTE
        created_at: "2025-08-20T08:00:00Z",
        updated_at: "2025-08-20T08:00:00Z",
        type: "document",
        status: "Published",
        isFeatured: false,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Danh sách 500 Từ Vựng PTE Academic Quan Trọng",
        metaDescription: "Tập trung học 500 từ vựng thiết yếu để tăng điểm nhanh chóng trong bài thi PTE.",
        tags: [TAGS.pte_tips],
        keywords: ["từ vựng pte", "pte vocab", "tài liệu ôn pte"]
    },
    {
        id: 4,
        author_id: 201,
        img: "/docs/cover/ielts-writing-band-8.jpg",
        title: "IELTS Writing Sample Band 8.0+",
        slug: "ielts-writing-sample-band-8",
        summary: "Tuyển tập các bài mẫu Writing Task 1 & 2 đạt band 8.0+ do giáo viên chuyên môn biên soạn.",
        content: "Phân tích cấu trúc, từ vựng cao cấp và cách phát triển ý cho từng dạng bài Writing.",
        category_id: 102,
        created_at: "2025-07-10T11:00:00Z",
        updated_at: "2025-07-10T11:00:00Z",
        type: "document",
        status: "Published",
        isFeatured: false,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Bài Mẫu IELTS Writing Band 8.0+ Mới Nhất | PDF Download",
        metaDescription: "Xem và học theo các bài viết mẫu chất lượng cao để cải thiện điểm số Writing của bạn.",
        tags: [TAGS.writing, TAGS.ielts_mock],
        keywords: ["ielts writing mẫu", "band 8 writing", "tài liệu viết ielts"]
    },
    {
        id: 5,
        author_id: 204,
        img: "/docs/cover/pte-ra.jpg",
        title: "Chiến Thuật Tối Ưu Repeat Sentence (PTE)",
        slug: "pte-repeat-sentence-strategy",
        summary: "Hướng dẫn chi tiết cách ghi nhớ và lặp lại câu hiệu quả, kỹ thuật nghe chép chính tả nhanh.",
        content: "Chiến thuật giúp tối đa hóa điểm Repeat Sentence, một phần quan trọng của PTE Speaking và Listening.",
        category_id: 103,
        created_at: "2025-06-05T14:00:00Z",
        updated_at: "2025-06-05T14:00:00Z",
        type: "document",
        status: "Published",
        isFeatured: true,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Tài liệu PTE Repeat Sentence Hiệu quả | Kỹ thuật Tăng điểm",
        metaDescription: "Bí quyết chinh phục Repeat Sentence trong PTE Academic. Download tài liệu độc quyền.",
        tags: [TAGS.pte_tips],
        keywords: ["pte repeat sentence", "chiến thuật pte", "luyện speaking pte"]
    },
    {
        id: 6,
        author_id: 203,
        img: "/docs/cover/phrasal-verbs.jpg",
        title: "100 Phrasal Verbs Thông Dụng Nhất",
        slug: "100-phrasal-verbs-thong-dung",
        summary: "Danh sách 100 cụm động từ (Phrasal Verbs) thường dùng trong giao tiếp và văn viết học thuật.",
        content: "Cung cấp định nghĩa, ví dụ minh họa và bài tập vận dụng cho từng cụm động từ.",
        category_id: 101,
     
        created_at: "2025-05-12T09:30:00Z",
        updated_at: "2025-05-12T09:30:00Z",
        type: "document",
        status: "Published",
        isFeatured: false,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Ebook 100 Phrasal Verbs Thiết Yếu | Tải Miễn Phí",
        metaDescription: "Nâng cao vốn từ vựng với 100 Phrasal Verbs quan trọng, ứng dụng ngay vào bài nói và viết.",
        tags: [TAGS.grammar],
        keywords: ["phrasal verbs", "từ vựng nâng cao", "ebook ngữ pháp"]
    },
    {
        id: 7,
        author_id: 204,
        img: "/docs/cover/ielts-speaking-topic.jpg",
        title: "Tuyển Tập 50 Chủ đề IELTS Speaking Part 2",
        slug: "50-chu-de-ielts-speaking-part-2",
        summary: "Tổng hợp 50 chủ đề Speaking Part 2 thường gặp nhất, kèm theo ý tưởng và từ vựng gợi ý.",
        content: "Tài liệu giúp thí sinh chuẩn bị ý tưởng trước cho phần thi quan trọng này.",
        category_id: 102,
        created_at: "2025-04-18T16:00:00Z",
        updated_at: "2025-04-18T16:00:00Z",
        type: "document",
        status: "Published",
        isFeatured: false,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "50 Chủ đề IELTS Speaking Part 2 Mới Nhất | Tải PDF",
        metaDescription: "Chuẩn bị kỹ lưỡng cho IELTS Speaking Part 2 với 50 chủ đề dự đoán và từ vựng Band 7+.",
        tags: [TAGS.ielts_mock],
        keywords: ["ielts speaking topic", "speaking part 2", "tài liệu ielts"]
    },
    {
        id: 8,
        author_id: 202,
        img: "/docs/cover/pte-essay-template.jpg",
        title: "PTE Write Essay Template & Sample",
        slug: "pte-write-essay-template",
        summary: "Cung cấp các mẫu câu và cấu trúc viết bài luận (Write Essay) PTE chuẩn, dễ áp dụng để đạt điểm cao.",
        content: "Bao gồm 3 mẫu template khác nhau cho các loại đề bài thường gặp.",
        category_id: 103,
        created_at: "2025-03-25T07:00:00Z",
        updated_at: "2025-03-25T07:00:00Z",
        type: "document",
        status: "Published",
        isFeatured: false,
        startDate: undefined,
        endDate: undefined,
        metaTitle: "Template Write Essay PTE Academic Mẫu | Download miễn phí",
        metaDescription: "Sử dụng template chuẩn để tối ưu điểm Write Essay, tiết kiệm thời gian thi PTE.",
        tags: [TAGS.pte_tips, TAGS.writing],
        keywords: ["pte write essay", "template pte", "tài liệu luyện viết pte"]
    }
];