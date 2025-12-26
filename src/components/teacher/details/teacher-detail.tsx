'use client';

import Image from "next/image";
import { Teacher } from "@/types/teacher";

const content = `

<h3>👋 Giới thiệu</h3>
<p>
  Tôi là <strong>Nguyen Anh Minh</strong>, giảng viên PTE với hơn 
  <strong>6 năm kinh nghiệm</strong> đào tạo học viên ở các mức điểm 
  từ 30–79+. Tôi tập trung vào xây dựng phương pháp học hiệu quả, giúp học viên 
  tiết kiệm thời gian và đạt mục tiêu nhanh hơn.
</p>

<h3>🎓 Chuyên môn</h3>
<ul>
  <li>✔ Kinh nghiệm luyện thi PTE cho du học & định cư Úc</li>
  <li>✔ Chuyên sâu Speaking & Writing (phù hợp học viên mất gốc)</li>
  <li>✔ Kỹ năng chấm bài chi tiết, feedback rõ ràng – dễ hiểu</li>
  <li>✔ Am hiểu cấu trúc đề thi thật & scoring của Pearson AI</li>
</ul>

<h3>📘 Phương pháp giảng dạy</h3>
<p>
  Tôi tập trung vào <strong>tư duy làm bài</strong> thay vì học mẹo. Mỗi bài giảng đều được
  thiết kế để học viên hiểu bản chất, từ đó nâng điểm đồng đều ở cả 4 kỹ năng.
</p>
<ul>
  <li>🎯 Học – luyện – sửa theo <strong>chu trình 3 bước</strong></li>
  <li>🎧 Luyện Listening theo từng dạng câu hỏi – có file audio riêng</li>
  <li>🗣 Speaking luyện theo mẫu câu chuẩn, sửa phát âm chi tiết</li>
  <li>📝 Writing có template dễ nhớ nhưng vẫn đúng scoring</li>
  <li>📈 Tracking tiến độ hàng tuần để đảm bảo học viên đạt mục tiêu</li>
</ul>

<h3>🏆 Thành tích nổi bật</h3>
<ul>
  <li>🌟 Hơn 350+ học viên đạt PTE 50–65</li>
  <li>🌟 120+ học viên đạt PTE 79+ trong 2 năm gần đây</li>
  <li>🌟 Nhiều học viên từ mất gốc lên PTE 50 chỉ trong 4–6 tuần</li>
</ul>

<h3>💬 Cam kết cho học viên</h3>
<p>
  Tôi luôn đồng hành 1–1 để đảm bảo từng học viên hiểu rõ cách làm bài, sửa lỗi chi tiết và cải thiện
  từng kỹ năng. Học viên sẽ luôn nhận được:
</p>
<ul>
  <li>✔ Feedback rõ ràng – chỉnh đúng lỗi</li>
  <li>✔ Lộ trình học cá nhân hóa theo điểm mục tiêu</li>
  <li>✔ Bộ tài liệu PTE nội bộ + AI Template</li>
  <li>✔ Hỗ trợ qua Zalo/Whatsapp sau giờ học</li>
</ul>

<h3>📩 Liên hệ</h3>
<p>
  Nếu bạn muốn bắt đầu hành trình PTE với tôi, hãy để lại thông tin hoặc nhắn tin trực tiếp —
  tôi luôn sẵn sàng hỗ trợ bạn! 🚀
</p>

`
interface TeacherDetailProps {
    teacher: Teacher;
}

const SkillScore = ({ label, score }: { label: string; score: number }) => (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className="flex items-center gap-3">
            <div className="w-32 bg-muted rounded-full h-2">
                <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(score / 100) * 100}%` }}
                />
            </div>
            <span className="text-lg font-bold text-primary w-12 text-right">{score}</span>
        </div>
    </div>
);

const TeacherDetails = ({ teacher }: TeacherDetailProps) => {
    const skills = [
        { label: 'Listening', score: Number(teacher.listening_score) },
        { label: 'Reading', score: Number(teacher.reading_score) },
        { label: 'Speaking', score: Number(teacher.speaking_score) },
        { label: 'Writing', score: Number(teacher.writing_score) },
    ];

    return (
        <article className="teacher-container">
            <div className="teacher-wrapper">
                {/* Header Section */}
                <div className="teacher-header">
                    <div className="teacher-header-content">
                        <Image
                          src={teacher.image || "/placeholder.svg?height=160&width=160"}
                          alt={teacher.name}
                          width={160}
                          height={160}
                          className="teacher-profile-image"
                        />
                        <div className="teacher-header-info">
                            <h1 className="teacher-title">{teacher.name}</h1>

                            <div className="teacher-score-display">
                                <span className="teacher-score-value">{teacher.overall_score}</span>
                                <span className="teacher-score-max">/ 100</span>
                            </div>

                            <p className="teacher-score-label">Overall Score</p>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <section className="teacher-section">
                    <h2 className="teacher-section-title">English Skills Assessment</h2>

                    <div className="teacher-skills-container">
                        {/* Skill Bars */}
                        <div className="teacher-skill-bars">
                            {skills.map((skill) => (
                                <div key={skill.label} className="teacher-skill-row">
                                    <span className="teacher-skill-label">{skill.label}</span>

                                    <div className="teacher-bar-container">
                                        <div
                                            className="teacher-bar"
                                            style={{ width: `${skill.score}%` }}
                                        />
                                    </div>

                                    <span className="teacher-skill-score">{skill.score}</span>
                                </div>
                            ))}
                        </div>

                        {/* Chart */}
                        <div className="teacher-chart-section">
                            <h3 className="teacher-chart-title">Score Comparison</h3>

                            <div className="teacher-bar-chart">
                                {skills.map((skill) => (
                                    <div key={skill.label} className="teacher-chart-item">
                                        <div
                                            className="teacher-chart-bar"
                                            style={{ height: `${(skill.score / 10) * 240}px` }}
                                        >
                                            <span className="teacher-chart-value">{skill.score}</span>
                                        </div>
                                        <span className="teacher-chart-label">{skill.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                {teacher && (
                    <section className="teacher-section">
                        <h2 className="teacher-section-title">About</h2>

                        <div
                            className="teacher-content"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </section>
                )}
            </div>
        </article>

    );
}

export default TeacherDetails
