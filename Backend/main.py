from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl

from services.fetcher import fetch_article_text
from services.analyzer import extract_keywords


# -------------------------
# FastAPI app
# -------------------------
app = FastAPI(title="3D Word Cloud API")


# -------------------------
# CORS (allow frontend to call backend)
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# Request / Response Models
# -------------------------

class AnalyzeRequest(BaseModel):
    url: str


class Keyword(BaseModel):
    word: str
    weight: float


# -------------------------
# Routes (Endpoints)
# -------------------------

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze", response_model=List[Keyword])
def analyze(req: AnalyzeRequest):
    try:
        text = fetch_article_text(str(req.url))

        if not text or len(text.strip()) < 200:
            raise HTTPException(
                status_code=400,
                detail="Not enough article text found"
            )

        keywords = extract_keywords(text, top_k=50)
        return keywords

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
