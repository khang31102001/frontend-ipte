import type { PublicTeacher } from "@/features/public-api";
import LinkPagination from "../../shared/control/link-pagination";
import PageContent from "../../shared/page/page-content";
import { Section } from "../../shared/page/section";
import TeacherProfilesCard from "./card/teacher-profiles-card";

interface TeacherListProps {
  teachers: PublicTeacher[];
  page: number;
  totalPages: number;
  basePath: string;
  title?: string;
}

const TeacherList = ({ teachers, page, totalPages, basePath, title = "Khám phá profile của các thầy cô PTE iPASS!" }: TeacherListProps) => {
  if (teachers.length === 0) return null;
  return (
    <Section>
      <PageContent>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">{title}</h2>
        <div className="teacher-list">
          <div className="teacher-list__gridFade">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {teachers.map((t) => (
                <TeacherProfilesCard key={t.id} data={t} />
              ))}
            </div>
          </div>
          <LinkPagination page={page} totalPages={totalPages} basePath={basePath} />
        </div>
      </PageContent>
    </Section>
  );
};

export default TeacherList;
