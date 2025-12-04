from fastapi import FastAPI
from routers import reports
from database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Report Infidelities API")

app.include_router(reports.router)
