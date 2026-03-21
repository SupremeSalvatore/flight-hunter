import { format, parseISO, differenceInDays, getDay } from 'date-fns';

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
 * Get day of week from date string (0 = Sunday, 1 = Monday, etc.)
 */
export function getDayOfWeek(dateString: string): number {
  try {
    const date = parseISO(dateString);
    return getDay(date);
  } catch (error) {
    return -1;
  }
}

/**
 * Get day name from day number
 */
export function getDayName(dayNumber: number, locale: string = 'en'): string {
  const daysEn = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const daysSr = [
    'Nedelja',
    'Ponedeljak',
    'Utorak',
    'Sreda',
    'Četvrtak',
    'Petak',
    'Subota'
  ];

  if (dayNumber < 0 || dayNumber > 6) return '';

  return locale.startsWith('sr') ? daysSr[dayNumber] : daysEn[dayNumber];
}

/**
 * Analyze flight dates and extract day-of-week patterns
 */
export function analyzeDayPatterns(dates: string[]): {
  departureDays: number[];
  returnDays: number[];
  departureDayNames: string[];
  returnDayNames: string[];
} {
  const departureDaysSet = new Set<number>();
  const returnDaysSet = new Set<number>();

  dates.forEach((dateString) => {
    const dayOfWeek = getDayOfWeek(dateString);
    if (dayOfWeek >= 0) {
      departureDaysSet.add(dayOfWeek);
    }
  });

  // Sort days (Monday first: 1,2,3,4,5,6,0)
  const sortedDays = Array.from(departureDaysSet).sort((a, b) => {
    const aAdjusted = a === 0 ? 7 : a;
    const bAdjusted = b === 0 ? 7 : b;
    return aAdjusted - bAdjusted;
  });

  return {
    departureDays: sortedDays,
    returnDays: Array.from(returnDaysSet),
    departureDayNames: [],
    returnDayNames: []
  };
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
