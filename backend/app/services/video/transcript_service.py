from app.database.mongodb import transcripts_collection

def save_transcript(
    video_id,
    transcript
):

    transcripts_collection.insert_one(
        {
            "video_id": video_id,
            "transcript": transcript
        }
    )

def get_transcript(video_id):

    return transcripts_collection.find_one(
        {"video_id": video_id}
    )