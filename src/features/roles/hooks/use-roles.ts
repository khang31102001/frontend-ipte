"use client";

import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { roleService } from "../services/role-service";

const hooks = createCrudHooks({ name: "roles", service: roleService, label: "vai trò" });
export const useRoles = hooks.useList;
export const useRole = hooks.useDetail;
export const useCreateRole = hooks.useCreate;
export const useUpdateRole = hooks.useUpdate;
export const useDeleteRole = hooks.useRemove;
