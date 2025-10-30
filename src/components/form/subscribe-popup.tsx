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

                <div className="field">
                    <label className="field__label" htmlFor="target-score">Target PTE Score</label>
                    {/* wrapper để đồng bộ style select lib */}
                    <div className="form-select">
                        <select
                            id="target-score"
                            value={formData.targetScore}
                            onChange={(e) => handleInputChange("targetScore", e.target.value)}
                            className="select"
                        >
                            <option value="">Choose target score</option>
                            <option value="50-59">50–59 (Competent)</option>
                            <option value="65-79">65–79 (Proficient)</option>
                            <option value="79+">79+ (Superior)</option>
                        </select>

                    </div>
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
