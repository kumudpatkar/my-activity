from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class InterviewAnswer(BaseModel):
    question: str
    answer: str


@router.post("/evaluate-interview")
def evaluate_answer(data: InterviewAnswer):

    score = 0
    feedback = []

    answer = data.answer.lower()

    # Length check

    if len(answer) >= 30:
        score += 2
        feedback.append(
            "Good detailed answer."
        )

    if len(answer) >= 80:
        score += 2
        feedback.append(
            "Very well explained."
        )

    # Technical keywords

    keywords = [

        "python",
        "java",
        "programming",
        "object",
        "class",
        "function",
        "api",
        "database",
        "machine learning",
        "artificial intelligence",
        "ai",
        "fastapi",
        "mongodb",
        "html",
        "css",
        "javascript"

    ]

    for word in keywords:

        if word in answer:
            score += 1

    if score > 10:
        score = 10

    if score >= 8:

        feedback.append(
            "Excellent answer."
        )

    elif score >= 5:

        feedback.append(
            "Good answer but can be improved."
        )

    else:

        feedback.append(
            "Try adding more technical details."
        )

    return {

        "question": data.question,

        "answer": data.answer,

        "score": score,

        "feedback": feedback

    }