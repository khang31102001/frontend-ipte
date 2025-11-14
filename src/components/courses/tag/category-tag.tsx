interface CategoryTagProps {
  icon: string
  label: string
}

export function CategoryTag({ icon, label }: CategoryTagProps) {
  return (
    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-yellow-400 bg-transparent hover:bg-yellow-400/10 transition-colors">
      <span className="text-xl">{icon}</span>
      <span className="text-yellow-400 font-medium">{label}</span>
    </div>
  )
}
