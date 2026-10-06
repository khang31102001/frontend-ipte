"use client";
import { Calendar, Clock, DollarSign, Phone, TrendingUp, Video } from "lucide-react";
import { analytics } from "../../../lib/analytics";
import { useSite } from "../../../providers/site-provider";
import { formatVND } from "../../../utils/currency";

interface CourseSidebarProps {
  title: string;
  level?: string;
  mode?: string;
  durationWeeks?: number;
  sessionsCount?: number;
  /** VND. 0 = liên hệ tư vấn. */
  tuition?: number;
  hotline?: string;
}

const Row = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-muted-foreground flex items-center">
      {icon}
      {label}
    </span>
    <span className="text-sm font-medium text-right">{value}</span>
  </div>
);

const CourseSidebar = ({ title, level, mode, durationWeeks, sessionsCount, tuition, hotline }: CourseSidebarProps) => {
  const { openRegistration, hasRegistrationForm } = useSite();

  return (
    <aside className="space-y-6">
      <div className="card-box pad-sm rounded-[0.4rem]">
        <h2 className="text-lg mb-4">{title}</h2>
        <div className="space-y-4">
          {level && <Row icon={<TrendingUp className="w-4 h-4 mr-2" />} label="Trình độ đầu vào" value={level} />}
          {mode && <Row icon={<Video className="w-4 h-4 mr-2" />} label="Hình thức" value={mode} />}
          {durationWeeks ? <Row icon={<Calendar className="w-4 h-4 mr-2" />} label="Thời lượng" value={`${durationWeeks} tuần`} /> : null}
          {sessionsCount ? <Row icon={<Clock className="w-4 h-4 mr-2" />} label="Số buổi" value={`${sessionsCount} buổi`} /> : null}
          <Row icon={<DollarSign className="w-4 h-4 mr-2" />} label="Học phí" value={tuition && tuition > 0 ? formatVND(tuition) : "Liên hệ tư vấn"} />

          {hotline && (
            <div className="pt-4 border-t border-gray-600">
              <a
                href={`tel:${hotline.replace(/\s/g, "")}`}
                onClick={() => analytics.ctaClick("call", "course_sidebar")}
                className="w-full btn-link justify-center btn-sm border border-gray-300 rounded bg-transparent hover:bg-hero-gradient hover:text-white transition-colors duration-200 ease-out"
              >
                <Phone className="w-4 h-4 mr-2" />
                {hotline}
              </a>
            </div>
          )}
          {hasRegistrationForm && (
            <div className="hidden md:block w-full">
              <button
                type="button"
                onClick={() => {
                  analytics.ctaClick("register", "course_sidebar");
                  openRegistration();
                }}
                className="w-full btn-link justify-center font-semibold btn-sm border border-gray-300 rounded bg-transparent hover:bg-hero-gradient hover:text-white transition-colors duration-200 ease-out"
              >
                Đăng ký tư vấn
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default CourseSidebar;
