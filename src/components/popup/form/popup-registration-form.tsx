import React from 'react'
import PopupWrapper from '../popup-wrapper'
import RegiterReceivedInfor from '@/components/form/register-received-infor'
interface PopupRegistrationFormProps {
    className?: string;
    isPopup?: boolean;
    onClose?: () => void
}
const PopupRegistrationForm = ({
    className = "bg-black/50",
    isPopup = false,
    onClose
}: PopupRegistrationFormProps) => {

    if (!isPopup) return null;

    return (
        <PopupWrapper
            onClose={onClose}
            className={`fixed inset-0 z-[9999] ${className} flex flex-col items-center justify-center p-6`}
        >
            <RegiterReceivedInfor onSuccess={onClose} />
        </PopupWrapper>
    )
}

export default PopupRegistrationForm