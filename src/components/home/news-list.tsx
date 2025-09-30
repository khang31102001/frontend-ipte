

import { ChevronRight } from "lucide-react"
import Image from "next/image"
import NewsCard from "./card/news-card";

const NewList = () => {

  const Articles = [
      {
        id: 1,
        category: [
          {
            id: 1,
            name: "Hướng dẫn 60 giây"
          },
          { id: 2,
            name: "Mẹo"
          },

        ],
        img: "/images/news-1.png",
        title: "Hướng dẫn đầy đủ về khóa du học Úc",
        description:
          "Mọi thứ cần biết và chuẩn bị khi đi du học Úc: từ việc chọn trường, làm hồ sơ visa, đến cuộc sống và học tập tại Australia. Khám phá các chương trình học bổng hấp dẫn và cơ hội nghề nghiệp sau tốt nghiệp.",
      },
      {
        id: 2,
         category: [
          {
            id: 3,
            name: "Hướng dẫn"
          },
         

        ],
        img: "",
        title: "Kỹ năng học tập hiệu quả cho sinh viên",
        description:
          "Khám phá các phương pháp học tập thông minh, quản lý thời gian hiệu quả và kỹ thuật ghi nhớ giúp bạn đạt kết quả học tập tốt nhất trong môi trường đại học.",
      },
      {
        id: 3,
       category: [
          {
            id: 4,
            name: "Hướng dẫn"
          },
         

        ],
        title: "Chuẩn bị hồ sơ xin học bổng quốc tế",
        description:
          "Hướng dẫn chi tiết cách viết essay, chuẩn bị bảng điểm, thư giới thiệu và các tài liệu cần thiết để tăng cơ hội nhận học bổng du học toàn phần.",
      },
      {
        id: 4,
        category: [
          {
            id: 5,
            name: "Hướng dẫn"
          },
         
        ],
        img: "",
        title: "Lựa chọn ngành học phù hợp với xu hướng",
        description:
          "Phân tích các ngành học hot nhất hiện nay như AI, Data Science, Digital Marketing và cơ hội việc làm trong tương lai để đưa ra quyết định đúng đắn.",
      },
    ];
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-purple-600">Tin tức & Sự kiện</h1>
          <button className="flex items-center text-purple-600 hover:text-purple-700 font-medium">
            Xem thêm
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Article - Left Side */}
          <div className=" h-[700px] rounded-3xl shadow-lg p-6 overflow-hidden ">
            <NewsCard 
            data={Articles[0]} 
            enableImg={true} 
            heightImg="340"
            className="h-full"
            />
          </div>
            {/* Related Articles - Right Side */}
          <div className="max-h-[700px] flex flex-col gap-1 overflow-y-auto">
            {Articles.map((item, index)=>{
              return(
               <div key={index} className="mb-2">
                 <NewsCard  data={item} enableImg={false} />
               </div>
              )
            })}
          </div>

        
          
        </div>
      </div>
    </div>
  )
}

export default NewList