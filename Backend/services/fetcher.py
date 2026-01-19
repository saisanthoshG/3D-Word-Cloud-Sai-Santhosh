import re
import requests
from bs4 import BeautifulSoup


def fetch_article_text(url: str) -> str:
    """
    Fetches article text from a URL by extracting all <p> tags.
    """
    response = requests.get(
        url,
        timeout=15,
        headers={"User-Agent": "Mozilla/5.0"}
    )
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "lxml")
    paragraphs = soup.find_all("p")

    text = " ".join(p.get_text(strip=True) for p in paragraphs)

    # Basic cleanup
    text = re.sub(r"\s+", " ", text).strip()
    return text
