from pydantic import BaseModel, Field


class PaymentIntentRequest(BaseModel):
    order_id: int
    provider: str = Field(pattern="^(stripe|mpesa)$")


class PaymentIntentResponse(BaseModel):
    provider: str
    status: str
    message: str