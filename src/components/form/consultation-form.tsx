"use client"
import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Shield, Star } from "lucide-react"
import ContactForm from "./contact-form"
import { IConsultation } from "@/types/contact"
import { useState } from "react"
import { usePopup } from "@/context/popup-context"
import { contactService } from "@/services/contact/contactService"


interface ConsultationFormPops {
  className?: string;
}


const ConsultationForm = ({
  className
}: ConsultationFormPops) => {

  const { showPopup } = usePopup();

  const handleSubmit = async (form: IConsultation) => {
    try {
      await contactService.createConsultation(form)
      showPopup(
        "Gửi thông tin thành công",
        "Chúng tôi đã nhận được yêu cầu và sẽ liên hệ bạn trong vòng 24 giờ.",
        "success",
      );
    } catch {
      showPopup(
        "Gửi thông tin thất bại",
        "Hiện hệ thống đang bận. Vui lòng thử lại sau hoặc liên hệ trực tiếp.",
        "error",
      );
    }


  }
  return (
    <div className={`section sm:section-sm lg:section-lg ${className}`}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Registration Form */}

          <ContactForm
            onSubmit={handleSubmit}
          />

          {/* Benefits & Guarantee Section */}
          <div className="h-full flex flex-col items-center justify-center gap-2">
            <div
              className="
            h-full bg-white rounded shadow-lg p-6
            flex flex-col items-center gap-8

            "
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-500" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">Sự đảm bảo của chúng tôi</h1>
                </div>
                <p className="text-gray-600 text-balance">
                  Chúng tôi tự tin vào phương pháp giảng dạy và chất lượng giáo dục của mình, đó là lý do tại sao PTE IPASS đảm bảo 100% học viên hoàn thành bài thi nếu không đạt được điểm mục tiêu.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Đảm bảo điểm số</h3>
                    <p className="text-gray-600 text-sm">
                      Đảm bảo đạt được điểm mục tiêu theo thỏa thuận hoặc được hoàn tiền 100%.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Thi lại miễn phí</h3>
                    <p className="text-gray-600 text-sm">Thi lại miễn phí cho đến khi đạt được điểm mục tiêu.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Hỗ trợ cá nhân</h3>
                    <p className="text-gray-600 text-sm">
                      Mỗi học viên sẽ được chỉ định một giảng viên riêng để theo dõi tiến độ và hỗ trợ kịp thời.
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <div className="h-auto bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 rounded">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/professional-woman-smiling.png" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">Sarah Mitchell</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm font-medium text-gray-700 ml-1">PTE 85</span>
                      </div>
                    </div>

                    <blockquote className="text-gray-700 text-sm italic">
                      &quot;I studied with <strong>PTE iPASS</strong> for 8 weeks and achieved <strong>PTE 85</strong>, surpassing my target.
                      The course roadmap was clear, the strategies were practical, and the teachers gave fast, detailed feedback on my
                      Speaking &amp; Writing. Mock tests and weekly progress checks helped me fix mistakes quickly. Highly recommended for
                      anyone aiming for a high score!&quot;
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default ConsultationForm
