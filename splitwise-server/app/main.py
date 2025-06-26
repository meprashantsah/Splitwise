from fastapi import FastAPI
from app.api import groups,expenses,balances
from app.db.database import Base, engine

app = FastAPI()

app.include_router(groups.router)
app.include_router(expenses.router)
app.include_router(balances.router)
