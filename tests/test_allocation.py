from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def test_allocate_uses_live_forecast_prices_for_commodity():
    commodity = "Maize (white)"
    forecast_response = client.get("/forecast", params={"commodity": commodity, "market": "Ibadan"})
    assert forecast_response.status_code == 200, forecast_response.text

    allocation_response = client.get("/allocate", params={"commodity": commodity, "supply_units": 100})
    assert allocation_response.status_code == 200, allocation_response.text

    payload = allocation_response.json()
    assert {"Ibadan", "Lagos", "Dawanau"}.issubset(payload["net_value_per_unit"].keys())

    expected_ibadan = client.get("/forecast", params={"commodity": commodity, "market": "Ibadan"}).json()["forecasted_price"]
    expected_lagos = client.get("/forecast", params={"commodity": commodity, "market": "Lagos"}).json()["forecasted_price"]
    expected_dawanau = client.get("/forecast", params={"commodity": commodity, "market": "Dawanau"}).json()["forecasted_price"]

    transport_cost = {"Ibadan": 800, "Lagos": 2100, "Dawanau": 1500}
    assert payload["net_value_per_unit"]["Ibadan"] == expected_ibadan - transport_cost["Ibadan"]
    assert payload["net_value_per_unit"]["Lagos"] == expected_lagos - transport_cost["Lagos"]
    assert payload["net_value_per_unit"]["Dawanau"] == expected_dawanau - transport_cost["Dawanau"]
