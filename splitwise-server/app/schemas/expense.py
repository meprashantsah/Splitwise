# app/schemas/expense.py

from pydantic import BaseModel, conlist, validator
from typing import List, Optional, Literal

class ExpenseSplitIn(BaseModel):
    user_id: int
    percentage: Optional[float] = None  # only for percentage split_type

class ExpenseCreate(BaseModel):
    description: Optional[str]
    amount: float
    paid_by: int
    split_type: Literal["equal", "percentage"]
    splits: List[ExpenseSplitIn]

    @validator("splits")
    def validate_splits(cls, splits, values):
        split_type = values.get("split_type")
        if split_type == "percentage":
            total_percent = sum(s.percentage or 0 for s in splits)
            if round(total_percent, 2) != 100.0:
                raise ValueError("Total percentage split must sum to 100")
            for s in splits:
                if s.percentage is None:
                    raise ValueError("Percentage must be provided for each split")
        else:  # equal split
            for s in splits:
                if s.percentage is not None:
                    raise ValueError("Percentage must not be provided for equal split")
        return splits
