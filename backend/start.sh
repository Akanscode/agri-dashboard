#!/usr/bin/env bash
set -e

# Start command used by Render: it provides $PORT env var
exec uvicorn backend.main:app --host 0.0.0.0 --port "${PORT:-10000}"
