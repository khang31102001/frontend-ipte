# fe-pte-ipass — Kế hoạch kiến trúc ban đầu

> Trạng thái: **Đã triển khai đủ 10 phase** (2026-10-05). Tài liệu hiện hành: [ARCHITECTURE.md](./ARCHITECTURE.md), [api-contract.md](./api-contract.md), [adr/](./adr/). File này giữ lại làm bối cảnh quyết định.

## Bối cảnh
Hai repo cũ (`admin-dashboard-ipte`: React + Vite + Tailwind 4; `frontend-ipte`: Next 14 + Tailwind 3) trùng lặp `api/types/utils`, lệch phiên bản, code nhóm theo loại file, có dead code (demo TailAdmin, prisma/next-auth/openai), `.env` + API key bị commit, token ở `localStorage`, không có test.

## Tái sử dụng / loại bỏ
| Hạng mục | Quyết định | Kết quả |
|---|---|---|
| Token màu TailAdmin, utility menu | Port | `src/styles/globals.css` |
| Shell `AppLayout/Sidebar/Header` | Port sang Next (`next/link`, `usePathname`, lọc menu theo quyền) | `shared/layout/admin-shell.tsx` |
| Button/Badge/Table/Modal/Pagination/Input | Gộp một bản | `shared/ui`, `shared/data-table` |
| `axiosClient/http/token`, các class `XxxService` | Thay | `core/api` (fetch + envelope) + service theo feature |
| react-toastify, tinymce, apexcharts, fullcalendar, jvectormap, react-dnd | Bỏ | `sonner`, biểu đồ CSS/SVG |
| Demo TailAdmin, prisma/next-auth/openai | Bỏ | — |
| Site user (public) | Chưa port | API CMS công khai đã sẵn (`/public/*`) |

## Các giả định đã áp dụng
- `npm` thay cho pnpm (máy chưa có pnpm). Next 15 + React 19 + Tailwind 4 + TS strict.
- Auth thật do chủ dự án cung cấp ⇒ `AuthAdapter` + adapter dev; chưa có middleware chặn `/admin` (ADR-0003).
- Rich-text editor chưa có (TinyMCE key cũ đã lộ, cần rotate); tạm dùng textarea.
- Banners/Media giữ từ admin cũ vì site public đang dùng.
