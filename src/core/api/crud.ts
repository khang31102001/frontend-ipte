import { apiClient, type ApiClient, type RequestOptions } from "./client";
import type { ListQuery, PageResult, QueryParams } from "./types";
import { DEFAULT_PAGE_SIZE } from "./types";

export interface CrudService<TEntity, TCreate, TUpdate, TQuery extends ListQuery> {
  readonly path: string;
  list(query?: TQuery, options?: Pick<RequestOptions, "signal">): Promise<PageResult<TEntity>>;
  get(id: string, options?: Pick<RequestOptions, "signal">): Promise<TEntity>;
  create(input: TCreate): Promise<TEntity>;
  update(id: string, input: TUpdate): Promise<TEntity>;
  remove(id: string): Promise<void>;
}

/**
 * Service CRUD chuẩn cho một resource REST. Service của từng feature dùng hàm này
 * rồi bổ sung method riêng, không viết lại `list/get/create/update/remove`.
 */
export function createCrudService<
  TEntity,
  TCreate = Partial<TEntity>,
  TUpdate = Partial<TEntity>,
  TQuery extends ListQuery = ListQuery,
>(path: string, client: ApiClient = apiClient): CrudService<TEntity, TCreate, TUpdate, TQuery> {
  return {
    path,
    async list(query, options) {
      const res = await client.get<TEntity[]>(path, {
        params: query as QueryParams | undefined,
        signal: options?.signal,
      });
      return {
        items: res.data,
        meta: res.meta ?? {
          page: query?.page ?? 1,
          pageSize: query?.pageSize ?? DEFAULT_PAGE_SIZE,
          total: res.data.length,
          totalPages: 1,
        },
      };
    },
    async get(id, options) {
      return (await client.get<TEntity>(`${path}/${encodeURIComponent(id)}`, options)).data;
    },
    async create(input) {
      return (await client.post<TEntity>(path, input)).data;
    },
    async update(id, input) {
      return (await client.put<TEntity>(`${path}/${encodeURIComponent(id)}`, input)).data;
    },
    async remove(id) {
      await client.delete<null>(`${path}/${encodeURIComponent(id)}`);
    },
  };
}
