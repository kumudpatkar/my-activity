from fastapi import APIRouter, UploadFile, File
from PyPDF2 import PdfReader
import io
import requests

from app.database import job_collection

router = APIRouter()


# =========================
# 1. ANALYZE RESUME
# =========================
@router.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):

    try:
        # READ PDF
        content = await file.read()
        pdf = PdfReader(io.BytesIO(content))

        text = ""

        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

        # CHECK EMPTY PDF
        if not text.strip():
            return {"error": "No text found in PDF"}

        # AI PROMPT
        prompt = f"""
You are an expert resume analyzer.

Analyze the resume and provide:

1. Skills
2. Strengths
3. Weaknesses
4. Suggested Jobs
5. Resume Score out of 100

Resume:
{text}
"""

        # OLLAMA API
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "phi3",
                "prompt": prompt,
                "stream": False
            }
        )

        response.raise_for_status()

        result = response.json()

        analysis = (
            result.get("response")
            or result.get("message", {}).get("content")
            or result.get("output")
        )

        if not analysis:
            return {
                "error": "AI did not return response",
                "debug": result
            }

        return {
            "status": "success",
            "analysis": analysis
        }

    except Exception as e:
        return {
            "error": str(e)
        }


# =========================
# 2. AI JOB MATCHING
# =========================
@router.post("/match-jobs")
async def match_jobs(file: UploadFile = File(...)):

    try:
        # READ PDF
        content = await file.read()
        pdf = PdfReader(io.BytesIO(content))

        text = ""

        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

        if not text.strip():
            return {"error": "No text found in PDF"}

        # GET JOBS
        jobs = list(job_collection.find({}, {"_id": 0}))

        # MATCH FUNCTION
        def match_score(resume_text, job_skills):

            if not job_skills:
                return 0

            resume_words = set(resume_text.lower().split())
            job_words = set(job_skills.lower().split())

            common = resume_words.intersection(job_words)

            score = (len(common) / len(job_words)) * 100

            return round(score, 2)

        # BUILD RESULTS
        results = []

        for job in jobs:

            score = match_score(
                text,
                job.get("skills", "")
            )

            results.append({
                "title": job.get("title"),
                "company": job.get("company"),
                "match_score": score,
                "skills_required": job.get("skills"),
                "reason": f"You match {score}% of required skills"
            })

        # SORT DESCENDING
        results = sorted(
            results,
            key=lambda x: x["match_score"],
            reverse=True
        )

        return {
            "top_matches": results[:5]
        }

    except Exception as e:
        return {
            "error": str(e)
        }