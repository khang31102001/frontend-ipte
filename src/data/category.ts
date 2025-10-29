
/// level 0 là cha danh mục cấp 1
/// level 1 là con danh mục mục cấp 2
/// level 2 là con danh mục mục cấp 3

import { CategoryItem, CategoryType } from "@/types/category";

/// level 3 là con danh mục mục cấp 4
export const main_menu_categories: CategoryItem[] = [
    {
        id: 100,
        icon: 'i-mdi-book-open-variant',
        name: 'KHÓA HỌC',
        slug: 'khoa-hoc',
        parent_id: null,

        category_type: CategoryType.HEADER_MENU,
        children: [
            {
                id: 101,
                name: 'Luyện Thi IELTS Chuyên Sâu',
                slug: 'luyen-thi-ielts-chuyen-sau',
                parent_id: 100,
                category_type: CategoryType.COURSE,
                children: [
                    {
                        id: 103,
                        name: 'Luyện Thi IELTS Chuyên Sâu',
                        slug: 'luyen-thi-ielts-chuyen-sau',
                        parent_id: 101,
                        category_type: CategoryType.COURSE

                    },
                    {
                        id: 104,
                        name: 'Luyện Thi IELTS Chuyên Sâu',
                        slug: 'luyen-thi-ielts-chuyen-sau',
                        parent_id: 101,
                        category_type: CategoryType.COURSE

                    },
                ]
            },
            {
                id: 102,
                name: 'Luyện Thi IELTS Chuyên Sâu',
                slug: 'luyen-thi-ielts-chuyen-sau',
                parent_id: 100,
                category_type: CategoryType.COURSE

            },
        ],
        meta_title: 'Tất cả Khóa học Tiếng Anh & PTE',
        meta_description: 'Khám phá các khóa học PTE, IELTS, Giao tiếp chuyên nghiệp phù hợp với mọi cấp độ và mục tiêu của bạn.',
        h1_heading: 'Danh sách Khóa Học',
    },
    {
        id: 200,
        icon: 'i-mdi-pencil-box-multiple',
        name: 'KIẾN THỨC',
        slug: 'tai-lieu',
        parent_id: null,
        category_type: CategoryType.HEADER_MENU,
        children: [],
        meta_title: 'Thư viện Tài liệu ôn thi miễn phí',
        meta_description:
            'Tải về miễn phí bộ tài liệu ôn thi PTE, IELTS, Ebook ngữ pháp và từ vựng mới nhất.',
        h1_heading: 'Tài liệu học tập & Ôn thi',
    },
    {
        id: 300,
        icon: 'i-mdi-check-decagram',
        name: 'PTE iPASS',
        slug: 'pte-ipass',
        parent_id: null,

        category_type: CategoryType.HEADER_MENU,
        children: [],
        meta_title: 'PTE iPASS: Giải pháp ôn thi PTE toàn diện',
        meta_description:
            'Tìm hiểu về hệ thống ôn luyện PTE iPASS độc quyền, giúp bạn tối ưu hóa thời gian và đạt điểm cao.',
        h1_heading: 'Hệ thống Luyện thi PTE iPASS',
    },
    {
        id: 4,
        icon: 'i-mdi-account-group',
        name: 'HV REVIEW',
        slug: 'hoc-vien-review',
        parent_id: null,

        category_type: CategoryType.HEADER_MENU,
        children: [],
        meta_title: 'Review từ Học viên đã thành công',
        meta_description:
            'Xem đánh giá và chia sẻ kinh nghiệm ôn thi PTE, IELTS từ cộng đồng học viên của chúng tôi.',
        h1_heading: 'Review Học viên',
    },
    {
        id: 5,
        icon: 'i-mdi-plane-car',
        name: 'DU HỌC',
        slug: 'du-hoc',
        parent_id: null,

        category_type: CategoryType.HEADER_MENU,
        children: [],
        meta_title: 'Tư vấn Du học các nước (Úc, Canada,...) tốt nhất',
        meta_description:
            'Thông tin chi tiết về các chương trình du học, hồ sơ, và chi phí tại Úc, Canada, Mỹ.',
        h1_heading: 'Chương trình Du học',
    },
    {
        id: 6,
        icon: 'i-mdi-briefcase',
        name: 'ĐI LÀM & ĐỊNH CƯ',
        slug: 'di-lam-dinh-cu',
        parent_id: null,
        category_type: CategoryType.HEADER_MENU,
        children: [],
        meta_title: 'Thông tin Định cư & Cơ hội Việc làm quốc tế',
        meta_description:
            'Các tin tức và hướng dẫn về quy trình định cư, yêu cầu kỹ năng và cơ hội nghề nghiệp tại nước ngoài.',
        h1_heading: 'Hướng dẫn Định cư và Cơ hội Việc làm',
    },
    {
        id: 7,
        icon: 'i-mdi-school',
        name: 'PTE ĐẠI HỌC',
        slug: 'pte-dai-hoc',
        parent_id: null,
        category_type: CategoryType.HEADER_MENU,
        children: [],
        meta_title: 'PTE thay thế IELTS cho xét tuyển Đại học',
        meta_description:
            'Danh sách các trường đại học chấp nhận chứng chỉ PTE và các yêu cầu đầu vào mới nhất.',
        h1_heading: 'PTE và Tuyển sinh Đại học',
    },
    {
        id: 8,
        icon: 'i-mdi-gavel',
        name: 'CHÍNH SÁCH',
        slug: 'chinh-sach',
        parent_id: null,
        category_type: CategoryType.HEADER_MENU,
        children: [],
        meta_title: 'Chính sách Bảo mật và Hoàn học phí',
        meta_description:
            'Tham khảo các quy định về bảo mật thông tin, thanh toán và hoàn trả học phí của trung tâm.',
        h1_heading: 'Các Chính sách của Công ty',
        noindex: true, // Nên noindex các trang chính sách để tập trung SEO vào nội dung chính
    },
    {
        id: 9,
        icon: 'i-mdi-newspaper',
        name: 'TIN TỨC',
        slug: 'tin-tuc',
        parent_id: null,
        category_type: CategoryType.HEADER_MENU,
        children: [],
        meta_title: 'Tin tức mới nhất về Giáo dục & Du học',
        meta_description:
            'Cập nhật các tin tức, sự kiện và mẹo học tập tiếng Anh, PTE hàng ngày.',
        h1_heading: 'Tin tức và Blog',
    },
    {
        id: 10,
        icon: 'i-mdi-phone-in-talk',
        name: 'LIÊN HỆ',
        slug: 'lien-he',
        parent_id: null,
        category_type: CategoryType.HEADER_MENU,
        children: [],
        meta_title: 'Liên hệ Tư vấn và Hỗ trợ',
        meta_description:
            'Thông tin liên hệ, địa chỉ trung tâm và form đăng ký tư vấn miễn phí.',
        h1_heading: 'Liên hệ với chúng tôi',
        noindex: true,
    },
]
