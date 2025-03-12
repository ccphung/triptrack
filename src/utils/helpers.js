export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('fr', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr));
}
