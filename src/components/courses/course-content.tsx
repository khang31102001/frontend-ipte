'use client'
import React, { useEffect, useRef, useState } from 'react'
interface CourseContentProps {
    data?: string
}
const CourseContent = ({ data }: CourseContentProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [showButton, setShowButton] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const LIMIT_HEIGHT_PX = 288;
    useEffect(() => {
        if(contentRef.current){
            //đo chiều cao hiện tại của content mà lớn 288px thì action something
            const actualHeight = contentRef.current.scrollHeight
            if(actualHeight > LIMIT_HEIGHT_PX ){
                setShowButton(true);
            }else{
                setShowButton(false)
            }

        }
    }, [data]);

    const handleExpand = ()=> {
        setIsExpanded(!isExpanded)
    }

    // Style cho div chứa nội dung
    const contentStyle: React.CSSProperties = {
        // Chiều cao sẽ là giới hạn (288px) hoặc 'auto' nếu đã mở rộng
        maxHeight: isExpanded ? 'none' : `${LIMIT_HEIGHT_PX}px`,
        overflow: 'hidden', // Luôn ẩn nội dung thừa, trừ khi mở rộng
        transition: 'max-height 0.3s ease-in-out', // Hiệu ứng chuyển động mượt mà
    };
    if (!data) return null;
    const contentHtml = { __html: data }
    return (
        <section className="py-16 mb-0ss mt-0 ">
            <div className="container mx-auto px-4">
                <div style={contentStyle} className={!isExpanded ? 'relative' : ''}>
                    {/* div này giúp đo chiều cao thực tế của nội dung, KHÔNG có giới hạn maxHeight */}
                    <div ref={contentRef}>
                        <div dangerouslySetInnerHTML={contentHtml} />
                    </div>

                    {/* Lớp che phủ mờ dần (gradient overlay) */}
                    {showButton && !isExpanded && (
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                    )}
                </div>
                <div className="flex justify-center items-center">
                  {showButton &&(
                      <button 
                      onClick={handleExpand}
                      className="text-primary font-semibold p-4 ">
                       {isExpanded ? "Thu gọn": "Xem thêm"}
                    </button>
                  )}
                </div>
            </div>
        </section>
    )
}

export default CourseContent