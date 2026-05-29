from faster_whisper import WhisperModel
from app.database.mongodb import transcripts_collection

model = WhisperModel(
    "base",
    device="cpu"
)

def transcribe_audio(audio_path):

    segments, _ = model.transcribe(
        audio_path
    )

    transcript = []

    for seg in segments:

        transcript.append({
            "start": seg.start,
            "end": seg.end,
            "text": seg.text
        })

    return transcript

def get_transcript(video_id):

    return transcripts_collection.find_one(
        {"video_id": video_id}
    )