from fastapi import APIRouter, Depends

from app.database import profile_collection
from app.database import db
from app.utils.auth_middleware import verify_token

router = APIRouter()

applications_collection = db["applications"]


@router.get("/dashboard")
def dashboard(
    email: str = Depends(verify_token)
):

    profile = profile_collection.find_one(
        {"email": email}
    )

    application_count = applications_collection.count_documents(
        {
            "email": email
        }
    )

    dashboard_data = {

        "applications": application_count,

        "resume_uploaded":
        True if profile and profile.get("resume")
        else False,

        "recommended_jobs": 10

    }

    return dashboard_data