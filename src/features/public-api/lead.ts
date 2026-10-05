"use client";
import { apiClient } from "@/core/api";
import { getAttribution, type LeadSource } from "./attribution";

interface LeadBody {
  data: Record<string, string>;
  recaptchaToken?: string;
  source: LeadSource;
}

export interface LeadReceipt {
  id: string;
  message: string;
}

/** Gửi lead từ website: POST /public/forms/:slug/submit (tự đính kèm UTM/referrer/landing page). */
export async function submitLead(
  slug: string,
  data: Record<string, string>,
  options: { recaptchaToken?: string } = {},
): Promise<LeadReceipt> {
  const body: LeadBody = { data, source: getAttribution(), recaptchaToken: options.recaptchaToken };
  const res = await apiClient.post<LeadReceipt>(`/public/forms/${encodeURIComponent(slug)}/submit`, body);
  return res.data;
}
