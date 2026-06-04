from moviepy import VideoFileClip
import os

OUTPUT_DIR = "outputs"

def generate_short(video_path,start,end,output_name):
    clip = VideoFileClip(video_path)
    short_clip = clip.subclipped(start,end)

    output_path = os.path.join(
        OUTPUT_DIR,
        output_name
    )

    short_clip.write_videofile(
        output_path,
        codec="libx264",
        audio_codec="aac"
    )

    return output_path