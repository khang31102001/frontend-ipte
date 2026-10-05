import PageContent from "../../shared/page/page-content";
import { Section } from "../../shared/page/section";

interface StudyStep {
  title: string;
  description: string;
}

interface StudyPathProps {
  heading?: string;
  description?: string;
  steps: StudyStep[];
  backgroundImage?: string;
}

const StudyPathPTE = ({ heading = "Lộ trình học PTE chuẩn quốc tế", description, steps, backgroundImage = "/images/bg-study-path.png" }: StudyPathProps) => {
  if (steps.length === 0) return null;

  return (
    <Section className="relative z-0 w-full" backgroundImage={backgroundImage}>
      <PageContent>
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4 tracking-wide">
            <span className="relative inline-block pb-10 mt-2">{heading}</span>
          </h2>
          {description && <p className="text-[#604B01] text-base md:text-lg leading-relaxed">{description}</p>}
        </div>

        <ol className="relative">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <li key={step.title} className="relative mb-12 last:mb-0">
                <div className={`absolute top-8 text-6xl md:text-5xl font-bold text-white z-0 ${isLeft ? "right-4 md:right-8" : "left-4 md:left-8"}`}>
                  Step {index + 1}.
                </div>

                <div className={`relative z-10 flex ${isLeft ? "justify-start" : "justify-end"}`}>
                  <div className="bg-white rounded-3xl p-6 shadow-lg max-w-md w-full mx-4 md:mx-8">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">{index + 1}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 ${isLeft ? "translate-x-16" : "-translate-x-16"}`}>
                    <div className="w-0.5 h-8 bg-gray-800/20" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </PageContent>
    </Section>
  );
};

export default StudyPathPTE;
