"use client";

import React, { useMemo } from "react";

type NameAvatarProps = {
    name?: string | null;
    size?: number; // px
    src?: string | null; // nếu có ảnh thì ưu tiên ảnh
    rounded?: boolean; // true = tròn
    className?: string;
};

function getInitials(name?: string | null) {
    const n = (name ?? "").trim();
    if (!n) return "?";

    // Bóc các từ, bỏ khoảng trắng thừa
    const parts = n.split(/\s+/).filter(Boolean);

    // Ưu tiên 1 ký tự (giống Google): lấy chữ cái đầu của từ đầu
    const first = parts[0]?.[0] ?? "?";

    // Nếu bạn muốn 2 ký tự (VD: "Minh Hanh" => "MH") thì uncomment:
    // const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    // return (first + last).toUpperCase();

    return first.toUpperCase();
}

function hashString(str: string) {
    // hash đơn giản để tạo màu ổn định theo tên
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function hslColorFromName(name: string) {
    const h = hashString(name) % 360;
    // Google-ish: màu dịu, không quá chói
    return `hsl(${h} 55% 45%)`;
}

export default function NameAvatar({
    name,
    size = 36,
    src,
    rounded = true,
    className = "",
}: NameAvatarProps) {
    const initials = useMemo(() => getInitials(name), [name]);

    const bg = useMemo(() => {
        const key = (name ?? initials ?? "").trim().toLowerCase();
        return key ? hslColorFromName(key) : "hsl(210 10% 60%)";
    }, [name, initials]);

    const style: React.CSSProperties = {
        width: size,
        height: size,
        borderRadius: rounded ? "9999px" : 10,
        backgroundColor: bg,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
        fontSize: Math.round(size * 0.42),
        userSelect: "none",
        flexShrink: 0,
        overflow: "hidden",
    };

    // Nếu có src thì render img (fallback sang initials nếu img lỗi)
    const [imgError, setImgError] = React.useState(false);

    if (src && !imgError) {
        return (
            <img
                src={src}
                alt={name ?? "Avatar"}
                width={size}
                height={size}
                onError={() => setImgError(true)}
                style={{
                    width: size,
                    height: size,
                    borderRadius: rounded ? "9999px" : 10,
                    objectFit: "cover",
                    display: "block",
                }}
                className={className}
            />
        );
    }

    return (
        <span style={style} className={className} aria-label={name ?? "Avatar"}>
            {initials}
        </span>
    );
}
