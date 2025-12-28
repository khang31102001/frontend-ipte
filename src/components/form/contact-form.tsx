"use client"

import type React from "react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Shield, Star } from "lucide-react"
import { ConsultaionValidationErrors, isConsultaionValid, validateConsultation } from "@/validators/form-validation"
import { IConsultation } from "@/types/contact"
interface ContactFormProps {
    className?: string;
    onSuccess?: () => void;
    onSubmit? : (values: IConsultation) => void;
}
const ContactForm = ({
    className = "",
    onSubmit,
}: ContactFormProps) => {
    const [formData, setFormData] = useState<IConsultation>({
        name: "",
        phone: "",
        email: "",
        targetScore: "",
        message: "",
    });
    const [errors, setErrors] = useState<ConsultaionValidationErrors>({});

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if (!onSubmit) return;
        const validation = validateConsultation(formData);
        setErrors(validation);
        if (!isConsultaionValid(validation)) {
            return;
        }
         await onSubmit(formData);
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
            <form id="contact-form" onSubmit={handleSubmit} className="form__body" noValidate>
                <div className="field">
                    <label htmlFor="name" className="field__label">Họ và tên đầy đủ</label>
                    <input
                        id="name"
                        className="field__control"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                    {errors.name && (<p className="field__error">{errors.name}</p>)}
                </div>

                <div className="field">
                    <label htmlFor="phone" className="field__label">Số điện thoại</label>
                    <input
                        id="phone"
                        type="number"
                        className="field__control"
                        value={Number(formData?.phone)}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                    {errors.phone && (<p className="field__error">{errors.phone}</p>)}
                </div>

                <div className="field">
                    <label htmlFor="email" className="field__label">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        className="field__control"
                        value={formData?.email ?? ""}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                    {errors.email && ((
                        <p className="field__error">{errors.email}</p>
                    ))}
                </div>

                <div className="field slelect">
                    <label className="field__label">Điểm PTE mục tiêu</label>
                    <Select
                        value={formData?.targetScore ?? ""}
                        onValueChange={(v) => handleInputChange("targetScore", v)}
                    
                    >
                        <SelectTrigger className="field__control select-trigger">
                            <SelectValue placeholder="Chọn điểm mục tiêu" />
                        </SelectTrigger>
                        <SelectContent className="select__content">
                            <SelectItem value="50-59">50–59 (Competent)</SelectItem>
                            <SelectItem value="65-79">65–79 (Proficient)</SelectItem>
                            <SelectItem value="79+">79+ (Superior)</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.targetScore && (
                        <p className="field__error">{errors.targetScore}</p>
                    )}
                </div>

                <div className="field">
                    <label htmlFor="message" className="field__label">Nội dung</label>
                    <textarea
                        id="message"
                        className="field__control field__control--textarea"
                        value={formData?.message ?? ""}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                    />
                    {errors.message && (
                        <p className="field__error">{errors.message}</p>
                    )}
                </div>

                <button type="submit" className="btn btn--primary btn--block">
                    Gửi thông tin
                </button>
            </form>
        </div>

    )
}

export default ContactForm
