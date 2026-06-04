from app.database.mongodb import highlights_collection

def save_highlights(video_id, highlights):

    highlight_doc = {
        "video_id": video_id,
        "highlights": highlights
    }

    highlights_collection.insert_one(highlight_doc)
    return highlight_doc

def get_highlights(video_id):

    return highlights_collection.find_one(
        {"video_id": video_id}
    )