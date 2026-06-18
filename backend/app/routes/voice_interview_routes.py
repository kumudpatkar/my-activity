from fastapi import APIRouter, UploadFile, File
from faster_whisper import WhisperModel
import shutil
import os

router = APIRouter()

# Load model only once
model = WhisperModel(
    "tiny",
    device="cpu",
    compute_type="int8"
)

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@router.post("/voice-interview")
async def voice_interview(
    audio: UploadFile = File(...)
):

    try:

        file_path = os.path.join(
            UPLOAD_FOLDER,
            audio.filename
        )

        with open(
            file_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                audio.file,
                buffer
            )

        print(
            "Audio Received:",
            file_path
        )

        segments, info = model.transcribe(
            file_path,
            language="en"
        )

        transcript = ""

        for segment in segments:

            transcript += (
                segment.text + " "
            )

        print(
            "Transcript:",
            transcript
        )

        return {
            "transcript":
            transcript.strip()
        }

    except Exception as e:

        print(e)

        return {
            "transcript": "",
            "error": str(e)
        }