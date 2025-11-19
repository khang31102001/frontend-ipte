import React from 'react';
const missionContent = `
  <p>
    Sứ mệnh của iPTE là giúp học viên <strong>chinh phục PTE một cách thông minh</strong>,
    tiết kiệm thời gian và chi phí, nhưng vẫn giữ được sự bền vững trong tư duy tiếng Anh.
  </p>
  <p>
    Chúng tôi tin rằng <em>ai cũng có thể đạt điểm cao PTE</em> nếu được hướng dẫn đúng lộ trình
    và luyện tập trong môi trường phù hợp.
  </p>
  <h3>Giá trị cốt lõi</h3>
  <ul>
    <li>Học thật – thi thật – điểm thật, nói không với “mẹo ảo”.</li>
    <li>Đồng hành 1-1, hỗ trợ sát sao từng học viên.</li>
    <li>Ứng dụng công nghệ để tối ưu việc luyện tập & theo dõi tiến bộ.</li>
  </ul>
`;
interface MissionSectionProps {
    title?: string;
    desc?: string;
    content?: string;
    backgroundImage?: string;
}
const MissionSection = ({
    title = "Sứ mệnh của iPTE",
    desc = "Mang đến lộ trình PTE rõ ràng, dễ hiểu và hiệu quả cho người bận rộn.",
    content = missionContent,
    backgroundImage = "/images/bg-mission.png"
}: MissionSectionProps) => {

    const styleBackground = {
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    return (
        <section
            className="mission-section"
            style={{ backgroundImage: `url(${styleBackground})` }}
        >
            <div className="mission-section__content">
                <h2 className="mission-section__title">{title}</h2>

                <div
                    className="mission-section__desc"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                <button className="mission-section__btn" >
                    Xem thêm
                </button>
            </div>
        </section>
    );
};

export default MissionSection;
