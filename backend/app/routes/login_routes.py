from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    email = form_data.username   # Swagger sends username → treat as email
    password = form_data.password

    # TEMP TEST (replace with DB check later)
    if email == "kumud@gmail.com" and password == "123456":
        return {
            "access_token": "test_jwt_token",
            "token_type": "bearer"
        }

    return {
        "error": "Invalid credentials"
    }