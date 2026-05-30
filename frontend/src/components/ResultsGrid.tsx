import { ClipItem, ProcessingState } from '../types'

interface ResultsGridProps {
  clips: ClipItem[]
  processingState: ProcessingState
}

export default function ResultsGrid({ clips, processingState }: ResultsGridProps) {
  return (
    <section className="results-panel">
      <div className="section-header">
        <div>
          <p className="eyebrow">Generated shorts</p>
          <h2>Your latest clip collection</h2>
        </div>
        <p className="section-note">Once processing completes, your clips appear here for preview and download.</p>
      </div>

      {clips.length === 0 ? (
        <div className="empty-state">
          <p>
            {processingState.status === 'completed'
              ? 'No clips were returned. Please upload another video or check the video source.'
              : 'No shorts generated yet. Upload a video to begin the process.'}
          </p>
        </div>
      ) : (
        <div className="results-grid">
          {clips.map((clip) => (
            <article key={clip.id} className="clip-card">
              <div className="clip-thumbnail">
                {clip.thumbnailUrl ? (
                  <img src={clip.thumbnailUrl} alt={`Clip thumbnail ${clip.id}`} />
                ) : (
                  <div className="thumbnail-fallback">Preview unavailable</div>
                )}
              </div>

              <div className="clip-body">
                <div>
                  <p className="clip-title">Short clip</p>
                  <span className="clip-duration">{clip.duration}</span>
                </div>
                <div className="clip-actions">
                  <a className="secondary-button" href={clip.previewUrl || undefined} target="_blank" rel="noreferrer">
                    Preview
                  </a>
                  <a className="primary-button" href={clip.downloadUrl || '#'} download>
                    Download
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
