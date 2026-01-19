# README.md

````md
# 3D Word Cloud – Sai Santhosh

An interactive web application that visualizes key topics from a news article as a 3D word cloud.

The user provides an article URL →  
the backend fetches and analyzes the article text →  
the frontend renders an engaging, interactive 3D visualization using React Three Fiber.

This project demonstrates end-to-end integration between a modern frontend and a lightweight NLP/ML backend.

---

## Features

- Enter any news or article URL
- Backend crawls and analyzes article content
- Keywords extracted using TF-IDF
- Results visualized as a 3D rotating word cloud
- Word size and color reflect importance
- Smooth animation for visual appeal

---

## Tech Stack

### Frontend
- React (TypeScript)
- React Three Fiber (Three.js for React)
- @react-three/drei
- Fetch API

### Backend
- Python
- FastAPI
- Requests + BeautifulSoup (article crawling & parsing)
- scikit-learn (TF-IDF keyword extraction)

---

## How It Works

1. The user enters a news/article URL in the UI.
2. The frontend sends the URL to the backend via `POST /analyze`.
3. The backend:
   - Fetches article HTML
   - Extracts paragraph text
   - Cleans and preprocesses content
   - Applies TF-IDF to extract important keywords
   - Normalizes keyword weights
4. The frontend:
   - Receives `{ word, weight }[]`
   - Positions words in 3D space
   - Scales and colors words based on importance
   - Auto-rotates the scene for interactivity

---

## API

### `POST /analyze`

## Request
```json
{
  "url": "https://en.wikipedia.org/wiki/OpenAI"
}
````

## Response

```json
[
  { "word": "openai", "weight": 1 },
  { "word": "ai", "weight": 0.26 },
  { "word": "company", "weight": 0.19 }
]
```

---

## Running the Project (One Command)

### Prerequisites

* Node.js (v18+ recommended)
* Python 3.9+
* Git Bash / WSL (for Windows users)

### Start Everything

```bash
./setup.sh
```

This single command will:

* Install backend dependencies
* Install frontend dependencies
* Start the FastAPI backend on **[http://localhost:8000](http://localhost:8000)**
* Start the React frontend on **[http://localhost:3000](http://localhost:3000)**

---

## URLs

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API Docs (Swagger): [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Notes

* Article crawling is intentionally simple and paragraph-based
* Wikipedia and most standard news articles work best
* Focus is on:

  * End-to-end data flow
  * Code clarity and structure
  * Creative 3D visualization
* Not all edge cases are handled by design


