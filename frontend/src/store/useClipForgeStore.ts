import { create } from 'zustand'
import { ClipItem, HistoryItem, ProcessingState, SettingsState } from '../types'
import { generateHighlights, generateShorts, transcribeVideo, uploadVideo } from '../services/clipforgeApi'

interface ClipForgeState {
  videoId: string | null
  processingState: ProcessingState
  clips: ClipItem[]
  history: HistoryItem[]
  settings: SettingsState
  startProcessing: (file: File) => Promise<void>
  resetProcess: () => void
  updateSettings: (settings: SettingsState) => void
}

const initialState: ProcessingState = {
  step: 0,
  status: 'idle',
  message: 'Ready to upload',
}

function createHistoryItem(videoName: string): HistoryItem {
  return {
    id: `history-${Date.now()}`,
    videoName,
    date: new Date().toLocaleString(),
    status: 'processing',
    clips: 0,
  }
}

const normalizeClip = (clip: Partial<{ id: string; thumbnail_url: string; duration: string; preview_url: string; download_url: string }>): ClipItem => ({
  id: clip.id ?? `clip-${Math.random().toString(36).slice(2)}`,
  thumbnailUrl: clip.thumbnail_url ?? '',
  duration: clip.duration ?? '0:00',
  previewUrl: clip.preview_url ?? '',
  downloadUrl: clip.download_url ?? '',
})

const useClipForgeStore = create<ClipForgeState>((set, get) => ({
  videoId: null,
  processingState: initialState,
  clips: [],
  history: [],
  settings: {
    geminiApiKey: '',
    defaultClipsCount: 4,
    defaultClipLength: 15,
  },
  updateSettings: (settings) => set({ settings }),
  resetProcess: () =>
    set({
      videoId: null,
      clips: [],
      processingState: initialState,
    }),
  startProcessing: async (file) => {
    const historyItem = createHistoryItem(file.name)
    set({
      history: [historyItem, ...get().history],
      clips: [],
      processingState: {
        step: 0,
        status: 'uploading',
        message: 'Uploading video',
      },
    })

    try {
      const videoId = await uploadVideo(file)
      set({ videoId, processingState: { step: 1, status: 'transcribing', message: 'Transcribing audio' } })
      await transcribeVideo(videoId)
      set({ processingState: { step: 2, status: 'highlighting', message: 'Finding highlights' } })
      await generateHighlights(videoId)
      set({ processingState: { step: 3, status: 'generating', message: 'Generating shorts' } })
      const shorts = await generateShorts(videoId, get().settings.defaultClipsCount, get().settings.defaultClipLength)
      const clips = (shorts?.clips ?? []).map((clip) => normalizeClip(clip))
      set({ clips, processingState: { step: 4, status: 'completed', message: 'Completed' } })
      set({
        history: get().history.map((item) =>
          item.id === historyItem.id
            ? {
                ...item,
                status: 'completed',
                clips: clips.length,
                date: new Date().toLocaleString(),
              }
            : item,
        ),
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Processing failed'
      set({ processingState: { step: get().processingState.step, status: 'error', message } })
      set({
        history: get().history.map((item) =>
          item.id === historyItem.id
            ? {
                ...item,
                status: 'failed',
                error: message,
              }
            : item,
        ),
      })
    }
  },
}))

export default useClipForgeStore
