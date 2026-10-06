import { optionalDateString, requiredString, z } from "@/core/validation";
import { BANNER_PLACEMENTS, BANNER_STATUSES } from "./types";

const urlOk = (v: string) => /^(https?:\/\/|\/)/.test(v);

const requiredImageUrl = () =>
  z
    .string({ error: "Vui lòng nhập ảnh banner" })
    .trim()
    .min(1, "Vui lòng nhập ảnh banner")
    .refine(urlOk, "Đường dẫn ảnh không hợp lệ");

const optionalImageUrl = () =>
  z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined)
    .refine((v) => v === undefined || urlOk(v), "Đường dẫn ảnh không hợp lệ");

export const bannerSchema = z
  .object({
    title: requiredString("Vui lòng nhập tiêu đề").max(120, "Tối đa 120 ký tự"),
    placement: z.enum(BANNER_PLACEMENTS),
    imageUrl: requiredImageUrl(),
    mobileImageUrl: optionalImageUrl(),
    linkUrl: z
      .string()
      .trim()
      .optional()
      .transform((v) => v || undefined)
      .refine((v) => v === undefined || urlOk(v), "Liên kết không hợp lệ"),
    altText: z
      .string()
      .trim()
      .max(160, "Tối đa 160 ký tự")
      .optional()
      .transform((v) => v || undefined),
    startAt: optionalDateString("Ngày bắt đầu không hợp lệ"),
    endAt: optionalDateString("Ngày kết thúc không hợp lệ"),
    status: z.enum(BANNER_STATUSES),
    sortOrder: z.number({ error: "Thứ tự phải là số" }).int().min(0, "Không âm").max(999, "Tối đa 999"),
  })
  .refine((v) => !v.startAt || !v.endAt || v.startAt <= v.endAt, { path: ["endAt"], message: "Ngày kết thúc phải sau ngày bắt đầu" });
export type BannerInput = z.infer<typeof bannerSchema>;
export type BannerFormValues = z.input<typeof bannerSchema>;
