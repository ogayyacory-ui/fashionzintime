from fastapi import APIRouter, HTTPException, status

from app.schemas.help import HelpRequest, HelpResponse

router = APIRouter()


@router.post("/contact", response_model=HelpResponse)
def contact_support(payload: HelpRequest):
    del payload
    raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Support delivery is not configured yet")