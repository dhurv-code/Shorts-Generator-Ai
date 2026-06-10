from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
from app.api.video_routes import router


os.makedirs("outputs", exist_ok=True)


app = FastAPI(
    title="AI Shorts Generator"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://shorts-generator-ai.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

app.mount(
    "/outputs",
    StaticFiles(directory="outputs"),
    name="outputs"
)