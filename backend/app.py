from fastapi import FastAPI
from routers import reports

app = FastAPI(title="Report Infidelities API")

app.include_router(reports.router)
