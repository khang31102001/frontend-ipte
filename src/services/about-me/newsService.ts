import { get } from "@/api/http";

export class AboutMeService {
  async getAboutMe(params: any): Promise<any> {
    const response = await get<any>("/about", params);
    return response;
  }
}

export const aboutMeService = new AboutMeService();
