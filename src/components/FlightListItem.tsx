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
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-card">
      {/* Responsive Layout: Vertical on mobile, Horizontal on desktop */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Route */}
        <div className="flex items-center gap-2 flex-1 min-w-0 order-1">
          <div className="text-left min-w-0">
            <p className="font-semibold text-base truncate">
              {fare.originCity}
            </p>
            <p className="text-xs text-muted-foreground">
              {fare.originAirportCode}
            </p>
          </div>
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground shrink-0"
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

        {/* Dates - Desktop shows inline, Mobile shows in row */}
        <div className="flex items-center gap-3 lg:gap-4 order-2 lg:order-2">
          <div className="text-left lg:text-center">
            <p className="text-xs text-muted-foreground">
              {t('flights.outbound')}
            </p>
            <p className="font-medium text-sm">
              {formatDate(fare.departureDate, 'MMM dd')}
            </p>
          </div>
          <div className="text-muted-foreground text-xs">→</div>
          <div className="text-left lg:text-center">
            <p className="text-xs text-muted-foreground">
              {t('flights.return')}
            </p>
            <p className="font-medium text-sm">
              {formatDate(fare.returnDate, 'MMM dd')}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="text-left lg:text-center lg:px-4 order-3 lg:order-3 lg:shrink-0">
          <p className="text-xs text-muted-foreground">{t('flights.trip')}</p>
          <p className="font-medium text-sm">
            {tripDuration}{' '}
            {tripDuration === 1 ? t('flights.day') : t('flights.days')}
          </p>
        </div>

        {/* Price - Shows at top right on mobile, inline on desktop */}
        <div className="text-right order-4 lg:order-4 lg:shrink-0 absolute right-4 top-4 lg:static">
          <p className="text-2xl font-bold text-primary">
            {formatPrice(fare.totalPrice, fare.currencySymbol)}
          </p>
        </div>

        {/* Book Button - Full width on mobile, auto on desktop */}
        <button
          onClick={handleBooking}
          className="w-full lg:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 lg:py-2 rounded-md font-medium transition-colors order-5 lg:order-5 lg:whitespace-nowrap"
        >
          {t('flights.bookNow')}
        </button>
      </div>
    </div>
  );
}
