from fastapi import APIRouter
from pydantic import BaseModel

from app.database import users_collection

router = APIRouter()


# ================= USER MODEL =================
class User(BaseModel):
    email: str
    password: str


# ================= REGISTER ROUTE =================
@router.post("/register")
def register(user: User):

    # Check existing user
    existing_user = users_collection.find_one({
        "email": user.email
    })

    if existing_user:

        return {
            "message": "User already exists ❌"
        }

    # Save user
    user_data = {
        "email": user.email,
        "password": user.password
    }

    users_collection.insert_one(user_data)

    return {
        "message": "User registered successfully 🚀",
        "email": user.email
    }