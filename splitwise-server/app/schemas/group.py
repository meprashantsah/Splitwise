from pydantic import BaseModel
from typing import List, Optional

class GroupCreate(BaseModel):
    name: str
    user_ids: List[int]

class UserOut(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True

class GroupOut(BaseModel):
    id: int
    name: str
    users: List[UserOut]
    total_expenses: float

    class Config:
        orm_mode = True
