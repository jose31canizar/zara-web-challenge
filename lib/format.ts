export function formatEuro(value: number): string {
  const amount = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);

  return `${amount} EUR`;
}
