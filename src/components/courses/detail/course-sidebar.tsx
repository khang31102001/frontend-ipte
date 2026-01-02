"use client"
import { formatVND } from "@/utils/currency";
import { Phone, Download, Users, Calendar, DollarSign, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import { Link } from "react-router-dom";

interface CourseSidebarProps {
  Detailstitle: string | null
  level?: string | null;
  duration?: string | null;
  schedule?: string | null;
  tuition?: string | null;
  totalStudents?: number | null;
  hotline?: string | null;
  downloadLink?: string;
  openRegistration?: () => void;
  relatedCourses?: Array<{
    id: string;
    title: string;
    image?: string;
    level?: string;
  }> | null;
}

const CourseSidebar = ({
  Detailstitle,
  level,
  duration,
  schedule,
  tuition,
  totalStudents,
  hotline = "1900 636 648",
  downloadLink = "https://drive.google.com/file/d/1XMnIuFwNVua8YFGP7xawgrRYF_3AQZQx/view?usp=drive_link",
  relatedCourses,
  openRegistration

}: CourseSidebarProps) => {

  const isEmpty =
    !level &&
    !duration &&
    !schedule &&
    !tuition &&
    !totalStudents &&
    !hotline &&
    !downloadLink &&
    (!relatedCourses || relatedCourses.length === 0);


  if (isEmpty) return null;


  return (
    <aside className="space-y-6">
      {/* Course Info Card */}
      <div className="card-box pad-sm rounded-[0.4rem]">
        <div>
          <h1 className="text-lg">{Detailstitle}</h1>
        </div>
        <div className="space-y-4">
          {level && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Level
              </span>
              <span >{level}</span>
            </div>
          )}

          {duration && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Duration
              </span>
              <span className="text-sm font-medium">{duration}</span>
            </div>
          )}

          {schedule && (
            <div className="flex items-start justify-between">
              <span className="text-sm text-muted-foreground flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </span>
              <span className="text-sm font-medium text-right">{schedule}</span>
            </div>
          )}

          {tuition && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Tuition
              </span>
              <span className="text-sm font-medium">{formatVND(tuition)}</span>
            </div>
          )}

          {totalStudents && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Students
              </span>
              <span className="text-sm font-medium">{totalStudents}+</span>
            </div>
          )}

          {hotline && (
            <div className="pt-4 border-t border-gray-600">
              <button className=" btn w-full" >
                <a href={`tel:${hotline}`} className="w-full btn-link justify-center btn-sm 
              border border-gray-300 rounded  
              bg-transparent hover:bg-hero-gradient hover:text-white
              transition-colors duration-200 ease-out">
                  <Phone className="w-4 h-4 mr-2" />
                  {hotline}
                </a>
              </button>
            </div>
          )}
          <div className="hidden md:block w-full">
            <button
              type="button"
              onClick={openRegistration}
              className="w-full btn-link justify-center font-semibold btn-sm 
              border border-gray-300 rounded  
              bg-transparent hover:bg-hero-gradient hover:text-white
              transition-colors duration-200 ease-out" >

              Đăng ký tư vấn

            </button>
          </div>
        </div>
      </div>

      {/* Download Card */}
      {downloadLink && (
        <div className="card-box pad-sm rounded-[0.4rem]">
          <div className="card-title">
            <h1 className="text-lg">Tài nguyên</h1>
          </div>
          <div className="w-full pt-4 border-t border-gray-600 w">
            <button className="btn w-full" >
              <a href={downloadLink}
                className="w-full btn-link justify-center btn-sm 
              border border-gray-300 rounded  
              bg-transparent hover:bg-hero-gradient hover:text-white
              transition-colors duration-200 ease-out
              "
                download target="_blank" rel="noopener noreferrer"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PTE Sample
              </a>
            </button>
          </div>
        </div>
      )}

      {/* Related Courses */}
      {relatedCourses && relatedCourses.length > 0 && (
        <div className="card-box rounded-[0.4rem] pad-sm">
          <div className="card-title">
            <h1 className="text-lg">Các khóa học liên quan</h1>
          </div>
          <div className="card-content space-y-3">
            {relatedCourses.map((course) => (
              <Link
                key={course.id}
                href={`/pte/${course.id}`}
                className="block group"
              >
                <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted transition-colors">
                  {course.image ? (
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-bold">
                        PTE
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h4>
                    {course.level && (
                      <span className="mt-1 text-xs">
                        {course.level}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export default CourseSidebar
