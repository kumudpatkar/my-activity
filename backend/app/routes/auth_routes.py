from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.models.user_model import UserRegister
from app.database import db
from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()


# ================= REGISTER =================
@router.post("/register")
def register_user(user: UserRegister):

    # Check if user already exists
    existing_user = db.users.find_one({
        "email": user.email
    })

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    # Hash password
    hashed_password = hash_password(user.password)

    # Create new user object
    new_user = {
        "name": user.name,
        "email": str(user.email),
        "password": hashed_password,
        "role": user.role
    }

    # Insert into MongoDB
    db.users.insert_one(new_user)

    return {
        "message": "User Registered Successfully 🚀"
    }


# ================= LOGIN =================
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):

    # Find user by email
    user = db.users.find_one({
        "email": form_data.username
    })

    # User not found
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email"
        )

    # Verify password
    if not verify_password(
        form_data.password,
        user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    # Create JWT token
    access_token = create_access_token(
        data={
            "sub": user["email"],
            "role": user["role"]
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }