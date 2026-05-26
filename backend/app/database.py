from pymongo import MongoClient

# ================= MONGODB CONNECTION =================
MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)

# ================= DATABASE =================
db = client["smart_job_portal"]

# ================= COLLECTIONS =================
users_collection = db["users"]

profile_collection = db["profiles"]