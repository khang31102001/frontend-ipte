// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { Phone, Download, Users, Calendar, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";
// import { Link } from "react-router-dom";

interface CourseSidebarProps {
  level?: string;
  duration?: string;
  schedule?: string;
  tuition?: string;
  totalStudents?: number;
  hotline?: string;
  downloadLink?: string;
  relatedCourses?: Array<{
    id: string;
    title: string;
    image?: string;
    level?: string;
  }>;
}

const CourseSidebar = ({
  level = "79+",
  duration = "8 weeks",
  schedule = "Mon-Fri, 7:00 PM - 9:00 PM (GMT+8)",
  tuition = "7.000.000",
  totalStudents = 2500,
  hotline = "1900 636 648",
  downloadLink = "https://drive.google.com/file/d/1XMnIuFwNVua8YFGP7xawgrRYF_3AQZQx/view?usp=drive_link",
  relatedCourses,
}: CourseSidebarProps) => {
  return (
    <aside className="space-y-6">
      {/* Course Info Card */}
      <div className="card-box pad-sm rounded">
        <div>
          <h1 className="text-lg">PTE Course Info</h1>
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
              <span className="text-sm font-medium">{tuition}</span>
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
          <div className="w-full">
            <button className="w-full btn-link justify-center font-semibold btn-sm 
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
        <div className="card-box pad-sm rounded">
          <div className="card-title">
            <h1 className="text-lg">Resources</h1>
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
        <div className="card-box rounded pad-sm">
          <div className="card-title">
            <h1 className="text-lg">Related Courses</h1>
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
                    <img
                      src={course.image}
                      alt={course.title}
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
