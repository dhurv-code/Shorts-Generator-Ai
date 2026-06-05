from app.services.video.cutter_service import generate_short

def create_shorts(video_path,highlights):
    print("TYPE:", type(highlights))
    print("DATA:", highlights)

    generated_files = []

    for index, highlight in enumerate(highlights):

        output_file = f"short_{index + 1}.mp4"
        print("HIGHLIGHT OBJECT:")
        print(highlight)

        path = generate_short(
            video_path,
            highlight["start"],
            highlight["end"],
            output_file
        )

        generated_files.append(path)
        

    return generated_files


# from app.services.video.cutter_service import generate_short

# def create_shorts(video_path, highlights):

#     print("=" * 50)
#     print("ALL HIGHLIGHTS")
#     print(highlights)
#     print("=" * 50)

#     raise Exception("DEBUG STOP")