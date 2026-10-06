import {
  BookOpen,
  Building2,
  ClipboardList,
  FileText,
  GraduationCap,
  History,
  Image as ImageIcon,
  Inbox,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  Library,
  Newspaper,
  Route,
  Settings,
  ShieldCheck,
  Star,
  Tags,
  UserCog,
  Users,
  BarChart3,
  Globe,
  HelpCircle,
} from "lucide-react";
import { ROUTES } from "@/core/config/routes";
import type { NavGroup } from "@/shared/layout";

/** Menu quản trị. Mỗi mục gắn quyền xem tương ứng; mục không đủ quyền sẽ bị ẩn khỏi sidebar. */
export const adminNav: NavGroup[] = [
  {
    title: "Tổng quan",
    items: [
      { label: "Dashboard", href: ROUTES.dashboard, exact: true, icon: <LayoutDashboard />, permission: "dashboard.view" },
      { label: "Báo cáo", href: ROUTES.reports, icon: <BarChart3 />, permission: "report.view" },
    ],
  },
  {
    title: "Học viên",
    items: [{ label: "Học viên", href: ROUTES.students.list, icon: <Users />, permission: "student.view" }],
  },
  {
    title: "Đào tạo",
    items: [
      { label: "Khóa học", href: ROUTES.courses.list, icon: <BookOpen />, permission: "course.view" },
      { label: "Danh mục khóa học", href: ROUTES.courseCategories, icon: <Layers />, permission: "course.view" },
      { label: "Lộ trình học", href: ROUTES.learningPaths.list, icon: <Route />, permission: "learning_path.view" },
      { label: "Học liệu", href: ROUTES.learningMaterials, icon: <Library />, permission: "learning_material.view" },
      { label: "Ngân hàng câu hỏi", href: ROUTES.questionBank, icon: <HelpCircle />, permission: "question.view" },
      { label: "Giáo viên", href: ROUTES.teachers.list, icon: <GraduationCap />, permission: "teacher.view" },
    ],
  },
  {
    title: "Website (CMS)",
    items: [
      { label: "Trang", href: ROUTES.pages.list, icon: <FileText />, permission: "page.view" },
      { label: "Bài viết", href: ROUTES.articles.list, icon: <Newspaper />, permission: "article.view" },
      { label: "Danh mục & Tag", href: ROUTES.taxonomy, icon: <Tags />, permission: "taxonomy.view" },
      { label: "Biểu mẫu", href: ROUTES.forms.list, icon: <ClipboardList />, permission: "form.view" },
      { label: "Dữ liệu biểu mẫu", href: ROUTES.formSubmissions, icon: <Inbox />, permission: "form_submission.view" },
      { label: "Cảm nhận học viên", href: ROUTES.testimonials, icon: <Star />, permission: "testimonial.view" },
      { label: "Banner", href: ROUTES.banners, icon: <LayoutTemplate />, permission: "banner.view" },
      { label: "Thư viện media", href: ROUTES.media, icon: <ImageIcon />, permission: "media.view" },
      { label: "Cấu hình website", href: ROUTES.siteConfig, icon: <Globe />, permission: "site_config.view" },
    ],
  },
  {
    title: "Tổ chức",
    items: [{ label: "Cơ sở & phòng học", href: ROUTES.branches.list, icon: <Building2 />, permission: "branch.view" }],
  },
  {
    title: "Hệ thống",
    items: [
      { label: "Người dùng", href: ROUTES.users, icon: <UserCog />, permission: "user.view" },
      { label: "Vai trò & quyền", href: ROUTES.roles.list, icon: <ShieldCheck />, permission: "role.view" },
      { label: "Nhật ký hoạt động", href: ROUTES.auditLogs, icon: <History />, permission: "audit_log.view" },
      { label: "Cài đặt", href: ROUTES.settings, icon: <Settings />, permission: "setting.view" },
    ],
  },
];
