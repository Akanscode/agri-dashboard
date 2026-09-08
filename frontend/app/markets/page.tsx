import Link from "next/link";
import { Metadata } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const metadata: Metadata = {
  title: "Market Comparison",
  description: "Compare markets and view forecasts",
};

async function fetchMarkets(commodity = "Maize (white)") {
  const res = await fetch(`${API_BASE}/markets?commodity=${encodeURIComponent(commodity)}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function MarketsPage() {
  const markets: string[] = await fetchMarkets();

  return (
    <main className="flex-1 min-h-screen bg-parchment">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-navy to-navy-light text-parchment border-b border-navy-light/20 shadow-lg">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-serif text-4xl font-bold text-parchment mb-2">
              Market Comparison
            </h1>
            <p className="text-parchment/80 text-lg">
              Explore agricultural markets across Nigeria and view price forecasts
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-6xl mx-auto">
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="font-serif text-2xl font-bold text-navy mb-2">
              Available Markets
            </h2>
            <p className="text-muted">
              Select a market to view the latest forecast and historical price data for Maize (white)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {markets.map((m) => (
              <Link
                key={m}
                href={`/?market=${encodeURIComponent(m)}`}
                className="group block bg-cream border border-border rounded-lg shadow-lg hover:shadow-xl hover:border-accent/30 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-xl font-bold text-navy group-hover:text-accent transition-colors">
                      {m}
                    </h3>
                    <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">
                    View forecast and price history
                  </p>
                  <div className="mt-4 pt-4 border-t border-border/40 text-xs text-muted uppercase tracking-widest font-medium">
                    Click to view details
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="mt-12 pt-8 border-t border-border">
          <div className="bg-cream border border-border rounded-lg p-8">
            <h3 className="font-serif text-lg font-bold text-navy mb-3 flex items-center gap-2">
              <span>💡</span> How to Use
            </h3>
            <p className="text-muted mb-3">
              Click on any market to view detailed price forecasts and historical trends for the selected location. The dashboard will show the current price, next month's forecast, and model accuracy metrics.
            </p>
            <p className="text-sm text-muted/70">
              All forecasts are generated using ARIMA time-series models trained on historical WFP price data.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
