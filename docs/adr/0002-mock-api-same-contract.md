# ADR-0002: Mock API là REST API thật dùng chung contract

**Status:** Accepted · **Date:** 2026-10-05

## Context
Backend chưa có. FE không được phụ thuộc trực tiếp dữ liệu mock; khi backend xong chỉ đổi base URL, không sửa UI/hook/service.

## Decision
Mock API chạy như **Route Handler của Next (`/api/*`)**, trả đúng envelope/mã lỗi/phân trang như backend thật. Contract = `features/*/{types,schemas}` (zod) dùng chung cho form FE và validate của mock. Mock kiểm tra quyền và ghi audit độc lập với FE. Chỉ `src/app/api` được import `@/mock` (eslint chặn nơi khác). `MOCK_API_ENABLED=false` ở production.

## Options Considered
- *Adapter mock ở tầng http (in-process)*: nhanh nhưng UI không đi qua HTTP thật ⇒ không chứng minh được đổi base URL là đủ. **Loại.**
- *MSW*: tốt cho test, nhưng cần worker cho server component/SSR và không có “server” để backend thay thế. **Loại.**
- *Route Handler (chọn)*: cùng origin, không CORS, thay thế bằng backend thật chỉ qua env.

## Consequences
- Dễ hơn: mọi màn hình chạy end-to-end qua `Service → API Client → HTTP`; có thể giả lập chậm/lỗi/rỗng.
- Khó hơn: dữ liệu mock nằm trong bộ nhớ tiến trình dev (mất khi restart; `POST /api/__mock/reset` để đặt lại).
- Backend thật phải tuân thủ `docs/api-contract.md`; bài test `mock/engine/*.test.ts` là bản đặc tả có thể chạy được.
