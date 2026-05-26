from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.hash import bcrypt

from app.database import db
from app.auth_utils import create_access_token

router = APIRouter()

users_collection = db["users"]


class LoginData(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(data: LoginData):

    user = users_collection.find_one({
        "email": data.email
    })

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email"
        )

    if not bcrypt.verify(
        data.password,
        user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token({
        "sub": data.email
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "message": "Login successful 🚀"
    }