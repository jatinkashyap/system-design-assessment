import { useState, useEffect } from 'react'
import Header from './components/Header'
import VideoContainer from './components/VideoContainer'
import type { Video } from './types/video'
import { generateMockVideos } from './utils/mockData'
import './App.css'

function App() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Faking the API call
    setTimeout(() => {
      setVideos(generateMockVideos())
      setLoading(false)
    }, 1200)
  }, [])

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading videos...</p>
          </div>
        ) : (
          <VideoContainer videos={videos} />
        )}
      </main>
    </div>
  )
}

export default App