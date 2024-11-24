// Function to get the exchange fees based on the exchange name
export const getExchangeFee = (exchange) => {
  const exchangeFees = {
    Binance: { makerFee: 0.0002, takerFee: 0.0004 },
    Bybit: { makerFee: 0.0001, takerFee: 0.0006 },
    DeepCoin: { makerFee: 0.0002, takerFee: 0.0005 },
    Bitget: { makerFee: 0.0003, takerFee: 0.0006 },
    MEXC: { makerFee: 0.0002, takerFee: 0.0004 },
    OKX: { makerFee: 0.0003, takerFee: 0.0005 },
    BVOX: { makerFee: 0.0002, takerFee: 0.0004 },
    BingX: { makerFee: 0.0002, takerFee: 0.0005 },
    CoinCatch: { makerFee: 0.0003, takerFee: 0.0006 },
    Zoomex: { makerFee: 0.0002, takerFee: 0.0004 },
    BitMex: { makerFee: 0.0002, takerFee: 0.0005 },
    BitMart: { makerFee: 0.0003, takerFee: 0.0006 },
    Woox: { makerFee: 0.0002, takerFee: 0.0004 },
    BloFin: { makerFee: 0.0002, takerFee: 0.0005 },
    HTX: { makerFee: 0.0003, takerFee: 0.0006 },
  };
  return exchangeFees[exchange] || { makerFee: 0.0002, takerFee: 0.0004 };
};

// Function to get the commission rate based on the exchange name
export const getExchangeCommissionRate = (exchange) => {
  const commissionRates = {
    Binance: 0.6,
    Bybit: 0.65,
    DeepCoin: 0.7,
    Bitget: 0.55,
    MEXC: 0.6,
    OKX: 0.65,
    BVOX: 0.7,
    BingX: 0.6,
    CoinCatch: 0.65,
    Zoomex: 0.7,
    BitMex: 0.6,
    BitMart: 0.65,
    Woox: 0.7,
    BloFin: 0.6,
    HTX: 0.65,
  };
  return commissionRates[exchange] || 0.6;
};

// Function to calculate the monthly commission fee
export const calculateMonthlyCommissionFee = (frequency, leverage, avgMarginUsed, exchange) => {
  const frequencyMultiplier = {
    barely: 4, // Once a week
    '1-2': 45, // 1-2 times a day
    '2-5': 105, // 2-5 times a day (avg 3.5)
    '5-10': 225, // 5-10 times a day (avg 7.5)
    '10+': 300, // More than 10 times a day
  };

  const tradesPerMonth = frequencyMultiplier[frequency];
  const { makerFee, takerFee } = getExchangeFee(exchange);
  const avgFee = (makerFee + takerFee) / 2;
  const tradeValue = avgMarginUsed * leverage;
  const feePerTrade = tradeValue * avgFee;
  return feePerTrade * tradesPerMonth;
};

// Function to calculate the estimated cashback
export const calculateEstimatedCashback = (selectedExchange, leverage, seed, tradeFrequency) => {
  if (!selectedExchange || !leverage || !seed || !tradeFrequency) return 0;

  const monthlyFee = calculateMonthlyCommissionFee(tradeFrequency, Number(leverage), Number(seed), selectedExchange);
  const commissionRate = getExchangeCommissionRate(selectedExchange);
  return monthlyFee * commissionRate;
};

// Function to format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
