from fastapi import APIRouter,HTTPException
from database import attendance_collection, marks_collection,assignment_collection,student_collection
from pydantic import BaseModel

router = APIRouter(prefix="/student", tags=["Student"])

# Attendance API
# @router.get("/attendance/{college_id}")
# def get_attendance(college_id: str):
#     records = list(attendance_collection.find({"college_id": college_id}, {"_id": 0}))
    
#     if not records:
#         return {"message": "No attendance found"}
    
#     return {
#         "college_id": college_id,
#         "attendance": records
#     }


# class Student(BaseModel):
#     college_id: str
#     name: str
#     father_name: str
#     year: int
#     sem: int
#     password: str
#     gender: str
#     email: str
#     address: str
#     phone: str
#     dob: str

# @router.post("/add")
# def add_student(data: Student):
#     student_collection.insert_one(data.dict())
#     return {"message": "Student added successfully"}

# @router.post("/add")
# def add_student(data: dict):
#     student_collection.insert_one(data)
#     return {"message": "Student added successfully"}

@router.put("/update")
def update_student(data: dict):
    student = student_collection.find_one({"college_id": data.get("college_id")})

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    student_collection.update_one(
        {"college_id": data.get("college_id")},
        {"$set": data}
    )

    return {"message": "Profile updated successfully"}

@router.get("/attendance/{college_id}/{semester}")
def get_attendance(college_id: str, semester: int):
    data = list(attendance_collection.find(
        {"college_id": college_id, "semester": semester},
        {"_id": 0}
    ))

    result = []

    for item in data:
        total = item.get("total_classes", 0)
        attended = item.get("attended", 0)

        percentage = (attended / total * 100) if total > 0 else 0

        result.append({
            "subject": item["subject"],
            "total_classes": total,
            "attended": attended,
            "percentage": round(percentage, 2)
        })

    return {
        "college_id": college_id,
        "semester": semester,
        "attendance": result
    }

# Marks API
# @router.get("/marks/{college_id}")
# def get_marks(college_id: str):
#     marks = list(marks_collection.find({"college_id": college_id}, {"_id": 0}))
    
#     if not marks:
#         return {"message": "No marks found"}
    
#     return {
#         "college_id": college_id,
#         "marks": marks
#     }

@router.get("/marks/{college_id}/{semester}")
def get_marks(college_id: str, semester: int):
    data = list(marks_collection.find(
        {"college_id": college_id, "semester": semester},
        {"_id": 0}
    ))

    result = []

    for item in data:
        s1 = item.get("sessional_1", 0)
        s2 = item.get("sessional_2", 0)

        avg = (s1 + s2) / 2
        status = "Good" if avg >= 15 else "Improve"

        result.append({
            "subject": item["subject"],
            "sessional_1": s1,
            "sessional_2": s2,
            "average": avg,
            "status": status
        })

    return {
        "college_id": college_id,
        "semester": semester,
        "marks": result
    }

@router.get("/assignments/{class_name}")
def get_assignments(class_name: str):
    data = list(assignment_collection.find(
        {"class": class_name},
        {"_id": 0}
    ))
    return data

@router.put("/submit/{assignment_id}/{student_id}")
def submit_assignment(assignment_id: str, student_id: str):
    assignment_collection.update_one(
        {"id": assignment_id},
        {"$set": {f"submissions.{student_id}": True}}
    )
    return {"message": "Submitted"}

# Notices API
# @router.get("/notices")
# def get_notices():
#     notices = list(notice_collection.find({}, {"_id": 0}))
    
#     return {
#         "notices": notices
#     }