from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.group import Group, group_user
from app.models.user import User
from app.models.expense import Expense
from app.schemas.group import GroupCreate

def create_group(db: Session, group_data: GroupCreate):
    users = db.query(User).filter(User.id.in_(group_data.user_ids)).all()

    group = Group(name=group_data.name, users=users)
    db.add(group)
    db.commit()
    db.refresh(group)
    return group

def get_group_details(db: Session, group_id: int):
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        return None

    # Calculate total expenses
     # Efficient DB-level aggregation
    total_expenses = db.query(func.coalesce(func.sum(Expense.amount), 0.0))\
                       .filter(Expense.group_id == group_id)\
                       .scalar()

    # Return custom dict or attach separately
    group_dict = {
        "id": group.id,
        "name": group.name,
        "users": group.users,
        "total_expenses": total_expenses,
    }

    return group_dict
