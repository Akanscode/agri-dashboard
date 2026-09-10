// lib/api.ts

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://agri-dashboard-3ijl.onrender.com").replace(/\/$/, "");
const API_TIMEOUT_MS = 20000;

function apiRequest(input: string): Promise<Response> {
  return fetch(input, {
    cache: "no-store",
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
  });
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
  const res = await apiRequest(
    `${API_BASE}/forecast?commodity=${encodeURIComponent(commodity)}&market=${encodeURIComponent(market)}`
  );
  if (!res.ok) throw new Error(`Forecast request failed: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getAllocation(): Promise<AllocationResponse> {
  const res = await apiRequest(`${API_BASE}/allocate`);
  if (!res.ok) throw new Error(`Allocation request failed: ${res.status} ${res.statusText}`);
  return res.json();
}