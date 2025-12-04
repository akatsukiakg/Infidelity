from sqlalchemy import Column, Integer, String, DateTime, func
from database import Base

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, index=True)
    person_name = Column(String, index=True)
    instagram = Column(String, index=True)
    description = Column(String)
    location = Column(String, index=True)
    created_at = Column(DateTime, server_default=func.now())
