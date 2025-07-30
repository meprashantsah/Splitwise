from fastapi import FastAPI
from app.api import groups,expenses,balances
from app.db.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


# Allow your frontend origin
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # origins or ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(groups.router)
app.include_router(expenses.router)
app.include_router(balances.router)
