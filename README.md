# 3D Word Cloud – Sai Santhosh

An interactive web application that visualizes key topics from a news article as a 3D word cloud.

The user provides an article URL →
the backend fetches and analyzes the article text →
the frontend renders an engaging, interactive 3D visualization using React Three Fiber.

This project demonstrates end-to-end integration between a modern frontend and a lightweight NLP/ML backend.

# Features

Enter any news/article URL

Backend crawls and analyzes article content

Keywords extracted using TF-IDF

Results visualized as a 3D rotating word cloud

Word size & color reflect importance

Smooth animation for visual appeal

# Tech Stack
Frontend

React (TypeScript)

React Three Fiber (Three.js for React)

@react-three/drei

Fetch API

Backend

Python

FastAPI

Requests + BeautifulSoup (article crawling & parsing)

scikit-learn (TF-IDF keyword extraction)

# How It Works

User enters a news/article URL in the UI

Frontend sends the URL to the backend via POST /analyze

Backend:

Fetches article HTML

Extracts paragraph text

Cleans and preprocesses text

Applies TF-IDF to find important keywords

Normalizes keyword weights

Frontend:

Receives { word, weight }[]

Positions words in 3D space

Scales and colors words based on weight

Auto-rotates the scene for interactivity

# API
POST /analyze

Request

{
  "url": "https://en.wikipedia.org/wiki/OpenAI"
}


Response

[
  { "word": "openai", "weight": 1 },
  { "word": "ai", "weight": 0.26 },
  { "word": "company", "weight": 0.19 }
]

# Running the Project (One Command)
Prerequisites

Node.js (v18+ recommended)

Python 3.9+

Start everything
./setup.sh


This script will:

Install backend dependencies

Install frontend dependencies

Start FastAPI backend (port 8000)

Start React frontend (port 3000)

# URLs

Frontend: http://localhost:3000

Backend API Docs: http://localhost:8000/docs

# Notes

Article crawling is intentionally simple (paragraph-based)

Wikipedia and most news articles work best

Focus is on clarity, structure, and creativity

Emphasis on complete end-to-end flow
