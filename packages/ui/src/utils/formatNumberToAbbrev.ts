export const formatNumberAbbreviation = (num: number | string): string => {
  const units = [
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' },
  ];

  for (const unit of units) {
    const result = Number(num) / unit.value;
    if (result >= 0.1) {
      return result.toFixed(unit.symbol === 'B' ? 3 : 2).replace(/\.?0+$/, '') + unit.symbol;
    }
  }

  return num.toString();
};
