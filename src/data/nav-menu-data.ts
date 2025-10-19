import { CategoryType, CategoryItem } from "@/types/category";

export const NavMenuData: CategoryItem[] = [
    {
        id: 1,
        name: 'PTE iPASS',
        url: '/home',
        icon: '/images/bxs_up-arrow.jpg',
        category_type: CategoryType.HEADER_MENU,
        children: [
            { id: 11, name: 'Về PTE iPASS', url: '/pte-ipass/ve-pte-ipass', category_type: CategoryType.HEADER_MENU },
            { id: 12, name: 'Đội Ngũ Giáo Viên', url: '/pte-ipass/doi-ngu-giao-vien', category_type: CategoryType.HEADER_MENU },
            { id: 13, name: 'Tin Tức', url: '/pte-ipass/tin-tuc-pte-ipass', category_type: CategoryType.HEADER_MENU },
        ],
    },
    {
        id: 2,
        name: 'HV REVIEW',
        url: '/review',
        category_type: CategoryType.HEADER_MENU,
    },
    {
        id: 3,
        name: 'KHÓA HỌC',
        url: '#',
        icon: '/images/bxs_up-arrow.jpg',
        category_type: CategoryType.HEADER_MENU,
        children: [
            { id: 31, name: 'PTE Cơ bản', url: '/khoa-hoc/pte-co-ban', category_type: CategoryType.HEADER_MENU },
            { id: 32, name: 'PTE Nâng cao', url: '/khoa-hoc/pte-nang-cao', category_type: CategoryType.HEADER_MENU },
            {
                id: 33,
                name: 'PTE iPASS',
                url: '/khoa-hoc/pte-ipass',
                children: [
                    { id: 301, name: 'Khóa Học PTE 30', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-30', category_type: CategoryType.HEADER_MENU },
                    { id: 302, name: 'Khóa Học PTE 36', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-36', category_type: CategoryType.HEADER_MENU },
                    { id: 303, name: 'Khóa Học PTE 42', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-42', category_type: CategoryType.HEADER_MENU },
                    { id: 304, name: 'Khóa Học PTE 50', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-50', category_type: CategoryType.HEADER_MENU },
                    { id: 305, name: 'Khóa Học PTE 58', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-38', category_type: CategoryType.HEADER_MENU },
                ],
                category_type: CategoryType.HEADER_MENU
            },
        ],
    },
    {
        id: 4,
        name: 'KIẾN THỨC',
        url: '#',
        icon: '/images/bxs_up-arrow.jpg',
        category_type: CategoryType.HEADER_MENU,
        children: [
            { id: 41, name: 'Reading', url: '/tai-lieu/reading', category_type: CategoryType.HEADER_MENU },
            { id: 42, name: 'Writing', url: '/tai-lieu/writing', category_type: CategoryType.HEADER_MENU },
        ],
    },
    {
        id: 5,
        name: 'CHÍNH SÁCH',
        url: '/chinh-sach',
        category_type: CategoryType.HEADER_MENU,
    },
    {
        id: 6,
        name: 'DU HỌC, ĐI LÀM & ĐỊNH CƯ',
        url: '#',
        icon: '/images/bxs_up-arrow.jpg',
        category_type: CategoryType.HEADER_MENU,
        children: [
            { id: 61, name: 'Du học Úc', url: '/du-hoc/uc', category_type: CategoryType.HEADER_MENU },
            { id: 62, name: 'Du học Canada', url: '/du-hoc/canada', category_type: CategoryType.HEADER_MENU },
            { id: 63, name: 'Định cư', url: '/dinh-cu', category_type: CategoryType.HEADER_MENU },
        ],
    },
    {
        id: 7,
        name: 'PTE ĐẠI HỌC',
        url: '#',
        icon: '/images/bxs_up-arrow.jpg',
        category_type: CategoryType.HEADER_MENU,
        children: [
            { id: 71, name: 'Trường đối tác', url: '/pte-dai-hoc/truong-doi-tac', category_type: CategoryType.HEADER_MENU },
            { id: 72, name: 'Thông tin tuyển sinh', url: '/pte-dai-hoc/tuyen-sinh', category_type: CategoryType.HEADER_MENU },
        ],
    },
    {
        id: 8,
        name: 'LIÊN HỆ',
        url: '/lien-he',
        category_type: CategoryType.HEADER_MENU,
    },
];
