"use client";

import type { PublicForm } from "@/features/public-api";
import LeadForm from "../../form/lead-form";
import Portal from "../../ui/portal";
import PopupWrapper from "../popup-wrapper";

interface PopupRegistrationFormProps {
  form: PublicForm;
  className?: string;
  isPopup?: boolean;
  onClose?: () => void;
}

const PopupRegistrationForm = ({ form, className = "bg-black/50", isPopup = false, onClose }: PopupRegistrationFormProps) => {
  if (!isPopup) return null;

  return (
    <Portal>
      <PopupWrapper onClose={onClose} className={`popup-overlay ${className}`}>
        <div className="popup__panel" role="dialog" aria-modal="true" aria-labelledby="popup-title">
          <div className="flex justify-end">
            <button className="popup__close" aria-label="Đóng" onClick={onClose} />
          </div>
          <div className="popup__content">
            <LeadForm form={form} onSuccess={onClose} />
          </div>
        </div>
      </PopupWrapper>
    </Portal>
  );
};

export default PopupRegistrationForm;
