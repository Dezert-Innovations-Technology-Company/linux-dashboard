from sqlalchemy import Column, String, Boolean, Integer
from sqlalchemy.dialects.postgresql import UUID, ARRAY

from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    role = Column(String, nullable=False)
    avatar = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    projects = Column(ARRAY(UUID), default=[])
