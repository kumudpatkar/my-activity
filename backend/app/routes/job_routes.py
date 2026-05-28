from fastapi import APIRouter
from app.models.job_model import Job
from app.database import job_collection

router = APIRouter()

# CREATE JOB
@router.post("/post-job")
async def post_job(job: Job):

    new_job = {
        "title": job.title,
        "company": job.company,
        "skills": job.skills,
        "salary": job.salary,
        "experience": job.experience,
        "description": job.description
    }

    job_collection.insert_one(new_job)

    return {
        "message": "Job posted successfully 🚀"
    }

# GET ALL JOBS
@router.get("/api/jobs")
def get_jobs():
    jobs = job_collection.find()
    return [
        {**job, "_id": str(job["_id"])}
        for job in jobs
    ]