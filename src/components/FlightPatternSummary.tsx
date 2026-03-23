import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { getDayName } from '../utils/dateUtils';

interface FlightPatternSummaryProps {
  availableDays: number[];
  totalFlights: number;
}

export function FlightPatternSummary({
  availableDays,
  totalFlights
}: FlightPatternSummaryProps) {
  const { t, i18n } = useTranslation();

  if (availableDays.length === 0) {
    return null;
  }

  const locale = i18n.language;
  const dayNames = availableDays.map((day) => getDayName(day, locale));

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <div className="flex-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                {t('flightPattern.available')}:
              </span>
              <span className="text-sm text-blue-900 dark:text-blue-100 font-semibold">
                {dayNames.join(', ')}
              </span>
              <span className="text-xs text-blue-600 dark:text-blue-400 ml-auto">
                ({totalFlights}{' '}
                {totalFlights === 1
                  ? t('flights.flight')
                  : t('flights.flights')}
                )
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
