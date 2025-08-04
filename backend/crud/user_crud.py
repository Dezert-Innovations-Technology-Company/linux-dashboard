from sqlalchemy.orm import Session
from backend.models.user_model import User
from backend.schemas.user_schema import UserCreate

# Fetch all users
def get_users(db: Session):
    return db.query(User).all()

# Fetch a single user by ID
def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

# Create a new user
def create_user(db: Session, user: UserCreate):
    db_user = User(**user.model_dump(by_alias=True))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Update an existing user
def update_user(db: Session, user_id: int, user: UserCreate):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        return None

    for field, value in user.model_dump(by_alias=True, exclude_unset=True).items():
        setattr(db_user, field, value)

    db.commit()
    db.refresh(db_user)
    return db_user

# Delete a user
def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False
