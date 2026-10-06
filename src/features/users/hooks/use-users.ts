"use client";

import { useMutation } from "@tanstack/react-query";
import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { userService } from "../services/user-service";

const hooks = createCrudHooks({ name: "users", service: userService, label: "người dùng" });
export const useUsers = hooks.useList;
export const useCreateUser = hooks.useCreate;
export const useUpdateUser = hooks.useUpdate;
export const useDeleteUser = hooks.useRemove;
export const useResetUserPassword = () => useMutation({ mutationFn: (id: string) => userService.resetPassword(id) });
