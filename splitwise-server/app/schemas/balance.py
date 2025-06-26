# app/schemas/balance.py

from pydantic import BaseModel

class UserBalanceOut(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True

class BalanceOut(BaseModel):
    id: int
    group_id: int
    owed_by: UserBalanceOut
    owed_to: UserBalanceOut
    amount: float

    class Config:
        orm_mode = True
