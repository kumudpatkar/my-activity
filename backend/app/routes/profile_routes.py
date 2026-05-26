from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
import shutil

from app.database import profile_collection

router = APIRouter()


# ================= PROFILE MODEL =================
class Profile(BaseModel):
    email: str
    name: str
    skills: str
    college: str
    experience: str
    linkedin: str
    github: str
    resume: str
    profile_photo: str


# ================= SAVE PROFILE =================
@router.post("/save-profile")
def save_profile(profile: Profile):

    existing_user = profile_collection.find_one({
        "email": profile.email
    })

    profile_data = {
        "email": profile.email,
        "name": profile.name,
        "skills": profile.skills,
        "college": profile.college,
        "experience": profile.experience,
        "linkedin": profile.linkedin,
        "github": profile.github,
        "resume": profile.resume,
        "profile_photo": profile.profile_photo
    }

    # UPDATE EXISTING PROFILE
    if existing_user:

        profile_collection.update_one(
            {"email": profile.email},
            {"$set": profile_data}
        )

        return {
            "message": "Profile updated successfully 🚀"
        }

    # CREATE NEW PROFILE
    profile_collection.insert_one(profile_data)

    return {
        "message": "Profile saved successfully 🚀"
    }


# ================= GET PROFILE =================
@router.get("/get-profile/{email}")
def get_profile(email: str):

    user = profile_collection.find_one(
        {"email": email},
        {"_id": 0}
    )

    if user:
        return user

    return {
        "message": "Profile not found"
    }
# ================= RESUME UPLOAD =================
@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Resume uploaded successfully 🚀",
        "filename": file.filename,
        "path": file_path
    }