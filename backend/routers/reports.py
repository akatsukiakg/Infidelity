from fastapi import APIRouter, Depends, HTTPException
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
        location=data.location,
        description=data.description
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report


@router.get("/", response_model=list[ReportOut])
def get_reports(db: Session = Depends(get_db)):
    return db.query(Report).all()


@router.get("/search/instagram/{instagram_user}", response_model=list[ReportOut])
def get_reports_by_instagram(instagram_user: str, db: Session = Depends(get_db)):
    instagram_user_lower = instagram_user.lower()
    reports = db.query(Report).filter(Report.instagram.ilike(f"%{instagram_user_lower}%")).all()
    
    if not reports:
        raise HTTPException(
            status_code=404,
            detail=f"No se encontró el usuario de Instagram '{instagram_user}' en el listado. Intenta con otro usuario de IG"
        )
    
    return reports