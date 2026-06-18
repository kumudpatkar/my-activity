from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class CareerRoadmapRequest(BaseModel):
    role: str


@router.post("/career-roadmap")
def career_roadmap(data: CareerRoadmapRequest):

    role = data.role.lower()

    if "python" in role:

        roadmap = [
            "Month 1: Learn Python Basics",
            "Month 2: OOP + DSA",
            "Month 3: Flask/Django",
            "Month 4: API Development",
            "Month 5: Build Projects",
            "Month 6: Interview Preparation"
        ]

    elif "java" in role:

        roadmap = [
            "Month 1: Core Java",
            "Month 2: OOP + DSA",
            "Month 3: JDBC + MySQL",
            "Month 4: Spring Boot",
            "Month 5: REST APIs + Projects",
            "Month 6: Interview Preparation"
        ]

    elif "fullstack" in role or "full stack" in role:

        roadmap = [
            "Month 1: HTML, CSS, JavaScript",
            "Month 2: React.js",
            "Month 3: Node.js + Express.js",
            "Month 4: MongoDB + MySQL",
            "Month 5: Authentication + REST APIs",
            "Month 6: Build & Deploy Full Stack Projects"
        ]

    elif "mern" in role:

        roadmap = [
            "Month 1: HTML, CSS, JavaScript",
            "Month 2: React.js",
            "Month 3: Node.js + Express.js",
            "Month 4: MongoDB",
            "Month 5: Build MERN Projects",
            "Month 6: Deployment & Interview Prep"
        ]

    elif "data analyst" in role or "data" in role:

        roadmap = [
            "Month 1: Python + SQL",
            "Month 2: Pandas + NumPy",
            "Month 3: Data Visualization",
            "Month 4: Power BI/Tableau",
            "Month 5: Data Projects",
            "Month 6: Portfolio + Interviews"
        ]

    elif "ai" in role or "machine learning" in role:

        roadmap = [
            "Month 1: Python",
            "Month 2: NumPy + Pandas",
            "Month 3: Machine Learning",
            "Month 4: Deep Learning",
            "Month 5: AI Projects",
            "Month 6: Model Deployment"
        ]

    elif "devops" in role:

        roadmap = [
            "Month 1: Linux + Networking",
            "Month 2: Git + GitHub",
            "Month 3: Docker",
            "Month 4: Kubernetes",
            "Month 5: AWS/Azure",
            "Month 6: CI/CD Projects"
        ]

    elif "cyber" in role or "security" in role:

        roadmap = [
            "Month 1: Networking Basics",
            "Month 2: Linux",
            "Month 3: Ethical Hacking",
            "Month 4: Web Security",
            "Month 5: Penetration Testing",
            "Month 6: Security Projects"
        ]

    else:

        roadmap = [
            "Month 1: Programming Basics",
            "Month 2: Data Structures",
            "Month 3: Web Development",
            "Month 4: Databases",
            "Month 5: Build Projects",
            "Month 6: Interview Preparation"
        ]

    return {
        "role": role,
        "roadmap": roadmap
    }