import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

/**
 * Danh sách feature để sinh luật ranh giới. Thêm feature mới ⇒ thêm vào đây
 * (script `scripts/new-feature` sẽ làm việc này ở phase 10).
 */
const FEATURES = [
  "students",
  "courses",
  "learning-paths",
  "learning-materials",
  "question-bank",
  "teachers",
  "cms-pages",
  "articles",
  "forms",
  "testimonials",
  "site-config",
  "banners",
  "media",
  "branches",
  "users",
  "roles",
  "audit-logs",
  "settings",
  "dashboard",
  "public-api",
  "site",
];

const featureBoundaryRules = FEATURES.map((name) => ({
  files: [`src/features/${name}/**/*.{ts,tsx}`],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            // Chỉ được import feature khác qua public API (index.ts), không import sâu.
            group: ["@/features/*/*", `!@/features/${name}/*`, "!@/features/*/server", "!@/features/*/types", "!@/features/*/client"],
            message: "Import feature khác chỉ qua '@/features/<name>' (index.ts), không import sâu.",
          },
          {
            group: ["@/mock", "@/mock/*", "@/app/*"],
            message: "Feature không được import mock hoặc app. Mọi dữ liệu phải đi qua service → API client.",
          },
        ],
      },
    ],
  },
}));

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "coverage/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  // Script CLI được phép in ra console
  { files: ["scripts/**/*.mjs"], rules: { "no-console": "off" } },
  // core: tầng thấp nhất, không phụ thuộc shared/features/app/mock
  {
    files: ["src/core/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/shared/*", "@/features/*", "@/app/*", "@/mock", "@/mock/*"],
              message: "core không được import shared/features/app/mock.",
            },
          ],
        },
      ],
    },
  },
  // shared: không phụ thuộc features/app/mock
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*", "@/app/*", "@/mock", "@/mock/*"],
              message: "shared không được import features/app/mock.",
            },
          ],
        },
      ],
    },
  },
  ...featureBoundaryRules,
  // app: không import sâu vào feature, không import mock (trừ route handler mock)
  {
    files: ["src/app/**/*.{ts,tsx}", "src/config/**/*.{ts,tsx}"],
    ignores: ["src/app/api/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*/*", "!@/features/*/server", "!@/features/*/types", "!@/features/*/client"],
              message: "Chỉ import feature qua '@/features/<name>' (index.ts).",
            },
            { group: ["@/mock", "@/mock/*"], message: "UI không được import mock. Hãy gọi service." },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
