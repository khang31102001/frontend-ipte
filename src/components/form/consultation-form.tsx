"use client"

import type React from "react"

import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Shield, Star } from "lucide-react"
import { consultationService } from "@/services/consultation/consultation"

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    targetScore: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
    consultationService.register(formData).then((response) => {
      console.log("Consultation registered:", response)
    }).catch((error) => {
      console.error("Error registering consultation:", error)
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className=" bg-gradient-to-br from-amber-50 to-orange-100 py-16">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Registration Form */}
          <div className=" h-full flex flex-col gap-2 bg-white rounded shadow-lg p-6 md:p-8 ">
            <div className="space-y-6">
              <div className="text-2xl font-bold text-gray-900">Đăng Ký Tư Vấn Miễn Phí</div>
              <p className="text-gray-600 text-balance">
                Để lại thông tin của bạn, chúng tôi sẽ liên hệ trong vòng 24 giờ để tư
                vấn lộ trình học phù hợp nhất.
              </p>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-4 rounded bg-gray-50 border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-4 rounded bg-gray-50 border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="target-score">Target PTE Score</label>
                  <Select onValueChange={(value) => handleInputChange("targetScore", value)}>
                    <SelectTrigger className="px-4 py-4 rounded bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Choose target score" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50-59">50-59 (Competent)</SelectItem>
                      <SelectItem value="65-79">65-79 (Proficient)</SelectItem>
                      <SelectItem value="79+">79+ (Superior)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your learning goals and any specific requirements..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="w-full rounded bg-gray-50 border-gray-200 min-h-[100px] p-4"
                  />
                </div>

                <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3">
                  Send Information
                </button>
              </form>
            </div>
          </div>

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
                  <h1 className="text-2xl font-bold text-gray-900">Our Guarantee</h1>
                </div>
                <p className="text-gray-600 text-balance">
                  We are confident in our teaching methods and educational quality, which is why iPTE guarantees 100%
                  completion if students do not achieve their target score.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Score Guarantee</h3>
                    <p className="text-gray-600 text-sm">
                      Guaranteed to achieve target score according to agreement or get 100% refund.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Free Retake</h3>
                    <p className="text-gray-600 text-sm">Free retake until you achieve your target score.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Personalized Support</h3>
                    <p className="text-gray-600 text-sm">
                      Each student gets assigned a dedicated instructor to track progress and provide timely support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial */}
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
                      &quot;I studied PTE with iPTE for 2 months and achieved a score of 85, exceeding my initial target of
                      79. The teaching methods and dedicated support from iPTE were incredibly effective. I highly
                      recommend the teachers for their enthusiastic support!&quot;
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
