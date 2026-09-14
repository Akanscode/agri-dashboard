from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import importlib
import os
from functools import lru_cache


DEFAULT_COMMODITY = "Maize (white)"
ALLOCATION_MARKETS = ("Ibadan", "Lagos", "Dawanau")
TRANSPORT_COST = {"Ibadan": 800, "Lagos": 2100, "Dawanau": 1500}
MARKET_CAPACITY = {"Ibadan": 40, "Lagos": 35, "Dawanau": 50}


app = FastAPI(title="Nigeria Agri Forecasting API (light)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        os.getenv("FRONTEND_URL", "https://agri-dashboard-frontend.onrender.com"),
    ],
    allow_origin_regex=r"https://.*\.onrender\.com",
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["system"])
def root():
    return {"message": "Welcome to the Nigeria Agri Forecasting API (light)"}


@app.get("/health", tags=["system"])
def health():
    return {"status": "ok"}


@lru_cache(maxsize=32)
def _calculate_forecast(commodity: str, market: str):
    forecasting = importlib.import_module("backend.src.forecasting")
    base_dir = Path(__file__).resolve().parent
    data_path = base_dir / "data" / "wfp_food_prices_nga.csv"
    dataframe = forecasting.load_dataframe(data_path)
    series = forecasting.load_clean_series(dataframe, commodity, market, unit="100 KG")
    if series.empty:
        raise LookupError(f"No price data found for commodity '{commodity}' in market '{market}'.")
    if len(series) < 30:
        raise ValueError("Not enough data to forecast for the specified commodity and market.")

    forecast = forecasting.forecast_next_month(series)
    metrics = forecasting.evaluate_forecast(series)
    return {
        "commodity": commodity,
        "market": market,
        "history": [{"date": str(date.date()), "price": round(price, 2)} for date, price in series.items()],
        "forecasted_price": round(forecast, 2),
        "metrics": metrics,
    }


@app.get("/forecast", tags=["forecasting"])
def get_forecast(commodity: str = DEFAULT_COMMODITY, market: str = "Ibadan"):
    # Lazy import to avoid heavy import-time dependencies (pandas/statsmodels)
    try:
        return _calculate_forecast(commodity, market)
    except HTTPException:
        raise
    except LookupError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/allocate", tags=["optimization"])
def get_allocation(
    commodity: str = DEFAULT_COMMODITY,
    supply_units: float = Query(default=100.0, gt=0),
):
    # Lazy import optimization module
    try:
        optimization = importlib.import_module("backend.src.optimization")
    except Exception as e:
        raise HTTPException(status_code=501, detail=f"Optimization module unavailable: {e}")

    market_names = ALLOCATION_MARKETS
    try:
        forecasted_prices = {
            market: _calculate_forecast(commodity, market)["forecasted_price"] for market in market_names
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unable to forecast prices for allocation: {e}")

    return optimization.optimize_allocation(
        forecasted_prices, TRANSPORT_COST, MARKET_CAPACITY, supply_units=supply_units
    )


@app.get("/commodities", tags=["metadata"])
def get_commodities():
    # Attempt to read commodity list from data if available
    try:
        forecasting = importlib.import_module("backend.src.forecasting")
        BASE_DIR = Path(__file__).resolve().parent
        df_path = BASE_DIR / "data" / "wfp_food_prices_nga.csv"
        df = forecasting.load_dataframe(df_path)
        return sorted(df["commodity"].unique().tolist())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unable to load commodities: {e}")


@app.get("/markets", tags=["metadata"])
def get_markets(commodity: str = DEFAULT_COMMODITY):
    try:
        forecasting = importlib.import_module("backend.src.forecasting")
        BASE_DIR = Path(__file__).resolve().parent
        df_path = BASE_DIR / "data" / "wfp_food_prices_nga.csv"
        df = forecasting.load_dataframe(df_path)
        return sorted(df[df["commodity"] == commodity]["market"].unique().tolist())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unable to load markets: {e}")
