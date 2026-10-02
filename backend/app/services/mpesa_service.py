from fastapi import HTTPException, status

from app.core.config import settings
from app.models.order import Order
from app.schemas.payment import PaymentIntentResponse


def create_mpesa_intent(order: Order) -> PaymentIntentResponse:
    if not settings.mpesa_consumer_key or not settings.mpesa_consumer_secret:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="M-Pesa is not configured")
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="M-Pesa payment processing has not been implemented")