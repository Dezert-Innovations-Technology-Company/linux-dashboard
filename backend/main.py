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

app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")

@app.get("/")
@app.get("/{full_path:path}")
def serve_vue_app(full_path: str = ""):
    index_path = Path("dist/index.html")
    return FileResponse(index_path)

app.include_router(user_router.router, prefix="/users", tags=["users"])
