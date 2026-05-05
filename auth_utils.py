from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer,HTTPAuthorizationCredentials,HTTPBearer
from jose import JWTError, jwt

SECRET_KEY = "your_secret_key_here"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# def get_current_teacher(token: str = Depends(oauth2_scheme)):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
#         role = payload.get("role")
#         if role != "teacher":
#             raise HTTPException(status_code=403, detail="Not authorized")

#         user_id= payload.get("sub")
#         if user_id is None:
#             raise HTTPException(status_code=401, detail="Invalid token")

#         return user_id

#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid token")

security = HTTPBearer()

def get_current_teacher(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        if payload.get("role") != "teacher":
            raise HTTPException(status_code=403, detail="Not a teacher")

        return payload["sub"]

    except:
        raise HTTPException(status_code=403, detail="Invalid token")
    
def get_current_admin(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        role = payload.get("role")
        if role != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")

        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        return user_id

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
