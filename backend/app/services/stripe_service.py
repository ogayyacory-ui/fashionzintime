from fastapi import HTTPException, status

from app.core.config import settings
from app.models.order import Order
from app.schemas.payment import PaymentIntentResponse


def create_stripe_intent(order: Order) -> PaymentIntentResponse:
    if not settings.stripe_secret_key:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Stripe is not configured")
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="Stripe payment processing has not been implemented")