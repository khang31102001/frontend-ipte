import { apiClient } from "@/core/api";

/**
 * Điều khiển hành vi Mock API từ UI dev (giả lập chậm / lỗi / rỗng).
 * Chỉ ảnh hưởng khi backend là Mock API; backend thật bỏ qua các header `x-mock-*`.
 */
export const MOCK_SCENARIOS = ["none", "slow", "error", "empty"] as const;
export type MockScenario = (typeof MOCK_SCENARIOS)[number];

const KEY = "pte.dev.mockScenario";

export function getMockScenario(): MockScenario {
  try {
    const v = window.localStorage.getItem(KEY);
    return (MOCK_SCENARIOS as readonly string[]).includes(v ?? "") ? (v as MockScenario) : "none";
  } catch {
    return "none";
  }
}

export function setMockScenario(scenario: MockScenario): void {
  try {
    window.localStorage.setItem(KEY, scenario);
  } catch {
    /* bỏ qua */
  }
}

/** Đăng ký header scenario vào API client. Trả hàm hủy. */
export function registerMockScenarioHeaders(): () => void {
  return apiClient.addHeaderProvider(() => {
    const scenario = getMockScenario();
    return scenario === "none" ? undefined : { "x-mock-scenario": scenario };
  });
}
