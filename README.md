# ShortLabs – AI Shorts Generator

Convert long-form videos into engaging short clips automatically using AI.

ClipForge is an AI-powered video processing platform that analyzes long videos, identifies highlight-worthy moments, and generates short clips ready for social media platforms such as YouTube Shorts, Instagram Reels, and TikTok.

---

## Overview

Creating short-form content manually is time-consuming.

ClipForge automates this process by:

1. Uploading a long video
2. Extracting audio
3. Transcribing speech using AI
4. Detecting engaging moments using LLMs
5. Generating short video clips automatically

The goal is to help creators, educators, podcasters, and businesses repurpose long-form content into shareable short videos.

---

## Features

### Video Upload

* Upload MP4, MOV, and WebM videos
* Store metadata in MongoDB Atlas
* Maintain processing history

### Speech Transcription

* Automatic speech-to-text conversion
* Timestamped transcripts
* Powered by Faster Whisper

### AI Highlight Detection

* Analyze transcript content
* Identify engaging moments
* Detect:

  * Educational insights
  * Strong opinions
  * Interesting facts
  * High-engagement segments

### Automated Short Generation

* Generate clips automatically
* Extract highlights using timestamps
* Export multiple short videos

### Dashboard

* Upload interface
* Processing workflow
* Generated shorts management
* History tracking

---

## Architecture

```text
                ┌──────────────┐
                │ Frontend UI  │
                │ React + Vite │
                └──────┬───────┘
                       │
                       ▼
              ┌─────────────────┐
              │ FastAPI Backend │
              └──────┬──────────┘
                     │
                     ▼
        ┌───────────────────────────┐
        │ Video Upload & Processing │
        └─────────────┬─────────────┘
                      │
                      ▼
               Audio Extraction
                      │
                      ▼
             Faster Whisper AI
                      │
                      ▼
                 Transcript
                      │
                      ▼
             Gemini Highlight AI
                      │
                      ▼
               Best Timestamps
                      │
                      ▼
             FFmpeg / MoviePy
                      │
                      ▼
              Generated Shorts
                      │
                      ▼
                MongoDB Atlas
```

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Axios
* Zustand

### Backend

* FastAPI
* Python

### AI Models

* Faster Whisper
* Gemini

### Video Processing

* FFmpeg
* MoviePy

### Database

* MongoDB Atlas

---

## Project Structure

```text
backend/
│
├── app/
│   ├── api/
│   │   └── video_routes.py
│   │
│   ├── database/
│   │   └── mongodb.py
│   │
│   ├── models/
│   │   ├── video_model.py
│   │   ├── short_model.py
│   │
│   ├── services/
│   │   ├── ai/
│   │   │   ├── transcription_service.py
│   │   │   └── highlight_service.py
│   │   │
│   │   └── video/
│   │       ├── upload_service.py
│   │       ├── cutter_service.py
│   │       ├── export_service.py
│   │       ├── transcript_service.py
│   │       └── highlight_storage_service.py
│   │
│   └── utils/
│       └── ffmpeg_utils.py
│
├── uploads/
├── outputs/
├── transcripts/
│
├── .env
├── main.py
└── requirements.txt
```

---

## API Workflow

### Upload Video

```http
POST /video/upload
```

Uploads a video and stores metadata.

---

### Generate Transcript

```http
POST /video/transcribe/{video_id}
```

Extracts audio and generates transcript.

---

### Detect Highlights

```http
POST /video/highlights/{video_id}
```

Analyzes transcript and returns highlight timestamps.

---

### Generate Shorts

```http
POST /video/generate-shorts/{video_id}
```

Creates short video clips automatically.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/clipforge.git

cd clipforge
```

---

### Create Virtual Environment

```bash
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

### Install FFmpeg

Verify installation:

```bash
ffmpeg -version
```

---

### Environment Variables

Create:

```env
MONGO_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key
```

---

## Running Backend

```bash
uvicorn main:app --reload
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Running Frontend

```bash
npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Future Improvements

* Auto subtitles
* Face tracking
* 9:16 vertical conversion
* Viral score prediction
* Batch processing
* User authentication
* Cloud storage integration
* Background task queue
* Multi-language transcription
* AI-generated captions

---

## Use Cases

### Content Creators

Convert podcasts into shorts.

### Educators

Create short educational clips from lectures.

### Businesses

Repurpose webinars into social media content.

### Podcasters

Generate highlight clips automatically.

---

## Author

Dhurv Gupta

B.Tech CSE (AI/ML)

Passionate about Artificial Intelligence, Automation, and Building AI Products.

---

## License

This project is licensed under the MIT License.
