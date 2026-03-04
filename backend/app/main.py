from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings


app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.cors_origins.split(',') if origin.strip()],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/health')
def health_check() -> dict[str, str]:
    return {'status': 'ok'}
