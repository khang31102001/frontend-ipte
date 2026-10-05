import { emailString, requiredString, phoneString, z } from "@/core/validation";
import { BRANCH_COUNTRIES, BRANCH_STATUSES, ROOM_STATUSES, ROOM_TYPES } from "./types";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Tối đa ${max} ký tự`)
    .optional()
    .transform((v) => v || undefined);

export const branchSchema = z.object({
  code: requiredString("Vui lòng nhập mã cơ sở")
    .max(20, "Tối đa 20 ký tự")
    .regex(/^[A-Za-z0-9-]+$/, "Chỉ gồm chữ, số và dấu gạch ngang"),
  name: requiredString("Vui lòng nhập tên cơ sở").max(120, "Tối đa 120 ký tự"),
  country: z.enum(BRANCH_COUNTRIES),
  city: requiredString("Vui lòng nhập thành phố").max(60, "Tối đa 60 ký tự"),
  address: requiredString("Vui lòng nhập địa chỉ").max(200, "Tối đa 200 ký tự"),
  phone: phoneString(),
  email: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .pipe(emailString().optional()),
  managerName: optionalText(100),
  openingHours: optionalText(100),
  mapUrl: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .refine((v) => v === undefined || /^https?:\/\//.test(v), "Liên kết phải bắt đầu bằng http(s)://"),
  status: z.enum(BRANCH_STATUSES),
});
export type BranchInput = z.infer<typeof branchSchema>;
export type BranchFormValues = z.input<typeof branchSchema>;

export const roomSchema = z.object({
  branchId: requiredString("Vui lòng chọn cơ sở"),
  name: requiredString("Vui lòng nhập tên phòng").max(60, "Tối đa 60 ký tự"),
  capacity: z.number({ error: "Sức chứa phải là số" }).int("Phải là số nguyên").min(1, "Tối thiểu 1").max(500, "Tối đa 500"),
  type: z.enum(ROOM_TYPES),
  status: z.enum(ROOM_STATUSES),
  equipment: z.array(z.string().trim().min(1)).max(20, "Tối đa 20 thiết bị").default([]),
});
export type RoomInput = z.infer<typeof roomSchema>;
export type RoomFormValues = z.input<typeof roomSchema>;
