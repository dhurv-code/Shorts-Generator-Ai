from fastapi import FastAPI

from app.api.video_routes import router

app = FastAPI(
    title="AI Shorts Generator"
)

app.include_router(router)