import { Video } from './types'

// In-memory data store
export const videos: Video[] = []

// Helper functions
export const findVideoById = (id: string): Video | undefined => {
  return videos.find(video => video.id === id)
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}