from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.group import Group, group_user
from app.models.user import User
from app.models.expense import Expense
from app.schemas.group import GroupCreate

def create_group(db: Session, group_data: GroupCreate):
    if is_group_name_taken(db, group_data.name):
        raise ValueError("Group with this name already exists.")

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

    total_expenses = db.query(func.coalesce(func.sum(Expense.amount), 0.0))\
                       .filter(Expense.group_id == group_id)\
                       .scalar()

    group_dict = {
        "id": group.id,
        "name": group.name,
        "users": group.users,
        "total_expenses": total_expenses,
    }
    return group_dict


def is_group_name_taken(db: Session, group_name: str) -> bool:
    return db.query(Group).filter(Group.name == group_name).first() is not None
