export function formatDateHuman(dateStr) {
  return new Intl.DateTimeFormat('fr', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr));
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
}

export const formatCurrency = (value, selectedCurrency) =>
  new Intl.NumberFormat('fr', {
    style: 'currency',
    currency: selectedCurrency,
  }).format(value);
