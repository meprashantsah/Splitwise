from sqlalchemy.orm import Session
from app.models import Group, User, Expense, ExpenseSplit
from app.crud  import balance
from app.schemas.expense import ExpenseCreate

def create_expense(db: Session, group_id: int, expense_in: ExpenseCreate):
    group = get_group_or_404(db, group_id)
    validate_group_membership(group, expense_in)

    expense = build_expense(group_id, expense_in)
    db.add(expense)
    db.flush()

    splits = calculate_splits(expense, expense_in)
    db.add_all(splits)
    db.commit()
    db.refresh(expense)

    balance.update_balances(db, expense)
    return expense



def get_group_or_404(db: Session, group_id: int) -> Group:
    group = db.query(Group).filter(Group.id == group_id).first()
    if not group:
        raise ValueError("Group not found")
    return group

def validate_group_membership(group: Group, expense_in: ExpenseCreate):
    user_ids = {user.id for user in group.users}
    if expense_in.paid_by not in user_ids:
        raise ValueError("Paid by user not in group")
    if not {split.user_id for split in expense_in.splits}.issubset(user_ids):
        raise ValueError("Some split users are not in the group")

def build_expense(group_id: int, expense_in: ExpenseCreate) -> Expense:
    return Expense(
        group_id=group_id,
        description=expense_in.description,
        amount=expense_in.amount,
        paid_by_id=expense_in.paid_by,
        split_type=expense_in.split_type,
    )

def calculate_splits(expense: Expense, expense_in: ExpenseCreate) -> list[ExpenseSplit]:
    splits = []
    if expense_in.split_type == "equal":
        share = round(expense_in.amount / len(expense_in.splits), 2)
        for split in expense_in.splits:
            splits.append(ExpenseSplit(
                expense_id=expense.id,
                user_id=split.user_id,
                amount=share,
                percentage=None,
            ))
    else: 
        for split in expense_in.splits:
            splits.append(ExpenseSplit(
                expense_id=expense.id,
                user_id=split.user_id,
                amount=round(expense_in.amount * (split.percentage / 100), 2),
                percentage=split.percentage,
            ))
    return splits
