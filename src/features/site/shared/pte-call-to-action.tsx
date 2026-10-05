"use client";
import { analytics } from "../lib/analytics";
import { useSite } from "../providers/site-provider";

interface PTECallToActionProps {
  heading?: string;
  description?: string;
}

const PTECallToAction = ({
  heading = "Bắt đầu hành trình chinh phục điểm số PTE mơ ước cùng PTE iPASS!",
  description = "Đừng chần chừ nữa! Hãy để PTE iPASS đồng hành cùng bạn trên con đường chinh phục mục tiêu PTE với đội ngũ giáo viên tận tâm và lộ trình học tập cá nhân hóa.",
}: PTECallToActionProps) => {
  const { openRegistration, hasRegistrationForm } = useSite();
  if (!hasRegistrationForm) return null;

  const open = (type: string) => {
    analytics.ctaClick(type, "call_to_action");
    openRegistration();
  };

  return (
    <div className="bg-hero-gradient text-white py-16 text-center px-4">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">{heading}</h2>
      <p className="mb-8 text-sm md:text-base max-w-2xl mx-auto">{description}</p>
      <div className="flex justify-center gap-4 flex-wrap">
        <button onClick={() => open("register")} type="button" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
          Đăng ký ngay
        </button>
        <button onClick={() => open("consult")} type="button" className="border border-white hover:border-blue-300 text-white hover:text-blue-200 font-semibold py-2 px-6 rounded-full transition duration-300 bg-transparent">
          Tư vấn miễn phí
        </button>
      </div>
    </div>
  );
};

export default PTECallToAction;
