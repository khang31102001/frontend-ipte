import { MaterialsCrud } from "./components/materials-crud";

/** Trang danh sách học liệu toàn hệ thống. */
export function MaterialsListPage() {
  return <MaterialsCrud />;
}

/** Học liệu của một khóa học (nhúng trong tab chi tiết khóa học). */
export function MaterialsPanel({ courseId }: { courseId: string }) {
  return <MaterialsCrud courseId={courseId} embedded />;
}

export type { LearningMaterial } from "./types";
