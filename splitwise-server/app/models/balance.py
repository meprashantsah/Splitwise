from sqlalchemy import Column, Integer, String, Float, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.db.database import Base

class Balance(Base):
    __tablename__ = "balances"

    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("groups.id"), nullable=False)
    owed_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    owed_to_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)

    group = relationship("Group")
    owed_by = relationship("User", foreign_keys=[owed_by_id])
    owed_to = relationship("User", foreign_keys=[owed_to_id])
