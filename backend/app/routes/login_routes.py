from fastapi import APIRouter
from app.database import users_collection
from app.models.user_model import LoginData
from app.utils.jwt_handler import create_access_token

router = APIRouter()

@router.post("/login")
def login(data: LoginData):

    user = users_collection.find_one({
        "email": data.email
    })

    if not user:
        return {
            "message": "User not found ❌"
        }

    # SIMPLE PASSWORD CHECK
    if data.password != user["password"]:
        return {
            "message": "Wrong password ❌"
        }

    token = create_access_token({
        "sub": data.email
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "message": "Login successful ✅"
    }