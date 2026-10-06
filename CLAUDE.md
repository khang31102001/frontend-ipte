# fe-pte-ipass — hướng dẫn cho Claude / người mới

Next.js 15 + React 19 + Tailwind 4 + TS strict, một app. Đọc `docs/ARCHITECTURE.md` trước khi sửa.

## Luật bất di bất dịch
- Luồng: `Page → Hook → Service → apiClient → REST (Mock hoặc thật)`. UI KHÔNG import `@/mock`, KHÔNG gọi `fetch` trực tiếp, KHÔNG hard-code URL/dữ liệu.
- Dòng phụ thuộc `app → features → shared → core`; import feature khác chỉ qua `@/features/<x>` (eslint chặn).
- Contract = `features/<x>/{types,schemas}.ts`; Mock và FE dùng chung schema zod.
- Quyền `resource.action` khai báo ở `core/rbac/permissions.ts`; FE chỉ ẩn/hiện, backend/mock phải kiểm tra độc lập.
- Không `any`, không `console.log`. Không nhân bản: dùng `CrudListPage`, `EntityDetailPage`, `useEntityForm`, `createCrudHooks`, `useLookup`, `ExportCsvButton`.

## Lệnh
`npm run typecheck && npm run lint && npm test && npm run build` — phải xanh trước khi báo hoàn thành.
Module mới: `node scripts/new-feature.mjs <ten> --noun "…" --title "…"`.

## Lưu ý môi trường
- Windows/PowerShell: `Get-Content` với đường dẫn có `[id]` cần `-LiteralPath`.
- Dev server nên dừng trước khi `npm run build` (cùng thư mục `.next`).
- Mock API giữ dữ liệu trong bộ nhớ; `POST /api/__mock/reset` để đặt lại.
