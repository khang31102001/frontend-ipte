import { createCrudService } from "@/core/api";
import type { BranchInput, RoomInput } from "../schemas";
import type { Branch, BranchQuery, Room, RoomQuery } from "../types";

export const branchService = createCrudService<Branch, BranchInput, BranchInput, BranchQuery>("/branches");
export const roomService = createCrudService<Room, RoomInput, RoomInput, RoomQuery>("/rooms");
