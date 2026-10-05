import { registerLookupRoute } from "../engine/lookups";
import { registerBranchesModule } from "./branches";
import { registerCmsModule } from "./cms";
import { registerCoursesModule } from "./courses";
import { registerDevModule } from "./dev";
import { registerIamModule } from "./iam";
import { registerLearningModule } from "./learning";
import { registerPublicModule } from "./public";
import { registerQuestionsModule } from "./questions";
import { registerStudentsModule } from "./students";
import { registerSystemModule } from "./system";
import { registerTeachersModule } from "./teachers";

/**
 * Danh sách module của Mock API. Thêm module mới ⇒ viết `modules/<name>.ts`
 * (đăng ký collection + route) rồi thêm một dòng ở đây.
 */
export function registerAllModules(): void {
  registerLookupRoute();
  registerIamModule();
  registerBranchesModule();
  registerStudentsModule();
  registerTeachersModule();
  registerCoursesModule();
  registerLearningModule();
  registerQuestionsModule();
  registerCmsModule();
  registerPublicModule();
  registerSystemModule();
  registerDevModule();
}
