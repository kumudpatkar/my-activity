from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.database import db
from app.utils.auth_middleware import verify_token

router = APIRouter()

saved_jobs_collection = db["saved_jobs"]


class SaveJob(BaseModel):
    job_title: str
    company: str


@router.post("/save-job")
def save_job(
    data: SaveJob,
    email: str = Depends(verify_token)
):

    existing = saved_jobs_collection.find_one(
        {
            "email": email,
            "job_title": data.job_title,
            "company": data.company
        }
    )

    if existing:
        return {
            "message": "Job already saved."
        }

    saved_jobs_collection.insert_one(
        {
            "email": email,
            "job_title": data.job_title,
            "company": data.company
        }
    )

    return {
        "message": "Job saved successfully"
    }


@router.get("/saved-jobs")
def get_saved_jobs(
    email: str = Depends(verify_token)
):

    jobs = list(
        saved_jobs_collection.find(
            {"email": email},
            {"_id": 0}
        )
    )

    return jobs


@router.delete("/remove-saved-job")
def remove_saved_job(
    data: SaveJob,
    email: str = Depends(verify_token)
):

    saved_jobs_collection.delete_one(
        {
            "email": email,
            "job_title": data.job_title,
            "company": data.company
        }
    )

    return {
        "message": "Saved job removed"
    }