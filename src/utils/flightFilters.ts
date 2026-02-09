import type { Fare, SearchFilters } from '../types/flight.types';
import { parseISO, isWithinInterval } from 'date-fns';
import { calculateTripDuration } from './dateUtils';

/**
 * Filter flights based on search criteria
 */
export function filterFlights(fares: Fare[], filters: SearchFilters): Fare[] {
  let filteredCount = 0;
  const reasons: { [key: string]: number } = {};

  const filtered = fares.filter((fare) => {
    // Filter by specific departure date
    if (filters.departureDate && fare.departureDate !== filters.departureDate) {
      reasons['departure_date_mismatch'] =
        (reasons['departure_date_mismatch'] || 0) + 1;
      return false;
    }

    // Filter by specific return date
    if (filters.returnDate && fare.returnDate !== filters.returnDate) {
      reasons['return_date_mismatch'] =
        (reasons['return_date_mismatch'] || 0) + 1;
      return false;
    }

    // Filter by departure date range
    if (filters.minDepartureDate || filters.maxDepartureDate) {
      try {
        const departureDate = parseISO(fare.departureDate);

        if (filters.minDepartureDate && filters.maxDepartureDate) {
          const minDate = parseISO(filters.minDepartureDate);
          const maxDate = parseISO(filters.maxDepartureDate);

          if (
            !isWithinInterval(departureDate, { start: minDate, end: maxDate })
          ) {
            reasons['date_range_mismatch'] =
              (reasons['date_range_mismatch'] || 0) + 1;
            return false;
          }
        } else if (filters.minDepartureDate) {
          const minDate = parseISO(filters.minDepartureDate);
          if (departureDate < minDate) {
            reasons['before_min_date'] = (reasons['before_min_date'] || 0) + 1;
            return false;
          }
        } else if (filters.maxDepartureDate) {
          const maxDate = parseISO(filters.maxDepartureDate);
          if (departureDate > maxDate) {
            reasons['after_max_date'] = (reasons['after_max_date'] || 0) + 1;
            return false;
          }
        }
      } catch (error) {
        console.error('Error parsing dates:', error);
      }
    }

    // Filter by trip duration
    if (
      filters.minTripDuration !== undefined ||
      filters.maxTripDuration !== undefined
    ) {
      const duration = calculateTripDuration(
        fare.departureDate,
        fare.returnDate
      );

      if (
        filters.minTripDuration !== undefined &&
        duration < filters.minTripDuration
      ) {
        reasons['duration_too_short'] =
          (reasons['duration_too_short'] || 0) + 1;
        return false;
      }

      if (
        filters.maxTripDuration !== undefined &&
        duration > filters.maxTripDuration
      ) {
        reasons['duration_too_long'] = (reasons['duration_too_long'] || 0) + 1;
        return false;
      }
    }

    // Filter by travel class
    if (
      filters.travelClass &&
      fare.travelClass.toLowerCase() !== filters.travelClass.toLowerCase()
    ) {
      reasons['class_mismatch'] = (reasons['class_mismatch'] || 0) + 1;
      return false;
    }

    filteredCount++;
    return true;
  });

  return filtered;
}

/**
 * Sort flights based on sorting criteria
 */
export function sortFlights(fares: Fare[], sorting: string): Fare[] {
  const sorted = [...fares];

  switch (sorting) {
    case 'PRICE_ASC':
      return sorted.sort((a, b) => a.totalPrice - b.totalPrice);

    case 'PRICE_DESC':
      return sorted.sort((a, b) => b.totalPrice - a.totalPrice);

    case 'DEPARTURE_DATE_ASC':
      return sorted.sort((a, b) =>
        a.departureDate.localeCompare(b.departureDate)
      );

    case 'DEPARTURE_DATE_DESC':
      return sorted.sort((a, b) =>
        b.departureDate.localeCompare(a.departureDate)
      );

    case 'DURATION_ASC':
      return sorted.sort((a, b) => {
        const durationA = calculateTripDuration(a.departureDate, a.returnDate);
        const durationB = calculateTripDuration(b.departureDate, b.returnDate);
        return durationA - durationB;
      });

    case 'DURATION_DESC':
      return sorted.sort((a, b) => {
        const durationA = calculateTripDuration(a.departureDate, a.returnDate);
        const durationB = calculateTripDuration(b.departureDate, b.returnDate);
        return durationB - durationA;
      });

    default:
      return sorted;
  }
}
