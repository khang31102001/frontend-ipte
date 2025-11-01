// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { Phone, Download, Users, Calendar, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";
// import { Link } from "react-router-dom";

interface ArticleSidebarProps {
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

export function AricleSidebar({
  level,
  duration,
  schedule,
  tuition,
  totalStudents,
  hotline,
  downloadLink,
  relatedCourses,
}: ArticleSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Course Info Card */}
      <div>
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
            <div className="pt-4 border-t">
              <button className="w-full" >
                <a href={`tel:${hotline}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  {hotline}
                </a>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Download Card */}
      {downloadLink && (
        <div>
          <div>
            <h1 className="text-lg">Resources</h1>
          </div>
          <div>
            <button  className="w-full" >
              <a href={downloadLink} download target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Download PTE Sample
              </a>
            </button>
          </div>
        </div>
      )}

      {/* Related Courses */}
      {relatedCourses && relatedCourses.length > 0 && (
        <div>
          <div>
            <h1 className="text-lg">Related Courses</h1>
          </div>
          <div className="space-y-3">
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
                      <span  className="mt-1 text-xs">
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
