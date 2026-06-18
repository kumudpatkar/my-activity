from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class CoverLetterRequest(BaseModel):
    name: str
    role: str
    company: str
    skills: str


@router.post("/generate-cover-letter")
def generate_cover_letter(data: CoverLetterRequest):

    cover_letter = f"""
Dear Hiring Manager,

I am excited to apply for the {data.role} position at {data.company}. 
With strong skills in {data.skills}, I believe I am a strong candidate for this role.

I have worked on multiple projects that enhanced my knowledge in these technologies and improved my problem-solving skills. 
I am confident that I can contribute effectively to your team.

Thank you for considering my application.

Sincerely,
{data.name}
"""

    return {
        "cover_letter": cover_letter
    }