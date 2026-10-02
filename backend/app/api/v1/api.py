from fastapi import APIRouter

from app.api.v1.endpoints import admin, auth, cart, help, payments, products, users

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(cart.router, prefix="/cart", tags=["cart"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(help.router, prefix="/help", tags=["help"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])