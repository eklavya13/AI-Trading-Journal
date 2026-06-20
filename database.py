# pylint: disable=C0114,C0115,C0116,C0301,C0304,C0303,W0612

import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://postgres:JohnCena!2356@localhost/trade_journal"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit = False,
    autoflush = False,
    bind = engine
)

Base = declarative_base()