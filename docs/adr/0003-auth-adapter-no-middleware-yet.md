# ADR-0003: Xác thực qua AuthAdapter; chưa có middleware chặn `/admin`

**Status:** Accepted (tạm thời) · **Date:** 2026-10-05

## Context
Hệ thống identity/authentication/authorization thật do chủ dự án cung cấp sau; không build lại.

## Decision
`core/auth` chỉ định nghĩa hợp đồng `AuthAdapter` và `AuthProvider`. Dev dùng `createDevAuthAdapter` (chọn vai trò, gửi `x-mock-role`). Quyền lấy từ `GET /auth/me` và đưa vào `PermissionProvider`. **Chưa** thêm `middleware.ts` chặn `/admin` vì nó cần cơ chế phiên thật (cookie httpOnly/JWT) — làm khi tích hợp.

## Consequences
- Khi có identity thật: viết adapter, đổi một dòng ở `app/(admin)/admin/providers.tsx`, thêm `middleware.ts` kiểm tra cookie phiên.
- Hiện token (nếu có) nên chuyển sang cookie httpOnly, không lưu `localStorage` (khác repo admin cũ).
- Cho tới lúc đó `/admin` KHÔNG được coi là đã bảo vệ ở tầng server — không deploy production khi chưa tích hợp.
