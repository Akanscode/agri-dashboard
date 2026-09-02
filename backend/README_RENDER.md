Deploying the backend to Render

Quick steps

1. Push your changes to GitHub on the `main` branch.

2. Create a new service on Render (Dashboard -> New -> Web Service).

3. Connect your GitHub repo `Akanscode/agri-dashboard` and select the `main` branch.

4. Configure the service:
   - Environment: `Python 3`
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `bash backend/start.sh`

Render sets the `PORT` environment variable automatically; the `start.sh` script uses it.

Notes & recommendations
- If install of `pandas` or other binary packages fails, choose the Docker option on Render and use a Linux base image that has compatible wheels.
- Alternatively, create a small `Dockerfile` in `backend/` and choose "Docker" as the Environment when creating the service.

Optional Dockerfile (example)

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ ./backend/
EXPOSE 10000
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "10000"]
```
