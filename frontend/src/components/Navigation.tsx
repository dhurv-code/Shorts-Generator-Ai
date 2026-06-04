interface NavigationProps {
  tabs: readonly string[]
  activeTab: string
  onChange: (tab: string) => void
}

export default function Navigation({ tabs, activeTab, onChange }: NavigationProps) {
  return (
    <header className="topbar">
      <div className="brand-panel">
        <div className="brand-mark" />
        <div>
          <p className="brand-label">ShortLabs</p>
          <p className="brand-subtitle">AI Shorts Manager</p>
        </div>
      </div>

      <nav className="topnav" aria-label="Main navigation">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={tab === activeTab ? 'nav-link active' : 'nav-link'}
            onClick={() => onChange(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  )
}
