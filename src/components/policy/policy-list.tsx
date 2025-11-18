"use client"
import PolicyTabs from '@/components/policy/policy-tabs'
import React, { useState } from 'react'
const tabs = [
  {
    id: 1,
    label: "Chính sách thanh toán",
    content: `
      <h2>1. Phương thức thanh toán</h2>
      <p>Chúng tôi hỗ trợ nhiều hình thức thanh toán bao gồm:</p>
      <ul>
        <li>Thanh toán qua chuyển khoản ngân hàng</li>
        <li>Thanh toán qua ví điện tử (Momo, ZaloPay, v.v.)</li>
        <li>Thanh toán bằng thẻ tín dụng/ghi nợ</li>
      </ul>
      <p>Sau khi hoàn tất thanh toán, hệ thống sẽ tự động kích hoạt khóa học trong vòng <strong>5 phút</strong>.</p>
    `,
  },
  {
    id: 2,
    label: "Chính sách bảo mật",
    content: `
      <h2>2. Bảo mật thông tin cá nhân</h2>
      <p>Chúng tôi cam kết bảo vệ thông tin cá nhân của học viên theo quy định pháp luật Việt Nam.</p>
      <p>Các thông tin cá nhân như họ tên, email, số điện thoại chỉ được sử dụng cho mục đích hỗ trợ học viên và không chia sẻ với bên thứ ba.</p>
    `,
  },
  {
    id: 3,
    label: "Điều khoản sử dụng",
    content: `
      <h2>3. Quy định về việc sử dụng dịch vụ</h2>
      <p>Khi tham gia khóa học, học viên đồng ý không sao chép, chia sẻ hoặc phát tán nội dung bài giảng dưới mọi hình thức.</p>
      <p>Mọi hành vi vi phạm bản quyền sẽ bị xử lý theo quy định của pháp luật.</p>
    `,
  },
  {
    id: 4,
    label: "Quy định học viên & khóa học",
    content: `
      <h2>4. Trách nhiệm của học viên</h2>
      <p>Học viên cần tham gia học đầy đủ, hoàn thành bài tập và tôn trọng giảng viên.</p>
      <p>Nếu có vấn đề phát sinh, vui lòng liên hệ bộ phận hỗ trợ để được giải quyết.</p>
    `,
  },
];

const PolicyList = () => {

const [activeTab, setActiveTab] = useState<number>(tabs[0].id);
const handleChangeTab =(tabId: number)=>{
  setActiveTab(tabId);
}
const activeTabItem  = tabs.find((item)=> item.id === activeTab);
  return (
    <section className="py-16">
        <div className="container mx-auto px-4">
          {/* tabs */}
        <div className="max-w-6xl mx-auto flex items-center justify-center mb-8 ">
          <PolicyTabs items={tabs} activeTab={activeTab} onTabChange={handleChangeTab}/>
        </div>
        {/* content */}
        <div className=''>
          <h1 className='text-2xl font-semibold text-primary h-12'>{activeTabItem?.label}</h1>
          <div className="prose max-w-none">
           {/* render content html */}
            <div dangerouslySetInnerHTML={{__html: activeTabItem?.content || ""}}/>
          </div>
        </div>
        </div>
    </section>
  )
}

export default PolicyList