from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.api.dependencies import get_current_user, get_db
from app.models.cart import CartItem
from app.models.product import Product
from app.models.user import User
from app.schemas.order import CartItemCreate, CartItemUpdate, CartLineRead, CartRead, OrderRead
from app.services.order_service import create_order_from_cart

router = APIRouter()


@router.get("", response_model=CartRead)
def get_cart(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    items = db.scalars(select(CartItem).options(joinedload(CartItem.product)).where(CartItem.user_id == user.id)).all()
    lines = [CartLineRead(product_id=item.product.id, name=item.product.name, image_url=item.product.image_url, quantity=item.quantity, unit_price=item.product.price, line_total=item.product.price * item.quantity) for item in items]
    return CartRead(items=lines, total=sum((line.line_total for line in lines), start=0))


@router.post("/items", response_model=CartRead, status_code=status.HTTP_201_CREATED)
def add_cart_item(payload: CartItemCreate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    product = db.get(Product, payload.product_id)
    if product is None or not product.is_active:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    if product.stock_quantity < payload.quantity:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Requested quantity is not in stock")
    item = db.scalar(select(CartItem).where(CartItem.user_id == user.id, CartItem.product_id == product.id))
    if item:
        if product.stock_quantity < item.quantity + payload.quantity:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Requested quantity is not in stock")
        item.quantity += payload.quantity
    else:
        db.add(CartItem(user_id=user.id, product_id=product.id, quantity=payload.quantity))
    db.commit()
    return get_cart(user, db)


@router.patch("/items/{product_id}", response_model=CartRead)
def update_cart_item(product_id: int, payload: CartItemUpdate, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.scalar(select(CartItem).where(CartItem.user_id == user.id, CartItem.product_id == product_id))
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")
    if item.product.stock_quantity < payload.quantity:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Requested quantity is not in stock")
    item.quantity = payload.quantity
    db.commit()
    return get_cart(user, db)


@router.delete("/items/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_cart_item(product_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    item = db.scalar(select(CartItem).where(CartItem.user_id == user.id, CartItem.product_id == product_id))
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")
    db.delete(item)
    db.commit()


@router.post("/checkout", response_model=OrderRead, status_code=status.HTTP_201_CREATED)
def checkout(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return create_order_from_cart(db, user.id)