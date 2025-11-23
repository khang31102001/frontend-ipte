import { get } from "@/api/http";
import { KnowledgeListRes } from "@/types/knowledges";

export class KnowledgeService {

  async getKnowledgeList(params?: Record<string, string | number>): Promise<KnowledgeListRes> {
    const qs = params ? '?' + new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString() : '';
    const url = `/knowledges${qs}`;
    const response: KnowledgeListRes = await get(url);
    return response;
  }

}

export const knowledgeService = new KnowledgeService();