from decimal import Decimal

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.product import Product
from app.models.transaction import Transaction
from app.schemas.admin import AnalyticsSummary, DashboardStats


def dashboard_stats(db: Session) -> DashboardStats:
    product_count = db.scalar(select(func.count(Product.id))) or 0
    active_count = db.scalar(select(func.count(Product.id)).where(Product.is_active.is_(True))) or 0
    low_stock = db.scalar(select(func.count(Product.id)).where(Product.is_active.is_(True), Product.stock_quantity < 5)) or 0
    order_count = db.scalar(select(func.count(Order.id))) or 0
    pending_count = db.scalar(select(func.count(Order.id)).where(Order.status == "PENDING")) or 0
    gross_sales = db.scalar(select(func.coalesce(func.sum(Order.total), 0)).where(Order.status == "PAID")) or Decimal("0.00")
    return DashboardStats(product_count=product_count, active_product_count=active_count, low_stock_count=low_stock, order_count=order_count, pending_order_count=pending_count, gross_sales=gross_sales)


def analytics_summary(db: Session) -> AnalyticsSummary:
    daily_sales = db.execute(
        select(func.date(Transaction.created_at).label("date"), func.sum(Transaction.amount).label("sales"))
        .where(Transaction.status == "SUCCEEDED")
        .group_by(func.date(Transaction.created_at))
        .order_by(func.date(Transaction.created_at).desc())
        .limit(30)
    ).all()
    product_sales: dict[int, dict] = {}
    paid_orders = db.scalars(select(Order).where(Order.status == "PAID")).all()
    for order in paid_orders:
        for item in order.items:
            product_id = item["product_id"]
            quantity = item["quantity"]
            product = product_sales.setdefault(product_id, {"product_id": product_id, "name": item["name"], "units_sold": 0, "revenue": Decimal("0.00")})
            product["units_sold"] += quantity
            product["revenue"] += Decimal(item["unit_price"]) * quantity
    top_products = sorted(product_sales.values(), key=lambda product: product["revenue"], reverse=True)[:10]
    return AnalyticsSummary(daily_sales=[{"date": str(row.date), "sales": row.sales} for row in daily_sales], top_products=top_products)