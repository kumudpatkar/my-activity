from fastapi import APIRouter, UploadFile, File
import fitz

router = APIRouter()


@router.post("/resume-analyzer")
async def resume_analyzer(
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

    score = 100

    suggestions = []

    keywords = [
        "python",
        "java",
        "sql",
        "machine learning",
        "react",
        "node",
        "api",
        "mongodb"
    ]

    found = 0

    for skill in keywords:

        if skill.lower() in text.lower():
            found += 1

    score = int((found / len(keywords)) * 100)

    if "github" not in text.lower():
        suggestions.append(
            "Add GitHub Profile"
        )

    if "linkedin" not in text.lower():
        suggestions.append(
            "Add LinkedIn Profile"
        )

    if "project" not in text.lower():
        suggestions.append(
            "Add Projects Section"
        )

    if "skill" not in text.lower():
        suggestions.append(
            "Add Skills Section"
        )

    if "internship" not in text.lower():
        suggestions.append(
            "Add Internship Experience"
        )

    return {

        "resume_score": score,

        "found_skills": found,

        "total_skills": len(keywords),

        "suggestions": suggestions

    }