import Breadcrumb from "@/components/shared/breadcrumb/breadcrumb";
import { BreadcrumbItem } from "@/types/breadcrumbs";

interface CategoryLayoutProps {
  title: string;
  description?: string | null;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
}

export default function CategoryLayout({
  title,
  description,
  breadcrumbs,
  children,
}: CategoryLayoutProps) {
  return (
    <div className="bg-background text-foreground">
      <Breadcrumb
        items={breadcrumbs}
        className="pte-container section--sm"
      />

      <div className="pte-container ">
        <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
      </div>

      <div className="pte-container space-y-10">
        {children}
      </div>
    </div>
  );
}
