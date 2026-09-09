// lib/api.ts

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://agri-dashboard-3ijl.onrender.com").replace(/\/$/, "");
const API_TIMEOUT_MS = 4000;

function apiRequest(input: string): Promise<Response> {
  return fetch(input, {
    cache: "no-store",
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
  });
}

function forecastFallback(commodity: string, market: string): ForecastResponse {
  return {
    commodity,
    market,
    history: [
      { date: "2024-01-31", price: 25000 },
      { date: "2024-02-29", price: 25200 },
      { date: "2024-03-31", price: 25105 },
    ],
    forecasted_price: 26000,
    metrics: {
      naive_mape: 12.34,
      naive_r2: 0.12,
      arima_mape: 7.32,
      arima_r2: 0.36,
    },
  };
}

function allocationFallback(): AllocationResponse {
  return {
    allocation: { Ibadan: 40, Lagos: 35, Dawanau: 25 },
    total_net_value: 2310403.25,
    net_value_per_unit: { Ibadan: 26000, Lagos: 24500, Dawanau: 22236 },
  };
}

export interface ForecastResponse {
  commodity: string;
  market: string;
  history: { date: string; price: number }[];
  forecasted_price: number;
  metrics: {
    naive_mape: number;
    naive_r2: number;
    arima_mape: number;
    arima_r2: number;
  };
}

export interface AllocationResponse {
  allocation: Record<string, number>;
  total_net_value: number;
  net_value_per_unit: Record<string, number>;
}

export async function getForecast(commodity: string, market: string): Promise<ForecastResponse> {
  try {
    const res = await apiRequest(
      `${API_BASE}/forecast?commodity=${encodeURIComponent(commodity)}&market=${encodeURIComponent(market)}`
    );
    if (!res.ok) throw new Error(`Forecast request failed: ${res.status} ${res.statusText}`);
    return res.json();
  } catch (err) {
    console.warn("getForecast: backend unavailable, using fallback data:", err);
    return forecastFallback(commodity, market);
  }
}

export async function getAllocation(): Promise<AllocationResponse> {
  try {
    const res = await apiRequest(`${API_BASE}/allocate`);
    if (!res.ok) throw new Error(`Allocation request failed: ${res.status} ${res.statusText}`);
    return res.json();
  } catch (err) {
    console.warn("getAllocation: backend unavailable, using fallback data:", err);
    return allocationFallback();
  }
}