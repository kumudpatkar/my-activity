from fastapi import APIRouter, UploadFile, File
import fitz

router = APIRouter()


@router.post("/ats-score")
async def ats_score(
    file: UploadFile = File(...)
):

    pdf = await file.read()

    doc = fitz.open(
        stream=pdf,
        filetype="pdf"
    )

    text = ""

    for page in doc:
        text += page.get_text()

    text = text.lower()

    skills = [

        "python",
        "java",
        "fastapi",
        "mongodb",
        "react",
        "machine learning",
        "sql",
        "html",
        "css",
        "javascript"

    ]

    found = []

    missing = []

    score = 0

    for skill in skills:

        if skill in text:

            found.append(skill)

            score += 10

        else:

            missing.append(skill)

    if score > 100:
        score = 100

    return {

        "ats_score": score,

        "skills_found": found,

        "missing_skills": missing,

        "suggestion":
        "Add more missing skills to improve ATS score."

    }