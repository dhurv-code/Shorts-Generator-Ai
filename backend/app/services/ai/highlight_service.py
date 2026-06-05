import os
import re
import json
import google.generativeai as genai

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")

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

Return ONLY valid JSON.

Use EXACTLY this schema:

[
  {{
    "start": 0,
    "end": 15,
    "reason": "Interesting insight"
  }}
]

Do not use:
- start_time
- end_time
- start_seconds
- end_seconds

Use ONLY:
- start
- end
- reason

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

    normalized = []

    for h in highlights:
        normalized.append({
            "start": float(h["start"]),
            "end": float(h["end"]),
            "reason": h.get("reason", "")
        })

    return normalized