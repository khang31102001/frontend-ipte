import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Webhook làm mới nội dung website khi CMS/backend thay đổi.
 * POST /api/revalidate  — header `x-revalidate-secret`, body `{ tags?: string[], paths?: string[] }`.
 * Tag hợp lệ: site-config, courses, articles, teachers, testimonials, banners, branches, pages, forms.
 */
export async function POST(req: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || req.headers.get("x-revalidate-secret") !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as { tags?: string[]; paths?: string[] };
  const tags = body.tags ?? [];
  const paths = body.paths ?? [];
  for (const tag of tags) revalidateTag(tag);
  for (const path of paths) revalidatePath(path);
  return NextResponse.json({ ok: true, revalidated: { tags, paths } });
}
