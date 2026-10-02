from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


def list_products(db: Session, *, include_inactive: bool = False, category: str | None = None):
    query = select(Product)
    if not include_inactive:
        query = query.where(Product.is_active.is_(True))
    if category:
        query = query.where(Product.category == category)
    return db.scalars(query.order_by(Product.created_at.desc())).all()


def create_product(db: Session, payload: ProductCreate) -> Product:
    values = payload.model_dump()
    if values["image_url"] is not None:
        values["image_url"] = str(values["image_url"])
    product = Product(**values)
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def update_product(db: Session, product: Product, payload: ProductUpdate) -> Product:
    values = payload.model_dump(exclude_unset=True)
    if values.get("image_url") is not None:
        values["image_url"] = str(values["image_url"])
    for key, value in values.items():
        setattr(product, key, value)
    db.commit()
    db.refresh(product)
    return product


def soft_delete_product(db: Session, product: Product) -> Product:
    product.is_active = False
    db.commit()
    db.refresh(product)
    return product