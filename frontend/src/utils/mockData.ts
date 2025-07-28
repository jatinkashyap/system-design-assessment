import type { Video } from '../types/video'

const SAMPLE_TITLES = [
  'Meditation and Sub-conscious mind',
  'USA vs China: The Future of Global Economy',
  'System Design Interview: How to Design YouTube',
  'Vention: The Future of Manufacturing',
  'Daily news',
]

const SAMPLE_CHANNELS = [
  { name: 'Udemy', verified: true },
  { name: 'India TV', verified: false },
  { name: 'Vention', verified: true },
]

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}


export function generateMockVideos(count: number = 10): Video[] {
  return Array.from({ length: count }, (_, index) => {
    const channel = getRandomElement(SAMPLE_CHANNELS)
    const channelId = channel.name.toLowerCase().replace(/\s+/g, '')
    
    return {
      id: `video_${index + 1}`,
      title: getRandomElement(SAMPLE_TITLES),
      duration: '8:50',
      views: 8000000,
      uploadDate: '3 weeks ago',
      channel: {
        id: channelId,
        name: channel.name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name)}&background=random&size=40`,
        verified: channel.verified
      }
    }
  })
}