import re
from typing import List, Dict
from sklearn.feature_extraction.text import TfidfVectorizer


def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_keywords(text: str, top_k: int = 50) -> List[Dict]:
    cleaned = clean_text(text)

    vectorizer = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2),
        max_features=2000
    )

    X = vectorizer.fit_transform([cleaned])
    scores = X.toarray()[0]
    terms = vectorizer.get_feature_names_out()

    pairs = sorted(
        zip(terms, scores),
        key=lambda x: x[1],
        reverse=True
    )[:top_k]

    max_score = pairs[0][1] if pairs else 1.0

    return [
        {"word": term, "weight": float(score / max_score)}
        for term, score in pairs
        if score > 0
    ]
