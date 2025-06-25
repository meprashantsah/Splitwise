from fastapi import FastAPI
from app.api import groups,expenses
from app.db.database import Base, engine

app = FastAPI()

app.include_router(groups.router)
app.include_router(expenses.router)