from fastapi import APIRouter, Depends, HTTPException
from database import student_collection, attendance_collection,assignment_collection,teacher_collection
from pydantic import BaseModel
from auth_utils import get_current_teacher
import uuid
from typing import Optional
from bson import ObjectId

router=APIRouter(prefix="/teacher", tags=["Teacher"])

class Teacher(BaseModel):
    id:str
    name: str
    email: str
    password: str
    subject: str
    department: str
    address: str
    phone: str
    dob: str
    publications: Optional[str] = ""
    research: Optional[str] = ""

# @router.post("/add")
# def add_teacher(data: Teacher):
#     if not data.password:
#         raise HTTPException(status_code=400, detail="Password required")

#     if not data.email:
#         raise HTTPException(status_code=400, detail="Email required")

#     # prevent duplicate email
#     if teacher_collection.find_one({"email": data.email}):
#         raise HTTPException(status_code=400, detail="Teacher already exists")

#     teacher_collection.insert_one(data.dict())

#     return {"message": "Teacher added successfully"}

@router.post("/add")
def add_teacher(data: Teacher):
    existing = teacher_collection.find_one({"email": data.email})

    if existing:
        raise HTTPException(status_code=400, detail="Teacher already exists")

    teacher_collection.insert_one(data.dict())
    return {"message": "Teacher added successfully"}

@router.get("/teachers")
def get_teachers():
    teachers = list(teacher_collection.find({}))
    for t in teachers:
        t["_id"] = str(t["_id"])
    return {"teachers": teachers}

@router.get("/students")
def get_students():
    students = list(student_collection.find({}, {"_id": 0}))
    return {"students": students}

@router.get("/students/{college_id}")
def get_student(college_id: str, current_teacher: str = Depends(get_current_teacher)):
    student = student_collection.find_one({"college_id": college_id}, {"_id": 0})

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

@router.post("/attendance")
def mark_attendance(data:dict, current_teacher: str = Depends(get_current_teacher)):
    attendance_collection.insert_one(data)
    return {"message": "Attendance marked"}


@router.post("/assignment")
def upload_assignment(data: dict, current_teacher: str = Depends(get_current_teacher)):

    data["id"] = str(uuid.uuid4())   # 👈 UNIQUE ID

    students = list(student_collection.find({}, {"_id": 0}))

    submissions = {}
    for s in students:
        submissions[str(s["id"])] = False

    data["submissions"] = submissions

    assignment_collection.insert_one(data)

    return {"message": "Assignment uploaded"}

@router.delete("/delete/{teacher_id}")
def delete_teacher(teacher_id: str):
    result = teacher_collection.delete_one({"_id": ObjectId(teacher_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Teacher not found")

    return {"message": "Teacher deleted successfully"}

# @router.post("/material")
# def upload_material(data: dict, current_teacher: str = Depends(get_current_teacher)):
#     material_collection.insert_one(data)
#     return {"message": "Material uploaded"}

# @router.post("/notice")
# def post_notice(data: dict,current_teacher: str = Depends(get_current_teacher)):
#     notice_collection.insert_one(data)
#     return {"message": "Notice posted"}

# @router.post("/marks")
# def upload_marks(data: dict, current_teacher: str = Depends(get_current_teacher)):
#     marks_collection.insert_one(data)
#     return {"message": "Marks uploaded"}

