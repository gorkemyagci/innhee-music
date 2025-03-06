declare module 'currency-formatter' {
  interface CurrencyFormatterOptions {
    code?: string;
    symbol?: string;
    decimal?: string;
    thousand?: string;
    precision?: number;
    format?: string;
  }

  interface Currency {
    code: string;
    symbol: string;
    thousandsSeparator: string;
    decimalSeparator: string;
    symbolOnLeft: boolean;
    spaceBetweenAmountAndSymbol: boolean;
    decimalDigits: number;
  }

  function format(amount: number, options: CurrencyFormatterOptions): string;
  function findCurrency(code: string): Currency | undefined;
  
  const currencies: Currency[];
  
  export { format, findCurrency, currencies };
  export default { format, findCurrency, currencies };
} 