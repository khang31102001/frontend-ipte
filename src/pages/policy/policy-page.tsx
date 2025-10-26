import ConsultationForm from '@/components/form/consultation-form'
import TaskItem from '@/components/policy/task-item'
import React from 'react'
import PolicyList from './policy-list'

const PolicyPage = () => {
  return (
    <div>
      <PolicyList/>
      <ConsultationForm/>
    </div>
  )
}

export default PolicyPage