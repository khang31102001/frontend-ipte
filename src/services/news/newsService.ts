import { get } from "@/api/http";

interface NewsJoinedKnowledge  {
    news: {
        id: number;
        image: string;
        title: string;
        description: string;
        content: string;
        category: string | null;
        authorName: string | null;
        authorAvatar: string | null;
    }[];
    tips: {
        id: number;
        image: string;
        title: string;
        description: string;
        content: string;
        category: string | null;
        authorName: string | null;
        authorAvatar: string | null;
    }[];
};

export class NewsService {
  async getNewsAndTips(params: any): Promise<NewsJoinedKnowledge> {
    const response = await get<NewsJoinedKnowledge>("/news/news-and-tips", params);
    return response;
  }
}

export const newsService = new NewsService();
