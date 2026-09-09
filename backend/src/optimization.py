from scipy.optimize import linprog


def optimize_allocation(forecasted_prices: dict, transport_cost: dict, market_capacity: dict, supply_units: float):
    markets = list(forecasted_prices)
    net_value = {market: forecasted_prices[market] - transport_cost[market] for market in markets}
    result = linprog(
        [-net_value[market] for market in markets],
        A_eq=[[1] * len(markets)],
        b_eq=[supply_units],
        bounds=[(0, market_capacity[market]) for market in markets],
        method="highs",
    )
    if not result.success:
        raise ValueError(result.message)

    return {
        "allocation": {market: round(units, 1) for market, units in zip(markets, result.x)},
        "total_net_value": round(-result.fun, 2),
        "net_value_per_unit": net_value,
    }
