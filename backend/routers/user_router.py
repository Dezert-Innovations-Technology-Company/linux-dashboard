from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.schemas.user_schema import UserCreate, UserResponse
from backend.database import get_db
from backend.crud.user_crud import create_user, get_users, update_user, delete_user

router = APIRouter()

@router.get("/", response_model=list[UserResponse])
def route_get_users(db: Session = Depends(get_db)):
    return get_users(db)

@router.post("/", response_model=UserResponse)
def route_create_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@router.put("/{user_id}", response_model=UserResponse)
def route_update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    updated_user = update_user(db, user_id, user)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

@router.delete("/{user_id}", status_code=204)
def route_delete_user(user_id: int, db: Session = Depends(get_db)):
    success = delete_user(db, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
