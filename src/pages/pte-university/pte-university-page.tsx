import ArticleGridSection from '@/components/shared/article/article-grid-section'
import React from 'react'
import PTEuniversityList from './pte-university-list'
interface PTEUniversityPageProps {
  data: any[]
}
const PTEUniversityPage = ({
  data
}: PTEUniversityPageProps) => {
  return (
    <div>
       <PTEuniversityList data={data}/>
    </div>
  )
}

export default PTEUniversityPage