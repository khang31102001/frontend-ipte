import Link from 'next/link';

const  PTECallToAction = ()=> {
  return (
    <div className="bg-hero-gradient text-white py-16 text-center px-4">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Sẵn sàng chinh phục PTE Academic?
      </h2>
      <p className="mb-8 text-sm md:text-base max-w-2xl mx-auto">
        Đăng ký ngay hôm nay để nhận ưu đãi giảm 50% học phí và bắt đầu hành trình chinh phục điểm số PTE mơ ước cùng PTE Việt Nam!
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <Link href="/dang-ky">
          <div className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300">
            Đăng ký ngay
          </div>
        </Link>
        <Link href="/tu-van">
          <div className="border border-white hover:border-blue-300 text-white hover:text-blue-200 font-semibold py-2 px-6 rounded-full transition duration-300 bg-transparent">
            Tư vấn miễn phí
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PTECallToAction;
