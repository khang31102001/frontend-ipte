"use client"

import { useState } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid3x3, List, Search, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Button from "../button/Button"
import Image from "next/image"

interface Course {
  id: string
  title: string
  description: string
  duration: string
  level: string
  image: string
}

const courses: Course[] = [
  {
    id: "1",
    title: "PTE Academic",
    description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
    duration: "4 Weeks",
    level: "Popular",
    image: "/classroom-study-session.png",
  },
  {
    id: "2",
    title: "PTE Academic",
    description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
    duration: "4 Weeks",
    level: "Popular",
    image: "/group-discussion-meeting.jpg",
  },
  {
    id: "3",
    title: "PTE Academic",
    description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
    duration: "4 Weeks",
    level: "Popular",
    image: "/student-studying-in-library.jpg",
  },
  {
    id: "4",
    title: "PTE Academic",
    description: "Khóa học chuyên sâu giúp học viên đạt mục tiêu 65 điểm PTE Academic",
    duration: "4 Weeks",
    level: "Popular",
    image: "/online-learning-laptop.jpg",
  },
]

export function CourseGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Trang chủ</span>
            <span>/</span>
            <span>Khóa học</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Khóa học</h2>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Newly published" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newly published</SelectItem>
              <SelectItem value="popular">Most popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex gap-2">
            <Button   
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Course Section */}
        <div className="space-y-12">
          {/* Featured Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-primary">Khóa học nổi bật</h3>
              <div className="flex gap-2">
                <Button className="rounded-full bg-transparent">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button className="rounded-full bg-transparent">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div
              className={
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"
              }
            >
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`bg-card text-card-foreground rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow ${
                    viewMode === "list" ? "flex flex-row" : "flex flex-col"
                  }`}
                >
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className={viewMode === "list" ? "w-48 h-full object-cover" : "w-full h-48 object-cover"}
                    width={400}
                    height={300}
                  />
                  <div className="flex flex-col flex-1">
                    {/* Card Header */}
                    <div className="p-6 flex-1">
                      <div className="flex gap-2 mb-2">
                        <div className="text-xs">
                          {course.duration}
                        </div>
                        <div  className="text-xs">
                          {course.level}
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold mb-2">{course.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
                    </div>
                    {/* Card Footer */}
                    <div className="p-6 pt-0">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full group">
                        Đăng ký ngay
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button  className="text-primary font-semibold group">
                Xem thêm
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Advanced Courses */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary">PTE Advanced 79+</h3>
                <p className="text-muted-foreground mt-1">Luyện chuyên sâu cho học viên muốn đạt điểm cao tuyệt đối.</p>
              </div>
              <div className="flex gap-2">
                <Button   className="rounded-full bg-transparent">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button  className="rounded-full bg-transparent">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div
              className={
                viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"
              }
            >
              {courses.map((course) => (
                <div
                  key={`advanced-${course.id}`}
                  className={`bg-card text-card-foreground rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow ${
                    viewMode === "list" ? "flex flex-row" : "flex flex-col"
                  }`}
                >
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className={viewMode === "list" ? "w-48 h-full object-cover" : "w-full h-48 object-cover"}
                    width={400}
                    height={300}
                  />
                  <div className="flex flex-col flex-1">
                    {/* Card Header */}
                    <div className="p-6 flex-1">
                      <div className="flex gap-2 mb-2">
                        <div  className="text-xs">
                          {course.duration}
                        </div>
                        <div className="text-xs bg-accent text-accent-foreground">
                          Advanced 79+
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold mb-2">PTE Academic 65+</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
                    </div>
                    {/* Card Footer */}
                    <div className="p-6 pt-0">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full group">
                        Đăng ký ngay
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button  className="text-primary font-semibold group">
                Xem thêm
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
