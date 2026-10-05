# API Endpoints

> Sinh tự động bởi `scripts/generate-api-docs.mjs` (2026-10-05). Tổng 174 endpoint.

Quy ước chung xem [api-contract.md](./api-contract.md). Cột **Quyền** là quyền backend phải kiểm tra (`resource.action`); `public` = chỉ cần đăng nhập, `anonymous` = không cần đăng nhập.

## /article-categories

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/article-categories` | `taxonomy.view` |
| POST | `/article-categories` | `taxonomy.create` |
| GET | `/article-categories/:id` | `taxonomy.view` |
| PUT | `/article-categories/:id` | `taxonomy.edit` |
| PATCH | `/article-categories/:id` | `taxonomy.edit` |
| DELETE | `/article-categories/:id` | `taxonomy.delete` |

## /articles

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/articles` | `article.view` |
| POST | `/articles` | `article.create` |
| GET | `/articles/:id` | `article.view` |
| PUT | `/articles/:id` | `article.edit` |
| PATCH | `/articles/:id` | `article.edit` |
| DELETE | `/articles/:id` | `article.delete` |

## /audit-logs

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/audit-logs` | `audit_log.view` |
| GET | `/audit-logs/:id` | `audit_log.view` |
| GET | `/audit-logs/export` | `audit_log.export` |

## /auth

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/auth/me` | anonymous |

## /banners

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/banners` | `banner.view` |
| POST | `/banners` | `banner.create` |
| GET | `/banners/:id` | `banner.view` |
| PUT | `/banners/:id` | `banner.edit` |
| PATCH | `/banners/:id` | `banner.edit` |
| DELETE | `/banners/:id` | `banner.delete` |

## /branches

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/branches` | `branch.view` |
| POST | `/branches` | `branch.create` |
| GET | `/branches/:id` | `branch.view` |
| PUT | `/branches/:id` | `branch.edit` |
| PATCH | `/branches/:id` | `branch.edit` |
| DELETE | `/branches/:id` | `branch.delete` |

## /course-categories

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/course-categories` | `course.view` |
| POST | `/course-categories` | `course.create` |
| GET | `/course-categories/:id` | `course.view` |
| PUT | `/course-categories/:id` | `course.edit` |
| PATCH | `/course-categories/:id` | `course.edit` |
| DELETE | `/course-categories/:id` | `course.delete` |

## /courses

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/courses` | `course.view` |
| POST | `/courses` | `course.create` |
| GET | `/courses/:id` | `course.view` |
| PUT | `/courses/:id` | `course.edit` |
| PATCH | `/courses/:id` | `course.edit` |
| DELETE | `/courses/:id` | `course.delete` |

## /dashboard

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/dashboard/summary` | `dashboard.view` |

## /form-submissions

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/form-submissions` | `form_submission.view` |
| GET | `/form-submissions/:id` | `form_submission.view` |
| PUT | `/form-submissions/:id` | `form_submission.edit` |
| PATCH | `/form-submissions/:id` | `form_submission.edit` |
| DELETE | `/form-submissions/:id` | `form_submission.delete` |
| GET | `/form-submissions/export` | `form_submission.export` |

## /forms

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/forms` | `form.view` |
| POST | `/forms` | `form.create` |
| GET | `/forms/:id` | `form.view` |
| PUT | `/forms/:id` | `form.edit` |
| PATCH | `/forms/:id` | `form.edit` |
| DELETE | `/forms/:id` | `form.delete` |

## /learning-materials

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/learning-materials` | `learning_material.view` |
| POST | `/learning-materials` | `learning_material.create` |
| GET | `/learning-materials/:id` | `learning_material.view` |
| PUT | `/learning-materials/:id` | `learning_material.edit` |
| PATCH | `/learning-materials/:id` | `learning_material.edit` |
| DELETE | `/learning-materials/:id` | `learning_material.delete` |

## /learning-paths

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/learning-paths` | `learning_path.view` |
| POST | `/learning-paths` | `learning_path.create` |
| GET | `/learning-paths/:id` | `learning_path.view` |
| PUT | `/learning-paths/:id` | `learning_path.edit` |
| PATCH | `/learning-paths/:id` | `learning_path.edit` |
| DELETE | `/learning-paths/:id` | `learning_path.delete` |
| POST | `/learning-paths/generate` | `learning_path.view` |

## /lessons

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/lessons` | `lesson.view` |
| POST | `/lessons` | `lesson.create` |
| GET | `/lessons/:id` | `lesson.view` |
| PUT | `/lessons/:id` | `lesson.edit` |
| PATCH | `/lessons/:id` | `lesson.edit` |
| DELETE | `/lessons/:id` | `lesson.delete` |

## /lookups

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/lookups/:name` | `public` |

## /media

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/media` | `media.view` |
| POST | `/media` | `media.create` |
| GET | `/media/:id` | `media.view` |
| PUT | `/media/:id` | `media.edit` |
| PATCH | `/media/:id` | `media.edit` |
| DELETE | `/media/:id` | `media.delete` |

## /notification-templates

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/notification-templates` | `notification_template.view` |
| POST | `/notification-templates` | `notification_template.create` |
| GET | `/notification-templates/:id` | `notification_template.view` |
| PUT | `/notification-templates/:id` | `notification_template.edit` |
| PATCH | `/notification-templates/:id` | `notification_template.edit` |
| DELETE | `/notification-templates/:id` | `notification_template.delete` |

## /pages

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/pages` | `page.view` |
| POST | `/pages` | `page.create` |
| GET | `/pages/:id` | `page.view` |
| PUT | `/pages/:id` | `page.edit` |
| PATCH | `/pages/:id` | `page.edit` |
| DELETE | `/pages/:id` | `page.delete` |

## /permissions

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/permissions` | `role.view` |

## /public

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/public/article-categories` | anonymous |
| GET | `/public/articles` | anonymous |
| GET | `/public/articles/:slug` | anonymous |
| GET | `/public/banners` | anonymous |
| GET | `/public/branches` | anonymous |
| GET | `/public/course-categories` | anonymous |
| GET | `/public/courses` | anonymous |
| GET | `/public/courses/:slug` | anonymous |
| GET | `/public/forms/:slug` | anonymous |
| POST | `/public/forms/:slug/submit` | anonymous |
| GET | `/public/pages/:slug` | anonymous |
| GET | `/public/site-config` | anonymous |
| GET | `/public/sitemap` | anonymous |
| GET | `/public/teachers` | anonymous |
| GET | `/public/teachers/:slug` | anonymous |
| GET | `/public/testimonials` | anonymous |

## /questions

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/questions` | `question.view` |
| POST | `/questions` | `question.create` |
| GET | `/questions/:id` | `question.view` |
| PUT | `/questions/:id` | `question.edit` |
| PATCH | `/questions/:id` | `question.edit` |
| DELETE | `/questions/:id` | `question.delete` |
| GET | `/questions/export` | `question.export` |

## /reports

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/reports/enrollments` | `report.view` |
| GET | `/reports/funnel` | `report.view` |
| GET | `/reports/funnel/export` | `report.export` |
| GET | `/reports/lead-sources` | `report.view` |

## /roles

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/roles` | `role.view` |
| POST | `/roles` | `role.create` |
| GET | `/roles/:id` | `role.view` |
| PUT | `/roles/:id` | `role.edit` |
| PATCH | `/roles/:id` | `role.edit` |
| DELETE | `/roles/:id` | `role.delete` |

## /rooms

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/rooms` | `branch.view` |
| POST | `/rooms` | `branch.create` |
| GET | `/rooms/:id` | `branch.view` |
| PUT | `/rooms/:id` | `branch.edit` |
| PATCH | `/rooms/:id` | `branch.edit` |
| DELETE | `/rooms/:id` | `branch.delete` |

## /settings

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/settings/global` | `setting.view` |
| PUT | `/settings/global` | `setting.edit` |
| GET | `/settings/integration` | `setting.view` |
| PUT | `/settings/integration` | `setting.edit` |

## /site-config

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/site-config` | `site_config.view` |
| PUT | `/site-config` | `site_config.edit` |

## /students

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/students` | `student.view` |
| POST | `/students` | `student.create` |
| GET | `/students/:id` | `student.view` |
| PUT | `/students/:id` | `student.edit` |
| PATCH | `/students/:id` | `student.edit` |
| DELETE | `/students/:id` | `student.delete` |
| GET | `/students/:id/journey` | `student.view` |
| POST | `/students/:id/journey/advance` | `student.edit` |
| POST | `/students/:id/journey/notes` | `student.edit` |
| GET | `/students/:id/profile` | `student.view` |
| PUT | `/students/:id/profile` | `student.edit` |
| GET | `/students/export` | `student.export` |

## /tags

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/tags` | `taxonomy.view` |
| POST | `/tags` | `taxonomy.create` |
| GET | `/tags/:id` | `taxonomy.view` |
| PUT | `/tags/:id` | `taxonomy.edit` |
| PATCH | `/tags/:id` | `taxonomy.edit` |
| DELETE | `/tags/:id` | `taxonomy.delete` |

## /teachers

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/teachers` | `teacher.view` |
| POST | `/teachers` | `teacher.create` |
| GET | `/teachers/:id` | `teacher.view` |
| PUT | `/teachers/:id` | `teacher.edit` |
| PATCH | `/teachers/:id` | `teacher.edit` |
| DELETE | `/teachers/:id` | `teacher.delete` |

## /testimonials

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/testimonials` | `testimonial.view` |
| POST | `/testimonials` | `testimonial.create` |
| GET | `/testimonials/:id` | `testimonial.view` |
| PUT | `/testimonials/:id` | `testimonial.edit` |
| PATCH | `/testimonials/:id` | `testimonial.edit` |
| DELETE | `/testimonials/:id` | `testimonial.delete` |

## /users

| Method | Endpoint | Quyền |
|---|---|---|
| GET | `/users` | `user.view` |
| POST | `/users` | `user.create` |
| GET | `/users/:id` | `user.view` |
| PUT | `/users/:id` | `user.edit` |
| PATCH | `/users/:id` | `user.edit` |
| DELETE | `/users/:id` | `user.delete` |
| GET | `/users/export` | `user.export` |

