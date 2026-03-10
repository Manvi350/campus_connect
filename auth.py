from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from database import student_collection
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "your_secret_key_here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

router = APIRouter(prefix="/auth")

class LoginRequest(BaseModel):
    college_id: str
    password: str

def create_access_token(data: dict, expires_delta=None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/login")
def login_user(data: LoginRequest):
    # if data.campus_id == "student01" and data.password == "12345":
    #     return {
    #         "access_token": "dummy_token_abc123",
    #         "user": {"name": "John Doe", "role": "student"}
    #     }
    # raise HTTPException(status_code=401, detail="Invalid credentials")
    
    student = student_collection.find_one({"college_id": data.college_id})

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    if student["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_access_token({"sub": student["college_id"]})

    return JSONResponse({
        "access_token": token,
        "user": {
            "college_id": student["college_id"],
            "name": student["name"],
            "email": student.get("email"),
            "year": student.get("year"),
            "sem": student.get("sem"),
            "gender": student.get("gender"),
        }
    })



 