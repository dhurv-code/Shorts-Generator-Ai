import os
import shutil
from uuid import uuid4

UPLOAD_DIR = "uploads"

def save_video(file):

    video_id = str(uuid4())

    filename = f"{video_id}_{file.filename}"

    filepath = os.path.join(
        UPLOAD_DIR,
        filename
    )

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    return {
        "video_id": video_id,
        "filepath": filepath
    }