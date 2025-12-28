import React from 'react'
import PopupWrapper from '../popup-wrapper'
import RegiterReceivedInfor from '@/components/form/register-received-infor'

import Portal from '@/components/ui/portal';
import ContactForm from '@/components/form/contact-form';
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
        <Portal>
            <PopupWrapper
                onClose={onClose}
                className={`popup-overlay  ${className} `}
            >
                <div
                    className="popup__panel"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="popup-title"
                >
                    <button className="popup__close" aria-label="Close" onClick={onClose} />
                    <div className="popup__content">
                        <ContactForm onSuccess={onClose} />
                    </div>
                </div>
            </PopupWrapper>
        </Portal>
    )
}

export default PopupRegistrationForm