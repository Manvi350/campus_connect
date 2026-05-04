# from fastapi import APIRouter, HTTPException
# from datetime import datetime
# from pydantic import BaseModel
# from security import hash_password, verify_password
# from database import db   # ⚠️ apna DB connection import karo

# router = APIRouter()

# class AdminLogin(BaseModel):
#     username: str
#     password: str

# # ✅ CREATE ADMIN
# @router.post("/admin/create")
# def create_admin():
#     admin_data = {
#         "username": "admin",
#         "email": "admin@gmail.com",
#         "password": hash_password("admin123"),
#         "role": "admin",
#         "created_at": datetime.utcnow()
#     }

#     db.admins.insert_one(admin_data)

#     return {"message": "Admin created successfully"}


# # ✅ ADMIN LOGIN
# @router.post("/admin/auth/login")
# def admin_login(data: AdminLogin):
#     admin = db.admins.find_one({"username": data["username"]})

#     if not admin:
#         raise HTTPException(status_code=401, detail="Admin not found")

#     if not verify_password(data["password"], admin["password"]):
#         raise HTTPException(status_code=401, detail="Invalid password")

#     return {
#         "access_token": "dummy_token",  # ⚠️ baad me JWT lagayenge
#         "user": {
#             "username": admin["username"],
#             "role": "admin"
#         }
#     }


from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from database import admin_collection
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "your_secret_key_here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

router = APIRouter(prefix="/admin/auth")

# 📌 Login Model
class AdminLogin(BaseModel):
    username: str
    password: str

# 📌 Token function (same as teacher)
def create_access_token(data: dict, expires_delta=None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ✅ ADMIN LOGIN
@router.post("/login")
def admin_login(data: AdminLogin):
    admin = admin_collection.find_one({"username": data.username})

    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")

    # ❗ Plain password compare (simple version)
    if admin["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_access_token({
        "sub": admin["username"],
        "role": "admin"
    })

    return JSONResponse({
        "access_token": token,
        "user": {
            "username": admin["username"],
            "email": admin.get("email"),
            "role": "admin"
        }
    })

# @router.post("/create")
# def create_admin():
#     admin_data = {
#         "username": "admin",
#         "email": "admin@gmail.com",
#         "password": "admin123",   # ❗ plain password
#         "role": "admin",
#         "created_at": datetime.utcnow()
#     }

#     admin_collection.insert_one(admin_data)

#     return {"message": "Admin created"}