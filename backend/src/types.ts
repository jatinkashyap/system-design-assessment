export interface Video {
  id: string
  title: string
  thumbnail: string
  videoUrl?: string
  duration: string
  views: number
  uploadDate: string
  channel: {
    id: string
    name: string
    avatar: string
    verified: boolean
  }
}