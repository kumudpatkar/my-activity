from pydantic import BaseModel

class Job(BaseModel):
    title: str
    company: str
    skills: str
    salary: str
    experience: str
    description: str