import { CategoryItem } from "@/types/category";

export const NavMenuData: CategoryItem[] = [
    {
        id: 1,
        name: 'PTE iPASS',
        url: '/pte-ipass/ve-pte-ipass',
        icon: '/images/bxs_up-arrow.jpg',
<<<<<<< HEAD
        category_type: "" ,
        children: [
            { id: 11, name: 'Về PTE iPASS', url: '/pte-ipass/ve-pte-ipass', category_type: "" },
            { id: 12, name: 'Đội Ngũ Giáo Viên', url: '/pte-ipass/doi-ngu-giao-vien', category_type: "" },
            { id: 13, name: 'Tin Tức', url: '/pte-ipass/tin-tuc-pte-ipass', category_type: "" },
=======
        category_type: "HEADER_MENU",
        children: [
            { id: 11, name: 'Về PTE iPASS', url: '/pte-ipass/ve-pte-ipass', category_type: "HEADER_MENU" },
            { id: 12, name: 'Đội Ngũ Giáo Viên', url: '/pte-ipass/doi-ngu-giao-vien', category_type: "HEADER_MENU" },
            { id: 13, name: 'Tin Tức', url: '/pte-ipass/tin-tuc-pte-ipass', category_type: "HEADER_MENU" },
>>>>>>> a77f5458682ae67dbe5574207ff3e496ce21907a
        ],
    },
    {
        id: 2,
        name: 'HV REVIEW',
        url: '/hoc-vien-review',
<<<<<<< HEAD
        category_type: "",
=======
        category_type: "HEADER_MENU",
>>>>>>> a77f5458682ae67dbe5574207ff3e496ce21907a
    },
    {
        id: 3,
        name: 'KHÓA HỌC',
        url: '/khoa-hoc',
        icon: '/images/bxs_up-arrow.jpg',
<<<<<<< HEAD
        category_type:"",
        children: [
            { id: 31, name: 'PTE Cơ bản', url: '/khoa-hoc/pte-co-ban', category_type:"" },
            { id: 32, name: 'PTE Nâng cao', url: '/khoa-hoc/pte-nang-cao', category_type:"" },
=======
        category_type: "HEADER_MENU",
        children: [
            { id: 31, name: 'PTE Cơ bản', url: '/khoa-hoc/pte-co-ban', category_type: "HEADER_MENU" },
            { id: 32, name: 'PTE Nâng cao', url: '/khoa-hoc/pte-nang-cao', category_type: "HEADER_MENU" },
>>>>>>> a77f5458682ae67dbe5574207ff3e496ce21907a
            {
                id: 33,
                name: 'PTE iPASS',
                url: '/khoa-hoc/pte-ipass',
                children: [
<<<<<<< HEAD
                    { id: 301, name: 'Khóa Học PTE 30', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-30', category_type:"" },
                    { id: 302, name: 'Khóa Học PTE 36', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-36', category_type:"" },
                    { id: 303, name: 'Khóa Học PTE 42', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-42', category_type:"" },
                    { id: 304, name: 'Khóa Học PTE 50', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-50', category_type:"" },
                    { id: 305, name: 'Khóa Học PTE 58', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-38', category_type:"" },
                ],
                category_type:""
=======
                    { id: 301, name: 'Khóa Học PTE 30', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-30', category_type: "HEADER_MENU" },
                    { id: 302, name: 'Khóa Học PTE 36', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-36', category_type: "HEADER_MENU" },
                    { id: 303, name: 'Khóa Học PTE 42', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-42', category_type: "HEADER_MENU" },
                    { id: 304, name: 'Khóa Học PTE 50', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-50', category_type: "HEADER_MENU" },
                    { id: 305, name: 'Khóa Học PTE 58', url: '/khoa-hoc/pte-ipass/khoa-hoc-pte-38', category_type: "HEADER_MENU" },
                ],
                category_type: "HEADER_MENU"
>>>>>>> a77f5458682ae67dbe5574207ff3e496ce21907a
            },
        ],
    },
    {
        id: 4,
        name: 'KIẾN THỨC',
        url: '/kien-thuc',
        icon: '/images/bxs_up-arrow.jpg',
<<<<<<< HEAD
        category_type:"",
        children: [
            { id: 41, name: 'Reading', url: '/tai-lieu/reading', category_type:"" },
            { id: 42, name: 'Writing', url: '/tai-lieu/writing', category_type:"" },
=======
        category_type: "HEADER_MENU",
        children: [
            { id: 41, name: 'Reading', url: '/tai-lieu/reading', category_type: "HEADER_MENU" },
            { id: 42, name: 'Writing', url: '/tai-lieu/writing', category_type: "HEADER_MENU" },
>>>>>>> a77f5458682ae67dbe5574207ff3e496ce21907a
        ],
    },
    {
        id: 5,
        name: 'CHÍNH SÁCH',
        url: '/chinh-sach',
<<<<<<< HEAD
        category_type:"",
=======
        category_type: "HEADER_MENU",
>>>>>>> a77f5458682ae67dbe5574207ff3e496ce21907a
    },
    {
        id: 6,
        name: 'DU HỌC, ĐI LÀM & ĐỊNH CƯ',
        url: '/du-hoc-di-lam-dinh-cu',
        icon: '/images/bxs_up-arrow.jpg',
<<<<<<< HEAD
        category_type:"",
        children: [
            { id: 61, name: 'Du học Úc', url: '/du-hoc/uc', category_type:"" },
            { id: 62, name: 'Du học Canada', url: '/du-hoc/canada', category_type:"" },
            { id: 63, name: 'Định cư', url: '/dinh-cu', category_type:"" },
=======
        category_type: "HEADER_MENU",
        children: [
            { id: 61, name: 'Du học Úc', url: '/du-hoc/uc', category_type: "HEADER_MENU" },
            { id: 62, name: 'Du học Canada', url: '/du-hoc/canada', category_type: "HEADER_MENU" },
            { id: 63, name: 'Định cư', url: '/dinh-cu', category_type: "HEADER_MENU" },
>>>>>>> a77f5458682ae67dbe5574207ff3e496ce21907a
        ],
    },
    {
        id: 7,
        name: 'PTE ĐẠI HỌC',
        url: '/pte-dai-hoc',
        icon: '/images/bxs_up-arrow.jpg',
<<<<<<< HEAD
        category_type:"",
        children: [
            { id: 71, name: 'Trường đối tác', url: '/pte-dai-hoc/truong-doi-tac', category_type:"" },
            { id: 72, name: 'Thông tin tuyển sinh', url: '/pte-dai-hoc/tuyen-sinh', category_type:"" },
=======
        category_type: "HEADER_MENU",
        children: [
            { id: 71, name: 'Trường đối tác', url: '/pte-dai-hoc/truong-doi-tac', category_type: "HEADER_MENU" },
            { id: 72, name: 'Thông tin tuyển sinh', url: '/pte-dai-hoc/tuyen-sinh', category_type: "HEADER_MENU" },
>>>>>>> a77f5458682ae67dbe5574207ff3e496ce21907a
        ],
    },
    {
        id: 8,
        name: 'LIÊN HỆ',
        url: '/lien-he',
<<<<<<< HEAD
        category_type:"",
=======
        category_type: "HEADER_MENU",
>>>>>>> a77f5458682ae67dbe5574207ff3e496ce21907a
    },
];

