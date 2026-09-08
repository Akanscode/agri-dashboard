// app/page.tsx

import { getForecast, getAllocation } from "@/app/lib/api/api";
import StatCard from "@/components/ui/StatCard";
import PriceChartClient from "@/components/PriceChartClient";

export default async function Dashboard() {
  const forecast = await getForecast("Maize (white)", "Ibadan");
  const allocation = await getAllocation();

  const currentPrice = forecast.history.at(-1)?.price || 0;
  const priceChange = forecast.forecasted_price - currentPrice;
  const priceChangePercent = ((priceChange / currentPrice) * 100).toFixed(1);

  return (
    <main className="flex-1 min-h-screen bg-parchment">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-parchment  shadow-lg">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="font-serif text-4xl font-bold text-parchment mb-2">
                  Dashboard
                </h1>
                <p className="text-parchment/80 text-lg">
                  Real-time agricultural price forecasting and optimization
                </p>
              </div>
              <div className="text-right text-parchment/70">
                <p className="text-sm uppercase tracking-widest font-medium">Current Focus</p>
                <p className="font-serif text-2xl font-bold text-accent">{forecast.commodity}</p>
                <p className="text-sm">{forecast.market}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-6xl mx-auto">
        {/* Key Metrics Section */}
        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-navy mb-6">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              label="Current Price"
              value={<span className="font-sans">₦{currentPrice.toLocaleString()}</span>}
            />
            <StatCard
              label="Next Month Forecast"
              value={<span className="font-sans">₦{forecast.forecasted_price.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>}
              sublabel={<span>{priceChange >= 0 ? '↑' : '↓'} {Math.abs(Number(priceChangePercent))}% (<span className="font-sans">₦{Math.abs(priceChange).toFixed(0)}</span>)</span>}
            />
            <StatCard
              label="R² (walk-forward)"
              value={forecast.metrics.arima_r2}
              sublabel={`MAPE: ${forecast.metrics.arima_mape}%`}
            />
          </div>
        </section>

        {/* Price Analysis Section */}
        <section className="mb-8">
          <div className="bg-gray-100  rounded-lg shadow-classic overflow-hidden">
            <div className="bg-white/60  p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-green-800 mb-1">
                    Price Trend Analysis
                  </h2>
                  <p className="text-muted text-sm">
                    {forecast.commodity} price history and 12-month forecast using ARIMA model
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-widest text-muted font-medium mb-1">
                    Forecast Period
                  </div>
                  <div className="text-lg font-semibold text-green-800">Next 12 Months</div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <PriceChartClient data={forecast.history} title="Price History & Forecast" />
            </div>
          </div>
        </section>

        {/* Optimization Section */}
        <section>
          <div className="bg-gray-100  rounded-lg shadow-classic overflow-hidden">
            <div className="bg-gradient-to-r from-accent/10 to-accent/5  p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-green-800 mb-2">
                    Optimized Supply Allocation
                  </h2>
                  <p className="text-muted text-sm">
                    Linear programming optimization for maximum net value across markets
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-widest text-muted font-medium mb-1">
                    Total Net Value
                  </div>
                  <div className="text-3xl font-bold text-accent">
                    <span className="font-sans">₦{allocation.total_net_value.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Allocation Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(allocation.allocation).map(([market, units]) => {
                  const netValue = allocation.net_value_per_unit[market] || 0;
                  return (
                    <div
                      key={market}
                      className="bg-white  rounded-lg p-5 hover:shadow-md  transition-all duration-200"
                    >
                      <div className="text-xs uppercase tracking-widest text-muted font-semibold mb-3 block">
                        {market}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted mb-1">Allocation</p>
                          <p className="font-serif text-2xl font-bold text-green-800">
                            {units} <span className="text-xs text-muted font-normal">units</span>
                          </p>
                        </div>
                        <div className="pt-3 border-t border-border/40">
                          <p className="text-xs text-muted mb-1">Net Value/Unit</p>
                          <p className="font-semibold text-accent">
                            <span className="font-sans">₦{netValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Stats */}
              <div className="mt-8 pt-6 border-t border-border/40">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted font-medium mb-2">
                      Total Units
                    </p>
                    <p className="font-serif text-3xl font-bold text-navy">
                      {Object.values(allocation.allocation).reduce((sum, val) => sum + val, 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted font-medium mb-2">
                      Markets Covered
                    </p>
                    <p className="font-serif text-3xl font-bold text-navy">
                      {Object.keys(allocation.allocation).length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted font-medium mb-2">
                      Avg. Net Value
                    </p>
                    <p className="font-serif text-3xl font-bold text-accent">
                      <span className="font-sans">₦{(
                        allocation.total_net_value /
                        Object.values(allocation.allocation).reduce((sum, val) => sum + val, 0)
                      ).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Info */}
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted">
          <p>All forecasts are based on walk-forward validation using ARIMA models</p>
          <p className="mt-2">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>
    </main>
  );
}