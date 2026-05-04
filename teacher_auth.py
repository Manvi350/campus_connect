from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from database import teacher_collection
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import jwt
from typing import Optional

SECRET_KEY = "your_secret_key_here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

router=APIRouter(prefix="/teacher/auth")

class TeacherLogin(BaseModel):
    email:str
    password:str

class TeacherUpdate(BaseModel):
    name: Optional[str]
    phone: Optional[str]
    address: Optional[str]
    dob: Optional[str]
    research: Optional[str]
    publications: Optional[str]
    # classes: Optional[list]
    email: str  


def create_access_token(data:dict,expires_delta=None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/login")
def teacher_login(data:TeacherLogin):
    teacher=teacher_collection.find_one({"email":data.email.strip()})
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    print("DB PASS:", teacher.get("password"))
    print("INPUT PASS:", data.password)

    if teacher["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid password")

    token=create_access_token(
        {
            "sub":teacher["email"],
            "role":"teacher"
        }
    )

    return JSONResponse({
        "access_token":token,
        "user":{
            "name":teacher["name"],
            "email":teacher["email"],
            "subject":teacher.get("subject"),
            "department": teacher.get("department"),
            "address":teacher.get("address"),
            "phone":teacher.get("phone")
        }
    })

@router.put("/update")
def update_teacher(data: TeacherUpdate):
    teacher = teacher_collection.find_one({"email": data.email})

    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")

    update_data = data.dict(exclude_unset=True)

    teacher_collection.update_one(
        {"email": data.email},
        {"$set": update_data}
    )

    return {"message": "Profile updated successfully"}
    