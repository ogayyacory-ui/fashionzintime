from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

OrderStatus = Literal["PENDING", "PAID", "CANCELLED"]


class OrderStatusUpdate(BaseModel):
    status: OrderStatus


class OrderCancelRequest(BaseModel):
    reason: str | None = Field(default=None, max_length=500)


class OrderRead(BaseModel):
    id: int
    user_id: int
    status: OrderStatus
    total: Decimal
    items: list[dict]
    cancellation_reason: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(default=1, ge=1, le=99)


class CartItemUpdate(BaseModel):
    quantity: int = Field(ge=1, le=99)


class CartLineRead(BaseModel):
    product_id: int
    name: str
    image_url: str | None
    quantity: int
    unit_price: Decimal
    line_total: Decimal


class CartRead(BaseModel):
    items: list[CartLineRead]
    total: Decimal