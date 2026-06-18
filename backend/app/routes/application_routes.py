from fastapi import APIRouter, Depends
from pydantic import BaseModel
from datetime import datetime

from app.database import db
from app.utils.auth_middleware import verify_token

router = APIRouter()

applications_collection = db["applications"]


# ================= APPLY MODEL =================

class ApplyJob(BaseModel):
    job_title: str
    company: str


# ================= APPLY JOB =================

@router.post("/apply-job")
def apply_job(
    data: ApplyJob,
    email: str = Depends(verify_token)
):

    # Already applied check
    existing = applications_collection.find_one({
        "email": email,
        "job_title": data.job_title,
        "company": data.company
    })

    if existing:
        return {
            "message": "You have already applied for this job."
        }

    application = {
        "email": email,
        "job_title": data.job_title,
        "company": data.company,
        "status": "Applied",
        "applied_at": datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    }

    applications_collection.insert_one(application)

    return {
        "message": "Applied Successfully ✅"
    }


# ================= MY APPLICATIONS =================

@router.get("/my-applications")
def my_applications(
    email: str = Depends(verify_token)
):

    applications = list(
        applications_collection.find(
            {"email": email},
            {"_id": 0}
        )
    )

    applications.reverse()

    return applications


# ================= TOTAL APPLICATIONS =================

@router.get("/application-count")
def application_count(
    email: str = Depends(verify_token)
):

    total = applications_collection.count_documents(
        {"email": email}
    )

    return {
        "total": total
    }