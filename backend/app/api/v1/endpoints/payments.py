from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user, get_db
from app.models.user import User
from app.schemas.payment import PaymentIntentRequest, PaymentIntentResponse
from app.services.order_service import get_order_for_user
from app.services.stripe_service import create_stripe_intent
from app.services.mpesa_service import create_mpesa_intent

router = APIRouter()


@router.post("/intent", response_model=PaymentIntentResponse)
def create_payment_intent(payload: PaymentIntentRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    order = get_order_for_user(db, payload.order_id, user.id)
    if order.status != "PENDING":
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Only pending orders can be paid")
    if payload.provider == "stripe":
        return create_stripe_intent(order)
    return create_mpesa_intent(order)