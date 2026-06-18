from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from app.utils.auth_middleware import verify_token
from app.database import profile_collection

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image
)

from reportlab.lib.styles import getSampleStyleSheet

import os

router = APIRouter()

@router.get("/generate-resume")
def generate_resume(
    email: str = Depends(verify_token)
):

    profile = profile_collection.find_one(
        {"email": email}
    )

    if not profile:
        return {
            "message": "Profile not found"
        }

    os.makedirs(
        "generated_resumes",
        exist_ok=True
    )

    pdf_path = (
        f"generated_resumes/"
        f"{email.replace('@','_')}.pdf"
    )

    doc = SimpleDocTemplate(pdf_path)

    styles = getSampleStyleSheet()

    elements = []

    # PHOTO

    if (
        profile.get("profile_photo")
        and
        os.path.exists(
            profile["profile_photo"]
        )
    ):

        img = Image(
            profile["profile_photo"],
            width=120,
            height=120
        )

        elements.append(img)

    elements.append(
        Spacer(1,20)
    )

    # NAME

    elements.append(
        Paragraph(
            f"<b>{profile.get('name','')}</b>",
            styles["Title"]
        )
    )

    elements.append(
        Spacer(1,20)
    )

    # DETAILS

    elements.append(
        Paragraph(
            f"Email : {profile.get('email','')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"College : {profile.get('college','')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Experience : {profile.get('experience','')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"Skills : {profile.get('skills','')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"LinkedIn : {profile.get('linkedin','')}",
            styles["Normal"]
        )
    )

    elements.append(
        Paragraph(
            f"GitHub : {profile.get('github','')}",
            styles["Normal"]
        )
    )

    doc.build(elements)

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="Resume.pdf"
    )