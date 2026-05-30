import { HistoryItem } from '../types'

interface HistoryTableProps {
  history: HistoryItem[]
}

export default function HistoryTable({ history }: HistoryTableProps) {
  return (
    <section className="history-panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Processing history</p>
          <h2>Track every upload</h2>
        </div>
        <p className="section-note">See when each project was processed, its current status, and how many clips were created.</p>
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <p>No history is available yet. Upload a video to see recent processing activity.</p>
        </div>
      ) : (
        <div className="history-table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Video name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Clips</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{item.videoName}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className={`status-pill status-${item.status}`}>{item.status}</span>
                  </td>
                  <td>{item.clips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
