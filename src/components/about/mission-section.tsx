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
    backgroundImage = "/images/bg/bg-mission.png"
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
            style={styleBackground}
        >
            <div className="mission-section__content">
                <div className="mission-section__title">
                    <h2 >{title}</h2>
                    <svg width="173" height="25" viewBox="0 0 173 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M46.3439 14.6335C38.9543 16.8024 30.4227 18.9608 22.2152 19.4997C15.2002 19.9597 8.42427 19.2452 2.87809 16.2053C2.09628 15.7773 1.11724 16.0716 0.694429 16.8637C0.270973 17.6551 0.562297 18.6463 1.34411 19.075C7.39431 22.3902 14.7716 23.2574 22.4234 22.755C30.7784 22.2069 39.4641 20.0341 47.0019 17.8339C47.8765 19.6276 49.6877 21.2999 52.8781 22.5337C57.7785 24.4292 64.4693 24.4057 71.5179 23.3376C81.7408 21.7892 92.7377 18.0969 99.8082 15.4733C100.098 15.3662 100.53 15.196 101.059 14.9715C101.22 15.3317 101.4 15.6866 101.6 16.0351C103.334 19.0717 106.402 21.527 109.528 22.4039C129.353 27.9643 152.492 21.3019 171.332 15.8797C172.182 15.6338 172.679 14.7308 172.44 13.8649C172.195 12.9991 171.306 12.496 170.449 12.742C152.138 18.0127 129.656 24.6628 110.385 19.2596C108.013 18.5941 105.706 16.7071 104.391 14.4025C104.243 14.1455 104.114 13.8825 103.991 13.6157C106.589 12.3127 109.644 10.4962 111.287 8.55176C112.976 6.55844 113.395 4.4307 111.925 2.42106C110.662 0.703083 108.748 0.556925 106.756 1.44756C104.61 2.40149 102.399 4.63163 101.684 5.67821C100.343 7.63304 99.9178 9.75362 100.163 11.8213C99.5311 12.0915 99.018 12.2924 98.7016 12.4099C91.7858 14.9754 81.0369 18.5967 71.0409 20.1111C64.6092 21.0859 58.4997 21.2157 54.0279 19.4867C52.1208 18.7487 50.8607 17.8875 50.1768 16.8879C51.5265 16.4794 52.8278 16.0775 54.0711 15.6938C56.53 14.935 61.6495 13.679 65.3072 11.4403C68.216 9.66033 70.1882 7.23897 70.0735 4.20364C70.0149 2.64421 69.1234 1.60348 67.7048 1.02017C65.585 0.149106 61.9189 0.570599 60.5538 0.864215C56.4133 1.75289 50.8871 5.43159 48.1531 9.5768C47.0619 11.2308 46.4128 12.9612 46.3439 14.6335ZM49.745 13.6143C50.9148 13.2581 52.0454 12.9083 53.1314 12.573C55.4266 11.8644 60.2244 10.7388 63.6398 8.6483C65.4483 7.54169 66.925 6.21587 66.8534 4.32825C66.8476 4.18144 66.7039 4.13969 66.5769 4.07966C66.3803 3.98766 66.1554 3.92436 65.9156 3.87477C64.2933 3.53939 62.1142 3.86366 61.2222 4.05549C57.7481 4.80127 53.1269 7.91035 50.833 11.3887C50.3483 12.1234 49.9622 12.8718 49.745 13.6143ZM103.347 10.3193C104.861 9.53047 106.447 8.57653 107.697 7.53844C108.361 6.98709 108.922 6.42011 109.276 5.83157C109.573 5.34482 109.689 4.84629 109.334 4.36476C109.193 4.16967 108.98 4.16578 108.761 4.20232C108.529 4.24147 108.29 4.32497 108.052 4.43262C106.479 5.13339 104.855 6.77047 104.333 7.53844C103.721 8.42907 103.418 9.37127 103.347 10.3193Z" fill="#FEC333" />
                    </svg>
                </div>


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
