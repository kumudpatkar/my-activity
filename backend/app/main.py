from fastapi import FastAPI
from app.database import db

from app.routes.auth_routes import router as auth_router
from app.routes.login_routes import router as login_router
from app.routes.protected_routes import router as protected_router

app = FastAPI(
    title="Smart Job Portal AI",
    version="1.0.0"
)

# Register routes
app.include_router(auth_router)
app.include_router(login_router)
app.include_router(protected_router)

@app.get("/")
def home():
    return {
        "message": "Smart Job Portal API Running 🚀"
    }


@app.get("/health")
def health_check():
    return {
        "status": "OK"
    }


@app.get("/test-db")
def test_db():
    return {
        "database": db.name,
        "message": "MongoDB Connected Successfully 🚀"
    }