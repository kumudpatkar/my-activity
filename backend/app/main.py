from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ================= DATABASE =================
from app.database import db

# ================= ROUTES =================
from app.routes.auth_routes import router as auth_router
from app.routes.login_routes import router as login_router
from app.routes.protected_routes import router as protected_router
from app.routes.profile_routes import router as profile_router

# ================= FASTAPI APP =================
app = FastAPI(
    title="Smart Job Portal AI",
    version="1.0.0"
)

# ================= CORS CONFIG =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= ROUTERS =================

# AUTH ROUTES
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Auth"]
)

# LOGIN ROUTES
app.include_router(
    login_router,
    prefix="/auth",
    tags=["Login"]
)

# PROTECTED ROUTES
app.include_router(
    protected_router,
    prefix="/api",
    tags=["Protected"]
)

# PROFILE ROUTES
app.include_router(
    profile_router,
    prefix="/api",
    tags=["Profile"]
)

# ================= BASIC ROUTES =================

@app.get("/")
def home():
    return {
        "message": "Smart Job Portal API Running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "OK"
    }


@app.get("/test-db")
def test_db():
    return {
        "database": db.name,
        "message": "MongoDB Connected Successfully 🚀"
    }