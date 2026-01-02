'use client';
import Image from "next/image";
import { Teacher } from "@/types/teacher";

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
        { label: 'Listening', score: Number(teacher.listeningScore) },
        { label: 'Reading', score: Number(teacher.readingScore) },
        { label: 'Speaking', score: Number(teacher.speakingScore) },
        { label: 'Writing', score: Number(teacher.writingScore) },
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
                                <span className="teacher-score-value">{teacher.overallScore}</span>
                                <span className="teacher-score-max">/ 10</span>
                            </div>

                            <p className="teacher-score-label">Overall Score</p>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <section className="teacher-section">
                    <h2 className="teacher-section-title">Đánh giá kỹ năng tiếng Anh</h2>

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
                            <h3 className="teacher-chart-title">So sánh điểm số</h3>

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
                        <h2 className="teacher-section-title">Thông tin giáo viên</h2>

                        <div
                            className="teacher-content"
                            dangerouslySetInnerHTML={{ __html: teacher?.content ?? "" }}
                        />
                    </section>
                )}
            </div>
        </article>

    );
}

export default TeacherDetails
