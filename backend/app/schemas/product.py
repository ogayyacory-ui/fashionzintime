from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class ProductCreate(BaseModel):
    name: str = Field(min_length=1, max_length=180)
    category: str = Field(min_length=1, max_length=80)
    description: str = ""
    image_url: HttpUrl | None = None
    price: Decimal = Field(gt=0, max_digits=10, decimal_places=2)
    stock_quantity: int = Field(default=0, ge=0)
    is_active: bool = True


class ProductUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=180)
    category: str | None = Field(default=None, min_length=1, max_length=80)
    description: str | None = None
    image_url: HttpUrl | None = None
    price: Decimal | None = Field(default=None, gt=0, max_digits=10, decimal_places=2)
    stock_quantity: int | None = Field(default=None, ge=0)
    is_active: bool | None = None


class ProductRead(BaseModel):
    id: int
    name: str
    category: str
    description: str
    image_url: str | None
    price: Decimal
    stock_quantity: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class InventoryResponse(BaseModel):
    id: int
    name: str
    category: str
    stock_quantity: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)