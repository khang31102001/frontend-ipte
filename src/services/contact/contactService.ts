import api from "@/api/axiosClient";
import { get, post, put } from "@/api/http";

export class ContactService {
 
  async getConsultations(params: Record<string, any>): Promise<any> {
    return get("/consultations", params);
  }


  async getConsultationById(id: number): Promise<any> {
    return get(`/consultations/${id}`);
  }


  async getConsultationsDetail(params: Record<string, any>): Promise<any> {
    return get("/consultations/detail", params);
  }


  async createConsultation(data: any): Promise<any> {
    if (data instanceof FormData) {
      const response = await api.post("/consultations", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
    return post("/consultations", data);
  }


  async updateConsultation(id: number, data: any): Promise<any> {
    if (data instanceof FormData) {
      const response = await api.put(`/consultations/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
    return put(`/consultations/${id}`, data);
  }


}


export const contactService = new ContactService();
