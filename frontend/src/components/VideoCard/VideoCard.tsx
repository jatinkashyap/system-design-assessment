import { MdVerified } from 'react-icons/md'
import type { Video } from '../../types/video'
import styles from './VideoCard.module.css'

interface VideoCardProps {
  video: Video
}

const VideoCard = ({ video }: VideoCardProps) => {


  const handleVideoClick = () => {
    console.log(`Clicked on video: ${video.title}`)
  }

  return (
    <div className={styles.videoCard} onClick={handleVideoClick}>
      <div className={styles.thumbnailContainer}>
        <img
          src={`https://picsum.photos/300/200?random=${Math.random()}`}
          alt={video.title}
          className={styles.thumbnail}
          crossOrigin="anonymous"
          loading="lazy"
        />
        <span className={styles.duration}>{video.duration}</span>
      </div>
      
      <div className={styles.videoInfo}>
        <div className={styles.channelAvatar}>
          <img
            src={video.channel.avatar}
            alt={video.channel.name}
            className={styles.avatar}
          />
        </div>
        
        <div className={styles.videoDetails}>
          <h3 className={styles.videoTitle} title={video.title}>
            {video.title}
          </h3>
          
          <div className={styles.channelInfo}>
            <span className={styles.channelName}>
              {video.channel.name}
            </span>
            {video.channel.verified && (
              <MdVerified className={styles.verifiedIcon} size={14} />
            )}
          </div>
          
          <div className={styles.videoMeta}>
            <span>{video.views} views</span>
            <span className={styles.separator}>•</span>
            <span>{video.uploadDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard