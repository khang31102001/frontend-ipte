import { requiredString, z } from "@/core/validation";
import { MEDIA_KINDS } from "./types";

const optionalNumber = (label: string, max: number) =>
  z.number({ error: `${label} phải là số` }).int().min(1, `${label} tối thiểu 1`).max(max, `${label} quá lớn`).optional();

export const mediaSchema = z.object({
  name: requiredString("Vui lòng nhập tên tệp").max(160, "Tối đa 160 ký tự"),
  kind: z.enum(MEDIA_KINDS),
  url: z
    .string({ error: "Vui lòng nhập đường dẫn" })
    .trim()
    .min(1, "Vui lòng nhập đường dẫn")
    .refine((v) => /^(https?:\/\/|\/)/.test(v), "Đường dẫn phải bắt đầu bằng http(s):// hoặc /"),
  mimeType: z
    .string()
    .trim()
    .optional()
    .transform((v) => v || undefined),
  sizeKb: optionalNumber("Dung lượng", 5_000_000),
  width: optionalNumber("Chiều rộng", 20_000),
  height: optionalNumber("Chiều cao", 20_000),
  altText: z
    .string()
    .trim()
    .max(200, "Tối đa 200 ký tự")
    .optional()
    .transform((v) => v || undefined),
  folder: requiredString("Vui lòng nhập thư mục").max(60, "Tối đa 60 ký tự"),
  tags: z.array(z.string().trim().min(1)).max(15, "Tối đa 15 tag").default([]),
});
export type MediaInput = z.infer<typeof mediaSchema>;
export type MediaFormValues = z.input<typeof mediaSchema>;
