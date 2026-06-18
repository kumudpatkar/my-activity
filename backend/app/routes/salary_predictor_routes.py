from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class SalaryPrediction(BaseModel):
    role: str
    experience: int
    skills: str


@router.post("/predict-salary")
def predict_salary(data: SalaryPrediction):

    salary = 300000

    role = data.role.lower()
    skills = data.skills.lower()

    salary += data.experience * 100000

    if "python" in skills:
        salary += 100000

    if "java" in skills:
        salary += 100000

    if "machine learning" in skills:
        salary += 200000

    if "deep learning" in skills:
        salary += 200000

    if "aws" in skills:
        salary += 150000

    if "docker" in skills:
        salary += 100000

    if "ai" in role:
        salary += 200000

    if "data" in role:
        salary += 100000

    return {
        "role": data.role,
        "experience": data.experience,
        "estimated_salary": salary
    }