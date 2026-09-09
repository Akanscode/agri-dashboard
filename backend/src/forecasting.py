from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_percentage_error, r2_score
from statsmodels.tsa.arima.model import ARIMA


def _sample_dataframe():
    dates = pd.date_range(end=pd.Timestamp.today().normalize(), periods=48, freq="ME")
    rows = []
    markets = {"Ibadan": 26000.0, "Lagos": 24500.0, "Dawanau": 22236.13}
    for market, base_price in markets.items():
        for index, date in enumerate(dates):
            rows.append(
                {
                    "date": date,
                    "commodity": "Maize (white)",
                    "market": market,
                    "unit": "100 KG",
                    "price": base_price + index * 125 + 350 * np.sin(index / 3),
                }
            )
    return pd.DataFrame(rows)


def load_dataframe(path: Path):
    if not path.exists():
        return _sample_dataframe()

    dataframe = pd.read_csv(path, skiprows=[1])
    dataframe["date"] = pd.to_datetime(dataframe["date"], errors="coerce")
    dataframe["price"] = pd.to_numeric(dataframe["price"], errors="coerce")
    return dataframe.dropna(subset=["date", "price"])


def load_clean_series(dataframe, commodity, market, unit="KG"):
    series = dataframe[
        (dataframe["commodity"] == commodity)
        & (dataframe["market"] == market)
        & (dataframe["unit"] == unit)
    ].sort_values("date")
    series = series.set_index("date")["price"]
    if series.empty:
        return series
    series.index = series.index.to_period("M").to_timestamp(how="end")
    return series.asfreq("ME").interpolate()


def forecast_next_month(series, order=(1, 1, 1)):
    model = ARIMA(series, order=order).fit()
    return float(model.forecast(steps=1).iloc[0])


def evaluate_forecast(series, n_test=24):
    test_size = min(n_test, max(1, len(series) // 2))
    naive_predictions, arima_predictions, actuals = [], [], []
    for index in range(len(series) - test_size, len(series)):
        train_window = series.iloc[:index]
        naive_predictions.append(train_window.iloc[-1])
        try:
            fitted = ARIMA(train_window, order=(1, 1, 1)).fit()
            arima_predictions.append(float(fitted.forecast(steps=1).iloc[0]))
        except Exception:
            arima_predictions.append(float(train_window.iloc[-1]))
        actuals.append(series.iloc[index])

    return {
        "naive_mape": round(mean_absolute_percentage_error(actuals, naive_predictions) * 100, 2),
        "arima_mape": round(mean_absolute_percentage_error(actuals, arima_predictions) * 100, 2),
        "naive_r2": round(r2_score(actuals, naive_predictions), 3),
        "arima_r2": round(r2_score(actuals, arima_predictions), 3),
    }
