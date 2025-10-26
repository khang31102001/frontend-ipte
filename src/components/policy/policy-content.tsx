"use client"

import TaskItem from "./task-item";

interface PolicyContentProps {
  data: {
    title: string
    description: string
    tasks: Array<{
      id: string
      title: string
      content: string
      status?: "pending" | "completed" | "in-progress"
    }>
  }
}

export default function PolicyContent({ data }: PolicyContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{data.title}</h1>
        <p className="text-muted-foreground">{data.description}</p>
      </div>

      <div className="space-y-4">
        {data.tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
