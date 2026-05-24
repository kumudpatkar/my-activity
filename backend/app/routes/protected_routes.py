from fastapi import APIRouter, Depends
from app.utils.auth_middleware import verify_token

router = APIRouter()

@router.get("/profile")
def profile(user_email: str = Depends(verify_token)):
    return {
        "message": "Profile access granted",
        "logged_in_user": user_email
    }