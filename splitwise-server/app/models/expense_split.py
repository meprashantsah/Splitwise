from sqlalchemy import Column, Integer, String, Float, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.db.database import Base

class ExpenseSplit(Base):
    __tablename__ = "expense_splits"

    id = Column(Integer, primary_key=True, index=True)
    expense_id = Column(Integer, ForeignKey("expenses.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)        # Calculated share of the expense
    percentage = Column(Float, nullable=True)     # Used only if split_type == "percentage"

    expense = relationship("Expense", back_populates="splits")
    user = relationship("User")
