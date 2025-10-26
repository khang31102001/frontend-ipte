import ArticleGridSection from '@/components/shared/article/article-grid-section'
import { Article } from '@/data/daihoc'
import React from 'react'
import StudyWorkList from './study-work-list';
interface StudyWorkImmigraionPageProps{
  data?: Article[];
}
const StudyWorkImmigraionPage = ({
  data
}:StudyWorkImmigraionPageProps) => {
  return (
    <div>
      <StudyWorkList data={data}/>
    </div>
  )
}

export default StudyWorkImmigraionPage