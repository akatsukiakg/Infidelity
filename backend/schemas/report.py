from pydantic import BaseModel

class ReportBase(BaseModel):
    category: str
    description: str
    person_name: str
    instagram: str

class ReportCreate(ReportBase):
    pass

class ReportOut(ReportBase):
    id: int

    class Config:
        orm_mode = True
