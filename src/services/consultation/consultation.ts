import { post } from "@/api/http";

export class ConsultationService {
  async register(params: any): Promise<any> {
    const response = await post("/consultations", params);
    return response;
  }
}

export const consultationService = new ConsultationService();