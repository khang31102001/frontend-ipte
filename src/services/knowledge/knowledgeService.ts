import { get } from "@/api/http";

export class KnowledgeService {

  async getKnowledges(categoryId: Number, params: any): Promise<any> {
    const response = await get(`/knowledges/${categoryId}`, params);
    return response;
  }

}

export const knowledgeService = new KnowledgeService();