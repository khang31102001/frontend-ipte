import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { coursesService } from "@/services/course/courseService";
import type { CourseListResponse } from "@/types/courses";

interface QueryParams {
  cateId: number | null;
  page?: number;
  pageSize?: number;
}

export function useKnowledGetByCate(
  params: QueryParams
): UseQueryResult<CourseListResponse, Error> {
  const cateId = params.cateId;

  return useQuery<CourseListResponse, Error>({
    enabled: !!cateId,
    queryKey: ["courses", "byCategory", params],
    queryFn: async (): Promise<CourseListResponse> => {
      const res = await coursesService.getCourseByCateId(params);
      if(!res) return {items: [], page: 0, pageSize: 0, totalPages: 0, total: 0} ;
      return res;
    },
    // placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 2,
  });
}
