export const homeSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "PTE iPASS – Trung tâm luyện thi PTE",
  url: "https://pteipass.com",
  logo: "https://pteipass.com/logo.png",
  description:
    "Khóa học PTE 1:1, nhóm nhỏ, đảm bảo đầu ra PTE 50-79+. Giáo viên bản ngữ – học online linh hoạt.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AU",
    addressRegion: "Northern Territory",
  },
  sameAs: [
    "https://www.facebook.com/eenglish24x7",
    "https://www.youtube.com/@pteipass",
    "https://www.tiktok.com/@pteipass",
  ],
  offers: {
    "@type": "OfferCatalog",
    name: "Các khóa học PTE",
    itemListElement: [
      {
        "@type": "Course",
        name: "PTE 1:1 – Đảm bảo đầu ra",
        description: "Học với giáo viên bản ngữ, lộ trình cá nhân hoá.",
      },
      {
        "@type": "Course",
        name: "PTE Nhóm nhỏ",
        description: "Lớp tối đa 4 học viên – hiệu quả cao.",
      },
      {
        "@type": "Course",
        name: "PTE Foundation (Mất gốc)",
        description: "Xây nền tảng tiếng Anh & kỹ năng PTE.",
      },
    ],
  },
};
