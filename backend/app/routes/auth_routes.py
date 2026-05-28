from fastapi import APIRouter
from pydantic import BaseModel
from app.database import users_collection
from passlib.hash import bcrypt

router = APIRouter()

class User(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(user: User):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if existing_user:
        return {
            "message": "User already exists"
        }

    hashed_password = bcrypt.hash(user.password)

    new_user = {
        "email": user.email,
        "password": hashed_password
    }

    users_collection.insert_one(new_user)

    return {
        "message": "User registered successfully"
    }