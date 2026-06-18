from fastapi import APIRouter
from pydantic import BaseModel
from app.database import db

router = APIRouter()

applications_collection = db["applications"]


class UpdateStatus(BaseModel):
    email: str
    job_title: str
    company: str
    status: str


@router.put("/update-status")
def update_status(data: UpdateStatus):

    applications_collection.update_one(
        {
            "email": data.email,
            "job_title": data.job_title,
            "company": data.company
        },
        {
            "$set": {
                "status": data.status
            }
        }
    )

    return {
        "message": "Status Updated Successfully"
    }