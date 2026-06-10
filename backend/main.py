from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api.video_routes import router

os.makedirs("outputs", exist_ok=True)

app = FastAPI(
    title="AI Shorts Generator"
)

app.include_router(router)

app.mount(
    "/outputs",
    StaticFiles(directory="outputs"),
    name="outputs"
)