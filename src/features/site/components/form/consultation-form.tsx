import { Check, Shield, Star } from "lucide-react";
import { orFallback, publicApi } from "@/features/public-api/server";
import { CONSULTATION_FORM_SLUG } from "../../config/forms";
import PageContent from "../../shared/page/page-content";
import { Section } from "../../shared/page/section";
import { Avatar, AvatarFallback } from "../ui/avatar";
import LeadForm from "./lead-form";

interface ConsultationFormProps {
  heading?: string;
  description?: string;
  formSlug?: string;
  className?: string;
}

const GUARANTEES = [
  { title: "Đảm bảo điểm số", text: "Đảm bảo đạt được điểm mục tiêu theo thỏa thuận hoặc được hoàn tiền 100%." },
  { title: "Thi lại miễn phí", text: "Thi lại miễn phí cho đến khi đạt được điểm mục tiêu." },
  { title: "Hỗ trợ cá nhân", text: "Mỗi học viên sẽ được chỉ định một giảng viên riêng để theo dõi tiến độ và hỗ trợ kịp thời." },
];

/** Khối tư vấn: biểu mẫu lead (từ `/public/forms/:slug`) + cam kết + một cảm nhận học viên nổi bật. */
const ConsultationForm = async ({ heading, description, formSlug = CONSULTATION_FORM_SLUG, className }: ConsultationFormProps) => {
  const [form, testimonials] = await Promise.all([
    orFallback(publicApi.form(formSlug), null),
    orFallback(publicApi.testimonials({ isFeatured: true, pageSize: 1 }), null),
  ]);
  if (!form) return null;
  const testimonial = testimonials?.items[0];

  return (
    <Section className={className} id="tu-van">
      <PageContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <LeadForm form={form} title={heading} subtitle={description} />

          <div className="h-full flex flex-col items-center justify-center gap-2">
            <div className="h-full bg-white rounded shadow-lg p-6 flex flex-col items-center gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Sự đảm bảo của chúng tôi</h2>
                </div>
                <p className="text-gray-600 text-balance">
                  Chúng tôi tự tin vào phương pháp giảng dạy và chất lượng giáo dục của mình, đó là lý do tại sao PTE iPASS cam kết hỗ trợ đến khi học viên đạt điểm mục tiêu.
                </p>
              </div>
              <div className="space-y-4">
                {GUARANTEES.map((g) => (
                  <div key={g.title} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{g.title}</h3>
                      <p className="text-gray-600 text-sm">{g.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {testimonial && (
              <div className="h-auto bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 rounded">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>{testimonial.studentName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{testimonial.studentName}</h4>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: testimonial.rating }, (_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-sm font-medium text-gray-700 ml-1">PTE {testimonial.scoreAfter}</span>
                        </div>
                      </div>
                      <blockquote className="text-gray-700 text-sm italic">&quot;{testimonial.quote}&quot;</blockquote>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageContent>
    </Section>
  );
};

export default ConsultationForm;
