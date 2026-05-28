from pydantic import BaseModel


# ================= USER REGISTER MODEL =================
class User(BaseModel):
    email: str
    password: str


# ================= LOGIN MODEL =================
class LoginData(BaseModel):
    email: str
    password: str


# ================= PROFILE MODEL =================
class Profile(BaseModel):
    full_name: str
    email: str
    skills: str
    education: str
    experience: str


# ================= JOB MODEL =================
class Job(BaseModel):
    title: str
    company: str
    skills: str
    salary: str
    experience: str
    description: str