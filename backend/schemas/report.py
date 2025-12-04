from pydantic import BaseModel, ConfigDict
from typing import Optional

class ReportBase(BaseModel):
    category: str
    description: str
    person_name: Optional[str] = None
    instagram: Optional[str] = None
    location: Optional[str] = None

class ReportCreate(ReportBase):
    pass

class ReportOut(ReportBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
