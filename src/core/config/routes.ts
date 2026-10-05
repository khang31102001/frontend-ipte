/** Đường dẫn của app, một nơi duy nhất. Không viết cứng URL trong component. */
const A = "/admin";

const crud = (base: string) => ({
  list: base,
  create: `${base}/new`,
  detail: (id: string) => `${base}/${encodeURIComponent(id)}`,
});

export const ROUTES = {
  home: "/",
  dashboard: A,
  students: crud(`${A}/students`),
  courses: crud(`${A}/courses`),
  courseCategories: `${A}/course-categories`,
  learningPaths: crud(`${A}/learning-paths`),
  learningMaterials: `${A}/learning-materials`,
  questionBank: `${A}/question-bank`,
  teachers: crud(`${A}/teachers`),
  pages: crud(`${A}/pages`),
  articles: crud(`${A}/articles`),
  taxonomy: `${A}/taxonomy`,
  forms: crud(`${A}/forms`),
  formSubmissions: `${A}/form-submissions`,
  testimonials: `${A}/testimonials`,
  siteConfig: `${A}/site-config`,
  banners: `${A}/banners`,
  media: `${A}/media`,
  branches: crud(`${A}/branches`),
  users: `${A}/users`,
  roles: crud(`${A}/roles`),
  auditLogs: `${A}/audit-logs`,
  settings: `${A}/settings`,
  reports: `${A}/reports`,
} as const;
