import { ProcessingState } from '../types'

interface ProgressTrackerProps {
  processingState: ProcessingState
}

const steps = [
  { key: 'uploading', label: 'Uploading video' },
  { key: 'transcribing', label: 'Transcribing audio' },
  { key: 'highlighting', label: 'Finding highlights' },
  { key: 'generating', label: 'Generating shorts' },
  { key: 'completed', label: 'Completed' },
]

export default function ProgressTracker({ processingState }: ProgressTrackerProps) {
  return (
    <div className="progress-tracker">
      {steps.map((step, index) => {
        const completed = index < processingState.step || processingState.status === 'completed'
        const active = index === processingState.step && processingState.status !== 'completed'
        const hasError = processingState.status === 'error' && index === processingState.step

        return (
          <div key={step.key} className="tracker-step">
            <div className={`tracker-marker ${completed ? 'completed' : ''} ${active ? 'active' : ''} ${hasError ? 'error' : ''}`}>
              {completed ? '✓' : index + 1}
            </div>
            <div>
              <p className="tracker-title">{step.label}</p>
              {hasError && <p className="tracker-detail">{processingState.message}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
