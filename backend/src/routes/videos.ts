import { Router, Request, Response } from 'express'
import { videos, findVideoById } from '../data'

const router = Router()

// Get all videos
router.get('/', (req: Request, res: Response) => {
  try {
    const { search, page = 1, limit = 20 } = req.query
    
    let filteredVideos = [...videos]

    // Basic search functionality
    if (search) {
      const searchTerm = (search as string).toLowerCase()
      filteredVideos = videos.filter(video => 
        video.title.toLowerCase().includes(searchTerm) ||
        video.channel.name.toLowerCase().includes(searchTerm)
      )
    }

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit)
    const endIndex = startIndex + Number(limit)
    const paginatedVideos = filteredVideos.slice(startIndex, endIndex)

    res.json({
      videos: paginatedVideos,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: filteredVideos.length,
        pages: Math.ceil(filteredVideos.length / Number(limit))
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' })
  }
})

// Get single video
router.get('/:id', (req: Request, res: Response) => {
  try {
    const video = findVideoById(req.params.id)
    if (!video) {
      return res.status(404).json({ error: 'Video not found' })
    }
    res.json(video)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch video' })
  }
})

export { router as videoRoutes }