# app/crud/expense.py

from sqlalchemy.orm import Session
from app.models import Group, User, Expense, ExpenseSplit
from app.schemas.expense import ExpenseCreate

def create_expense(db: Session, group_id: int, expense_in: ExpenseCreate):
    # Validate group exists
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise ValueError("Group not found")

    # Validate paid_by user is in group
    if not any(user.id == expense_in.paid_by for user in group.users):
        raise ValueError("paid_by user is not in the group")

    # Validate all split users are in the group
    group_user_ids = {user.id for user in group.users}
    split_user_ids = {split.user_id for split in expense_in.splits}
    if not split_user_ids.issubset(group_user_ids):
        raise ValueError("Some split users are not in the group")

    # Create Expense
    expense = Expense(
        group_id=group_id,
        description=expense_in.description,
        amount=expense_in.amount,
        paid_by_id=expense_in.paid_by,
        split_type=expense_in.split_type,
    )
    db.add(expense)
    db.flush()  # get expense.id

    # Calculate splits amount
    splits_to_create = []
    if expense_in.split_type == "equal":
        share = expense_in.amount / len(expense_in.splits)
        for split in expense_in.splits:
            splits_to_create.append(
                ExpenseSplit(
                    expense_id=expense.id,
                    user_id=split.user_id,
                    amount=share,
                    percentage=None,
                )
            )
    else:  # percentage
        for split in expense_in.splits:
            splits_to_create.append(
                ExpenseSplit(
                    expense_id=expense.id,
                    user_id=split.user_id,
                    amount=round(expense_in.amount * (split.percentage / 100), 2),
                    percentage=split.percentage,
                )
            )

    db.add_all(splits_to_create)
    db.commit()
    db.refresh(expense)
    return expense
