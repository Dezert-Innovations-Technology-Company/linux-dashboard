from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from uuid import UUID

class UserCreate(BaseModel):
    fullname: str
    email: EmailStr
    username: str
    role: str
    avatar: Optional[str]
    # is_active: Optional[bool] = True
    active: bool = Field(alias="is_active")
    # projects: List[int] = []
    projects: Optional[List[UUID]] = Field(default_factory=list)



class UserResponse(UserCreate):
    id: int

class Config:
    orm_mode = True
    allow_population_by_field_name = True
