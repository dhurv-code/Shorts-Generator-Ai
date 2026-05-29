from pymongo import MongoClient
from app.core.config import MONGO_URI

client = MongoClient(MONGO_URI)

db = client["ai_shorts_generator"]

videos_collection = db["videos"]
transcripts_collection = db["transcripts"]
shorts_collection = db["shorts"]
highlights_collection = db["highlights"]
shorts_collection = db["shorts"]