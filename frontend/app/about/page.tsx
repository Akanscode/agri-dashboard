import React from 'react'

export default function About() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-serif text-4xl font-bold text-navy mb-3">
          About This Research
        </h1>
        <p className="text-lg text-muted">
          Understanding Agricultural Price Dynamics in Nigeria
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Overview Section */}
        <section className="bg-cream border border-border rounded-lg p-8 shadow-classic">
          <h2 className="font-serif text-2xl font-bold text-navy mb-4">Overview</h2>
          <p className="text-ink leading-relaxed mb-4">
            This dashboard provides AI-driven price forecasting and supply allocation optimization for agricultural commodities across Nigerian markets. By leveraging historical price data from the World Food Programme (WFP), we deliver actionable insights for traders, policymakers, and supply chain managers.
          </p>
          <p className="text-ink leading-relaxed">
            Our forecasting models help stakeholders make informed decisions about when and where to buy, sell, and allocate limited supply resources for maximum profitability and market efficiency.
          </p>
        </section>

        {/* Methodology Section */}
        <section className="bg-cream border border-border rounded-lg p-8 shadow-classic">
          <h2 className="font-serif text-2xl font-bold text-navy mb-4">Methodology</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-black mb-2 flex items-center gap-2">
                <span className="text-accent"></span> Price Forecasting
              </h3>
              <p className="text-ink text-sm leading-relaxed ml-6">
                We employ ARIMA (AutoRegressive Integrated Moving Average) models to forecast monthly commodity prices. The model is trained on historical price data and validated using walk-forward evaluation to ensure reliability. Each forecast includes confidence metrics (R², MAPE) to quantify accuracy.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-2 flex items-center gap-2">
                <span className="text-accent">🎯</span> Supply Optimization
              </h3>
              <p className="text-ink text-sm leading-relaxed ml-6">
                Linear programming optimization solves the allocation problem: given limited supply, how do we distribute it across markets to maximize total net value? The algorithm accounts for market-specific prices and transport costs to recommend optimal allocations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-2 flex items-center gap-2">
                <span className="text-accent">🔍</span> Data Quality
              </h3>
              <p className="text-ink text-sm leading-relaxed ml-6">
                All data is sourced from the World Food Programmes Food Prices Database, which provides comprehensive coverage of agricultural markets across Nigeria. Data is validated and cleaned before analysis to ensure accuracy and consistency.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="bg-cream border border-border rounded-lg p-8 shadow-classic">
          <h2 className="font-serif text-2xl font-bold text-navy mb-4">Key Features</h2>
          
          <ul className="space-y-3">
            <li className="flex gap-3 items-start">
              <span className="text-accent text-xl flex-shrink-0">✓</span>
              <div>
                <span className="font-semibold text-navy">Real-time Price Data</span>
                <p className="text-sm text-muted">Updated monthly with WFP market prices</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-accent text-xl flex-shrink-0">✓</span>
              <div>
                <span className="font-semibold text-navy">Predictive Forecasts</span>
                <p className="text-sm text-muted">12-month price projections with accuracy metrics</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-accent text-xl flex-shrink-0">✓</span>
              <div>
                <span className="font-semibold text-navy">Optimization Engine</span>
                <p className="text-sm text-muted">Algorithmic supply allocation for maximum returns</p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-accent text-xl flex-shrink-0">✓</span>
              <div>
                <span className="font-semibold text-navy">Multi-Market Analysis</span>
                <p className="text-sm text-muted">Compare commodities and markets across Nigeria</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Use Cases Section */}
        <section className="bg-cream border border-border rounded-lg p-8 shadow-classic">
          <h2 className="font-serif text-2xl font-bold text-navy mb-4">Use Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-accent pl-4">
              <h3 className="font-semibold text-navy mb-2">Traders & Merchants</h3>
              <p className="text-sm text-ink">
                Identify optimal buying and selling points to maximize margins and reduce inventory risk.
              </p>
            </div>
            
            <div className="border-l-4 border-accent pl-4">
              <h3 className="font-semibold text-navy mb-2">Supply Chain Managers</h3>
              <p className="text-sm text-ink">
                Optimize logistics and allocation decisions based on predictive price signals.
              </p>
            </div>
            
            <div className="border-l-4 border-accent pl-4">
              <h3 className="font-semibold text-navy mb-2">Policy Makers</h3>
              <p className="text-sm text-ink">
                Understand market dynamics and make data-driven decisions for agricultural policy.
              </p>
            </div>
            
            <div className="border-l-4 border-accent pl-4">
              <h3 className="font-semibold text-navy mb-2">Researchers</h3>
              <p className="text-sm text-ink">
                Access historical price data and forecasts for academic and economic research.
              </p>
            </div>
          </div>
        </section>

        {/* Data Source Section */}
        <section className="bg-cream border border-border rounded-lg p-8 shadow-classic">
          <h2 className="font-serif text-2xl font-bold text-navy mb-4">Data Source</h2>
          
          <p className="text-ink leading-relaxed mb-4">
            <span className="font-semibold">World Food Programme (WFP) Food Prices Database</span> - A comprehensive repository of food prices collected from markets across Africa, Asia, and the Middle East. For this dashboard, we focus on Nigerian agricultural markets with monthly price observations.
          </p>
          
          <div className="bg-navy/5 border border-navy/10 rounded p-4 text-sm text-ink">
            <p className="mb-2">
              <span className="font-semibold">Commodities:</span> Maize (white & yellow), Rice, Sorghum, Millet, Beans, and other staples
            </p>
            <p>
              <span className="font-semibold">Temporal Coverage:</span> 24+ months of historical data with monthly frequency
            </p>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="bg-accent/10 border border-accent/20 rounded-lg p-8">
          <h2 className="font-serif text-lg font-bold text-navy mb-3 flex items-center gap-2">
            <span>⚠️</span> Disclaimer
          </h2>
          <p className="text-sm text-ink leading-relaxed">
            This dashboard is provided for informational and research purposes only. Forecasts are based on historical data and statistical models, which may not capture all market factors. Users should conduct their own due diligence and consult domain experts before making financial or supply chain decisions based on our projections. Neither the WFP nor this project assumes liability for decisions made using this tool.
          </p>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted">
        <p>Nigeria Agricultural Forecasting Dashboard • v1.0</p>
        <p className="mt-2 text-xs">
          Built with FastAPI, Next.js, and statsmodels
        </p>
      </div>
    </div>
  )
}
