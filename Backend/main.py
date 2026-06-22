# pylint: disable=C0114,C0115,C0116,C0301,C0304,C0303,W0612
from fastapi import FastAPI, Depends, HTTPException
import joblib
import pandas as pd
from pydantic import BaseModel
from database import engine
from models import Trade
from database import Base
from database import SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from models import User
from jose import jwt
from datetime import datetime, timedelta
from fastapi import Header


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

SECRET_KEY = "tradesense_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

model = joblib.load("random_forest_model.pkl")
model_columns = joblib.load("model_columns.pkl")

class TradeInput(BaseModel):
    setup : str
    session : str
    emotion : str
    pair : str

class TradeRecord(BaseModel):
    setup : str
    session : str
    emotion : str
    pair : str
    result : str
    pnl : float
    journal_entry: str
    lessons_learned: str
    trade_rating: int

class UserRegister(BaseModel):
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


def create_access_token(data: dict):

    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(
        minutes = ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode.update(
        {"exp": expire}
    )
    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm = ALGORITHM
    )
    return encoded_jwt


def get_current_user(
    authorization: str = Header(None)
):
    print("Authorization header:", authorization)

    if not authorization:
        return None

    token = authorization.split(" ")[1]

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("Payload:", payload)

        return payload["sub"]

    except Exception as e:
        print("JWT Error:", e)
        return None


@app.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )
    if existing_user:
        return{
            "message" : "Email already exists"
        }
    
    print(user.password)
    print(type(user.password))
    hashed_password = pwd_context.hash(
        user.password
    )
    new_user = User(
        email =  user.email,
        password_hash = hashed_password
    )
    db.add(new_user)
    db.commit()

    return{
        "message" : "User registered successfully"
    }


@app.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    db_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )
    if not db_user:
        return{
            "message" : "Invalid email or password"
        }
    if not pwd_context.verify(
        user.password,
        db_user.password_hash
    ):
      return{
            "message" : "Invalid email or password"
        }
    access_token = create_access_token(
        data = {
            "sub": str(db_user.id)
        }
    )  
    return{
        "access_token": access_token,
        "token_type": "bearer"
    }

@app.get("/")
def home():
    return {"message" : "AI Trading Journal Backend Running"}



@app.post('/predict')
def predict(trade:  TradeInput):
    new_trade = pd.DataFrame({
        "setup": [trade.setup],
        "session": [trade.session],
        "emotion": [trade.emotion],
        "pair": [trade.pair]
    })

    new_trade_encoded = pd.get_dummies(new_trade)
    new_trade_encoded = new_trade_encoded.reindex(columns = model_columns, fill_value = 0)

    prediction = model.predict(new_trade_encoded)[0]
    result = "WIN" if prediction == 1 else "LOSS"

    probability = model.predict_proba(new_trade_encoded)[0]
    win_probability = round(probability[1] * 100, 2)

    return {
        "Prediction" : result,
        "win_probability" : win_probability,
        "Setup": trade.setup,
        "Session": trade.session,
        "Pair": trade.pair
    }



@app.get("/health")
def health():
    return {"status": "running"}



@app.post("/add-trade")
def add_trade(
    trade: TradeRecord,
    db: Session = Depends(get_db)
):

    new_trade = Trade(
        setup=trade.setup,
        session=trade.session,
        emotion=trade.emotion,
        pair=trade.pair,
        result=trade.result,
        pnl=trade.pnl,
        journal_entry=trade.journal_entry,
        lessons_learned=trade.lessons_learned,
        trade_rating=trade.trade_rating
    )

    db.add(new_trade)
    db.commit()

    return {
        "message": "Trade saved successfully"
    }
 


@app.get("/analytics")
def analytics(
    db: Session = Depends(get_db)
):
    
    trades = (
    db.query(Trade)
    .all()
    )

    total_trades = len(trades)

    total_pnl = sum(
        trade.pnl
        for trade in trades
    )

    wins = sum(
        1
        for trade in trades
        if trade.result == "WIN"
    )

    win_rate = (
        (wins / total_trades) * 100
        if total_trades > 0
        else 0
    ) 

    return {
        "total_trades": total_trades,
        "total_pnl": total_pnl,
        "win_rate": round(win_rate, 2)
    }



@app.get("/best_setup")
def best_setup(
    db: Session = Depends(get_db)
):

    trades = (
    db.query(Trade)
    .all()
    )

    setup_stats = {}

    for trade in trades:

        if trade.setup not in setup_stats:

            setup_stats[trade.setup] = {
                "wins": 0,
                "total": 0
            }

        setup_stats[trade.setup]["total"] += 1

        if trade.result == "WIN":
            setup_stats[trade.setup]["wins"] += 1

    best_setup_name = None
    best_rate = 0

    for setup, stats in setup_stats.items():

        rate = (
            stats["wins"]
            / stats["total"]
        ) * 100

        if rate > best_rate:

            best_rate = rate
            best_setup_name = setup

    return{
        "best_setup": best_setup_name,
        "win_rate": round(best_rate, 2)
    }


@app.get("/setup-performance")
def setup_performance(
    db: Session = Depends(get_db)
):
    trades = db.query(Trade).all()

    setup_stats = {}

    for trade in trades:

        if trade.setup not in setup_stats:
            setup_stats[trade.setup] = {
                "wins": 0,
                "total": 0
            }

        setup_stats[trade.setup]["total"] += 1

        if trade.result == "WIN":
            setup_stats[trade.setup]["wins"] += 1

    result = []

    for setup, stats in setup_stats.items():

        win_rate = (
            stats["wins"] / stats["total"]
        ) * 100

        result.append({
            "setup": setup,
            "winRate": round(win_rate, 2)
        })

    return result


@app.get("/best-session")
def best_session(
    db: Session = Depends(get_db)
):

    trades = (
    db.query(Trade)
    .all()
    )

    session_stats = {}

    for trade in trades:

        if trade.session not in session_stats:

            session_stats[trade.session] = {
                "wins": 0,
                "total": 0
            }

        session_stats[trade.session]["total"] += 1

        if trade.result == "WIN":
            session_stats[trade.session]["wins"] += 1

    best_session_name = None
    best_rate = 0

    for session, stats in session_stats.items():

        rate = (
            stats["wins"]
            / stats["total"]
        ) * 100

        if rate > best_rate:

            best_rate = rate
            best_session_name = session

    return {
        "best_session": best_session_name,
        "win_rate": round(best_rate, 2)
    }

@app.get("/session-performance")
def session_performance(
    db: Session = Depends(get_db)
):
    trades = db.query(Trade).all()

    session_stats = {}

    for trade in trades:

        if trade.session not in session_stats:
            session_stats[trade.session] = {
                "profit": 0,
                "wins": 0,
                "total": 0
            }

        session_stats[trade.session]["profit"] += trade.pnl
        session_stats[trade.session]["total"] += 1

        if trade.result == "WIN":
            session_stats[trade.session]["wins"] += 1

    result = []

    for session, stats in session_stats.items():

        win_rate = (
            stats["wins"] / stats["total"]
        ) * 100

        result.append({
            "session": session,
            "profit": stats["profit"],
            "winRate": round(win_rate, 2)
        })

    return result

@app.get("/emotion-analysis")
def emotion_analysis(
    db: Session = Depends(get_db)
):

    trades = (
    db.query(Trade)
    .all()
)

    emotion_stats = {}

    for trade in trades:

        if trade.emotion not in emotion_stats:

            emotion_stats[trade.emotion] = {
                "wins": 0,
                "total": 0
            }

        emotion_stats[trade.emotion]["total"] += 1

        if trade.result == "WIN":
            emotion_stats[trade.emotion]["wins"] += 1

    result = {}

    for emotion, stats in emotion_stats.items():

        result[emotion] = round(
            (stats["wins"] / stats["total"]) * 100,
            2
        )

    return result


@app.get("/pair-analysis")
def pair_analysis(
    db: Session = Depends(get_db)
):

    trades = (
    db.query(Trade)
    .all()
    )
    pair_stats = {}

    for trade in trades:

        if trade.pair not in pair_stats:

            pair_stats[trade.pair] = {
                "wins": 0,
                "total": 0
            }

        pair_stats[trade.pair]["total"] += 1

        if trade.result == "WIN":
            pair_stats[trade.pair]["wins"] += 1

    result = {}

    for pair, stats in pair_stats.items():

        result[pair] = round(
            (stats["wins"] / stats["total"]) * 100,
            2
        )


    return result


@app.get("/recent-trades")
def recent_trades(
    db: Session = Depends(get_db)
):

    trades = (
        db.query(Trade)
        .order_by(Trade.id.desc())
        .limit(5)
        .all()
    )

    return [
        {
            "setup": t.setup,
            "session": t.session,
            "emotion": t.emotion,
            "pair": t.pair,
            "result": t.result,
            "pnl": t.pnl
        }
        for t in trades
    ]


@app.get("/trade-options")
def trade_options(
    db: Session = Depends(get_db)
):
    trades = db.query(Trade).all()

    sessions = sorted(
        list(set(trade.session for trade in trades))
    )

    setups = sorted(
        list(set(trade.setup for trade in trades))
    )

    emotions = sorted(
        list(set(trade.emotion for trade in trades))
    )

    pairs = sorted(
        list(set(trade.pair for trade in trades))
    )

    return {
        "sessions": sessions,
        "setups": setups,
        "emotions": emotions,
        "pairs": pairs
    }



