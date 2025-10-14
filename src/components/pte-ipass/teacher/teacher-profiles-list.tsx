
import { TeacherProfile } from '@/types/teacher'
import TeacherProfilesCard from './card/teacher-profiles-card';

interface TeacherProfilesListProps {
    data?: TeacherProfile[];
}

const TeacherProfilesList = ({ data }: TeacherProfilesListProps) => {
    if (!data || data.length === 0) return null

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {data.map((item, index) => (
                <TeacherProfilesCard
                    key={index}
                    data={item} 
                />
            ))}
        </div>
    )
}

export default TeacherProfilesList;
