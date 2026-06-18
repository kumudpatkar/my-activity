from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class SkillGap(BaseModel):
    role: str
    skills: str


@router.post("/skill-gap")
def skill_gap(data: SkillGap):

    role = data.role.lower()

    user_skills = [
        skill.strip().lower()
        for skill in data.skills.split(",")
    ]

    required = []

    if "ai" in role or "machine learning" in role:

        required = [
            "python",
            "sql",
            "machine learning",
            "deep learning",
            "tensorflow",
            "nlp",
            "docker",
            "aws"
        ]

    elif "python" in role:

        required = [
            "python",
            "fastapi",
            "sql",
            "mongodb",
            "git",
            "docker"
        ]

    elif "java" in role:

        required = [
            "java",
            "spring boot",
            "mysql",
            "git",
            "docker"
        ]

    elif "data analyst" in role:

        required = [
            "python",
            "sql",
            "excel",
            "power bi",
            "pandas",
            "statistics"
        ]

    else:

        required = [
            "communication",
            "problem solving",
            "teamwork"
        ]

    missing = []

    for skill in required:

        if skill not in user_skills:
            missing.append(skill)

    score = int(
        (
            (len(required) - len(missing))
            / len(required)
        ) * 100
    )

    return {

        "target_role": data.role,

        "your_skills": user_skills,

        "required_skills": required,

        "missing_skills": missing,

        "match_score": score

    }
