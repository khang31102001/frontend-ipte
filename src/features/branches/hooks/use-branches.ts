"use client";

import { createCrudHooks } from "@/shared/hooks/create-crud-hooks";
import { branchService, roomService } from "../services/branch-service";

const branchHooks = createCrudHooks({ name: "branches", service: branchService, label: "cơ sở" });
export const branchKeys = branchHooks.keys;
export const useBranches = branchHooks.useList;
export const useBranch = branchHooks.useDetail;
export const useCreateBranch = branchHooks.useCreate;
export const useUpdateBranch = branchHooks.useUpdate;
export const useDeleteBranch = branchHooks.useRemove;

const roomHooks = createCrudHooks({ name: "rooms", service: roomService, label: "phòng học" });
export const useRooms = roomHooks.useList;
export const useCreateRoom = roomHooks.useCreate;
export const useUpdateRoom = roomHooks.useUpdate;
export const useDeleteRoom = roomHooks.useRemove;
