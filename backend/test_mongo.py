from fastapi import FastAPI
from mongo import get_database
from fastapi.concurrency import run_in_threadpool
from contextlib import asynccontextmanager

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