from fastapi import APIRouter

from app.database import db
from app.database import job_collection
from app.database import profile_collection

applications_collection = db["applications"]

router = APIRouter()


@router.get("/recruiter-dashboard")
def recruiter_dashboard():

    total_jobs = job_collection.count_documents({})

    total_applications = applications_collection.count_documents({})

    applications = list(
        applications_collection.find(
            {},
            {
                "_id": 0
            }
        )
    )

    candidates = []

    for app in applications:

        profile = profile_collection.find_one(
            {
                "email": app["email"]
            },
            {
                "_id": 0
            }
        )

        candidates.append({

            "name":
            profile.get("name", "")
            if profile else "",

            "email":
            app["email"],

            "job_title":
            app["job_title"],

            "company":
            app["company"],

            "status":
            app.get(
                "status",
                "Applied"
            ),

            "resume":
            profile.get(
                "resume",
                ""
            ) if profile else "",

            "profile_photo":
            profile.get(
                "profile_photo",
                ""
            ) if profile else ""

        })

    return {

        "total_jobs":
        total_jobs,

        "total_applications":
        total_applications,

        "candidates":
        candidates

    }