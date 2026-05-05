from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth,teacher_auth,teacher_routes,student_routes,admin_auth

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(teacher_auth.router)
app.include_router(student_routes.router)
app.include_router(teacher_routes.router)
app.include_router(admin_auth.router)
