from app.services.video.cutter_service import generate_short

def create_shorts(video_path,highlights):
    print("TYPE:", type(highlights))
    print("DATA:", highlights)

    generated_files = []

    for index, highlight in enumerate(highlights):

        print("CURRENT:", highlight)
        print("TYPE:", type(highlight))

        output_file = f"short_{index + 1}.mp4"

        path = generate_short(
            video_path,
            highlight["start_seconds"],
            highlight["end_seconds"],
            output_file
        )

        generated_files.append(path)

    return generated_files
