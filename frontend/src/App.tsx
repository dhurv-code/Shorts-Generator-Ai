import { useMemo, useState } from 'react'
import './App.css'
import useClipForgeStore from './store/useClipForgeStore'
import Navigation from './components/Navigation'
import UploadPanel from './components/UploadPanel'
import ResultsGrid from './components/ResultsGrid'
import HistoryTable from './components/HistoryTable'
import SettingsPanel from './components/SettingsPanel'

const tabs = ['Dashboard', 'Results', 'History', 'Settings'] as const

type Tab = (typeof tabs)[number]

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Dashboard')
  const [processingState, history, clips, settings, videoId, startProcessing, updateSettings] = useClipForgeStore(
    (state) => [
      state.processingState,
      state.history,
      state.clips,
      state.settings,
      state.videoId,
      state.startProcessing,
      state.updateSettings,
    ],
  )

  const recentVideos = history.slice(0, 3)

  const dashboardContent = useMemo(
    () => (
      <>
        <section className="page-header">
          <div>
            <p className="eyebrow">ShortLabs Dashboard</p>
            <h1>Transform long footage into ready-to-share shorts.</h1>
            <p className="page-description">
              Upload a long video, then follow the progress tracker while ShortLabs
              transcribes, highlights, and generates polished short clips.
            </p>
          </div>
          <div className="hero-panel">
            <span>Current upload</span>
            <strong>{videoId ?? 'No active video'}</strong>
          </div>
        </section>

        <div className="dashboard-grid">
          <UploadPanel onFileSelected={startProcessing} processingState={processingState} />

          <section className="card history-preview">
            <div className="card-header">
              <div>
                <p className="eyebrow">Recent videos</p>
                <h2>Processing history</h2>
              </div>
              <button type="button" className="text-button" onClick={() => setActiveTab('History')}>
                View all
              </button>
            </div>

            {recentVideos.length === 0 ? (
              <div className="empty-state">
                <p>No videos have been processed yet. Upload a video to create your first set of shorts.</p>
              </div>
            ) : (
              <div className="history-preview-list">
                {recentVideos.map((item) => (
                  <article key={item.id} className="history-item">
                    <div>
                      <p className="history-name">{item.videoName}</p>
                      <span className="history-meta">{item.date}</span>
                    </div>
                    <div className="history-status-row">
                      <span className={`status-pill status-${item.status}`}>{item.status}</span>
                      <span className="history-clips">{item.clips} clips</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </>
    ),
    [history, processingState, setActiveTab, startProcessing, videoId],
  )

  return (
    <div className="app-shell">
      <Navigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <main className="app-main">
        {activeTab === 'Dashboard' && dashboardContent}
        {activeTab === 'Results' && <ResultsGrid clips={clips} processingState={processingState} />}
        {activeTab === 'History' && <HistoryTable history={history} />}
        {activeTab === 'Settings' && <SettingsPanel settings={settings} setSettings={updateSettings} />}
      </main>
    </div>
  )
}

export default App
