import { CategoryItem } from './category'

export interface Course {
    courseId: number
    courseCode?: string | null
    courseName?: string
    slug: string
    title: string
    description: string

    level?: string
    mode?: 'ONLINE' | 'OFFLINE' | 'HYBRID'
    language?: string

    price?: string // "0", "149", etc
    tuition?: string // "2100000"

    duration?: string | null
    schedule?: string | null

    startDate?: string | null
    endDate?: string | null

    image?: string;

    createdAt?: string
    updatedAt?: string
    createdBy?: string | null
    updatedBy?: string | null
    version?: number

    categoryId: number
    category?: any | null

    isFeatured?: boolean
    isDisabled?: boolean

    content?: string | null

    metaTitle?: string | null
    metaDescription?: string | null

    audience?: string[] | null
    keywords?: string[] | null

    schemaEnabled?: boolean
    schemaMode?: 'auto' | 'manual' | null
    schemaData?: any | null

    benefits?: string | null
}

export interface CourseListResponse {
    items: Course[]
    page: number | null
    pageSize: number | null
    total: number | null
    totalPages: number | null
}
