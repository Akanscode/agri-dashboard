// lib/api.ts

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://agri-dashboard-3ijl.onrender.com").replace(/\/$/, "");

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
    const res = await fetch(
      `${API_BASE}/forecast?commodity=${encodeURIComponent(commodity)}&market=${encodeURIComponent(market)}`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error(`Forecast request failed: ${res.status} ${res.statusText}`);
    return res.json();
  } catch (err) {
    // If backend is unreachable during local development or no API URL is configured,
    // return a sensible stub so the frontend can build/prerender without the backend.
    if (process.env.NODE_ENV === "development" || API_BASE.includes("localhost")) {
      console.warn("getForecast: backend unreachable, returning development stub:", err);
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
      } as ForecastResponse;
    }
    throw new Error(`Failed to fetch forecast from ${API_BASE}: ${String(err)}`);
  }
}

export async function getAllocation(): Promise<AllocationResponse> {
  try {
    const res = await fetch(`${API_BASE}/allocate`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Allocation request failed: ${res.status} ${res.statusText}`);
    return res.json();
  } catch (err) {
    if (process.env.NODE_ENV === "development" || API_BASE.includes("localhost")) {
      console.warn("getAllocation: backend unreachable, returning development stub:", err);
      return {
        allocation: { Ibadan: 40, Lagos: 35, Dawanau: 25 },
        total_net_value: 2310403.25,
        net_value_per_unit: { Ibadan: 26000, Lagos: 24500, Dawanau: 22236 },
      } as AllocationResponse;
    }
    throw new Error(`Failed to fetch allocation from ${API_BASE}: ${String(err)}`);
  }
}