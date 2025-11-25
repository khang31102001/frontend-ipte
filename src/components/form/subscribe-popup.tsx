"use client"

import type React from "react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Shield, Star } from "lucide-react"
interface SubscribePopupProps {
    className?: string
    onSuccess?: () => void
}
const SubscribePopup = ({
    className = "",
    onSuccess
}: SubscribePopupProps) => {
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
        <div className="form form--card">
            {/* tiêu đề */}
            <div className="form__header">
                <h2 id="popup-title" className="form__title">Đăng Ký Tư Vấn Miễn Phí</h2>
                <p className="form__subtitle">
                    Để lại thông tin của bạn, chúng tôi sẽ liên hệ trong vòng 24 giờ để tư vấn lộ trình học phù hợp nhất.
                </p>
            </div>

            {/* body */}
            <form onSubmit={handleSubmit} className="form__body">
                <div className="field">
                    <label htmlFor="name" className="field__label">Full Name</label>
                    <input id="name" className="field__control" />
                    {/* <p className="field__error">Error message...</p> */}
                </div>

                <div className="field">
                    <label htmlFor="phone" className="field__label">Phone Number</label>
                    <input id="phone" className="field__control" />
                </div>

                <div className="field">
                    <label htmlFor="email" className="field__label">Email</label>
                    <input id="email" type="email" className="field__control" />
                </div>

                <div className="field slelect">
                    <label className="field__label">Target PTE Score</label>
                    <Select
                        value={formData.targetScore}
                    >
                        <SelectTrigger className="field__control select-trigger">
                            <SelectValue placeholder="Choose target score" />
                        </SelectTrigger>
                        <SelectContent className="select__content">
                            <SelectItem value="50-59">50–59 (Competent)</SelectItem>
                            <SelectItem value="65-79">65–79 (Proficient)</SelectItem>
                            <SelectItem value="79+">79+ (Superior)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="field">
                    <label htmlFor="message" className="field__label">Message</label>
                    <textarea id="message" className="field__control field__control--textarea" />
                </div>

                <button type="submit" className="btn btn--primary btn--block">
                    Send Information
                </button>
            </form>
        </div>

    )
}

export default SubscribePopup
