from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.dependencies import get_db
from app.models.product import Product
from app.schemas.product import ProductRead
from app.utils.pagination import Pagination, pagination_params

router = APIRouter()


@router.get("")
def get_products(
    category: str | None = None,
    page: Pagination = Depends(pagination_params),
    search: str | None = Query(default=None, max_length=100),
    db: Session = Depends(get_db),
):
    query = select(Product).where(Product.is_active.is_(True))
    if category:
        query = query.where(Product.category == category)
    if search:
        query = query.where(Product.name.ilike(f"%{search}%"))
    total = db.scalar(select(func.count()).select_from(query.subquery())) or 0
    items = db.scalars(query.order_by(Product.created_at.desc()).offset(page.offset).limit(page.page_size)).all()
    return {"items": [ProductRead.model_validate(item) for item in items], "total": total, "page": page.page, "page_size": page.page_size}


@router.get("/{product_id}", response_model=ProductRead)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.scalar(select(Product).where(Product.id == product_id, Product.is_active.is_(True)))
    if product is None:
        from fastapi import HTTPException, status
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product