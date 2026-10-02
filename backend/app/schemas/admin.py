from decimal import Decimal

from pydantic import BaseModel


class DashboardStats(BaseModel):
    product_count: int
    active_product_count: int
    low_stock_count: int
    order_count: int
    pending_order_count: int
    gross_sales: Decimal


class AnalyticsSummary(BaseModel):
    daily_sales: list[dict]
    top_products: list[dict]