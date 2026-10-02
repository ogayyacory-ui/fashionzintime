from decimal import Decimal

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.models.cart import CartItem
from app.models.order import Order
from app.models.product import Product


def create_order_from_cart(db: Session, user_id: int) -> Order:
    cart_items = db.scalars(
        select(CartItem).options(joinedload(CartItem.product)).where(CartItem.user_id == user_id)
    ).all()
    if not cart_items:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Your cart is empty")

    snapshot = []
    total = Decimal("0.00")
    for cart_item in cart_items:
        product = cart_item.product
        if not product.is_active or product.stock_quantity < cart_item.quantity:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Insufficient stock for {product.name}")
        line_total = product.price * cart_item.quantity
        total += line_total
        snapshot.append({"product_id": product.id, "name": product.name, "quantity": cart_item.quantity, "unit_price": str(product.price)})
        product.stock_quantity -= cart_item.quantity

    order = Order(user_id=user_id, total=total, items=snapshot, status="PENDING")
    db.add(order)
    for cart_item in cart_items:
        db.delete(cart_item)
    db.commit()
    db.refresh(order)
    return order


def update_order_status(db: Session, order: Order, new_status: str, reason: str | None = None) -> Order:
    if order.status == "CANCELLED":
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Cancelled orders cannot be changed")
    if new_status == "CANCELLED":
        if order.status == "PAID":
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Paid orders require a refund before cancellation")
        for item in order.items:
            product = db.get(Product, item["product_id"])
            if product is not None:
                product.stock_quantity += item["quantity"]
        order.cancellation_reason = reason
    elif order.status == "PAID" and new_status != "PAID":
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Paid order status cannot be reversed")
    order.status = new_status
    db.commit()
    db.refresh(order)
    return order


def get_order_for_user(db: Session, order_id: int, user_id: int) -> Order:
    order = db.get(Order, order_id)
    if order is None or order.user_id != user_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order