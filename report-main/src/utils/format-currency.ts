export const formatCurrency = (amount: number, currency: string = 'CAD') => {
  const formattedAmount = new Intl.NumberFormat(currency, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol',
  }).format(amount);
  return formattedAmount;
};
