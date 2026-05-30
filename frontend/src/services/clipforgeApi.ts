import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
  },
})

export interface UploadResponse {
  video_id: string
}

export interface ShortsClipResponse {
  id: string
  thumbnail_url: string
  duration: string
  preview_url: string
  download_url: string
}

export interface ShortsResponse {
  clips: ShortsClipResponse[]
}

export async function uploadVideo(file: File) {
  const formData = new FormData()
  formData.append('video', file)
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
  const response = await api.post<ShortsResponse>(`/video/generate-shorts/${videoId}`, {
    clipCount,
    clipLength,
  })
  return response.data
}
