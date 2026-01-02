import { Teacher } from '@/types/teacher'
import TeacherProfilesCard from './card/teacher-profiles-card'
import Link from 'next/link'
import { ROUTERS } from '../../config/routes/routers'

interface TeacherProfilesListProps {
    basePath?: string
    data: Teacher[] | []
}

const TeacherProfilesList = ({
    data = [],
}: TeacherProfilesListProps) => {
    if (!data || data.length === 0) return null

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {data.map((item, index) => {
                const href = ROUTERS.TEACHER.detail(item?.slug);
                return (
                    <TeacherProfilesCard key={index} href={href} data={item} />
                )
            })}
        </div>
    )
}

export default TeacherProfilesList
