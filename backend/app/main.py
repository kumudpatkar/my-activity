from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# ROUTES
from app.routes.auth_routes import router as auth_router
from app.routes.login_routes import router as login_router
from app.routes.protected_routes import router as protected_router
from app.routes.profile_routes import router as profile_router
from app.routes.job_routes import router as job_router
from app.routes.resume_routes import router as resume_router
from app.routes.application_routes import router as application_router
from app.routes.ai_routes import router as ai_router
from app.routes.ai_matching_routes import router as ai_matching_router

from app.routes.recommendation_routes import router as recommendation_router
from app.routes.admin_routes import router as admin_router
from app.routes.resume_builder_routes import router as resume_builder_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.saved_jobs_routes import router as saved_jobs_router
from app.routes.recruiter_routes import router as recruiter_router
from app.routes.interview_routes import router as interview_router
from app.routes.interview_evaluation_routes import router as interview_evaluation_router
from app.routes.ats_routes import router as ats_router
from app.routes.cover_letter_routes import router as cover_letter_router
from app.routes.skill_gap_routes import router as skill_gap_router
from app.routes.salary_predictor_routes import router as salary_predictor_router
from app.routes.resume_analyzer_routes import router as resume_analyzer_router
from app.routes.ats_checker_routes import router as ats_checker_router
from app.routes.career_roadmap_routes import router as career_roadmap_router
from app.routes.voice_interview_routes import router as voice_interview_router
from app.routes.ai_chat_routes import router as ai_chat_router

# DATABASE
from app.database import db

# CREATE FASTAPI APP
app = FastAPI(
    title="Smart Job Portal AI",
    version="1.0.0"
)

# SERVE UPLOADED FILES
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
app.include_router(auth_router, tags=["Auth"])
app.include_router(login_router, tags=["Login"])
app.include_router(protected_router, tags=["Protected"])
app.include_router(recommendation_router, tags=["Recommendations"])
app.include_router(
    profile_router,
    prefix="/api",
    tags=["Profile"]
)

app.include_router(
    job_router,
    prefix="/api",
    tags=["Jobs"]
)

app.include_router(
    resume_router,
    prefix="/api",
    tags=["Resume"]
)

app.include_router(
    ai_router,
    prefix="/api",
    tags=["AI"]
)

app.include_router(
    application_router,
    prefix="/api",
    tags=["Applications"]
)

app.include_router(
    ai_matching_router,
    prefix="/api",
    tags=["AI Matching"]
)

app.include_router(
    ai_chat_router,
    prefix="/api",
    tags=["Resume Builder"]
)

app.include_router(
    admin_router,
    prefix="/api",
    tags=["Admin"]
)

app.include_router(
    voice_interview_router,
    prefix="/api",
    tags=["Voice Interview"]
)

app.include_router(
    dashboard_router,
    prefix="/api",
    tags=["Dashboard"]
)

app.include_router(
    saved_jobs_router,
    prefix="/api",
    tags=["Saved Jobs"]

)

app.include_router(
    recommendation_router,
    prefix="/api",
    tags=["Recommendations"]
)

app.include_router(
    recruiter_router,
    prefix="/api",
    tags=["Recruiter"]
)

app.include_router(
    interview_router,
    prefix="/api",
    tags=["Interview"]
)

app.include_router(
    interview_evaluation_router,
    prefix="/api",
    tags=["Interview Evaluation"]
)


app.include_router(
    salary_predictor_router,
    prefix="/api",
    tags=["Salary Prediction"]
)

app.include_router(
    ats_router,
    prefix="/api",
    tags=["ATS Score"]
)


app.include_router(
    cover_letter_router,
    prefix="/api",
    tags=["Cover Letter"]
)

app.include_router(
    skill_gap_router,
    prefix="/api",
    tags=["Skill Gap Analyzer"]
)

app.include_router(
    resume_analyzer_router,
    prefix="/api",
    tags=["Resume Analyzer"]
)

app.include_router(
    ats_checker_router,
    prefix="/api",
    tags=["ATS Checker"]
)

app.include_router(
    career_roadmap_router,
    prefix="/api",
    tags=["Career Roadmap"]
)

# HOME
@app.get("/")
async def home():
    return {
        "message": "Smart Job Portal AI Backend Running 🚀"
    }

# HEALTH CHECK
@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }

# DATABASE TEST
@app.get("/test-db")
async def test_db():

    try:

        db.command("ping")

        return {
            "message": "MongoDB Connected Successfully 🚀"
        }

    except Exception as e:

        return {
            "error": str(e)
        }