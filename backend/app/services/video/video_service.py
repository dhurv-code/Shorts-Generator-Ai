from app.database.mongodb import videos_collection

def create_video_record(
        video_id,
        filename,
        filepath
):

    video = {
        "video_id": video_id,
        "filename": filename,
        "filepath": filepath,
        "status": "uploaded"
    }

    videos_collection.insert_one(video)

    return video

def get_video(video_id):
    return videos_collection.find_one({"video_id": video_id})