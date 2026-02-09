import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlightCard } from './FlightCard';
import { FlightListItem } from './FlightListItem';
import type { Fare } from '../types/flight.types';
import { Button } from './ui/Button';

interface FlightGridProps {
  fares: Fare[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const VIEW_MODE_KEY = 'flight_view_mode';

export function FlightGrid({
  fares,
  isLoading,
  hasMore,
  onLoadMore
}: FlightGridProps) {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    // Load saved view mode from localStorage
    const saved = localStorage.getItem(VIEW_MODE_KEY);
    return (saved === 'list' ? 'list' : 'grid') as 'grid' | 'list';
  });

  // Save view mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, viewMode);
  }, [viewMode]);
  if (isLoading && fares.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('flights.loading')}</p>
        </div>
      </div>
    );
  }

  if (!isLoading && fares.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-muted-foreground mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 20h.01M6 10a10 10 0 0112 0v10a8 8 0 01-16 0V10z"
            />
          </svg>
          <h3 className="text-lg font-semibold mb-2">
            {t('flights.noResults')}
          </h3>
          <p className="text-muted-foreground">{t('flights.noResultsDesc')}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Results Count and View Toggle */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t('flights.showing')}{' '}
          <span className="font-semibold text-foreground">{fares.length}</span>{' '}
          {t('flights.flights')}
        </p>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
            title={t('viewMode.grid')}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
            title={t('viewMode.list')}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {fares.map((fare, index) => (
            <FlightCard
              key={`${fare.originAirportCode}-${fare.destinationAirportCode}-${fare.departureDate}-${fare.returnDate}-${index}`}
              fare={fare}
            />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-3 mb-8">
          {fares.map((fare, index) => (
            <FlightListItem
              key={`${fare.originAirportCode}-${fare.destinationAirportCode}-${fare.departureDate}-${fare.returnDate}-${index}`}
              fare={fare}
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            size="lg"
            variant="outline"
          >
            {isLoading ? t('flights.loading') : t('flights.loadMore')}
          </Button>
        </div>
      )}
    </div>
  );
}
