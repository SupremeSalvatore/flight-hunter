import type { SearchHistory } from '../types/flight.types';

const STORAGE_KEY = 'flight_search_history';
const MAX_HISTORY_ITEMS = 10;

/**
 * Get search history from local storage
 */
export function getSearchHistory(): SearchHistory[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const history = JSON.parse(stored) as SearchHistory[];
    return history.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Error reading search history:', error);
    return [];
  }
}

/**
 * Save a search to history
 */
export function saveSearchToHistory(
  history: Omit<SearchHistory, 'id' | 'timestamp'>
): void {
  try {
    const existingHistory = getSearchHistory();

    // Check if this search already exists (compare filters)
    const isDuplicate = existingHistory.some((item) => {
      const existingFilters = item.filters;
      const newFilters = history.filters;

      return (
        existingFilters.originCode === newFilters.originCode &&
        existingFilters.originGeoId === newFilters.originGeoId &&
        existingFilters.destinationCode === newFilters.destinationCode &&
        existingFilters.destinationGeoId === newFilters.destinationGeoId &&
        existingFilters.departureDate === newFilters.departureDate &&
        existingFilters.returnDate === newFilters.returnDate &&
        existingFilters.minDepartureDate === newFilters.minDepartureDate &&
        existingFilters.maxDepartureDate === newFilters.maxDepartureDate &&
        existingFilters.minTripDuration === newFilters.minTripDuration &&
        existingFilters.maxTripDuration === newFilters.maxTripDuration &&
        existingFilters.travelClass === newFilters.travelClass &&
        existingFilters.sorting === newFilters.sorting
      );
    });

    // Don't save if it's a duplicate
    if (isDuplicate) {
      return;
    }

    const newEntry: SearchHistory = {
      ...history,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };

    // Add new entry and limit to MAX_HISTORY_ITEMS
    const updatedHistory = [newEntry, ...existingHistory].slice(
      0,
      MAX_HISTORY_ITEMS
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error saving search history:', error);
  }
}

/**
 * Clear all search history
 */
export function clearSearchHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
}

/**
 * Remove a specific search from history
 */
export function removeSearchFromHistory(id: string): void {
  try {
    const history = getSearchHistory();
    const updated = history.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error removing search from history:', error);
  }
}
