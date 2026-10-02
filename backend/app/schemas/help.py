from pydantic import BaseModel, EmailStr, Field


class HelpRequest(BaseModel):
    email: EmailStr
    subject: str = Field(min_length=1, max_length=160)
    message: str = Field(min_length=1, max_length=5000)


class HelpResponse(BaseModel):
    message: str