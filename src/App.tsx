import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { SearchFilters } from './components/SearchFilters';
import { FlightGrid } from './components/FlightGrid';
import { SearchHistory } from './components/SearchHistory';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { fetchFlights } from './services/flightService';
import { filterFlights, sortFlights } from './utils/flightFilters';
import {
  getSearchHistory,
  saveSearchToHistory,
  clearSearchHistory
} from './utils/localStorage';
import { enrichFaresWithImages } from './utils/fareEnrichment';
import { formatDate } from './utils/dateUtils';
import type {
  SearchFilters as SearchFiltersType,
  SearchHistory as SearchHistoryType
} from './types/flight.types';

function App() {
  const { t } = useTranslation();
  const [searchFilters, setSearchFilters] = useState<SearchFiltersType>({
    originCode: 'BEG',
    originGeoId: '6299779',
    destinationCode: '',
    sorting: 'PRICE_ASC'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [history, setHistory] = useState<SearchHistoryType[]>([]);
  const [accumulatedFares, setAccumulatedFares] = useState<any[]>([]);

  // Load search history on mount
  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  // Fetch flights using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      'flights',
      searchFilters.originCode,
      searchFilters.originGeoId,
      searchFilters.destinationCode,
      searchFilters.destinationGeoId,
      searchFilters.sorting,
      currentPage
    ],
    queryFn: () =>
      fetchFlights({
        originCode: searchFilters.originCode || 'BEG',
        originGeoId: searchFilters.originGeoId || '6299779',
        destinationCode: searchFilters.destinationCode || '',
        destinationGeoId: searchFilters.destinationGeoId,
        sorting: searchFilters.sorting,
        pageNumber: currentPage,
        limit: 50
      }),
    staleTime: 0, // Always fetch fresh data
    refetchOnWindowFocus: false
  });

  // Accumulate fares from all loaded pages
  useEffect(() => {
    if (data?.data.standardFareModule.fares) {
      const newFares = data.data.standardFareModule.fares;

      if (currentPage === 1) {
        // Reset accumulated fares on first page
        setAccumulatedFares(newFares);
      } else {
        // Append new fares for additional pages
        setAccumulatedFares((prev) => [...prev, ...newFares]);
      }
    }
  }, [data, currentPage]);

  // Apply client-side filters and sorting
  const processedFares = useMemo(() => {
    if (accumulatedFares.length === 0) return [];

    let fares = [...accumulatedFares];

    // Enrich with images from our airport database
    fares = enrichFaresWithImages(fares);

    // Apply client-side filters
    console.log('🔍 Applying filters:', searchFilters);
    fares = filterFlights(fares, searchFilters);

    // Sort if needed (API handles basic sorting, but we support additional ones)
    if (searchFilters.sorting.includes('DURATION')) {
      fares = sortFlights(fares, searchFilters.sorting);
    }

    return fares;
  }, [accumulatedFares, searchFilters]);

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setSearchFilters(newFilters);
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  const handleSearch = () => {
    // Save to search history
    const label = createSearchLabel(searchFilters);
    saveSearchToHistory({ filters: searchFilters, label });
    setHistory(getSearchHistory());

    // Trigger search by resetting page (this will trigger the query)
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleSelectHistory = (filters: SearchFiltersType) => {
    setSearchFilters(filters);
    setCurrentPage(1);
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setHistory([]);
  };

  // Create human-readable label for search history
  function createSearchLabel(filters: SearchFiltersType): string {
    const origin = filters.originCode || 'BEG';
    const dest = filters.destinationCode || 'All destinations';
    const parts: string[] = [`${origin} → ${dest}`];

    // Add date information
    if (filters.departureDate && filters.returnDate) {
      const depDate = formatDate(filters.departureDate, 'MMM dd');
      const retDate = formatDate(filters.returnDate, 'MMM dd, yyyy');
      parts.push(`${depDate} - ${retDate}`);
    }

    // Add trip duration if set
    if (filters.maxTripDuration) {
      parts.push(`≤${filters.maxTripDuration} days`);
    }

    // Add travel class if set
    if (filters.travelClass) {
      parts.push(filters.travelClass);
    }

    return parts.join(' • ');
  }

  const hasMore = data?.data.standardFareModule.pagination
    ? data.data.standardFareModule.pagination.currentPage <
      data.data.standardFareModule.pagination.lastPage
    : false;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">✈️ {t('header.title')}</h1>
            <p className="text-primary-foreground/80 mt-1">
              {t('header.subtitle')}
            </p>
          </div>
          <div className="flex gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Filters */}
        <SearchFilters
          filters={searchFilters}
          onFiltersChange={handleFiltersChange}
          onSearch={handleSearch}
        />

        {/* Search History */}
        <SearchHistory
          history={history}
          onSelectHistory={handleSelectHistory}
          onClearHistory={handleClearHistory}
        />

        {/* Error State */}
        {isError && (
          <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md mb-6">
            <p className="font-semibold">{t('error.loadingFlights')}</p>
            <p className="text-sm">
              {error instanceof Error ? error.message : t('error.occurred')}
            </p>
          </div>
        )}

        {/* Flight Grid */}
        <FlightGrid
          fares={processedFares}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6 px-4 mt-12">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>{t('footer.disclaimer')}</p>
          <p className="mt-2">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
