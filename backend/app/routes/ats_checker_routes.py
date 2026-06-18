from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ATSRequest(BaseModel):
    resume_text: str
    job_role: str


@router.post("/ats-check")
def ats_check(data: ATSRequest):

    resume = data.resume_text.lower()
    role = data.job_role.lower()

    keywords = []

    if "python" in role:
        keywords = ["python", "django", "flask", "api", "sql"]

    elif "java" in role:
        keywords = ["java", "spring", "hibernate", "oop", "api"]

    elif "data" in role:
        keywords = ["python", "pandas", "numpy", "machine learning", "sql"]

    else:
        keywords = ["communication", "team", "problem solving"]

    matched = []
    missing = []

    for word in keywords:
        if word in resume:
            matched.append(word)
        else:
            missing.append(word)

    score = int((len(matched) / len(keywords)) * 100)

    return {
        "ats_score": score,
        "matched_keywords": matched,
        "missing_keywords": missing,
        "suggestion": "Add missing keywords to improve ATS score"
    }