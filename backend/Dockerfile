FROM python:3.11-slim
WORKDIR /app

# Install system deps for pandas/statsmodels
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libopenblas-dev \
    liblapack-dev \
    gfortran \
    wget \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/
# Keep working directory at /app so the package `backend` is importable
WORKDIR /app
EXPOSE 10000
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "10000"]
