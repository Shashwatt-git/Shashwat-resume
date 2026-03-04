from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = 'portfolio-api'
    app_env: str = 'development'
    app_host: str = '0.0.0.0'
    app_port: int = 8000
    cors_origins: str = 'http://localhost:3000'

    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')


settings = Settings()
