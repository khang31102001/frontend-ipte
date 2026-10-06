// "use client"
import { useCallback, useEffect, useState } from "react";

type Options = {
    storageKey?: string;      // key lưu dấu
    cooldownDays?: number;    // sau bao ngày mới hiện lại
    delayMs?: number;         // trễ trước khi mở
};

export function useFirstVisitPopup({
    storageKey = "popup:firstShownAt",
    cooldownDays = 1 / 24,
    delayMs = 3000

}: Options = {}) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {

        //Lấy thời gian hiện tại (now) và quy đổi cooldownDays sang mili-giây.
        const now = Date.now();
        const cooldownMs = cooldownDays * 24 * 60 * 60 * 1000;
        try {

            //Lấy giá trị last (thời điểm popup được hiển thị gần nhất) từ localStorage.
            const last = Number(localStorage.getItem(storageKey) || 0);

            // Tính điều kiện shouldShow:
            // Nếu chưa từng hiển thị (!last)
            // Hoặc đã quá hạn cooldown (now - last > cooldownMs)
            // ⇒ Cho phép hiển thị popup.
            const shouldShow = !last || now - last > cooldownMs;
            if (shouldShow) {
                const t = setTimeout(() => setIsOpen(true), delayMs);
                return () => clearTimeout(t);
            }

        } catch {
            //Trong catch, nếu truy cập localStorage bị lỗi (VD: trình duyệt private mode), popup vẫn được mở.
            const t = setTimeout(() => setIsOpen(true), delayMs);
            return () => clearTimeout(t);
        }

    }, [storageKey, cooldownDays, delayMs]);

    const markShown = useCallback(() => {

        // Khi người dùng đóng hoặc gửi form, hàm này ghi lại thời điểm hiện tại vào localStorage.
        // Lần sau hook đọc giá trị này để biết rằng người dùng đã thấy popup rồi.
        try {
            localStorage.setItem(storageKey, String(Date.now()));
        } catch { }
    }, [storageKey]);

    const close = useCallback(() => {

        // Khi gọi close():
        // 1 Popup bị ẩn (isOpen = false)
        // 2 Ghi lại thời điểm đã hiển thị (markShown())
        setIsOpen(false);
        markShown();
    }, [markShown]);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);


    return { isOpen, open ,markShown, close }
}