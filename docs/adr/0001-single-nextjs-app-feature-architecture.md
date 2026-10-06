# ADR-0001: Một app Next.js, kiến trúc theo feature

**Status:** Accepted · **Date:** 2026-10-05 · **Deciders:** Chủ dự án

## Context
Hai repo riêng (admin React + Vite, site user Next.js 14) trùng lặp `api/types/utils`, lệch phiên bản (React 18/19, Tailwind 3/4), code nhóm theo loại file nên một nghiệp vụ rải 5 thư mục. Mục tiêu: dễ mở rộng, bảo trì, thêm/xóa module, scale.

## Decision
Gộp thành **một app Next.js 15** (`fe-pte-ipass`), React 19, Tailwind 4, TypeScript strict. Tổ chức theo **feature** với dòng phụ thuộc một chiều `app → features → shared → core`, ép bằng eslint.

## Options Considered
| | A. Monorepo nhiều app + packages | **B. Một app Next, feature-based (chọn)** | C. Giữ 2 repo |
|---|---|---|---|
| Độ phức tạp | Cao | Trung bình | Thấp |
| Trùng lặp code | Thấp (packages) | Không | Cao |
| Triển khai | 2 build/2 deploy | 1 build/1 deploy | 2 |
| Rủi ro | Hạ tầng workspace | Admin ảnh hưởng site public cùng deploy | Lệch phiên bản kéo dài |

## Consequences
- Dễ hơn: thêm/xóa module (một thư mục), dùng chung `core/shared`, một CI/Docker.
- Khó hơn: admin và site public chung build ⇒ cần route group riêng, `noindex`, tách bundle (client-only admin).
- Cần xem lại: nếu số team tăng hoặc cần deploy độc lập ⇒ tách `core/shared` thành package (ranh giới đã sẵn).
- Site public (`frontend-ipte`) chưa port; API CMS công khai đã có để nó dùng lại.
