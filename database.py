from pymongo import MongoClient

# MongoDB connection
client = MongoClient("mongodb://localhost:27017")

# Database select
db = client["smart_campus"]

# Collections
student_collection = db["students"]