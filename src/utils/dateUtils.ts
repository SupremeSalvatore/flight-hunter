import { format, parseISO, differenceInDays } from 'date-fns';

/**
 * Format a date string (YYYY-MM-DD) to a readable format
 */
export function formatDate(
  dateString: string,
  formatStr: string = 'MMM dd, yyyy'
): string {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch (error) {
    return dateString;
  }
}

/**
 * Calculate trip duration in days
 */
export function calculateTripDuration(
  departureDate: string,
  returnDate: string
): number {
  try {
    const departure = parseISO(departureDate);
    const returnDay = parseISO(returnDate);
    return differenceInDays(returnDay, departure);
  } catch (error) {
    return 0;
  }
}

/**
 * Format price with currency symbol
 */
export function formatPrice(
  price: number,
  currencySymbol: string = 'RSD'
): string {
  return `${currencySymbol} ${price.toLocaleString()}`;
}

/**
 * Format "last seen" timestamp
 */
export function formatLastSeen(value: string, unit: string): string {
  const num = parseInt(value, 10);

  if (unit === 'day' || unit === 'days') {
    return num === 1 ? '1 day ago' : `${num} days ago`;
  }

  if (unit === 'hour' || unit === 'hours') {
    return num === 1 ? '1 hour ago' : `${num} hours ago`;
  }

  return `${value} ${unit} ago`;
}
