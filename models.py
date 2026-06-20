# pylint: disable=C0114,C0115,C0116,C0301,C0304,C0303,W0612

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import ForeignKey 
from database import Base

class Trade(Base):

    __tablename__ = "trades"

    id = Column(Integer, primary_key = True, index = True)
    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )
    setup = Column(String)
    session = Column(String)
    emotion = Column(String)
    pair = Column(String)

    result = Column(String)

    pnl = Column(Float)

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True)

    password_hash = Column(String)  