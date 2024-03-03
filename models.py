from sqlalchemy import Column, Integer, ARRAY, Text
from database import Base


class User(Base):
    __tablename__ = 'forms'

    creation_date = Column(Text)
    id = Column(Text, primary_key=True)
    status = Column(Text)
    name = Column(Text)
    gender = Column(Text)
    preferences = Column(Text)
    city = Column(Text)
    age = Column(Integer)
    vk_url = Column(Text)
    target = Column(ARRAY(Text))
    about = Column(Text)
    photos = Column(ARRAY(Text))
    warns = Column(Integer)