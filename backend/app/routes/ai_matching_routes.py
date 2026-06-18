

from fastapi import APIRouter

router = APIRouter()


@router.post("/match-job")
def match_job(data: dict):

    resume_skills = [
        "Python",
        "Java",
        "SQL",
        "MongoDB",
        "FastAPI",
        "React"
    ]

    job_skills = data.get("skills", [])

    matched = []
    missing = []

    for skill in job_skills:

        if skill.lower() in [
            x.lower() for x in resume_skills
        ]:
            matched.append(skill)

        else:
            missing.append(skill)

    score = 0

    if len(job_skills) > 0:
        score = int(
            len(matched) /
            len(job_skills) * 100
        )

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }