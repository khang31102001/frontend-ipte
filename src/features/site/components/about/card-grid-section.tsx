import PageContent from "../../shared/page/page-content";
import { Section } from "../../shared/page/section";
import PTEEcosystemCard from "./card/pte-ecosystem-card";

interface CardGridSectionProps {
  heading: string;
  description?: string;
  items: { title: string; description: string }[];
  /** "split": tiêu đề bên trái, thẻ bên phải (đối tượng); "grid": lưới 2 cột (hệ sinh thái). */
  layout?: "split" | "grid";
}

/** Khối tiêu đề + danh sách thẻ, dùng cho "Đối tượng phù hợp" và "Hệ sinh thái iPASS". */
const CardGridSection = ({ heading, description, items, layout = "split" }: CardGridSectionProps) => {
  if (items.length === 0) return null;

  if (layout === "grid") {
    return (
      <Section className="w-full">
        <PageContent>
          <h2 className="text-4xl font-bold leading-tight text-hero-gradient">{heading}</h2>
          {description && <p className="mt-2 text-base leading-relaxed text-gray-600 lg:text-lg">{description}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {items.map((item) => (
              <PTEEcosystemCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </PageContent>
      </Section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col justify-start">
          <h2 className="mb-4 text-4xl font-bold leading-tight lg:text-5xl">
            <span className="text-hero-gradient">{heading}</span>
          </h2>
          {description && <p className="text-base leading-relaxed text-gray-600 lg:text-lg">{description}</p>}
        </div>
        {items.map((item) => (
          <PTEEcosystemCard key={item.title} title={item.title} description={item.description} />
        ))}
      </div>
    </section>
  );
};

export default CardGridSection;
