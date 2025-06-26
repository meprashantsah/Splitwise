from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.crud.balance import get_group_balances, get_user_balances
from app.schemas.balance import BalanceOut

router = APIRouter(tags=["Balances"])

@router.get("/groups/{group_id}/balances", response_model=list[BalanceOut])
def read_group_balances(group_id: int, db: Session = Depends(get_db)):
    balances = get_group_balances(db, group_id)
    if not balances:
        raise HTTPException(status_code=404, detail="No balances found for group")
    return balances

@router.get("/users/{user_id}/balances", response_model=list[BalanceOut])
def read_user_balances(user_id: int, db: Session = Depends(get_db)):
    balances = get_user_balances(db, user_id)
    if not balances:
        raise HTTPException(status_code=404, detail="No balances found for user")
    return balances
