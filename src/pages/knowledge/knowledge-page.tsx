
import { ArticleGridSection } from '@/components/shared/article'
import { Article } from '@/data/daihoc'
import React from 'react'
import KnowledgeList from './knowledge-list'
interface KnowledgePageProps {
  data?: Article[]
}
const KnowledgePage = ({
  data
}: KnowledgePageProps) => {
  return (
    <div>
        <KnowledgeList data={data}/>
    </div>
  )
}

export default KnowledgePage