import { useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import { ProcessingState } from '../types'
import ProgressTracker from './ProgressTracker'

interface UploadPanelProps {
  onFileSelected: (file: File) => void
  processingState: ProcessingState
}

export default function UploadPanel({ onFileSelected, processingState }: UploadPanelProps) {
  const [dragActive, setDragActive] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFile = (file: File) => {
    setFileName(file.name)
    onFileSelected(file)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)
    if (event.dataTransfer.files?.[0]) {
      handleFile(event.dataTransfer.files[0])
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  return (
    <section className="card upload-panel">
      <div className="card-header">
        <div>
          <p className="eyebrow">Upload workflow</p>
          <h2>Upload a long video</h2>
        </div>
        <span className={`status-chip status-${processingState.status}`}>{processingState.status}</span>
      </div>

      {processingState.status === 'idle' || processingState.status === 'error' ? (
        <div className="upload-stage">
          <div
            className={dragActive ? 'dropzone active' : 'dropzone'}
            onDragEnter={(event) => {
              event.preventDefault()
              setDragActive(true)
            }}
            onDragLeave={(event) => {
              event.preventDefault()
              setDragActive(false)
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <p className="drop-label">Drag and drop a video file</p>
            <p className="drop-help">MP4, MOV, or WebM — up to 1.5 GB</p>
            <button type="button" className="primary-button" onClick={() => inputRef.current?.click()}>
              Choose file
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              className="visually-hidden"
              onChange={handleInputChange}
            />
          </div>

          {fileName && <p className="upload-file-name">Selected file: {fileName}</p>}

          {processingState.status === 'error' && (
            <div className="error-panel">
              <p>Something went wrong during processing.</p>
              <p className="error-message">{processingState.message}</p>
              <button type="button" className="secondary-button" onClick={() => setFileName(null)}>
                Try another video
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="upload-stage">
          <div className="upload-summary">
            <div>
              <p className="eyebrow">Processing status</p>
              <p className="summary-label">{fileName ?? 'Video uploaded'}</p>
            </div>
            <span className="summary-meta">{processingState.message}</span>
          </div>
          <ProgressTracker processingState={processingState} />
        </div>
      )}
    </section>
  )
}
