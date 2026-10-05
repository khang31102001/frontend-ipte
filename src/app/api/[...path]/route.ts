import { handleMockRequest } from "@/mock/engine/dispatch";

/**
 * Mock API: giả lập REST API thật tại /api/*.
 * Khi backend thật sẵn sàng, đổi NEXT_PUBLIC_API_BASE_URL và đặt MOCK_API_ENABLED=false.
 * Đây là NƠI DUY NHẤT trong app được phép import `@/mock`.
 */
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ path: string[] }> };

async function handler(request: Request, { params }: RouteContext) {
  const { path } = await params;
  return handleMockRequest(request, path);
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
