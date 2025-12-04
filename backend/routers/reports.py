from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models.report import Report
from schemas.report import ReportCreate, ReportOut

router = APIRouter(prefix="/reports", tags=["Reports"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ReportOut)
def create_report(data: ReportCreate, db: Session = Depends(get_db)):
    new_report = Report(
        category=data.category,
        person_name=data.person_name,
        instagram=data.instagram,
        description=data.description
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report


@router.get("/", response_model=list[ReportOut])
def get_reports(db: Session = Depends(get_db)):
    return db.query(Report).all()
