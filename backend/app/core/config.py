from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "sqlite:///./fashionzintime.db"
    secret_key: str = "change-this-development-secret-before-deploying"
    access_token_expire_minutes: int = 60
    cors_origins: list[str] = ["http://localhost:5173"]
    stripe_secret_key: str | None = None
    mpesa_consumer_key: str | None = None
    mpesa_consumer_secret: str | None = None

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()