export const CURRENCIES = {
  LKR: { code: 'LKR', country: 'Sri Lanka', name: 'Sri Lankan Rupee', symbol: 'Rs.', perLkr: 1, decimals: 0 },
  USD: { code: 'USD', country: 'United States', name: 'US Dollar', symbol: '$', perLkr: 1 / 330.93, decimals: 2 },
  EUR: { code: 'EUR', country: 'Euro area', name: 'Euro', symbol: '€', perLkr: 1 / 370.38, decimals: 2 },
  GBP: { code: 'GBP', country: 'United Kingdom', name: 'Pound sterling', symbol: '£', perLkr: 1 / 439.00, decimals: 2 },
  INR: { code: 'INR', country: 'India', name: 'Indian Rupee', symbol: '₹', perLkr: 1 / 3.79, decimals: 0 },
  JPY: { code: 'JPY', country: 'Japan', name: 'Japanese Yen', symbol: '¥', perLkr: 1 / 2.09, decimals: 0 },
  AUD: { code: 'AUD', country: 'Australia', name: 'Australian Dollar', symbol: 'A$', perLkr: 1 / 216.50, decimals: 2 },
}

export const CURRENCY_KEYS = Object.keys(CURRENCIES)
export const FX_SNAPSHOT_DATE = '2026-10-14'

export function convertLkr(lkr, code) {
  const currency = CURRENCIES[code] || CURRENCIES.LKR
  return lkr * currency.perLkr
}

export function formatMoney(lkr, code = 'LKR') {
  if (!Number.isFinite(lkr)) return 'Price not verified'
  const currency = CURRENCIES[code] || CURRENCIES.LKR
  return `${currency.symbol} ${convertLkr(lkr, code).toLocaleString('en-US', { maximumFractionDigits: currency.decimals })}`
}
