import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Image from "next/image";

const Footer = () => {
    return (

        <footer className="bg-slate-700 text-white">
            {/* Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <div className="block  w-[120px] h-[60px] rounded overflow-hidden">
                           <Image
                            src="/images/logo/log-5.jpg"
                            alt="logo"
                            width={220}
                            height={240}
                            className='object-cover w-full h-full'
                            />
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Trung tâm luyện thi PTE hàng đầu Việt Nam với phương pháp đã được chứng minh qua hàng ngàn học viên
                            thành công.
                        </p>
                        {/* Social Media Icons */}
                        <div className="flex gap-3">
                            <Facebook className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
                            <Youtube className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
                            <Instagram className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
                            {/* <div className="w-5 h-5 bg-gray-300 hover:bg-white cursor-pointer rounded"></div>{" "} */}
                            {/* TikTok placeholder */}
                        </div>
                    </div>

                    {/* Current Branches */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Các chi nhánh hiện tại</h3>
                        <div className="space-y-3 text-sm text-gray-300">
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>50 Đường số 11, KDC Him Lam, Phường Tân Hưng, Quận 7, Tp.HCM</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>94A Đông Xoài, Phường 13, Quận Tân Bình, Tp.HCM</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>33 D. số 7, Cityland Center Hills, Phường 7, Quận Gò Vấp, Tp.HCM</span>
                            </div>
                        </div>
                    </div>

                    {/* Policies */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Chính sách</h3>
                        <div className="space-y-2 text-sm">
                            <a href="#" className="block text-gray-300 hover:text-white">
                                Chính sách thanh toán
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-white">
                                Chính sách bảo mật
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-white">
                                Điều khoản sử dụng
                            </a>
                            <a href="#" className="block text-gray-300 hover:text-white">
                                Quy định học viên và khóa học
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Liên hệ</h3>
                        <div className="space-y-3 text-sm text-gray-300">
                            <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>50 Đường số 11, KDC Him Lam, Phường Tân Hưng, Quận 7, Tp.HCM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <span>Hotline: 0902 386 332</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <span>info@pte.edu.vn</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 flex-shrink-0" />
                                <span>8:00 - 21:00 (Thứ 2 - Chủ nhật)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-600 mt-8 pt-6">
                    <p className="text-center text-sm text-gray-400">© 2023 IPTE. Tất cả quyền được bảo lưu.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;