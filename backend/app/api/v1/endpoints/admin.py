from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.api.dependencies import get_current_admin_user, get_db
from app.models.order import Order
from app.models.product import Product
from app.models.user import User
from app.schemas.admin import AnalyticsSummary, DashboardStats
from app.schemas.order import OrderCancelRequest, OrderRead, OrderStatusUpdate
from app.schemas.product import InventoryResponse, ProductCreate, ProductRead, ProductUpdate
from app.services.admin_service import analytics_summary, dashboard_stats
from app.services.order_service import update_order_status
from app.services.product_service import create_product, list_products, soft_delete_product, update_product

router = APIRouter(dependencies=[Depends(get_current_admin_user)])


@router.get("/dashboard", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    return dashboard_stats(db)


@router.get("/analytics", response_model=AnalyticsSummary)
def get_analytics(db: Session = Depends(get_db)):
    return analytics_summary(db)


@router.get("/inventory", response_model=list[InventoryResponse])
def get_inventory(db: Session = Depends(get_db)):
    return list_products(db, include_inactive=True)


@router.post("/products", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
def add_product(payload: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, payload)


@router.patch("/products/{product_id}", response_model=ProductRead)
def edit_product(product_id: int, payload: ProductUpdate, db: Session = Depends(get_db)):
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return update_product(db, product, payload)


@router.delete("/products/{product_id}", response_model=ProductRead)
def remove_product(product_id: int, db: Session = Depends(get_db)):
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return soft_delete_product(db, product)


@router.patch("/products/{product_id}/inventory", response_model=InventoryResponse)
def update_inventory(product_id: int, stock_quantity: int, db: Session = Depends(get_db)):
    if stock_quantity < 0:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Stock quantity cannot be negative")
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    product.stock_quantity = stock_quantity
    db.commit()
    db.refresh(product)
    return product


@router.get("/orders", response_model=list[OrderRead])
def list_orders(db: Session = Depends(get_db)):
    return db.scalars(select(Order).options(joinedload(Order.user)).order_by(Order.created_at.desc())).all()


@router.patch("/orders/{order_id}/status", response_model=OrderRead)
def change_order_status(order_id: int, payload: OrderStatusUpdate, db: Session = Depends(get_db)):
    order = db.get(Order, order_id)
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return update_order_status(db, order, payload.status)


@router.post("/orders/{order_id}/cancel", response_model=OrderRead)
def cancel_order(order_id: int, payload: OrderCancelRequest, db: Session = Depends(get_db)):
    order = db.get(Order, order_id)
    if order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return update_order_status(db, order, "CANCELLED", payload.reason)