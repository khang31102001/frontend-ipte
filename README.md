# fe-pte-ipass

Hệ thống quản trị đào tạo PTE (Student · Course · Teacher · CMS · Branch · IAM · Dashboard) — **một source Next.js duy nhất**, API-driven, có Mock API chạy trong chính app để phát triển khi backend chưa sẵn sàng.

| | |
|---|---|
| Framework | Next.js 15 (App Router) · React 19 · TypeScript `strict` |
| Style | Tailwind CSS v4 (token TailAdmin) |
| Data | TanStack Query · fetch API client · zod (contract dùng chung FE/Mock/BE) |
| Form | react-hook-form + zod |
| Test | Vitest + Testing Library (97 test) |

## Chạy nhanh

```bash
npm install
cp .env.example .env.local        # đã có sẵn .env.local cho dev
npm run dev                        # http://localhost:3000  →  /admin
```

Mở `/admin`: nút ⚗ góc dưới phải là **công cụ dev** (đổi vai trò để thử RBAC, giả lập API chậm / lỗi / rỗng).

| Lệnh | Mô tả |
|---|---|
| `npm run dev` / `build` / `start` | Chạy dev / build production / chạy production |
| `npm run typecheck` · `npm run lint` | Kiểm tra kiểu · eslint (gồm luật ranh giới kiến trúc) |
| `npm test` | Toàn bộ test (API client, RBAC, mock API, form, DataTable…) |
| `node scripts/new-feature.mjs <ten> --noun "…" --title "…"` | Sinh khung module mới (types → mock) và tự đăng ký |
| `node scripts/generate-api-docs.mjs` | Sinh `docs/api-endpoints.md` từ Mock API đang chạy |

## Chuyển từ Mock API sang backend thật

```bash
# .env.production
NEXT_PUBLIC_API_BASE_URL=https://api.domain.com
MOCK_API_ENABLED=false
NEXT_PUBLIC_DEV_TOOLS=false
```

Không sửa component / hook / service / type. Backend thật chỉ cần tuân thủ [docs/api-contract.md](docs/api-contract.md).
Xác thực thật: viết một `AuthAdapter` (xem `src/core/auth/dev-adapter.ts`) và thay vào `src/app/(admin)/admin/providers.tsx`.

## Tài liệu

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — kiến trúc, quy tắc phụ thuộc, cách thêm module
- [docs/api-contract.md](docs/api-contract.md) — envelope, lỗi, phân trang, RBAC, API công khai
- [docs/api-endpoints.md](docs/api-endpoints.md) — danh sách 160 endpoint (sinh tự động)
- [docs/adr/](docs/adr/) — các quyết định kiến trúc
- [docs/00-architecture-plan.md](docs/00-architecture-plan.md) — kế hoạch ban đầu
