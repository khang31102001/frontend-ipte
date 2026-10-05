# API Contract

Mọi API (Mock hoặc backend thật) tuân thủ hợp đồng này. Danh sách endpoint: [api-endpoints.md](./api-endpoints.md). Kiểu dữ liệu từng module: `src/features/<module>/{types,schemas}.ts` (schema zod là nguồn sự thật cho validation).

## 1. Envelope

```jsonc
// Thành công (danh sách: data là mảng + meta)
{ "success": true, "data": {}, "message": "Success", "meta": { "page": 1, "pageSize": 20, "total": 100, "totalPages": 5 } }

// Lỗi
{ "success": false, "data": null, "message": "Không tìm thấy học viên", "errors": [ { "field": "email", "message": "Email đã tồn tại" } ], "code": "NOT_FOUND" }
```

Luôn trả envelope kể cả khi xóa (`data: null`) — không dùng 204.

| HTTP | `code` | Ý nghĩa | FE xử lý |
|---|---|---|---|
| 200 / 201 | — | Thành công / đã tạo | |
| 400, 422 | `VALIDATION_ERROR` | Dữ liệu sai; `errors[]` theo field (đường dẫn `a.b.0.c`) | đổ vào từng field của form |
| 401 | `UNAUTHORIZED` | Hết phiên | thử refresh 1 lần → về trạng thái chưa đăng nhập |
| 403 | `FORBIDDEN` | Thiếu quyền | toast / trang không có quyền |
| 404 | `NOT_FOUND` | Không tồn tại | trang “không tìm thấy” |
| 409 | `CONFLICT` | Xung đột nghiệp vụ (xóa bản ghi còn liên quan, chuyển giai đoạn lùi…) | toast thông báo |
| 5xx | `SERVER_ERROR` | Lỗi máy chủ | trạng thái lỗi + nút “Thử lại” |

## 2. Danh sách: phân trang · tìm kiếm · lọc · sắp xếp

`GET /resource?page=1&pageSize=20&q=từ khóa&sortBy=createdAt&sortOrder=desc&<filter>=<value>`

- `page` ≥ 1, `pageSize` mặc định 20 (tối đa 200). `q` tìm không phân biệt hoa/thường và dấu tiếng Việt.
- Filter là các tham số phẳng riêng của từng resource; nhiều giá trị: `status=a,b`.
- `sortBy` chỉ nhận field được phép; sai ⇒ bỏ qua, dùng sắp xếp mặc định.
- Xuất dữ liệu: `GET /resource/export?<cùng filter>` trả toàn bộ bản ghi khớp (không phân trang), cần quyền `export`.

## 3. CRUD chuẩn

| Thao tác | Request | Quyền |
|---|---|---|
| Danh sách | `GET /resource` | `resource.view` |
| Chi tiết | `GET /resource/:id` | `resource.view` |
| Tạo | `POST /resource` (body = DTO) | `resource.create` |
| Sửa | `PUT|PATCH /resource/:id` | `resource.edit` |
| Xóa | `DELETE /resource/:id` | `resource.delete` |

- ID là chuỗi; `createdAt`, `updatedAt` ISO 8601; trường tính toán (ví dụ `lessonCount`, `branchName`) do API trả kèm, FE không gửi lên.
- Backend **bắt buộc** kiểm tra quyền và validate độc lập với FE. Ẩn nút ở FE không phải bảo mật.
- Mỗi thay đổi dữ liệu nên ghi **audit log** (người, hành động, bản ghi, trước/sau, thời điểm).

## 4. Xác thực & header

- `Authorization: Bearer <token>` do `AuthAdapter.getAccessToken()` cung cấp (nếu backend dùng bearer).
- `GET /auth/me` → `{ user, role, permissions: string[] }` (quyền dạng `resource.action`).
- Chỉ Mock API: `x-mock-role` (vai trò), `x-mock-scenario` (`slow|error|empty`), `x-mock-delay`. Backend thật bỏ qua.

## 5. RBAC `resource.action`

Danh mục: `src/core/rbac/permissions.ts` — resource: student, course, lesson, learning_path, learning_material, question, teacher, page, article, taxonomy, form, form_submission, testimonial, site_config, banner, media, branch, user, role, audit_log, setting, notification_template, dashboard, report; action: view, create, edit, delete, approve, export.

`approve`: chuyển nội dung sang `published` (course, page, article, testimonial) cần quyền này — backend kiểm tra trong create/update.

## 6. Lookup (danh sách chọn)

`GET /lookups/:name[?q=&parentId=]` → `[{ "value": "br-001", "label": "…" }]` với `name` ∈ branches, staff, roles, teachers, courses, course-categories, article-categories, tags, lessons (`parentId` = courseId), students. Chỉ cần đăng nhập.

## 7. API công khai cho website (không cần đăng nhập)

| Endpoint | Mô tả |
|---|---|
| `GET /public/site-config` | Hotline, địa chỉ, mạng xã hội, chính sách, widget chat, ID analytics |
| `GET /public/forms/:slug` | Định nghĩa biểu mẫu để render (không có email nội bộ) |
| `GET /public/courses(/:slug)`, `course-categories`, `articles(/:slug)`, `article-categories`, `teachers(/:slug)`, `testimonials`, `banners`, `branches`, `pages/:slug`, `sitemap` | Nội dung đã xuất bản cho website — chi tiết trong `docs/public-site.md` |
| `POST /public/forms/:slug/submit` | Body `{ data: { <key>: <value> }, source?: { utmSource, utmMedium, utmCampaign, referrer, landingPage } }` → 201; sai ⇒ 422 với `errors[].field = "data.<key>"` |

## 8. Bí mật cấu hình

Mật khẩu SMTP, secret reCAPTCHA… là **chỉ ghi**: PUT nhận giá trị mới (để trống = giữ nguyên), GET chỉ trả `hasPassword`/`hasSecret`.
