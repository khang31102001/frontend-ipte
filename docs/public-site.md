# Website công khai (`(public)` route group)

Site giới thiệu khóa học, thương hiệu, SEO và thu lead. **Không** có bài thi trực tiếp. Chat/Zalo/Messenger chỉ là widget bên thứ ba.

## Cấu trúc

| Phần | Vị trí |
|---|---|
| Route | `src/app/(public)/**` (mỏng: chỉ gọi view của feature `site`) |
| Feature giao diện | `src/features/site` (`views/`, `components/`, `shared/`, `lib/`, `config/`) |
| Contract + dịch vụ API công khai | `src/features/public-api` (`types.ts`, `server.ts` cho Server Component, `lead.ts`/`search.ts` cho client) |
| Style | `src/styles/site/*.scss` (bọc trong `.site`, không lan sang admin) + khối `.site` trong `globals.css` |
| Mock | `src/mock/modules/public.ts` + seed trong `cms.ts`, `courses.ts` |

Luồng: `Page (app) → View (features/site) → publicApi (server fetch) → /public/* (Mock hoặc backend thật)`.
Form/Tìm kiếm (client): `LeadForm → submitLead → apiClient → POST /public/forms/:slug/submit`.

Import đặc biệt cho phép bởi eslint: `@/features/<x>/server`, `@/features/<x>/types`, `@/features/<x>/client`.

## URL

| URL | Nội dung |
|---|---|
| `/` | Trang chủ (khối lấy từ trang CMS `trang-chu`) |
| `/ve-pte-ipass`, `/ve-pte-ipass/<slug>` | Giới thiệu (trang CMS `gioi-thieu-pte-ipass`) / trang tĩnh CMS bất kỳ |
| `/khoa-hoc`, `/khoa-hoc/<danh-mục>`, `/khoa-hoc/<khóa>` | Danh sách (`?q=&page=`), danh mục, chi tiết. URL cũ nhiều đoạn → 308 về URL khóa học |
| `/tin-tuc`, `/kien-thuc`, `/du-hoc-di-lam-dinh-cu`, `/pte-dai-hoc` (+ `/<danh-mục>`, `/<bài>`) | Chuyên mục bài viết (cấu hình ở `config/routes.ts` → `ARTICLE_SECTIONS`). Bài sai chuyên mục → 308 đúng URL |
| `/doi-ngu-giao-vien`, `/doi-ngu-giao-vien/<slug>` | Giáo viên |
| `/hoc-vien-review` | Cảm nhận + video học viên |
| `/lien-he` | Liên hệ (biểu mẫu `lien-he`, bản đồ chi nhánh, mạng xã hội) |
| `/chinh-sach/<key>` | Chính sách lấy từ `site-config.policies` (không index) |
| `/sitemap.xml`, `/robots.txt` | Sinh từ `/public/sitemap` |
| `POST /api/revalidate` | Webhook làm mới cache (`x-revalidate-secret`, body `{tags?, paths?}`) |

## API công khai (backend phải hiện thực)

Tất cả `GET`, không cần đăng nhập, chỉ trả nội dung **đã xuất bản**, không lộ trường nội bộ (mã, trạng thái duyệt, email/điện thoại giáo viên…). DTO: `features/public-api/types.ts`.

`/public/site-config` · `/public/course-categories` · `/public/courses` (`q, categorySlug, isFeatured, page, pageSize`) · `/public/courses/:slug` · `/public/article-categories` · `/public/articles` (`q, categorySlugs=a,b, isFeatured, excludeSlug, page, pageSize`) · `/public/articles/:slug` (kèm `related`) · `/public/teachers(/:slug)` · `/public/testimonials` · `/public/banners?placement=` (chỉ `active` trong khoảng ngày) · `/public/branches` · `/public/pages/:slug` · `/public/forms/:slug` · `POST /public/forms/:slug/submit` · `/public/sitemap`.

Slug giáo viên do backend sinh từ họ tên (không dấu). Body gửi lead có thể kèm `recaptchaToken`; backend thật nên xác minh + rate limit.

## Nội dung điều khiển bằng CMS

- Trang chủ = trang CMS `trang-chu` với các khối: `hero`, `stats`, `steps`, `programs`, `courses`, `teachers`, `articles`, `community`, `lead_form`. Dòng `items` dạng `Tiêu đề | Mô tả | /link`.
- Giới thiệu = trang `gioi-thieu-pte-ipass` (`text` "Sứ mệnh"/"Tầm nhìn", `features` "Đối tượng…"/"Hệ sinh thái…", `gallery`).
- FAQ khóa học = trang `cau-hoi-thuong-gap-ve-khoa-hoc` (khối `faq`).
- Biểu mẫu website dùng slug: `dang-ky-hoc-thu-mien-phi` (popup), `dang-ky-tu-van` (khối tư vấn), `lien-he` (`config/forms.ts`).
- Banner: `home_hero`, `home_secondary`, `courses`, `news`.
- Hotline, mạng xã hội, chính sách, widget chat (Zalo OA / Messenger / script bên thứ ba), GA4/GTM/Meta Pixel: `site-config`.

## SEO & tracking

Metadata (title/description/canonical/OG/Twitter/robots) qua `lib/seo.ts`; JSON-LD: Organization, Course, Article, Person, BreadcrumbList. Tiêu đề CMS có hậu tố "| PTE iPASS" được tự cắt để không nhân đôi. Trang lọc/phân trang (`?q=`, `page>1`) đặt `noindex`.
Sự kiện (`lib/analytics.ts`): `generate_lead`, `lead_error`, `cta_click`, `search`… đẩy lên dataLayer/gtag/fbq. UTM + referrer + landing page lưu theo phiên và đính kèm lead.

## Mock ↔ backend thật

Đặt `NEXT_PUBLIC_API_BASE_URL` (tuyệt đối, server gọi được), `MOCK_API_ENABLED=false`. Có mock thì fetch server `no-store`; backend thật thì ISR 300s theo tag (`PUBLIC_TAGS`). Đặt `NEXT_PUBLIC_APP_BASE_URL`, `REVALIDATE_SECRET`, tùy chọn `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`.

## Chưa làm / lưu ý

- Ảnh seed dùng `/images/*` từ site cũ; ảnh thật cần upload (media) khi có backend.
- Giáo viên chỉ có điểm tổng + thế mạnh (site cũ có điểm 4 kỹ năng IELTS – không còn trong contract mới).
- Menu chính dựng từ danh mục (`lib/nav.ts`), chưa có trình sửa menu trong admin.
- Nội dung bài viết dán HTML (đã sanitize); chưa có rich-text editor.
