import { useTranslation } from 'react-i18next';
import type { Fare } from '../types/flight.types';
import { Card, CardContent } from './ui/Card';
import {
  formatDate,
  formatPrice,
  calculateTripDuration
} from '../utils/dateUtils';

interface FlightCardProps {
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

export function FlightCard({ fare }: FlightCardProps) {
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
    <Card className="hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Optional Image */}
      {fare.image && (
        <div className="h-32 w-full overflow-hidden">
          <img
            src={fare.image}
            alt={fare.destinationCity}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardContent className="p-4">
        {/* Route */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 pr-2 mt-2">
              <p className="text-xs text-muted-foreground mb-1">
                {t('flights.from')}
              </p>
              <p className="font-semibold text-lg">{fare.originCity}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {fare.originAirportCode}
              </p>
            </div>

            <div className="px-3">
              <svg
                className="w-6 h-6 text-muted-foreground"
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
            </div>

            <div className="flex-1 text-right pl-2">
              <p className="text-xs text-muted-foreground mb-1">
                {t('flights.to')}
              </p>
              <p className="font-semibold text-lg">{fare.destinationCity}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {fare.destinationAirportCode}
              </p>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="mb-4 bg-secondary/50 rounded-md p-3">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {t('flights.outbound')}
              </p>
              <p className="font-medium">
                {formatDate(fare.departureDate, 'MMM dd, yyyy')}
              </p>
            </div>
            <div className="text-muted-foreground">→</div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">
                {t('flights.return')}
              </p>
              <p className="font-medium">
                {formatDate(fare.returnDate, 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              {tripDuration}{' '}
              {tripDuration === 1 ? t('flights.day') : t('flights.days')}{' '}
              {t('flights.trip')}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {t('flights.totalPrice')}
              </p>
              <p className="text-3xl font-bold text-primary">
                {formatPrice(fare.totalPrice, fare.currencySymbol)}
              </p>
            </div>
            <button
              onClick={handleBooking}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md font-medium transition-colors"
            >
              {t('flights.bookNow')}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
