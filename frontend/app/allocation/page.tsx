import { Metadata } from "next";
import { getAllocation } from "@/app/lib/api/api";

export const metadata: Metadata = {
  title: "Optimized Allocation",
  description: "View optimized allocation of supply across markets",
};

export default async function AllocationPage() {
  const allocation = await getAllocation();
  const totalUnits = Object.values(allocation.allocation).reduce((sum, val) => sum + val, 0);
  const avgNetValue = allocation.total_net_value / totalUnits;

  return (
    <main className="flex-1 min-h-screen bg-parchment">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-navy to-navy-light text-parchment border-b border-navy-light/20 shadow-lg">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="font-serif text-4xl font-bold text-parchment mb-2">
              Optimized Allocation
            </h1>
            <p className="text-parchment/80 text-lg">
              Linear programming solution for maximum net value across markets
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-6xl mx-auto">
        {/* Summary Stats */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-cream to-white border border-border rounded-lg shadow-lg p-6 group hover:shadow-xl transition-shadow">
              <p className="text-xs uppercase tracking-widest text-muted font-semibold mb-4">
                Total Net Value
              </p>
              <p className="font-serif text-4xl font-bold text-navy leading-tight">
                <span className="font-sans">₦{allocation.total_net_value.toLocaleString()}</span>
              </p>
              <div className="mt-4 pt-4 border-t border-border/40" />
            </div>

            <div className="bg-gradient-to-br from-cream to-white border border-border rounded-lg shadow-lg p-6 group hover:shadow-xl transition-shadow">
              <p className="text-xs uppercase tracking-widest text-muted font-semibold mb-4">
                Total Units
              </p>
              <p className="font-serif text-4xl font-bold text-navy leading-tight">
                {totalUnits}
              </p>
              <div className="mt-4 pt-4 border-t border-border/40" />
            </div>

            <div className="bg-gradient-to-br from-cream to-white border border-border rounded-lg shadow-lg p-6 group hover:shadow-xl transition-shadow">
              <p className="text-xs uppercase tracking-widest text-muted font-semibold mb-4">
                Avg Net Value/Unit
              </p>
              <p className="font-serif text-4xl font-bold text-accent leading-tight">
                <span className="font-sans">₦{avgNetValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </p>
              <div className="mt-4 pt-4 border-t border-border/40" />
            </div>
          </div>
        </section>

        {/* Allocation Breakdown */}
        <section>
          <div className="bg-cream border border-border rounded-lg shadow-classic overflow-hidden">
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-b border-border p-6">
              <h2 className="font-serif text-2xl font-bold text-navy">
                Market-by-Market Breakdown
              </h2>
              <p className="text-muted text-sm mt-1">
                Optimal supply allocation and net value per market
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {Object.entries(allocation.allocation).map(([market, units]) => {
                  const netValue = allocation.net_value_per_unit[market] ?? 0;
                  const totalMarketValue = (netValue * units);
                  return (
                    <div
                      key={market}
                      className="bg-white border border-border/40 rounded-lg p-6 hover:shadow-md hover:border-accent/30 transition-all duration-200"
                    >
                      <div className="text-xs uppercase tracking-widest text-muted font-semibold mb-4 block">
                        {market}
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-muted mb-1">Units Allocated</p>
                          <p className="font-serif text-3xl font-bold text-navy">
                            {units}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-border/40">
                          <p className="text-xs text-muted mb-1">Net Value/Unit</p>
                          <p className="font-semibold text-accent text-lg">
                            <span className="font-sans">₦{netValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                          </p>
                        </div>
                        <div className="pt-2 border-t border-border/40">
                          <p className="text-xs text-muted mb-1">Total Market Value</p>
                          <p className="font-semibold text-navy">
                            <span className="font-sans">₦{totalMarketValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="mt-12 pt-8 border-t border-border">
          <div className="bg-cream border border-border rounded-lg p-8">
            <h3 className="font-serif text-lg font-bold text-navy mb-3 flex items-center gap-2">
              <span>📊</span> About This Optimization
            </h3>
            <p className="text-muted mb-3">
              This allocation is generated using linear programming (scipy.optimize.linprog) to solve the optimization problem: given a fixed supply budget, how do we distribute units across markets to maximize total net value?
            </p>
            <p className="text-muted mb-3">
              The algorithm considers market-specific prices (from ARIMA forecasts) and transport costs to recommend the optimal allocation strategy.
            </p>
            <p className="text-sm text-muted/70">
              All allocations are recalculated in real-time based on the latest price forecasts and market conditions.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
