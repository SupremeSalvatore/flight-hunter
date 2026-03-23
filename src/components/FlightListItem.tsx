import { useTranslation } from 'react-i18next';
import type { Fare } from '../types/flight.types';
import {
  formatDate,
  formatPrice,
  calculateTripDuration
} from '../utils/dateUtils';

interface FlightListItemProps {
  fare: Fare;
}

// Helper function to create Air Serbia booking deeplink
const createBookingUrl = (fare: Fare): string => {
  const formatDateForUrl = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const params = new URLSearchParams({
    origin: fare.originAirportCode,
    destination: fare.destinationAirportCode,
    date: formatDateForUrl(fare.departureDate),
    class: 'Economy',
    ADT: '1',
    CHD: '0',
    INF: '0',
    currency: fare.currencyCode,
    pointOfSale: 'RS',
    locale: 'sr-LATN',
    journeyType: 'round-trip',
    date1: formatDateForUrl(fare.returnDate),
    origin1: fare.destinationAirportCode,
    destination1: fare.originAirportCode
  });

  return `https://booking.airserbia.com/dx/JUDX/#/flight-selection?${params.toString()}`;
};

export function FlightListItem({ fare }: FlightListItemProps) {
  const { t } = useTranslation();
  const tripDuration = calculateTripDuration(
    fare.departureDate,
    fare.returnDate
  );

  const handleBooking = () => {
    const bookingUrl = createBookingUrl(fare);
    window.open(bookingUrl, '_blank');
  };

  return (
    <div className="border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow duration-200 bg-card">
      {/* Mobile Layout */}
      <div className="flex flex-col lg:hidden gap-3">
        {/* Top Row: Route + Price */}
        <div className="flex items-start justify-between gap-3">
          {/* Route */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="text-left min-w-0">
              <p className="font-semibold text-sm leading-tight truncate">
                {fare.originCity}
              </p>
              <p className="text-xs text-muted-foreground">
                {fare.originAirportCode}
              </p>
            </div>
            <svg
              className="w-4 h-4 text-muted-foreground shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            <div className="text-left min-w-0">
              <p className="font-semibold text-sm leading-tight truncate">
                {fare.destinationCity}
              </p>
              <p className="text-xs text-muted-foreground">
                {fare.destinationAirportCode}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="text-right shrink-0">
            <p className="text-xl font-bold text-primary leading-tight">
              {formatPrice(fare.totalPrice, fare.currencySymbol)}
            </p>
          </div>
        </div>

        {/* Bottom Row: Dates with Duration + Button */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">
              {formatDate(fare.departureDate, 'MMM dd')}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>→</span>
              <span className="whitespace-nowrap">
                {tripDuration}
                {tripDuration === 1 ? 'd' : 'd'}
              </span>
              <span>→</span>
            </div>
            <span className="font-medium">
              {formatDate(fare.returnDate, 'MMM dd')}
            </span>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBooking}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-1.5 rounded-md font-medium text-sm transition-colors whitespace-nowrap"
          >
            {t('flights.bookNow')}
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:items-center gap-4">
        {/* Route */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="text-left min-w-0">
            <p className="font-semibold text-base truncate">
              {fare.originCity}
            </p>
            <p className="text-xs text-muted-foreground">
              {fare.originAirportCode}
            </p>
          </div>
          <svg
            className="w-5 h-5 text-muted-foreground shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          <div className="text-left min-w-0">
            <p className="font-semibold text-base truncate">
              {fare.destinationCity}
            </p>
            <p className="text-xs text-muted-foreground">
              {fare.destinationAirportCode}
            </p>
          </div>
        </div>

        {/* Dates with Duration */}
        <div className="flex items-center gap-3">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {t('flights.outbound')}
            </p>
            <p className="font-medium text-sm">
              {formatDate(fare.departureDate, 'MMM dd')}
            </p>
          </div>
          <div className="flex flex-col items-center text-muted-foreground text-xs">
            <span>→</span>
            <span className="whitespace-nowrap">
              {tripDuration}
              {tripDuration === 1 ? 'd' : 'd'}
            </span>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {t('flights.return')}
            </p>
            <p className="font-medium text-sm">
              {formatDate(fare.returnDate, 'MMM dd')}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold text-primary">
            {formatPrice(fare.totalPrice, fare.currencySymbol)}
          </p>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBooking}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 rounded-md font-medium transition-colors whitespace-nowrap"
        >
          {t('flights.bookNow')}
        </button>
      </div>
    </div>
  );
}
