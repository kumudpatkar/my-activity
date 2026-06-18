from fastapi import APIRouter

router = APIRouter()

@router.post("/interview-questions")
def interview_questions(data: dict):

    role = data.get("role", "").lower()

    questions = []

    if "python" in role:

        questions = [

            "What is Python?",

            "What are Python decorators?",

            "Difference between List and Tuple?",

            "Explain OOP concepts.",

            "What is Exception Handling?"

        ]

    elif "java" in role:

        questions = [

            "What is JVM?",

            "Difference between JDK and JRE?",

            "Explain OOP concepts.",

            "What is Multithreading?",

            "What is Collection Framework?"

        ]

    elif "ai" in role:

        questions = [

            "What is Machine Learning?",

            "Difference between AI and ML?",

            "What is NLP?",

            "Explain Neural Networks.",

            "What is Overfitting?"

        ]

    else:

        questions = [

            "Tell me about yourself.",

            "Why should we hire you?",

            "What are your strengths?",

            "What are your weaknesses?",

            "Where do you see yourself in 5 years?"

        ]

    return {
        "role": role,
        "questions": questions
    }