from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ROUTES
from app.routes.auth_routes import router as auth_router
from app.routes.login_routes import router as login_router
from app.routes.protected_routes import router as protected_router
from app.routes.profile_routes import router as profile_router
from app.routes.job_routes import router as job_router
from app.routes.resume_routes import router as resume_router

# DATABASE
from app.database import db

# CREATE FASTAPI APP
app = FastAPI(
    title="Smart Job Portal AI",
    version="1.0.0"
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

app.include_router(profile_router, prefix="/api", tags=["Profile"])

app.include_router(job_router, prefix="/api", tags=["Jobs"])
app.include_router(resume_router, prefix="/api", tags=["Resume"])
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
        await db.command("ping")

        return {
            "message": "MongoDB Connected Successfully 🚀"
        }

    except Exception as e:

        return {
            "error": str(e)
        }