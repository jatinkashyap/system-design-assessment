import VideoCard from '../VideoCard/VideoCard'
import type { Video } from '../../types/video'
import styles from './VideoContainer.module.css'

interface VideoContainerProps {
  videos: Video[]
}

const VideoContainer = ({ videos }: VideoContainerProps) => {
  return (
    <div className={styles.VideoContainer}>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}

export default VideoContainer

