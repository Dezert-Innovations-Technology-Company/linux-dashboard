import os
from dotenv import load_dotenv
from backend.config import DATABASE_URL as SQLALCHEMY_DATABASE_URL


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in the environment variables.")

if not SECRET_KEY:
    raise ValueError("SECRET_KEY is not set in the environment variables.")
