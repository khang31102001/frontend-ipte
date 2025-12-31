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
      return {
        ...res,
        items: res.items ?? [],
        total: res.total ?? 0,
      };
    },
    // placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 2,
  });
}
