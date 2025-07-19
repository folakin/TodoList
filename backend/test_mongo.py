from fastapi import FastAPI
from fastapi.concurrency import run_in_threadpool
from contextlib import asynccontextmanager
import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client["subtask-Demo"]  # Uses default DB from URI

def get_database():
    return db


db = get_database()

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        result = await db.list_collection_names()
        print("✅ Connected to MongoDB!", {"Collection in result is ": result})
    except Exception as e:
        print("❌ Error connecting to MongoDB:", str(e))
    yield

app = FastAPI(lifespan=lifespan)