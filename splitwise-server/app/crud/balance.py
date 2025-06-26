from sqlalchemy.orm import Session
from app.models import Balance,Expense

def update_balances(db: Session, expense: Expense):
    group_id = expense.group_id
    paid_by = expense.paid_by_id

    for split in expense.splits:
        if split.user_id == paid_by:
            continue 

        amount = split.amount

        existing_balance = db.query(Balance).filter_by(
            group_id=group_id,
            owed_by_id=split.user_id,
            owed_to_id=paid_by
        ).first()

        if existing_balance:
            existing_balance.amount += amount
        else:
            new_balance = Balance(
                group_id=group_id,
                owed_by_id=split.user_id,
                owed_to_id=paid_by,
                amount=amount
            )
            db.add(new_balance)

    db.commit()


def get_group_balances(db: Session, group_id: int):
    return db.query(Balance).filter(Balance.group_id == group_id).all()


def get_user_balances(db: Session, user_id: int):
    return db.query(Balance).filter(
        (Balance.owed_by_id == user_id) | (Balance.owed_to_id == user_id)
    ).all()
