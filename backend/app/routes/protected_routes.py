from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

@router.get("/profile")
def profile(token: str = Depends(oauth2_scheme)):
    return {
        "message": "Profile access granted",
        "token_received": token
    }