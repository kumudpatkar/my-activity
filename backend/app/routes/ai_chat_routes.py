from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-1.5-flash")

router = APIRouter()

class QuestionRequest(BaseModel):
    question: str

@router.post("/ai-chat")
def ai_chat(data: QuestionRequest):

    response = model.generate_content(
        data.question
    )

    return {
        "answer": response.text
    }