from fastapi import FastAPI
from app.api import groups
from app.db.database import Base, engine

app = FastAPI()

app.include_router(groups.router)
