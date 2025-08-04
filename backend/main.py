from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import user_router
from backend.database import Base, engine

Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], #frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router.router, prefix="/users", tags=["users"])
