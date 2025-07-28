export interface Video {
  id: string
  title: string
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