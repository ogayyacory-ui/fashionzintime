import argparse
from getpass import getpass

from sqlalchemy import select

from app.core.database import Base, SessionLocal, engine
from app.core.security import hash_password
from app.models import User


def create_admin() -> None:
    email = input("Admin email: ").strip().lower()
    full_name = input("Admin name: ").strip()
    password = getpass("Admin password (8+ characters): ")
    if len(password) < 8:
        raise SystemExit("Password must be at least 8 characters")

    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        existing = db.scalar(select(User).where(User.email == email))
        if existing:
            raise SystemExit("That email already exists. Promote existing users through a controlled database operation.")
        user = User(email=email, full_name=full_name, hashed_password=hash_password(password), role="admin")
        db.add(user)
        db.commit()
    print(f"Administrator created: {email}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Fashion in Time local administration tools")
    parser.add_argument("command", choices=["create-admin"])
    args = parser.parse_args()
    if args.command == "create-admin":
        create_admin()


if __name__ == "__main__":
    main()