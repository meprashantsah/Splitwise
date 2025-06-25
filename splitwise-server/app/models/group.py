from sqlalchemy import Column, Integer, String, ForeignKey,Table
from sqlalchemy.orm import relationship
from app.db.database import Base

group_user = Table(
    "group_user",
    Base.metadata,
    Column("group_id", Integer, ForeignKey("groups.id"), primary_key=True),
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
)

class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    users = relationship("User", secondary=group_user, backref="groups")
    expenses = relationship("Expense", back_populates="group", cascade="all, delete-orphan")

    @property
    def total_expenses(self):
        return sum(exp.amount for exp in self.expenses)  # Sum all related expenses
