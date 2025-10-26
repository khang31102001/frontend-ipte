"use client"

interface PolicyTabsProps {
  items: any[]
  activeTab:  number
  onTabChange: (tab:  number) => void
}


const  PolicyTabs =({ activeTab, onTabChange, items }: PolicyTabsProps)=> {
  
  return (
    <div className="flex gap-4 flex-wrap">
      {items.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex-grow px-6 py-4 
            rounded-tl-sm rounded-tr-sm
            text-xl md:text-2xl font-medium transition-all 
            ${
            activeTab === tab.id ? "bg-hero-gradient  text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default PolicyTabs
