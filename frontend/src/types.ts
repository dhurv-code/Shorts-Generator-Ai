export type ProcessStatus = 'idle' | 'uploading' | 'transcribing' | 'highlighting' | 'generating' | 'completed' | 'error'

export interface ProcessingState {
  step: number
  status: ProcessStatus
  message: string
}

export interface ClipItem {
  id: string
  thumbnailUrl: string
  duration: string
  previewUrl: string
  downloadUrl: string
}

export interface HistoryItem {
  id: string
  videoName: string
  date: string
  status: 'completed' | 'processing' | 'failed' | 'uploaded'
  clips: number
  error?: string
}

export interface SettingsState {
  geminiApiKey: string
  defaultClipsCount: number
  defaultClipLength: number
}
