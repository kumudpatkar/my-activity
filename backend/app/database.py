from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# MongoDB URL
MONGO_URL = os.getenv("MONGO_URL")

# Connect MongoDB
client = MongoClient(MONGO_URL)

# Database Name
db = client["smart_job_portal"]