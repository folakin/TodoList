from fastapi import FastAPI
from fastapi.concurrency import run_in_threadpool
from fastapi import APIRouter, HTTPException, status ,Depends
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from passlib.context import CryptContext

# Password hasher
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()

# Signup input schema
class UserSignUp(BaseModel):
    username: str = Field(..., min_length=3)
    email: EmailStr
    password: str = Field(..., min_length=6)

# Fake DB for now — replace later with Mongo
users = []

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(user: UserSignUp):
    if any(u["email"] == user.email for u in users):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    users.append({
        "username": user.username,
        "email": user.email,
        "hashed_password": pwd_context.hash(user.password),
        "created_at": datetime.utcnow()
    })
    
    return {"message": "User created"}
