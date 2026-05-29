import subprocess

def extract_audio(video_path, audio_path):

    command = [
        "ffmpeg",
        "-i",
        video_path,
        "-vn",
        "-acodec",
        "mp3",
        audio_path,
        "-y"
    ]

    subprocess.run(command)