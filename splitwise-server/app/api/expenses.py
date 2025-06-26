from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.expense import ExpenseCreate
from app.crud.expense import create_expense
from app.db.database import get_db

router = APIRouter(prefix="/groups/{group_id}/expenses", tags=["Expenses"])

@router.post("/", response_model=dict) 
def add_expense(
    group_id: int,
    expense_in: ExpenseCreate,
    db: Session = Depends(get_db),
):
    try:
        expense = create_expense(db, group_id, expense_in)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"expense_id": expense.id, "message": "Expense created successfully"}
