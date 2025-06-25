from sqlalchemy import Column, Integer, String, Float, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.db.database import Base

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("groups.id"), nullable=False)
    description = Column(String, nullable=True)
    amount = Column(Float, nullable=False)
    paid_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    split_type = Column(Enum("equal", "percentage", name="split_type_enum"), nullable=False)

    group = relationship("Group", back_populates="expenses")
    paid_by = relationship("User")
    splits = relationship("ExpenseSplit", back_populates="expense", cascade="all, delete-orphan")
