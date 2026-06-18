from fastapi import APIRouter, Depends

from app.database import profile_collection
from app.database import job_collection
from app.utils.auth_middleware import verify_token

router = APIRouter()


@router.get("/recommend")
def recommend_jobs(
    email: str = Depends(verify_token)
):

    profile = profile_collection.find_one(
        {"email": email}
    )

    if not profile:
        return []

    user_skills = (
        profile.get("skills", "")
        .lower()
        .split(",")
    )

    jobs = list(job_collection.find())

    recommendations = []

    for job in jobs:

        job_skills = (
            job.get("skills", "")
            .lower()
            .split(",")
        )

        matched = len(
            set(
                map(str.strip, user_skills)
            ).intersection(
                set(
                    map(str.strip, job_skills)
                )
            )
        )

        if matched > 0:

            recommendations.append({
                "title": job["title"],
                "company": job["company"],
                "skills": job["skills"],
                "salary": job["salary"],
                "experience": job["experience"],
                "score": matched
            })

    recommendations.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return recommendations