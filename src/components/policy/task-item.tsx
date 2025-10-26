"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface TaskItemProps {
  task: {
    id: string
    title: string
    content: string
    status?: "pending" | "completed" | "in-progress"
  }
}

export default function TaskItem({ task }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const statusConfig = {
    pending: { icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-50" },
    "in-progress": { icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
    completed: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
  }

  const status = task.status || "pending"
  const { icon: StatusIcon, color, bg } = statusConfig[status]

  return (
    <div className={`border border-border rounded-lg overflow-hidden transition-all ${bg}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-opacity-75 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <StatusIcon className={`w-5 h-5 ${color}`} />
          <h3 className="font-semibold text-foreground">{task.title}</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 py-4 border-t border-border bg-background">
          <div
            className="prose prose-sm max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: task.content }}
          />
        </div>
      )}
    </div>
  )
}
