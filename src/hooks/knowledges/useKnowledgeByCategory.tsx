
import { knowledgeService } from "@/services/knowledge/knowledgeService";
import { KnowledgeListRes, Knowledges } from "@/types/knowledges";
import { useQuery } from "@tanstack/react-query";

export function useKnowledgeByCategory(id: string | number) {
  return useQuery({
    queryKey: ["knowledge", id],
    queryFn: async () => {
      const res = await knowledgeService.getKnowledgeList({
        categoryType: String(id),
      });
      return res.items;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 2, // Cache 2 phút
  });
}
