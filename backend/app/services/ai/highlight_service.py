import os
import re
import json
import google.generativeai as genai

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def find_highlights(transcript):

    transcript_text = "\n".join(
        f"{x['start']} - {x['end']} : {x['text']}"
        for x in transcript
    )

    response = model.generate_content(
        f"""
Analyze this transcript.

Find the best 2 highlights.

Rules:
- 10-30 seconds
- Interesting
- Educational
- Surprising
- Emotional

Return ONLY JSON.

Transcript:

{transcript_text}
"""
    )

    cleaned = re.sub(
        r"```json|```",
        "",
        response.text
    ).strip()

    highlights = json.loads(cleaned)

    return highlights