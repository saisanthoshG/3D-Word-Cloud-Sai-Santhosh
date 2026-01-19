#!/bin/bash

echo "Starting 3D Word Cloud Project..."

# ---------- Backend ----------
echo "Setting up backend..."
cd Backend || exit

# Create virtual environment if not exists
if [ ! -d ".venv" ]; then
  python -m venv .venv
fi

# Activate virtual environment (cross-platform)
if [[ "$OSTYPE" == "msys"* || "$OSTYPE" == "cygwin"* || "$OSTYPE" == "win32"* ]]; then
  source .venv/Scripts/activate
else
  source .venv/bin/activate
fi

# Install backend dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Start backend
echo "Starting FastAPI backend on http://localhost:8000"
uvicorn main:app --reload --port 8000 &

# ---------- Frontend ----------
echo "Setting up frontend..."
cd ../frontend || exit

# Install frontend dependencies
npm install

# Start frontend
echo "Starting frontend on http://localhost:3000"
npm start &

# ---------- Done ----------
wait
