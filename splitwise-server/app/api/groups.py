from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.group import GroupCreate, GroupOut
from app.crud.group import create_group, get_group_details

router = APIRouter(prefix="/groups", tags=["Groups"])

@router.post("/", response_model=GroupOut)
def create_new_group(group_data: GroupCreate, db: Session = Depends(get_db)):
    return create_group(db, group_data)

@router.get("/{group_id}", response_model=GroupOut)
def read_group_details(group_id: int, db: Session = Depends(get_db)):
    group = get_group_details(db, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return group
