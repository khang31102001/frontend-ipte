export interface Tag {
    /** Mã định danh duy nhất của thẻ */
    id: number;
    
    /** Tên hiển thị của thẻ (ví dụ: "Mẹo phát âm") */
    name: string;
    
    /** Slug thân thiện với URL (ví dụ: "meo-phat-am"). CỰC KỲ QUAN TRỌNG cho SEO. */
    slug: string;
    
    /** (Tùy chọn) Số lượng bài viết sử dụng thẻ này */
    count?: number; 
}