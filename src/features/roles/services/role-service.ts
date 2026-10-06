import { createCrudService } from "@/core/api";
import type { RoleInput } from "../schemas";
import type { Role, RoleQuery } from "../types";

export const roleService = createCrudService<Role, RoleInput, RoleInput, RoleQuery>("/roles");
