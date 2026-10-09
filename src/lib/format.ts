const formatters = new Map<string, Intl.NumberFormat>();

export function formatPrice(cents: number, currency = "USD"): string {
  let f = formatters.get(currency);
  if (!f) {
    f = new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: 0, maximumFractionDigits: 2 });
    formatters.set(currency, f);
  }
  return f.format(cents / 100);
}
