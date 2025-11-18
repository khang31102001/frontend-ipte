import React from 'react';

const MissionSection = () => {
    return (
        <section className="bg-cover bg-center bg-black bg-opacity-60 text-white py-16 relative" style={{ backgroundImage: `url('/your-background-image.jpg')` }}>
            <div className="absolute inset-0 bg-black opacity-60"></div>

            <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                <h2 className="text-4xl font-bold mb-4">
                    Sứ mệnh của <span className="text-yellow-400">iPTE</span>
                </h2>

                <div className="flex justify-center mb-6">
                    <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5 25 C15 10, 25 10, 35 25 C45 40, 55 40, 65 25 C75 10, 85 10, 95 25"
                            stroke="#FFC107"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>


                <p className="text-lg leading-relaxed">
                    <span className="text-yellow-400 font-semibold">TRUNG TÂM LUYỆN THI iPTE</span> cam kết hướng tới sự phát triển toàn diện của học viên trong việc học và chuẩn bị cho các kỳ thi tiếng Anh. iPTE tập trung nhấn mạnh vào các chương trình luyện thi chứng chỉ PTE với thời gian học nhanh nhất, lộ trình học ngắn nhất và học phí phù hợp nhất.
                </p>
            </div>
        </section>
    );
};

export default MissionSection;
