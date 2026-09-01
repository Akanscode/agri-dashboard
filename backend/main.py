from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import importlib


app = FastAPI(title="Nigeria Agri Forecasting API (light)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Welcome to the Nigeria Agri Forecasting API (light)"}


@app.get("/forecast")
def get_forecast(commodity: str = "Maize (white)", market: str = "Ibadan"):
    # Lazy import to avoid heavy import-time dependencies (pandas/statsmodels)
    try:
        forecasting = importlib.import_module("backend.src.forecasting")
    except Exception as e:
        raise HTTPException(status_code=501, detail=f"Forecasting module unavailable: {e}")

    try:
        # try to load sample dataframe from data folder if available
        BASE_DIR = Path(__file__).resolve().parent
        df_path = BASE_DIR / "data" / "wfp_food_prices_nga.csv"
        if not df_path.exists():
            raise FileNotFoundError("data file not found")

        df = forecasting.load_dataframe(df_path)
        series = forecasting.load_clean_series(df, commodity, market, unit="100 KG")
        if len(series) < 30:
            raise HTTPException(status_code=404, detail="Not enough data to forecast for the specified commodity and market.")
        forecast = forecasting.forecast_next_month(series)
        metrics = forecasting.evaluate_forecast(series)
        return {
            "commodity": commodity,
            "market": market,
            "history": [{"date": str(d.date()), "price": round(p, 2)} for d, p in series.items()],
            "forecasted_price": round(forecast, 2),
            "metrics": metrics,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/allocate")
def get_allocation():
    # Lazy import optimization module
    try:
        optimization = importlib.import_module("backend.src.optimization")
    except Exception as e:
        raise HTTPException(status_code=501, detail=f"Optimization module unavailable: {e}")

    forecasted_prices = {"Ibadan": 26000.0, "Lagos": 24500.0, "Dawanau": 22236.13}
    transport_cost = {"Ibadan": 800, "Lagos": 2100, "Dawanau": 1500}
    market_capacity = {"Ibadan": 40, "Lagos": 35, "Dawanau": 50}
    return optimization.optimize_allocation(forecasted_prices, transport_cost, market_capacity, supply_units=100)


@app.get("/commodities")
def get_commodities():
    # Attempt to read commodity list from data if available
    try:
        forecasting = importlib.import_module("backend.src.forecasting")
        BASE_DIR = Path(__file__).resolve().parent
        df_path = BASE_DIR / "data" / "wfp_food_prices_nga.csv"
        if not df_path.exists():
            return []
        df = forecasting.load_dataframe(df_path)
        return sorted(df["commodity"].unique().tolist())
    except Exception:
        return []


@app.get("/markets")
def get_markets(commodity: str = "Maize"):
    try:
        forecasting = importlib.import_module("backend.src.forecasting")
        BASE_DIR = Path(__file__).resolve().parent
        df_path = BASE_DIR / "data" / "wfp_food_prices_nga.csv"
        if not df_path.exists():
            return []
        df = forecasting.load_dataframe(df_path)
        return sorted(df[df["commodity"] == commodity]["market"].unique().tolist())
    except Exception:
        return []
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from backend.src.forecasting import load_clean_series, forecast_next_month, evaluate_forecast
from backend.src.optimization import optimize_allocation
from pathlib import Path



app = FastAPI(title = "Nigeria Agri Forecasting API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
BASE_DIR = Path(__file__).resolve().parent
df = pd.read_csv(BASE_DIR / "data" / "wfp_food_prices_nga.csv", skiprows=[1])
df["date"] = pd.to_datetime(df["date"])
df["price"] = pd.to_numeric(df["price"], errors="coerce")
df = df.dropna(subset=["price"])

@app.get("/")
def root():
    return {"message": "Welcome to the Nigeria Agri Forecasting API!"}
@app.get("/forecast")
def get_forecast(commodity: str = "Maize (white)", market: str = "Ibadan"):
    try:
        # Ensure forecasts are computed on the wholesale 100 KG series
        series = load_clean_series(df, commodity, market, unit="100 KG")
        if len(series) < 30:
            raise HTTPException(status_code=404, detail="Not enough data to forecast for the specified commodity and market.")
        forecast = forecast_next_month(series)
        metrics = evaluate_forecast(series)
        return {
            "commodity": commodity,
            "market": market,
            "history": [{"date": str(d.date()), "price": round(p, 2)} for d, p in series.items()],
            "forecasted_price": round(forecast, 2),
            "metrics": metrics,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/allocate")
def get_allocation():
    forecasted_prices = {"Ibadan": 26000.0, "Lagos": 24500.0, "Dawanau": 22236.13}
    transport_cost = {"Ibadan": 800, "Lagos": 2100, "Dawanau": 1500}
    market_capacity = {"Ibadan": 40, "Lagos": 35, "Dawanau": 50}
    return optimize_allocation(forecasted_prices, transport_cost, market_capacity, supply_units=100)


@app.get("/commodities")
def get_commodities():
    return sorted(df["commodity"].unique().tolist())


@app.get("/markets")
def get_markets(commodity: str = "Maize"):
    return sorted(df[df["commodity"] == commodity]["market"].unique().tolist())
