from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.database import users_collection
from app.utils.jwt_handler import create_access_token
from passlib.hash import bcrypt

router = APIRouter()


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):

    # Find user
    user = users_collection.find_one({
        "email": form_data.username
    })

    if not user:
        return {
            "message": "User not found ❌"
        }

    # Verify password
    if not bcrypt.verify(
        form_data.password,
        user["password"]
    ):
        return {
            "message": "Wrong password ❌"
        }

    # Create JWT
    token = create_access_token({
        "sub": user["email"]
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "message": "Login successful ✅"
    }