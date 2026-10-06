import { sanitizeHtml, toHtml } from "../../lib/sanitize";

interface MissionSectionProps {
  title?: string;
  mission?: string | null;
  vision?: string | null;
  backgroundImage?: string;
}

const MissionSection = ({ title = "Sứ mệnh của PTE iPASS", mission, vision, backgroundImage = "/images/bg/bg-mission.png" }: MissionSectionProps) => {
  if (!mission && !vision) return null;
  const render = (value: string) => ({ __html: sanitizeHtml(toHtml(value)) });

  return (
    <section
      className="mission-section section sm:section--sm lg:section--lg"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
    >
      <div className="mission-section__content">
        <div className="mission-section__title">
          <h2>{title}</h2>
        </div>
        {mission && <div className="mission-section__desc" dangerouslySetInnerHTML={render(mission)} />}
        {vision && <div className="mission-section__desc" dangerouslySetInnerHTML={render(vision)} />}
      </div>
    </section>
  );
};

export default MissionSection;
