from app.database.mongodb import shorts_collection

def save_generated_shorts(video_id, files):

    shorts_collection.insert_one({
        "video_id": video_id,
        "files": files
    })


def get_generated_shorts(video_id):

    return shorts_collection.find_one(
        {"video_id": video_id}
    )