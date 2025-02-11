/**
 * Converts an ISO datetime string to a time string (HH:MM)
 * @param isoString - ISO datetime string (e.g., "2023-11-15T14:30:00Z")
 * @returns Time string in HH:MM format
 */
export function isoToTimeString(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 * Converts an ISO datetime string to a date string (YYYY-MM-DD)
 * @param isoString - ISO datetime string (e.g., "2023-11-15T14:30:00Z")
 * @returns Date string in YYYY-MM-DD format
 */
export function isoToDateString(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('fr-FR');
}
