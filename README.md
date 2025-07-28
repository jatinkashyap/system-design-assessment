# YouTube Clone Frontend
This is the frontend for a YouTube clone application, built with React and Vite.It shows dummy mocked data. 

# Install dependencies
npm install

# Start development server
npm run dev

Server will be running at: **http://localhost:3000**

### **Technology Stack**
- **Framework**: React 18.2.0
- **Language**: TypeScript 5.2.2
- **Build Tool**: Vite 5.0.8
- **Styling**: CSS Modules
- **Icons**: React Icons 4.12.0

# Youtube clone Backend
Prototype for the backend server for a YouTube clone application, built with Node.js, Express, and TypeScript. Not connected to frontend.

# Install dependencies
npm install

# Start development server
npm run dev

Server will be running at: **http://localhost:8000**

### **Technology Stack**
- **Runtime**: Node.js 18+
- **Framework**: Express 4.18.2
- **Language**: TypeScript 5.3.2

## API Endpoints
- `GET /api/videos` - Get all videos (with search & pagination)
- `GET /api/videos/:id` - Get single video


---


## [Proposed-Solution-Diagram](Proposed-Solution-Diagram.png)

### Techincal Specification for Proposed Solution for Youtube clone.  

| Component | Technology Choice | Justification |
|-----------|------------------|---------------|
| **Frontend** | React 18 + TypeScript + Vite | Fast development, team familiarity, excellent tooling |
| **Backend** | Node.js + Express + TypeScript | Full-stack TypeScript, rapid development |
| **Database** | PostgreSQL | ACID compliance, excellent TypeScript integration |
| **Cache** | Redis | Session management, API caching |
| **File Storage** | AWS S3 + CloudFront CDN | Global distribution for Canada/Europe users |
| **Video Processing** | FFmpeg + AWS Lambda | Scalable video transcoding |
| **Deployment** | AWS ECS + RDS + ElastiCache | Proven stack for 20-50K DAU |


**Reasoning for choosing Tech Stack over the other**:
- **PostgreSQL over MongoDB**: Structured data relationships (users, videos, comments)
- **Express over Flask**: Team can use JavaScript/TypeScript across full stack
- **AWS over Google Cloud**: Better European data center coverage

## Below services would be required in the backend 

# Upload service: 
Handles uploading media from the frontend to the backend and then to AWS S3. Begins with simple file uploads, then progresses to large, chunked file uploads using S3's multipart upload capabilities. Client-side chunking is implemented for large videos. The frontend breaks a file into chunks, which are sent to the backend and then assembled by S3 via multipart upload. 

# Watch service: 
Provides the logic and endpoints to retrieve video data and stream or display videos to users. It is linked to a PostgreSQL database for metadata such as title, author, S3 URL, etc.

# Transcoder service:
After upload, videos are processed with FFmpeg for transcoding, supporting multiple resolutions (adaptive bitrate), with the workflow managed using Kafka as a message queue for loose coupling.

# Kafka as Pub/Sub:
Kafka is introduced as a pub/sub queue between services (e.g., upload and transcoder), preparing your project for scalable, asynchronous task processing.

# Authentication with OAuth: 
User authentication ensuring only authorized users can upload content.

## Below are the examples of some APIs which we can do in the proposed solution

### Register New User
Create a new user account.

```http
POST /auth/register
Content-Type: application/json

{
  "email": "john@example.com",
  "username": "johndoe",
  "password": "SecurePass123!",
  "displayName": "John Doe"
}
```

**Response:**
```json
{
  "user": {
    "id": "usr_123",
    "email": "john@example.com",
    "username": "johndoe",
    "displayName": "John Doe",
    "verified": false
  },
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  }
}
```

### Login User
Authenticate and get access tokens.

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:** Same as registration response.

### Get Current User Profile
Get details of the authenticated user.

```http
GET /auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "user": {
    "id": "usr_123",
    "email": "john@example.com",
    "username": "johndoe",
    "displayName": "John Doe",
    "verified": false,
    "subscriberCount": 45,
    "videoCount": 12,
    "totalViews": 15420
  }
}
```

### Get All Videos
Retrieve videos with search and filtering.

```http
GET /videos?search=meditation
```

**Query Parameters:**
- `search` - Search in title/description/channel

**Response:**
```json
{
  "videos": [
    {
      "id": "vid_456",
      "title": "Meditation ",
      "description": "Dharma Yog",
      "thumbnail": "",
      "duration": 1800,
      "views": 45230,
      "likes": 1250,
      "status": "ready",
      "createdAt": "2024-01-15T10:30:00Z",
    }
  ],
}
```

### Get Single Video
Get detailed information about a specific video.

```http
GET /videos/vid_456
```

**Response:**
```json
{
  "id": "vid_456",
    "title": "Meditation ",
    "description": "Dharma Yog",
    "thumbnail": "",
    "duration": 1800,
    "views": 45230,
    "likes": 1250,
    "status": "ready",
    "createdAt": "2024-01-15T10:30:00Z",
}
```

### Create New Video
Create a video entry (upload file separately).

```http
POST /videos
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
   "title": "Meditation ",
    "description": "Dharma Yog",
    "thumbnail": "",
    "duration": 1800,
}
```

**Response:**
```json
{
  "id": "vid_789",
   "title": "Meditation ",
    "description": "Dharma Yog",
    "thumbnail": "",
    "duration": 1800,
}
```

### Like/Unlike Video
Like or dislike a video.

```http
POST /videos/vid_456/like
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "type": "like"
}
```

**Response:**
```json
{
  "message": "Video liked successfully",
  "likes": 1251,
  "userLiked": true
}
```

---
### Upload Video File
Upload video content for processing.

```http
POST /upload/video
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data

file: [VIDEO_FILE]
videoId: vid_789
```

