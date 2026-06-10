import axios, { AxiosInstance } from 'axios'

const API_BASE = (import.meta.env.VITE_API_BASE as string) ?? 'https://shorts-generator-ai.onrender.com'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: 'application/json',
  },
})

export interface UploadResponse {
  video_id: string
}

export interface GeneratedShortsResponse {
  success?: boolean
  generated_files?: string[]
}

function makeFileUrl(path: string) {
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return API_BASE ? `${API_BASE}/${normalized}` : `/${normalized}`
}

export async function uploadVideo(file: File) {
  const formData = new FormData()
  // Backend expects the form field name to be 'file'
  formData.append('file', file)
  const response = await api.post<UploadResponse>('/video/upload', formData)
  return response.data.video_id
}

export async function transcribeVideo(videoId: string) {
  await api.post(`/video/transcribe/${videoId}`)
}

export async function generateHighlights(videoId: string) {
  await api.post(`/video/highlights/${videoId}`)
}

export async function generateShorts(videoId: string, clipCount: number, clipLength: number) {
  const response = await api.post<GeneratedShortsResponse>(`/video/generate-shorts/${videoId}`, {
    clipCount,
    clipLength,
  })

  const files = response.data.generated_files ?? []

  // Map backend file paths to frontend-friendly clip objects
  const clips = files.map((p, i) => ({
    id: `clip-${i + 1}`,
    thumbnail_url: '',
    duration: '0:00',
    preview_url: makeFileUrl(p),
    download_url: makeFileUrl(p),
  }))

  return { clips }
}
