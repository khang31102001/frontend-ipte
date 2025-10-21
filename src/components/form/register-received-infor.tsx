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
interface RegiterReceivedInforProps{
    className?: string
    onSuccess?: ()=> void
}
const RegiterReceivedInfor = ({
    className = "",
    onSuccess 
}:RegiterReceivedInforProps) => {
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
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className=" w-full ">
            <div className="max-w-xl mx-auto px-4">
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

            </div>
        </div>
    )
}

export default RegiterReceivedInfor
