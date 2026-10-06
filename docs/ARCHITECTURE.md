# Kiến trúc fe-pte-ipass

## 1. Luồng dữ liệu (một chiều, không đường tắt)

```
UI / Pages (src/app)
   ↓ import qua public API của feature (index.ts)
Feature components + Hooks (react-query)       features/<x>/{components,hooks}
   ↓
Service layer                                   features/<x>/services
   ↓
API Client (fetch, envelope, ApiError, auth)    core/api
   ↓  HTTP  ${NEXT_PUBLIC_API_BASE_URL}
REST API ──► Mock API (Route Handler /api/*)  hoặc  Backend thật
```

- UI **không bao giờ** import mock hay gọi `fetch`. Ví dụ: `StudentsListPage → useStudents() → studentService.list() → apiClient.get("/students") → /api/students`.
- Mock API là **một REST API thật** (cùng hợp đồng, cùng mã lỗi, cùng kiểm tra quyền) nên đổi `NEXT_PUBLIC_API_BASE_URL` là chuyển sang backend thật.

## 2. Cấu trúc thư mục

```
src/
├─ app/                  Route (mỏng): /admin/*  và  /api/[...path] (Mock API)
├─ core/                 Tầng thấp nhất, không biết UI/feature
│  ├─ api/               client, envelope, ApiError, createCrudService
│  ├─ auth/              AuthAdapter + AuthProvider (+ adapter dev)
│  ├─ rbac/              danh mục quyền resource.action, <Can>, usePermissions
│  ├─ query/ config/ validation/ dev/
├─ shared/               Dùng chung (chỉ đưa vào khi ≥ 2 feature dùng)
│  ├─ ui/ data-table/ form/ crud/ layout/ charts/ hooks/ lookups/ domain/ lib/
├─ features/<x>/         components · hooks · services · types · schemas · utils · index.ts
├─ mock/                 (server-only) engine · seed · modules — chỉ src/app/api được import
└─ config/               Cấu hình cấp app (menu admin)
```

### Quy tắc phụ thuộc (eslint ép tự động — `eslint.config.mjs`)

| Từ | Được import | Cấm |
|---|---|---|
| `core` | chính nó | shared, features, app, mock |
| `shared` | core, shared | features, app, mock |
| `features/<x>` | core, shared, **index.ts** của feature khác | import sâu feature khác, mock, app |
| `app`, `config` | core, shared, **index.ts** của feature | import sâu feature, mock (trừ `app/api`) |
| `mock` | core, `features/*/{types,schemas}`, shared/domain | (không bị UI import) |

`types` + `schemas` của feature là **contract**: FE form, Mock API và (đối chiếu với) backend thật cùng dùng một schema zod.

## 3. Các khối tái sử dụng (đừng viết lại)

| Cần | Dùng |
|---|---|
| Gọi API CRUD | `createCrudService(path)` + `createCrudHooks({name, service, label})` |
| Trang danh sách (tìm, lọc, sắp xếp, phân trang đồng bộ URL, xóa có xác nhận, theo quyền) | `<CrudListPage>` |
| Trang chi tiết (tải, lỗi, không tìm thấy, xóa) | `<EntityDetailPage>` |
| Form tạo/sửa | `useEntityForm` + `createFormFields<Values>()` + `<Form>` / `<FormModal>` |
| Dialog tạo/sửa | `useDialogState<T>()` |
| Xuất CSV | `<ExportCsvButton>` (có kiểm tra quyền `export`) |
| Danh sách chọn liên-module | `useLookup("branches")` → `GET /lookups/:name` |
| Ẩn/hiện theo quyền | `<Can permission>`, `<RequirePermission>`, `usePermissions()` |

## 4. Thêm một module mới

```bash
node scripts/new-feature.mjs vouchers --noun "voucher" --title "Voucher"
```

Script sinh: `types → schemas → service → hooks → trang danh sách + dialog → route → mock API` và tự đăng ký RBAC resource, ranh giới eslint, registry mock, route. Việc còn lại: thêm mục menu ở `src/config/admin-nav.tsx`, chỉnh type/schema/seed cho đúng nghiệp vụ.
Muốn xóa module: xóa thư mục `features/<x>`, `mock/modules/<x>.ts`, route, và các dòng đăng ký — eslint/tsc sẽ chỉ ra mọi chỗ còn sót.

## 5. Mock API

- Điểm vào: `src/app/api/[...path]/route.ts` → `mock/engine/dispatch.ts`.
- `defineResource({...})` sinh CRUD chuẩn: validate bằng **cùng schema zod với FE**, lỗi 422 `errors[]` theo field, kiểm tra trùng (`unique`), ghi **audit log** (trước/sau), kiểm tra **quyền độc lập** (`x-mock-role`), `guard` cho quy tắc nghiệp vụ (ví dụ cần quyền `approve` mới xuất bản).
- Giả lập: độ trễ (`MOCK_API_DELAY_MS`), kịch bản `slow | error | empty` qua header `x-mock-scenario` (chọn trong công cụ dev), dữ liệu seed có seed cố định (deterministic).
- Dữ liệu nằm trong bộ nhớ server dev; `POST /api/__mock/reset` đặt lại; `GET /api/__mock/routes` liệt kê route.
- Production: `MOCK_API_ENABLED=false` ⇒ `/api/*` trả 404.

## 6. RBAC

- Danh mục duy nhất: `core/rbac/permissions.ts` (`resource.action`: view/create/edit/delete/approve/export).
- FE: `<Can>`, `<RequirePermission>`, lọc menu — **chỉ để hiển thị**.
- Backend/Mock: kiểm tra độc lập ở mỗi endpoint (test `cms-system.test.ts` chứng minh: ẩn nút ở FE không phải bảo mật).
- Bài test tính nhất quán đảm bảo: không endpoint nào yêu cầu quyền không tồn tại, không quyền nào “mồ côi”.

## 7. Xác thực

`core/auth` chỉ định nghĩa **AuthAdapter** (getSession, token, header, refresh, onUnauthorized). Hiện dùng `createDevAuthAdapter` (chọn vai trò). Tích hợp hệ thống identity thật = viết adapter mới; không phải sửa chỗ khác.
Chưa có `middleware.ts` chặn `/admin` vì cần cơ chế phiên thật — thêm khi tích hợp (xem ADR-0003).

## 8. Kiểm thử

| Loại | Vị trí | Nội dung |
|---|---|---|
| Hợp đồng/Mock | `mock/engine/*.test.ts` | envelope, phân trang/lọc/sắp xếp, validation, quyền, audit, CRUD, kịch bản, tính nhất quán RBAC |
| Core | `core/**/*.test.ts(x)` | API client (retry 401, timeout, FormData…), AuthProvider, RBAC |
| Shared UI | `shared/**/*.test.tsx` | DataTable, Modal/Confirm, form + lỗi server, createCrudHooks, tiện ích |
| Feature | `features/**/utils/*.test.ts` | thuần logic (diff audit log) |

`npm test` chạy tất cả. Kiểm tra cuối mỗi thay đổi: `npm run typecheck && npm run lint && npm test && npm run build`.

## 9. Quy ước

- File/thư mục `kebab-case`; component `PascalCase`; hook `use-*.ts`; không `any` (eslint chặn); không `console.log`.
- Alias `@/…`; import feature khác chỉ qua `@/features/<x>`.
- Tiếng Việt cho nhãn UI và thông báo lỗi; lỗi validation đã Việt hóa ở `core/validation` (zod locale `vi`).
- Chưa làm: trình soạn thảo rich-text (dùng textarea), dark mode toggle, upload tệp thật (media lưu metadata + URL), middleware auth.
