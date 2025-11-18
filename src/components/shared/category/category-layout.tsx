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
        className="container mx-auto px-4 mt-4"
      />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
      
      </div>

      <div className="container mx-auto px-4 space-y-10">
        {children}
      </div>
    </div>
  );
}
