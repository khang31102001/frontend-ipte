import { articleCategorySchema, articleSchema, tagSchema, type ArticleCategoryInput, type ArticleInput, type TagInput } from "@/features/articles/schemas";
import type { Article, ArticleCategory, Tag } from "@/features/articles/types";
import { bannerSchema, type BannerInput } from "@/features/banners/schemas";
import type { Banner } from "@/features/banners/types";
import { cmsPageSchema, type CmsPageInput } from "@/features/cms-pages/schemas";
import type { CmsPage } from "@/features/cms-pages/types";
import { formDefinitionSchema, publicSubmitSchema, submissionUpdateSchema, type FormDefinitionInput, type SubmissionUpdateInput } from "@/features/forms/schemas";
import type { FormDefinition, FormSubmission, SubmissionStatus } from "@/features/forms/types";
import { mediaSchema, type MediaInput } from "@/features/media/schemas";
import type { MediaItem } from "@/features/media/types";
import { siteConfigSchema } from "@/features/site-config/schemas";
import type { SiteConfig } from "@/features/site-config/types";
import { testimonialSchema, type TestimonialInput } from "@/features/testimonials/schemas";
import type { Testimonial } from "@/features/testimonials/types";
import type { Course } from "@/features/courses/types";
import type { User } from "@/features/users/types";
import { COLLECTIONS } from "../collections";
import { writeAudit } from "../engine/audit";
import { collection, insert, newId, nowIso, registerCollection } from "../engine/db";
import { publishGuard } from "../engine/guards";
import { queryList } from "../engine/list";
import { registerLookup } from "../engine/lookups";
import { defineResource } from "../engine/resource";
import { conflict, created, notFound, ok, validation } from "../engine/responses";
import { addRoutes } from "../engine/router";
import { validateBody } from "../engine/validate";
import { createRng, emailFor, isoDaysAgo, pad, phoneFor, stripVietnamese, vietnameseName } from "../seed/random";

const C = COLLECTIONS;

const slugOf = (s: string) =>
  stripVietnamese(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// ── Seeds ───────────────────────────────────────────────────────────────────
function seedPages(): CmsPage[] {
  const rows: Pick<CmsPage, "title" | "template" | "status" | "summary" | "content" | "sections" | "noindex">[] = [
    {
      title: "Giới thiệu PTE iPASS",
      template: "static",
      status: "published",
      summary: "Trung tâm luyện thi PTE với giáo viên điểm cao và lộ trình cá nhân hóa.",
      content: "<p>PTE iPASS đồng hành cùng học viên từ những bước đầu tiên đến ngày đạt mục tiêu điểm PTE.</p><p>Chúng tôi tập trung vào lộ trình rõ ràng, phản hồi chi tiết, mock test hằng tuần và đội ngũ giáo viên điểm cao — dành cho người đi làm bận rộn lẫn học viên cần cấp tốc.</p>",
      sections: [
        { type: "text", heading: "Sứ mệnh của PTE iPASS", body: "<p>Mang đến lộ trình PTE rõ ràng, dễ hiểu và hiệu quả cho người bận rộn; giúp mỗi học viên đạt điểm mục tiêu với chi phí và thời gian hợp lý.</p>", items: [] },
        { type: "text", heading: "Tầm nhìn", body: "<p>Trở thành trung tâm luyện thi PTE được học viên Việt Nam và cộng đồng du học – định cư Úc tin chọn nhờ chất lượng giảng dạy minh bạch.</p>", items: [] },
        { type: "features", heading: "Đối tượng phù hợp", body: "PTE iPASS thiết kế khóa học và lộ trình cho nhiều nhóm học viên khác nhau:", items: ["Du học sinh | Cần điểm PTE để nộp hồ sơ vào các trường đại học tại Úc.", "Định cư & visa | Cần 65–79+ cho các diện visa 189, 190, 491.", "Người đi làm bận rộn | Lịch học linh hoạt buổi tối và cuối tuần, học online hoặc tại trung tâm.", "Mất gốc tiếng Anh | Lớp nền tảng xây phát âm, từ vựng và ngữ pháp trước khi vào lộ trình điểm cao."] },
        { type: "gallery", heading: "Cơ sở vật chất", body: "Không gian học hiện đại, đầy đủ phòng luyện Speaking và phòng thi thử.", items: ["/images/facility-2.jpg | Phòng học nhóm", "/images/facility-3.jpg | Khu vực tư vấn", "/images/facility-4.jpg | Phòng luyện Speaking", "/images/facility-5.jpg | Phòng thi thử", "/images/facility-6.jpg | Khu vực chờ"] },
        { type: "features", heading: "Hệ sinh thái iPASS", body: "Một hành trình học liền mạch từ test đầu vào đến ngày thi:", items: ["Test đầu vào & tư vấn lộ trình | Đánh giá trình độ miễn phí và gợi ý khóa phù hợp.", "Lớp học theo mục tiêu điểm | Từ nền tảng đến 79+, giáo viên chấm và sửa bài chi tiết.", "Mock test hằng tuần | Quen áp lực phòng thi, theo dõi tiến bộ bằng số liệu.", "Cộng đồng học viên | Chia sẻ kinh nghiệm, tài liệu và lịch thi mới nhất."] },
      ],
      noindex: false,
    },
    {
      title: "Chính sách bảo mật",
      template: "static",
      status: "published",
      summary: "Cách PTE iPASS thu thập, sử dụng và bảo vệ thông tin của bạn.",
      content: "Chúng tôi chỉ thu thập thông tin cần thiết để tư vấn và hỗ trợ học tập, không chia sẻ cho bên thứ ba khi chưa có sự đồng ý của bạn.",
      sections: [],
      noindex: false,
    },
    {
      title: "Điều khoản sử dụng",
      template: "static",
      status: "published",
      content: "Khi sử dụng website và dịch vụ của PTE iPASS, bạn đồng ý với các điều khoản về quyền sở hữu nội dung, quy định học viên và chính sách thanh toán.",
      sections: [],
      noindex: false,
    },
    {
      title: "Đăng ký học thử miễn phí",
      template: "landing",
      status: "published",
      summary: "Trải nghiệm buổi học PTE thực tế cùng giáo viên.",
      sections: [
        { type: "hero", heading: "Học thử PTE miễn phí cùng giáo viên 85+", body: "Buổi học online 2 giờ, test trình độ và nhận lộ trình cá nhân.", buttonLabel: "Đăng ký ngay", buttonUrl: "#form", items: [] },
        { type: "features", heading: "Bạn nhận được gì?", items: ["Test đầu vào miễn phí", "Lộ trình cá nhân hóa", "Tài liệu ôn thi", "Voucher học phí"] },
        { type: "faq", heading: "Câu hỏi thường gặp", items: ["Học thử có mất phí không? | Hoàn toàn miễn phí.", "Tôi chưa biết gì về PTE có học được không? | Được, giáo viên sẽ hướng dẫn từ cơ bản."] },
        { type: "cta", heading: "Giữ chỗ buổi học thử gần nhất", buttonLabel: "Đăng ký học thử", buttonUrl: "#form", items: [] },
      ],
      noindex: false,
    },
    {
      title: "Luyện thi PTE cấp tốc",
      template: "landing",
      status: "draft",
      sections: [{ type: "hero", heading: "Cấp tốc PTE 58/65/79 trong 6 tuần", buttonLabel: "Nhận tư vấn", buttonUrl: "/lien-he", items: [] }],
      noindex: true,
    },
    {
      title: "Trang chủ",
      template: "landing",
      status: "published",
      summary: "PTE iPASS cung cấp khóa học PTE 1:1, nhóm nhỏ, lộ trình rõ ràng, giáo viên điểm cao, cam kết đầu ra 50 – 65 – 79+.",
      sections: [
        { type: "hero", heading: "Đạt điểm PTE nhanh hơn", body: "Tiết kiệm 30% chi phí!", items: ["Cam kết đầu ra", "Ôn luyện miễn phí, mọi lúc mọi nơi", "Kho tài liệu khổng lồ, cập nhật mỗi ngày", "Review 1 - 1 siêu chi tiết, khắc phục điểm yếu"] },
        { type: "stats", heading: "Con số nổi bật", items: ["15.000+ đạt điểm", "Giảng viên chất lượng", "Cam kết đầu ra", "Online & Offline"] },
        { type: "steps", heading: "Lộ trình học PTE chuẩn quốc tế", body: "Từ test đầu vào đến ngày thi, mỗi bước đều có giáo viên đồng hành và số liệu theo dõi tiến bộ.", items: ["Test đầu vào & tư vấn lộ trình | Đánh giá trình độ miễn phí, xác định điểm mục tiêu và thời hạn nộp hồ sơ.", "Xây nền tảng | Phát âm, từ vựng học thuật và chiến lược từng dạng câu hỏi PTE.", "Luyện đề theo kỹ năng | Speaking, Writing, Reading, Listening với phản hồi chi tiết mỗi tuần.", "Mock test & chốt lịch thi | Thi thử sát đề thật, tinh chỉnh chiến lược trước ngày thi chính thức."] },
        { type: "programs", heading: "Chương trình đào tạo chất lượng cao", body: "Chọn lộ trình phù hợp với điểm xuất phát và mục tiêu của bạn.", items: ["PTE Nền tảng | Dành cho học viên mới bắt đầu, xây phát âm, từ vựng và kỹ năng cốt lõi. | /khoa-hoc/pte-nen-tang-pre-pte", "PTE 50 – 58 | Lộ trình cho du học và visa làm việc, tập trung kỹ năng còn yếu. | /khoa-hoc/pte-50-58", "PTE 65 – 79 | Lộ trình định cư 189/190, luyện đề chuyên sâu và mock test hằng tuần. | /khoa-hoc/pte-65-79", "Cấp tốc | Khóa ngắn hạn tăng tốc trước ngày thi, lịch học dày và chấm bài mỗi buổi. | /khoa-hoc/cap-toc"] },
        { type: "courses", heading: "Khóa học nổi bật", body: "Các khóa được học viên lựa chọn nhiều nhất.", items: [] },
        { type: "teachers", heading: "Đội ngũ giáo viên", body: "Giáo viên PTE 85+ giàu kinh nghiệm, tận tâm với từng học viên.", items: [] },
        { type: "articles", heading: "Tin tức mới nhất", body: "Lịch khai giảng, ưu đãi và kinh nghiệm thi PTE được cập nhật liên tục.", items: [] },
        { type: "community", heading: "Tham gia cộng đồng iPTE", body: "Kết nối với hàng nghìn học viên trong cộng đồng học tập năng động. Chia sẻ kinh nghiệm, học hỏi và cùng nhau tiến bộ.", items: [] },
        { type: "lead_form", heading: "Đánh giá trình độ tiếng Anh miễn phí", body: "Tư vấn lộ trình PTE phù hợp mục tiêu của bạn - Liên hệ trong 24 giờ – không ràng buộc", items: [] },
      ],
      noindex: false,
    },
    {
      title: "Câu hỏi thường gặp về khóa học",
      template: "landing",
      status: "published",
      summary: "Giải đáp nhanh về học phí, lịch học, giáo viên và cam kết đầu ra.",
      sections: [
        {
          type: "faq",
          heading: "Câu hỏi thường gặp",
          items: [
            "Tôi mất gốc tiếng Anh có học PTE được không? | Được. Lớp PTE Nền tảng xây lại phát âm, từ vựng và ngữ pháp trước khi vào lộ trình điểm mục tiêu.",
            "Học online hay tại trung tâm? | Cả hai hình thức đều có. Lớp online học trực tiếp qua Zoom, có ghi hình để xem lại.",
            "Học phí đã gồm tài liệu và mock test chưa? | Đã gồm tài liệu, mock test hằng tuần và chấm bài Writing/Speaking.",
            "Bao lâu thì thi được? | Tùy điểm đầu vào và mục tiêu. Tư vấn viên sẽ ước lượng sau khi bạn làm test đầu vào miễn phí.",
          ],
        },
      ],
      noindex: false,
    },
    {
      title: "Ưu đãi học phí tháng 10",
      template: "landing",
      status: "review",
      summary: "Chương trình ưu đãi dành cho học viên đăng ký trong tháng.",
      sections: [
        { type: "hero", heading: "Giảm 15% học phí khi đăng ký tháng 10", body: "Áp dụng cho các khóa PTE 50–79.", buttonLabel: "Nhận ưu đãi", buttonUrl: "#form", items: [] },
        { type: "courses", heading: "Khóa học áp dụng", items: [] },
      ],
      noindex: false,
    },
  ];
  return rows.map((r, i) => ({
    ...r,
    id: `pg-${pad(i + 1)}`,
    slug: slugOf(r.title),
    metaTitle: `${r.title} | PTE iPASS`,
    metaDescription: r.summary,
    canonicalUrl: undefined,
    publishedAt: r.status === "published" ? isoDaysAgo(120 - i * 10) : null,
    updatedByName: "Hoàng Thu Truyền Thông",
    createdAt: isoDaysAgo(200 - i * 15),
    updatedAt: isoDaysAgo(i * 3 + 1),
  }));
}

function seedArticleCategories(): ArticleCategory[] {
  const names = ["Kiến thức PTE", "Kinh nghiệm thi", "Tin tức & sự kiện", "Du học & định cư", "Câu chuyện học viên", "PTE cho đại học"];
  return names.map((name, i) => ({
    id: `acat-${pad(i + 1)}`,
    name,
    slug: slugOf(name),
    description: `Bài viết thuộc chuyên mục ${name}.`,
    sortOrder: i + 1,
    isActive: true,
    articleCount: 0,
    createdAt: isoDaysAgo(400 - i * 20),
    updatedAt: isoDaysAgo(30 + i),
  }));
}

function seedTags(): Tag[] {
  const names = ["PTE Speaking", "PTE Writing", "Read Aloud", "Describe Image", "Điểm PTE", "Visa 189", "Visa 190", "Du học Úc", "Mẹo thi", "Luyện đề"];
  return names.map((name, i) => ({
    id: `tag-${pad(i + 1)}`,
    name,
    slug: slugOf(name),
    articleCount: 0,
    createdAt: isoDaysAgo(300 - i * 10),
    updatedAt: isoDaysAgo(20 + i),
  }));
}

const COVERS = ["/images/pte-2.jpg", "/images/pte-3.jpg", "/images/pte-4.jpg", "/images/pte-5.jpg", "/images/pte-6.jpg", "/images/img-news-default.jpg"];

function seedArticles(): Article[] {
  const rng = createRng(808);
  const titles: [string, string][] = [
    ["Cách tính điểm PTE Academic chi tiết nhất", "acat-001"],
    ["Mẹo làm Read Aloud đạt điểm tối đa", "acat-001"],
    ["Describe Image: cấu trúc 4 bước dễ nhớ", "acat-001"],
    ["Summarize Spoken Text: những lỗi thường gặp", "acat-001"],
    ["Write from Dictation: bí quyết nghe và chép chính xác", "acat-001"],
    ["Kinh nghiệm thi PTE 65 sau 3 tháng", "acat-002"],
    ["Ngày thi PTE: chuẩn bị gì và tránh gì", "acat-002"],
    ["Học PTE một mình hay đăng ký lớp?", "acat-002"],
    ["Lịch khai giảng các lớp PTE tháng 10", "acat-003"],
    ["Ưu đãi học phí cho học viên đăng ký sớm", "acat-003"],
    ["PTE iPASS khai trương cơ sở mới", "acat-003"],
    ["Điểm PTE cần cho visa 189, 190, 491", "acat-004"],
    ["Du học Úc: yêu cầu điểm PTE theo ngành", "acat-004"],
    ["So sánh PTE và IELTS cho người đi định cư", "acat-004"],
    ["Từ PTE 36 lên 65: câu chuyện của Minh Anh", "acat-005"],
    ["Hành trình 4 tháng đạt PTE 79 của Thu Trang", "acat-005"],
    ["Bí quyết ôn thi khi vừa đi làm vừa học", "acat-005"],
    ["Checklist ôn tập 2 tuần cuối trước ngày thi", "acat-002"],
    ["Các trường đại học Úc chấp nhận PTE Academic", "acat-006"],
    ["Điểm PTE đầu vào theo ngành tại đại học Úc", "acat-006"],
    ["Lộ trình PTE 8 tuần cho sinh viên năm cuối", "acat-006"],
  ];
  const staff = ["usr-005", "usr-003", "usr-004"];
  return titles.map(([title, categoryId], i) => {
    const status: Article["status"] = i % 9 === 8 ? "draft" : i % 7 === 6 ? "review" : "published";
    const body = [
      `<p>${title} là chủ đề được nhiều học viên quan tâm trong quá trình chuẩn bị cho kỳ thi PTE.</p>`,
      "<h2>Tổng quan</h2>",
      "<p>Trong bài viết này, chúng tôi tổng hợp các kinh nghiệm thực tế từ giáo viên và học viên đã đạt điểm cao, giúp bạn tiết kiệm thời gian ôn tập.</p>",
      "<h2>Cách bắt đầu</h2>",
      "<p>Hãy bắt đầu bằng việc xác định rõ mục tiêu điểm, sau đó chia nhỏ kế hoạch theo từng kỹ năng và luyện đề đều đặn mỗi tuần.</p>",
      "<ul><li>Xác định điểm mục tiêu và hạn nộp hồ sơ</li><li>Làm test đầu vào để biết điểm xuất phát</li><li>Chia kế hoạch theo kỹ năng yếu nhất</li></ul>",
      "<h2>Lưu ý cuối cùng</h2>",
      "<p>Đừng quên thi thử định kỳ để đánh giá tiến bộ và điều chỉnh chiến lược học phù hợp.</p>",
    ].join("");
    return {
      id: `art-${pad(i + 1)}`,
      title,
      slug: slugOf(title),
      excerpt: `${title} — hướng dẫn thực tế từ giáo viên PTE iPASS.`,
      content: body,
      coverUrl: COVERS[i % COVERS.length],
      categoryId,
      tagIds: rng.pickMany(["tag-001", "tag-002", "tag-003", "tag-004", "tag-005", "tag-006", "tag-007", "tag-008", "tag-009", "tag-010"], 1, 3),
      authorId: rng.pick(staff),
      isFeatured: i % 6 === 0,
      status,
      publishedAt: status === "published" ? isoDaysAgo(rng.int(5, 200)) : null,
      metaTitle: `${title} | PTE iPASS`,
      metaDescription: `${title} — chia sẻ từ giáo viên PTE iPASS.`,
      readingMinutes: 1,
      viewCount: status === "published" ? rng.int(120, 9800) : 0,
      createdAt: isoDaysAgo(220 - i * 9),
      updatedAt: isoDaysAgo(rng.int(1, 30)),
    };
  });
}

const FORM_ROWS: { name: string; type: FormDefinition["type"]; fields: FormDefinition["fields"]; submit: string; success: string }[] = [
  {
    name: "Đăng ký học thử miễn phí",
    type: "trial_registration",
    submit: "Đăng ký ngay",
    success: "Cảm ơn bạn! Tư vấn viên sẽ liên hệ xác nhận lịch học thử trong vòng 24 giờ.",
    fields: [
      { key: "fullName", label: "Họ và tên", type: "text", required: true, options: [] },
      { key: "phone", label: "Số điện thoại", type: "phone", required: true, options: [] },
      { key: "email", label: "Email", type: "email", required: false, options: [] },
      { key: "purpose", label: "Mục đích học PTE", type: "select", required: true, options: ["Du học", "Định cư", "Làm việc", "Học bổng", "Khác"] },
      { key: "targetScore", label: "Điểm mục tiêu", type: "select", required: true, options: ["PTE 36", "PTE 42", "PTE 50", "PTE 58", "PTE 65", "PTE 79"] },
      { key: "message", label: "Lời nhắn", type: "textarea", required: false, options: [] },
    ],
  },
  {
    name: "Đăng ký tư vấn",
    type: "consultation",
    submit: "Nhận tư vấn",
    success: "Đã nhận thông tin. Chúng tôi sẽ gọi lại cho bạn sớm nhất!",
    fields: [
      { key: "fullName", label: "Họ và tên", type: "text", required: true, options: [] },
      { key: "phone", label: "Số điện thoại", type: "phone", required: true, options: [] },
      { key: "targetScore", label: "Điểm mục tiêu", type: "select", required: false, options: ["PTE 36", "PTE 42", "PTE 50", "PTE 58", "PTE 65", "PTE 79"] },
      { key: "agree", label: "Tôi đồng ý được liên hệ tư vấn", type: "checkbox", required: true, options: [] },
    ],
  },
  {
    name: "Đặt lịch test đầu vào",
    type: "placement_booking",
    submit: "Đặt lịch",
    success: "Đặt lịch thành công! Vui lòng kiểm tra email xác nhận.",
    fields: [
      { key: "fullName", label: "Họ và tên", type: "text", required: true, options: [] },
      { key: "phone", label: "Số điện thoại", type: "phone", required: true, options: [] },
      { key: "email", label: "Email", type: "email", required: true, options: [] },
      { key: "preferredDate", label: "Ngày mong muốn", type: "date", required: true, options: [] },
    ],
  },
];

FORM_ROWS.push({
  name: "Liên hệ",
  type: "contact",
  submit: "Gửi liên hệ",
  success: "Cảm ơn bạn đã liên hệ PTE iPASS. Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.",
  fields: [
    { key: "fullName", label: "Họ và tên", type: "text", required: true, options: [] },
    { key: "phone", label: "Số điện thoại", type: "phone", required: true, options: [] },
    { key: "email", label: "Email", type: "email", required: false, options: [] },
    { key: "message", label: "Nội dung cần tư vấn", type: "textarea", required: false, options: [] },
  ],
});

function seedForms(): FormDefinition[] {
  return FORM_ROWS.map((f, i) => ({
    id: `frm-${pad(i + 1)}`,
    name: f.name,
    slug: slugOf(f.name),
    type: f.type,
    description: `Biểu mẫu ${f.name.toLowerCase()} trên website.`,
    fields: f.fields,
    submitLabel: f.submit,
    successMessage: f.success,
    notifyEmails: ["tuvan@pteipass.vn"],
    status: "active",
    submissionCount: 0,
    createdAt: isoDaysAgo(300 - i * 20),
    updatedAt: isoDaysAgo(15 + i),
  }));
}

function seedSubmissions(): FormSubmission[] {
  const rng = createRng(6060);
  const forms = seedForms();
  const sources = [
    { utmSource: "facebook", utmMedium: "cpc", utmCampaign: "pte-cap-toc-t10", landingPage: "/dang-ky-hoc-thu" },
    { utmSource: "google", utmMedium: "organic", landingPage: "/kien-thuc/cach-tinh-diem-pte" },
    { utmSource: "tiktok", utmMedium: "social", utmCampaign: "describe-image-tips" },
    { referrer: "https://www.google.com/", landingPage: "/" },
  ];
  const statuses: SubmissionStatus[] = ["new", "new", "new", "contacted", "contacted", "qualified", "converted", "spam"];
  const staffIds: [string, string][] = [
    ["usr-002", "Trần Thị Tư Vấn"],
    ["usr-007", "Hoàng Bảo Nhi"],
    ["usr-008", "Phạm Phương Quyên"],
  ];
  return Array.from({ length: 42 }, (_, i) => {
    const form = rng.pick(forms);
    const { fullName } = vietnameseName(rng);
    const status = rng.pick(statuses);
    const assigned = status === "new" ? undefined : rng.pick(staffIds);
    const data: Record<string, string> = {};
    for (const f of form.fields) {
      if (f.key === "fullName") data[f.key] = fullName;
      else if (f.key === "phone") data[f.key] = phoneFor(rng);
      else if (f.key === "email") data[f.key] = emailFor(fullName, i + 1);
      else if (f.type === "select") data[f.key] = rng.pick(f.options);
      else if (f.type === "checkbox") data[f.key] = "true";
      else if (f.type === "date") data[f.key] = new Date(Date.parse(isoDaysAgo(-rng.int(2, 20)))).toISOString().slice(0, 10);
      else if (f.key === "message") data[f.key] = rng.pick(["Cho em hỏi lịch khai giảng ạ", "Em muốn học lớp tối", "Tư vấn giúp em lộ trình PTE 65"]);
    }
    const createdAt = isoDaysAgo(rng.int(0, 45) + rng.next());
    return {
      id: `sub-${pad(i + 1, 4)}`,
      formId: form.id,
      formName: form.name,
      formType: form.type,
      data,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      status,
      assignedTo: assigned?.[0],
      assignedToName: assigned?.[1],
      notes: status === "contacted" ? "Đã gọi, hẹn gọi lại chiều mai." : undefined,
      source: rng.pick(sources),
      createdAt,
      updatedAt: createdAt,
    };
  }).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function seedTestimonials(): Testimonial[] {
  const rows: [string, string, string, number | undefined, number, string | undefined][] = [
    ["Minh Anh", "Du học Úc – từ PTE 36 lên 65", "Nhờ lộ trình rõ ràng và được chấm bài mỗi tuần, mình tăng được 29 điểm chỉ sau 4 tháng.", 36, 65, "cou-006"],
    ["Thu Trang", "Định cư Úc – đạt PTE 79", "Giáo viên chỉ ra đúng lỗi phát âm của mình. Thi lần đầu đã đạt 79 mọi kỹ năng.", 58, 79, "cou-007"],
    ["Quốc Huy", "Visa 491 – PTE 58", "Học online buổi tối rất tiện, mock test hàng tuần giúp mình quen áp lực phòng thi.", 42, 58, "cou-005"],
    ["Ngọc Lan", "Du học Úc – PTE 50", "Mình mất gốc tiếng Anh nhưng khóa nền tảng giúp mình tự tin hơn nhiều.", 30, 50, "cou-001"],
    ["Đức Thịnh", "Học bổng – PTE 65", "Cấp tốc 6 tuần trước hạn nộp hồ sơ, vừa kịp và đạt điểm mong muốn.", 50, 65, "cou-009"],
    ["Hồng Nhung", "Làm việc tại Úc – PTE 58", "Được tư vấn lộ trình phù hợp với thời gian đi làm của mình.", undefined, 58, undefined],
    ["Bảo Long", "Canada – PTE Core", "Khóa PTE Core cô Trâm hướng dẫn rất cụ thể, mình đạt CLB 9.", undefined, 79, "cou-010"],
    ["Phương Vy", "Du học Úc – PTE 42", "Lớp học vui và gần gũi, giáo viên luôn phản hồi bài rất nhanh.", 36, 42, "cou-003"],
    ["Tuấn Kiệt", "Visa 190 – PTE 65", "Lộ trình 16 tuần bài bản, kỹ thuật làm Summarize Written Text giúp mình tăng điểm Writing.", 50, 65, "cou-006"],
    ["Khánh Linh", "Du học Úc – PTE 50", "Mình học thử trước và quyết định đăng ký ngay vì thấy phương pháp rất rõ ràng.", 36, 50, "cou-004"],
  ];
  return rows.map(([studentName, headline, quote, scoreBefore, scoreAfter, courseId], i) => ({
    id: `tst-${pad(i + 1)}`,
    studentName,
    headline,
    quote,
    avatarUrl: `/images/student-${[1, 2, 3, 5][i % 4]}.jpg`,
    scoreBefore,
    scoreAfter,
    rating: i % 4 === 3 ? 4 : 5,
    courseId,
    videoUrl: i % 3 === 0 ? `https://www.youtube.com/watch?v=demo${i + 1}` : undefined,
    isFeatured: i < 4,
    status: i === 9 ? "review" : i === 8 ? "draft" : "published",
    sortOrder: i + 1,
    createdAt: isoDaysAgo(250 - i * 15),
    updatedAt: isoDaysAgo(i * 4 + 2),
  }));
}

function seedSiteConfig(): SiteConfig {
  return {
    updatedAt: isoDaysAgo(12),
    updatedByName: "Hoàng Thu Truyền Thông",
    general: {
      siteName: "PTE iPASS",
      tagline: "Luyện thi PTE – lộ trình rõ ràng, giáo viên điểm cao",
      logoUrl: "/images/logo/logo-final.jpg",
      faviconUrl: "/favicon.ico",
      defaultMetaTitle: "PTE iPASS – Luyện thi PTE hiệu quả",
      defaultMetaDescription: "Trung tâm luyện thi PTE với lộ trình cá nhân hóa, giáo viên PTE 85+ và mock test hàng tuần.",
      ogImageUrl: "/images/banner_home.png",
    },
    contact: {
      hotlineVN: "+84 345 939 566",
      hotlineAU: "+61 450 383 579",
      email: "tuvan@pteipass.vn",
      zalo: "0345939566",
      address: "123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      workingHours: "08:00 – 21:00 (Thứ 2 – Chủ nhật)",
    },
    social: {
      facebook: "https://facebook.com/pteipass",
      youtube: "https://youtube.com/@pteipass",
      tiktok: "https://tiktok.com/@pteipass",
      instagram: undefined,
      linkedin: undefined,
      zaloOa: "https://zalo.me/pteipass",
      communityUrl: "https://facebook.com/groups/pteipass",
    },
    policies: [
      { key: "payment", title: "Chính sách thanh toán", content: "<h3>Học phí và hình thức thanh toán</h3><p>Học viên thanh toán học phí theo từng khóa bằng chuyển khoản hoặc tại quầy. Có thể chia 2 đợt đối với khóa từ 12 tuần.</p><h3>Hoàn / đổi khóa</h3><p>Hoàn 100% nếu hủy trước ngày khai giảng 3 ngày; chuyển khóa miễn phí một lần khi báo trước buổi học đầu tiên.</p>" },
      { key: "privacy", title: "Chính sách bảo mật", content: "<p>PTE iPASS chỉ thu thập thông tin cần thiết để tư vấn và hỗ trợ học tập (họ tên, số điện thoại, email, mục tiêu điểm).</p><p>Thông tin không được chia sẻ cho bên thứ ba khi chưa có sự đồng ý của bạn; bạn có thể yêu cầu chỉnh sửa hoặc xóa bất kỳ lúc nào qua email tuvan@pteipass.vn.</p>" },
      { key: "terms", title: "Điều khoản sử dụng", content: "<p>Khi sử dụng website và dịch vụ của PTE iPASS, bạn đồng ý với các điều khoản về quyền sở hữu nội dung, quy định học viên và chính sách thanh toán.</p><p>Nội dung trên website chỉ phục vụ mục đích giới thiệu và tư vấn, không thay thế thông tin chính thức từ Pearson.</p>" },
      { key: "student-rules", title: "Quy định học viên và khóa học", content: "<ul><li>Đi học đúng giờ, báo vắng trước ít nhất 2 giờ.</li><li>Hoàn thành bài tập tuần và mock test theo lịch.</li><li>Tuân thủ quy định phòng học, không ghi hình khi chưa được phép.</li></ul>" },
    ],
    chat: {
      zalo: { enabled: true, oaId: "1234567890123456789" },
      messenger: { enabled: true, pageId: "100012345678901", greeting: "Xin chào! PTE iPASS có thể giúp gì cho bạn?" },
      thirdParty: { enabled: false, name: "OnCustomer", scriptUrl: undefined },
    },
    tracking: { ga4Id: "G-ABCDE12345", gtmId: "GTM-ABC123", metaPixelId: undefined },
  };
}

const BANNER_IMAGES: Partial<Record<Banner["placement"], string>> = {
  home_hero: "/images/banner_home.png",
  home_secondary: "/images/hero-banner-primary.png",
  courses: "/images/hero-banner-primary.png",
  news: "/images/hero-banner-new.png",
  popup: "/images/hero-banner-primary.png",
};

function seedBanners(): Banner[] {
  const rows: [string, Banner["placement"], Banner["status"]][] = [
    ["Học thử PTE miễn phí", "home_hero", "active"],
    ["Cấp tốc PTE 58/65/79", "home_hero", "active"],
    ["Ưu đãi tháng 10 giảm 15%", "popup", "active"],
    ["Mock test hàng tuần", "home_secondary", "inactive"],
    ["Khóa PTE nền tảng", "courses", "active"],
    ["Cuộc thi chia sẻ kinh nghiệm", "news", "draft"],
  ];
  return rows.map(([title, placement, status], i) => ({
    id: `ban-${pad(i + 1)}`,
    title,
    placement,
    imageUrl: BANNER_IMAGES[placement] ?? "/images/banner_home.png",
    mobileImageUrl: undefined,
    linkUrl: "/lien-he",
    altText: title,
    startAt: isoDaysAgo(30 - i * 3).slice(0, 10),
    endAt: i % 2 === 0 ? isoDaysAgo(-60 - i * 5).slice(0, 10) : undefined,
    status,
    sortOrder: i + 1,
    createdAt: isoDaysAgo(100 - i * 7),
    updatedAt: isoDaysAgo(i + 2),
  }));
}

function seedMedia(): MediaItem[] {
  const rng = createRng(121);
  const rows: [string, MediaItem["kind"], string][] = [
    ["logo-pte-ipass.svg", "image", "brand"],
    ["banner-hoc-thu.jpg", "image", "banners"],
    ["banner-cap-toc.jpg", "image", "banners"],
    ["giao-vien-ha.jpg", "image", "teachers"],
    ["giao-vien-khoi.jpg", "image", "teachers"],
    ["co-so-q1.jpg", "image", "branches"],
    ["gioi-thieu-pte.mp4", "video", "videos"],
    ["review-minh-anh.mp4", "video", "videos"],
    ["huong-dan-read-aloud.mp3", "audio", "audio"],
    ["bang-quy-doi-diem.pdf", "document", "documents"],
    ["template-essay.docx", "document", "documents"],
    ["lich-khai-giang-t10.pdf", "document", "documents"],
  ];
  const mime: Record<MediaItem["kind"], string> = { image: "image/jpeg", video: "video/mp4", audio: "audio/mpeg", document: "application/pdf" };
  return rows.map(([name, kind, folder], i) => ({
    id: `med-${pad(i + 1)}`,
    name,
    kind,
    url: `https://cdn.pteipass.vn/${folder}/${name}`,
    mimeType: mime[kind],
    sizeKb: rng.int(80, kind === "video" ? 90_000 : 4000),
    width: kind === "image" ? rng.pick([800, 1200, 1920]) : undefined,
    height: kind === "image" ? rng.pick([450, 628, 1080]) : undefined,
    altText: kind === "image" ? name.replace(/[-.].*$/, "") : undefined,
    folder,
    tags: [folder],
    createdAt: isoDaysAgo(rng.int(10, 300)),
    updatedAt: isoDaysAgo(rng.int(1, 10)),
  }));
}

// ── Đăng ký module ──────────────────────────────────────────────────────────
export function registerCmsModule(): void {
  registerCollection<CmsPage>(C.pages, seedPages);
  registerCollection<ArticleCategory>(C.articleCategories, seedArticleCategories);
  registerCollection<Tag>(C.tags, seedTags);
  registerCollection<Article>(C.articles, seedArticles);
  registerCollection<FormDefinition>(C.forms, seedForms);
  registerCollection<FormSubmission>(C.formSubmissions, seedSubmissions);
  registerCollection<Testimonial>(C.testimonials, seedTestimonials);
  registerCollection<SiteConfig>(C.siteConfig, () => [seedSiteConfig()]);
  registerCollection<Banner>(C.banners, seedBanners);
  registerCollection<MediaItem>(C.media, seedMedia);

  registerLookup("article-categories", () =>
    collection<ArticleCategory>(C.articleCategories).filter((c) => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder).map((c) => ({ value: c.id, label: c.name })),
  );
  registerLookup("tags", () => collection<Tag>(C.tags).map((t) => ({ value: t.id, label: t.name })));

  const userName = (id?: string) => (id ? collection<User>(C.users).find((u) => u.id === id)?.fullName : undefined);
  const categoryName = (id: string) => collection<ArticleCategory>(C.articleCategories).find((c) => c.id === id)?.name;
  const tagNames = (ids: string[]) => ids.map((id) => collection<Tag>(C.tags).find((t) => t.id === id)?.name).filter((n): n is string => Boolean(n));
  const articleCountByCategory = (id: string) => collection<Article>(C.articles).filter((a) => a.categoryId === id).length;
  const articleCountByTag = (id: string) => collection<Article>(C.articles).filter((a) => a.tagIds.includes(id)).length;
  const courseName = (id?: string) => (id ? collection<Course>(C.courses).find((c) => c.id === id)?.name : undefined);
  const readingMinutes = (content: string) => Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / 200));
  const submissionCount = (formId: string) => collection<FormSubmission>(C.formSubmissions).filter((s) => s.formId === formId).length;
  const stampPublish = <T extends { status: string; publishedAt?: string | null }>(item: T, current?: T): T => ({
    ...item,
    publishedAt: item.status === "published" ? (current?.publishedAt ?? nowIso()) : (current?.publishedAt ?? null),
  });

  addRoutes(
    // ── Trang ────────────────────────────────────────────────────────────
    ...defineResource<CmsPage, CmsPageInput>({
      path: "/pages",
      permission: "page",
      collection: C.pages,
      idPrefix: "pg",
      label: "trang",
      entityName: (p) => p.title,
      createSchema: cmsPageSchema,
      list: {
        searchFields: ["title", "slug", "summary"],
        filters: { status: "status", template: "template" },
        sortable: ["title", "slug", "status", "template", "updatedAt", "publishedAt"],
        defaultSort: { sortBy: "updatedAt", sortOrder: "desc" },
      },
      unique: [{ field: "slug", message: "Slug đã tồn tại" }],
      guard: publishGuard<CmsPage>("page"),
      build: (input, base, actor) => stampPublish({ ...input, ...base, publishedAt: null, updatedByName: actor?.userName } as CmsPage),
      merge: (current, input) => stampPublish({ ...current, ...input }, current),
    }),

    // ── Danh mục & Tag bài viết ──────────────────────────────────────────
    ...defineResource<ArticleCategory, ArticleCategoryInput>({
      path: "/article-categories",
      permission: "taxonomy",
      collection: C.articleCategories,
      idPrefix: "acat",
      label: "danh mục bài viết",
      entityName: (c) => c.name,
      createSchema: articleCategorySchema,
      list: {
        searchFields: ["name", "slug"],
        filters: { isActive: (c, v) => String(c.isActive) === v },
        sortable: ["name", "sortOrder", "articleCount", "createdAt"],
        defaultSort: { sortBy: "sortOrder", sortOrder: "asc" },
      },
      unique: [
        { field: "name", message: "Tên danh mục đã tồn tại" },
        { field: "slug", message: "Slug đã tồn tại" },
      ],
      build: (input, base) => ({ ...input, ...base, articleCount: 0 }),
      present: (c) => ({ ...c, articleCount: articleCountByCategory(c.id) }),
      beforeDelete: (c) => (articleCountByCategory(c.id) > 0 ? conflict("Danh mục còn bài viết, hãy chuyển bài viết sang danh mục khác trước") : undefined),
    }),
    ...defineResource<Tag, TagInput>({
      path: "/tags",
      permission: "taxonomy",
      collection: C.tags,
      idPrefix: "tag",
      label: "tag",
      entityName: (t) => t.name,
      createSchema: tagSchema,
      list: { searchFields: ["name", "slug"], sortable: ["name", "articleCount", "createdAt"], defaultSort: { sortBy: "name", sortOrder: "asc" } },
      unique: [
        { field: "name", message: "Tag đã tồn tại" },
        { field: "slug", message: "Slug đã tồn tại" },
      ],
      build: (input, base) => ({ ...input, ...base, articleCount: 0 }),
      present: (t) => ({ ...t, articleCount: articleCountByTag(t.id) }),
    }),

    // ── Bài viết ─────────────────────────────────────────────────────────
    ...defineResource<Article, ArticleInput>({
      path: "/articles",
      permission: "article",
      collection: C.articles,
      idPrefix: "art",
      label: "bài viết",
      entityName: (a) => a.title,
      createSchema: articleSchema,
      list: {
        searchFields: ["title", "excerpt", "slug"],
        filters: {
          status: "status",
          categoryId: "categoryId",
          authorId: "authorId",
          tagId: (a, v) => a.tagIds.includes(v),
          isFeatured: (a, v) => String(a.isFeatured) === v,
        },
        sortable: ["title", "status", "publishedAt", "createdAt", "updatedAt", "viewCount"],
        defaultSort: { sortBy: "updatedAt", sortOrder: "desc" },
      },
      unique: [{ field: "slug", message: "Slug đã tồn tại" }],
      guard: publishGuard<Article>("article"),
      build: (input, base, actor) =>
        stampPublish({
          ...input,
          ...base,
          authorId: input.authorId ?? actor?.userId,
          publishedAt: null,
          readingMinutes: readingMinutes(input.content),
          viewCount: 0,
        } as Article),
      merge: (current, input) => stampPublish({ ...current, ...input, readingMinutes: readingMinutes(input.content) }, current),
      present: (a) => ({ ...a, categoryName: categoryName(a.categoryId), tagNames: tagNames(a.tagIds), authorName: userName(a.authorId), readingMinutes: readingMinutes(a.content) }),
    }),

    // ── Biểu mẫu ─────────────────────────────────────────────────────────
    ...defineResource<FormDefinition, FormDefinitionInput>({
      path: "/forms",
      permission: "form",
      collection: C.forms,
      idPrefix: "frm",
      label: "biểu mẫu",
      entityName: (f) => f.name,
      createSchema: formDefinitionSchema,
      list: {
        searchFields: ["name", "slug", "description"],
        filters: { type: "type", status: "status" },
        sortable: ["name", "type", "status", "createdAt", "submissionCount"],
        defaultSort: { sortBy: "createdAt", sortOrder: "desc" },
      },
      unique: [{ field: "slug", message: "Slug đã tồn tại" }],
      build: (input, base) => ({ ...input, ...base, submissionCount: 0 }),
      merge: (current, input) => ({ ...current, ...input }),
      present: (f) => ({ ...f, submissionCount: submissionCount(f.id) }),
      beforeDelete: (f) => (submissionCount(f.id) > 0 ? conflict("Biểu mẫu đã có dữ liệu gửi, hãy chuyển sang trạng thái Tạm đóng thay vì xóa") : undefined),
    }),
    ...defineResource<FormSubmission, SubmissionUpdateInput>({
      path: "/form-submissions",
      permission: "form_submission",
      only: ["list", "get", "update", "delete"],
      collection: C.formSubmissions,
      idPrefix: "sub",
      label: "dữ liệu biểu mẫu",
      entityName: (s) => `${s.formName} – ${s.fullName ?? s.phone ?? s.id}`,
      createSchema: submissionUpdateSchema,
      list: {
        searchFields: ["fullName", "email", "phone", "formName"],
        filters: {
          formId: "formId",
          formType: "formType",
          status: "status",
          assignedTo: "assignedTo",
          from: (s, v) => s.createdAt.slice(0, 10) >= v,
          to: (s, v) => s.createdAt.slice(0, 10) <= v,
        },
        sortable: ["createdAt", "fullName", "status", "formName"],
        defaultSort: { sortBy: "createdAt", sortOrder: "desc" },
      },
      merge: (current, input) => ({ ...current, ...input, assignedToName: userName(input.assignedTo) }),
      present: (s) => ({ ...s, assignedToName: userName(s.assignedTo) ?? s.assignedToName }),
    }),
    {
      method: "GET",
      pattern: "/form-submissions/export",
      permission: "form_submission.export",
      handler: (req) => {
        const q = new URLSearchParams(req.query);
        q.delete("page");
        q.set("pageSize", "200");
        writeAudit(req.actor, { action: "export", resource: "form_submission", entityId: "-", entityLabel: "Xuất dữ liệu biểu mẫu" });
        return queryList(collection<FormSubmission>(C.formSubmissions), { ...req, query: q }, {
          searchFields: ["fullName", "email", "phone", "formName"],
          filters: { formId: "formId", formType: "formType", status: "status", assignedTo: "assignedTo" },
          defaultSort: { sortBy: "createdAt", sortOrder: "desc" },
        });
      },
    },

    // ── API công khai cho website (không cần đăng nhập) ───────────────────
    {
      method: "GET",
      pattern: "/public/forms/:slug",
      permission: "public",
      anonymous: true,
      handler: (req) => {
        const form = collection<FormDefinition>(C.forms).find((f) => f.slug === req.params.slug && f.status === "active");
        if (!form) return notFound("Biểu mẫu không tồn tại hoặc đã đóng");
        const { notifyEmails: _omit, ...publicForm } = form;
        return ok(publicForm);
      },
    },
    {
      method: "POST",
      pattern: "/public/forms/:slug/submit",
      permission: "public",
      anonymous: true,
      handler: (req) => {
        const form = collection<FormDefinition>(C.forms).find((f) => f.slug === req.params.slug && f.status === "active");
        if (!form) return notFound("Biểu mẫu không tồn tại hoặc đã đóng");
        const parsed = validateBody(publicSubmitSchema, req.body);
        if (!parsed.ok) return parsed.error;
        const { data, source } = parsed.data;
        const errors: { field: string; message: string }[] = [];
        for (const f of form.fields) {
          const value = (data[f.key] ?? "").trim();
          if (f.required && (!value || (f.type === "checkbox" && value !== "true"))) {
            errors.push({ field: `data.${f.key}`, message: `${f.label} là bắt buộc` });
            continue;
          }
          if (!value) continue;
          if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.push({ field: `data.${f.key}`, message: "Email không hợp lệ" });
          if (f.type === "phone" && !/^\+?[0-9][0-9\s.-]{6,18}[0-9]$/.test(value)) errors.push({ field: `data.${f.key}`, message: "Số điện thoại không hợp lệ" });
          if (f.type === "select" && !f.options.includes(value)) errors.push({ field: `data.${f.key}`, message: "Lựa chọn không hợp lệ" });
        }
        if (errors.length) return validation(errors);
        const now = nowIso();
        const submission: FormSubmission = {
          id: newId("sub"),
          formId: form.id,
          formName: form.name,
          formType: form.type,
          data,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          status: "new",
          source,
          createdAt: now,
          updatedAt: now,
        };
        insert(C.formSubmissions, submission);
        return created({ id: submission.id, message: form.successMessage }, form.successMessage);
      },
    },
    {
      method: "GET",
      pattern: "/public/site-config",
      permission: "public",
      anonymous: true,
      handler: () => {
        const { updatedByName: _omit, ...config } = collection<SiteConfig>(C.siteConfig)[0] as SiteConfig;
        return ok(config);
      },
    },

    // ── Cảm nhận / câu chuyện thành công ──────────────────────────────────
    ...defineResource<Testimonial, TestimonialInput>({
      path: "/testimonials",
      permission: "testimonial",
      collection: C.testimonials,
      idPrefix: "tst",
      label: "cảm nhận học viên",
      entityName: (t) => `${t.studentName} – ${t.headline}`,
      createSchema: testimonialSchema,
      list: {
        searchFields: ["studentName", "headline", "quote"],
        filters: { status: "status", courseId: "courseId", isFeatured: (t, v) => String(t.isFeatured) === v },
        sortable: ["studentName", "scoreAfter", "rating", "sortOrder", "status", "createdAt"],
        defaultSort: { sortBy: "sortOrder", sortOrder: "asc" },
      },
      guard: publishGuard<Testimonial>("testimonial"),
      merge: (current, input) => ({ ...current, ...input }),
      present: (t) => ({ ...t, courseName: courseName(t.courseId) }),
    }),

    // ── Cấu hình website (singleton) ──────────────────────────────────────
    {
      method: "GET",
      pattern: "/site-config",
      permission: "site_config.view",
      handler: () => ok(collection<SiteConfig>(C.siteConfig)[0] as SiteConfig),
    },
    {
      method: "PUT",
      pattern: "/site-config",
      permission: "site_config.edit",
      handler: (req) => {
        const parsed = validateBody(siteConfigSchema, req.body);
        if (!parsed.ok) return parsed.error;
        const store = collection<SiteConfig>(C.siteConfig);
        const before = structuredClone(store[0]);
        const next: SiteConfig = { ...parsed.data, updatedAt: nowIso(), updatedByName: req.actor?.userName };
        store[0] = next;
        writeAudit(req.actor, { action: "update", resource: "site_config", entityId: "site-config", entityLabel: "Cấu hình website", before, after: next });
        return ok(next);
      },
    },

    // ── Banner & Media ────────────────────────────────────────────────────
    ...defineResource<Banner, BannerInput>({
      path: "/banners",
      permission: "banner",
      collection: C.banners,
      idPrefix: "ban",
      label: "banner",
      entityName: (b) => b.title,
      createSchema: bannerSchema,
      list: {
        searchFields: ["title", "altText"],
        filters: { placement: "placement", status: "status" },
        sortable: ["title", "placement", "sortOrder", "status", "startAt", "createdAt"],
        defaultSort: { sortBy: "sortOrder", sortOrder: "asc" },
      },
      merge: (current, input) => ({ ...current, ...input }),
    }),
    ...defineResource<MediaItem, MediaInput>({
      path: "/media",
      permission: "media",
      collection: C.media,
      idPrefix: "med",
      label: "tệp media",
      entityName: (m) => m.name,
      createSchema: mediaSchema,
      list: {
        searchFields: ["name", "altText", "tags"],
        filters: { kind: "kind", folder: "folder" },
        sortable: ["name", "kind", "sizeKb", "createdAt"],
        defaultSort: { sortBy: "createdAt", sortOrder: "desc" },
      },
      merge: (current, input) => ({ ...current, ...input }),
    }),
  );
}
