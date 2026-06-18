from fastapi import APIRouter, Depends, UploadFile, File
from app.utils.auth_middleware import verify_token
from app.database import profile_collection

import shutil
import os

router = APIRouter()


# ================= GET PROFILE =================
@router.get("/profile")
def get_profile(email: str = Depends(verify_token)):

    user = profile_collection.find_one(
        {"email": email},
        {"_id": 0}
    )

    if user:
        return user

    return {
        "message": "Profile not found"
    }


# ================= SAVE PROFILE =================
@router.post("/save-profile")
def save_profile(
    profile: dict,
    email: str = Depends(verify_token)
):

    # Always use logged-in user's email
    profile["email"] = email

    profile_collection.update_one(
        {"email": email},
        {"$set": profile},
        upsert=True
    )

    return {
        "message": "Profile saved successfully"
    }


# ================= UPLOAD RESUME =================
@router.post("/upload-resume")
def upload_resume(
    file: UploadFile = File(...),
    email: str = Depends(verify_token)
):

    # Create folder if it does not exist
    os.makedirs("uploads/resumes", exist_ok=True)

    # Create unique filename
    filename = email.replace("@", "_") + "_" + file.filename

    # File path
    file_path = f"uploads/resumes/{filename}"

    # Save PDF
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Save path in MongoDB
    profile_collection.update_one(
        {"email": email},
        {
            "$set": {
                "resume": file_path
            }
        },
        upsert=True
    )

    return {
        "message": "Resume uploaded successfully",
        "resume": file_path
    }

# ================= UPLOAD PROFILE PHOTO =================

@router.post("/upload-photo")
def upload_photo(
    file: UploadFile = File(...),
    email: str = Depends(verify_token)
):

    os.makedirs("uploads/photos", exist_ok=True)

    filename = email.replace("@", "_") + "_" + file.filename

    file_path = f"uploads/photos/{filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    profile_collection.update_one(
        {"email": email},
        {
            "$set": {
                "profile_photo": file_path
            }
        },
        upsert=True
    )

    return {
        "message": "Photo uploaded successfully",
        "profile_photo": file_path
    }