from pymongo import MongoClient

# MongoDB connection
client = MongoClient("mongodb://localhost:27017")

# Database select
db = client["smart_campus"]

# Collections
student_collection = db["students"]
teacher_collection=db["teachers"]
admin_collection=db["admins"]
attendance_collection = db["attendance"]
assignment_collection = db["assignments"]
# material_collection = db["materials"]
# notice_collection = db["notices"]
marks_collection = db["marks"]
