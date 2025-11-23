"use client";
export default function SectionLoading({
  text = "Đang tải nội dung...",
}: {
  text?: string;
}) {
  return (
    <div className="section-loading">
      <div className="section-loading__spinner" />
      <p className="section-loading__text">{text}</p>
    </div>
  );
}
