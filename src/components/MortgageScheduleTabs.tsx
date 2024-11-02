interface MortgageScheduleTabsProps {
  numberOfYears: number
  setActiveTab: (vale: number|undefined) => void,
  activeTab: number | undefined
}

export default function MortgageScheduleTabs({
  numberOfYears,
  setActiveTab,
  activeTab
}: MortgageScheduleTabsProps) {

  const tabs = []
  for (let i = 1; i <= numberOfYears; i++) {
    tabs.push(<span className={activeTab === i ? "active year-tab" : "year-tab"} onClick={() => setActiveTab(i)} key={i}>Year {i}</span>)
  }
  return (
    <div className="year-tab-wrapper">
      {tabs.map(tab => tab)}
    </div>
  )
}