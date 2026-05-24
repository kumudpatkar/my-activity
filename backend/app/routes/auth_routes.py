from fastapi import APIRouter
from app.models.user_model import UserRegister
from app.database import db
from app.utils.security import hash_password

router = APIRouter()

@router.post("/register")
def register_user(user: UserRegister):

    existing_user = db.users.find_one({
        "email": user.email
    })

    if existing_user:
        return {
            "message": "User already exists"
        }

    hashed_password = hash_password(
        user.password
    )

    new_user = {
    "name": user.name,
    "email": str(user.email),
    "password": hashed_password,
    "role": user.role
}

    db.users.insert_one(new_user)

    return {
        "message": "User Registered Successfully 🚀"
    }