from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from app.services.video.upload_service import save_video
from app.services.video.video_service import create_video_record
from app.utils.ffmpeg_utils import extract_audio
from app.services.ai.transcription_service import transcribe_audio
from app.services.video.transcript_service import save_transcript
from app.services.video.video_service import get_video
from app.services.ai.highlight_service import find_highlights
from app.services.video.transcript_service import get_transcript
from app.services.video.highlight_storage_service import save_highlights
from app.services.video.export_service import create_shorts
from app.services.video.short_storage_service import save_generated_shorts
from app.services.video.video_service import get_video
from app.services.video.highlight_storage_service import get_highlights

router = APIRouter(
    prefix="/video",
    tags=["Video"]
)

@router.post("/upload")
async def upload_video(
        file: UploadFile = File(...)
):

    result = save_video(file)

    create_video_record(
        result["video_id"],
        file.filename,
        result["filepath"]
    )

    return {
        "success": True,
        "video_id": result["video_id"]
    }

@router.post("/transcribe/{video_id}")
def transcribe(video_id: str):

    video = get_video(video_id)

    if not video:
        return {
            "error": "Video not found"
        }

    video_path = video["filepath"]

    audio_path = f"uploads/{video_id}.mp3"

    extract_audio(
        video_path,
        audio_path
    )

    transcript = transcribe_audio(
        audio_path
    )

    save_transcript(
        video_id,
        transcript
    )

    return {
        "success": True,
        "segments": len(transcript)
    }

@router.post("/highlights/{video_id}")
def generate_highlights(
        video_id: str
):

    transcript_doc = get_transcript(
        video_id
    )

    transcript = transcript_doc[
        "transcript"
    ]

    highlights = find_highlights(
        transcript
    )

    save_highlights(
        video_id,
        highlights
    )

    return highlights

@router.post("/generate-shorts/{video_id}")
def generate_shorts(video_id: str):

    video = get_video(video_id)

    if not video:
        return {"error": "Video not found"}

    highlight_doc = get_highlights(video_id)

    if not highlight_doc:
        return {"error": "Highlights not found"}

    generated_files = create_shorts(
        video["filepath"],
        highlight_doc["highlights"]["highlights"]
    )

    save_generated_shorts(
        video_id,
        generated_files
    )

    return {
        "success": True,
        "generated_files": generated_files
    }