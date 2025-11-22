

import { Teacher } from '@/types/teacher';
import TeacherProfilesCard from './card/teacher-profiles-card';
import Link from 'next/link';

interface TeacherProfilesListProps {
    base_url?: string;
    data?: Teacher[];
}

const TeacherProfilesList = ({ 
    data,
    base_url = "/doi-ngu-giao-vien"
}: TeacherProfilesListProps) => {
    if (!data || data.length === 0) return null

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {data.map((item, index) => (
               <Link href={`${base_url}/${item.slug}`} key={index} className="block">
                    <TeacherProfilesCard
                        key={index}
                        data={item} 
                    />
               </Link>
            ))}
        </div>
    )
}

export default TeacherProfilesList;
