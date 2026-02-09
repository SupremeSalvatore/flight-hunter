import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/Select';
import { Autocomplete, type AutocompleteOption } from './ui/Autocomplete';
import { Combobox, type ComboboxOption } from './ui/Combobox';
import { DateRangePicker } from './ui/DateRangePicker';
import { searchAirports, airports } from '../data/airports';
import type { SearchFilters as SearchFiltersType } from '../types/flight.types';
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onSearch: () => void;
}

export function SearchFilters({
  filters,
  onFiltersChange,
  onSearch
}: SearchFiltersProps) {
  const { t } = useTranslation();
  const [originOptions, setOriginOptions] = useState<AutocompleteOption[]>([]);
  const [destinationOptions, setDestinationOptions] = useState<
    ComboboxOption[]
  >([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Load popular destinations on mount
  useEffect(() => {
    const popularAirports = airports.slice(0, 20);
    setDestinationOptions(
      popularAirports.map((airport) => ({
        value: airport.value,
        label: airport.label,
        geoId: airport.geoId
      }))
    );
  }, []);

  const handleInputChange = (field: keyof SearchFiltersType, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value || undefined
    });
  };

  const handleOriginSearch = (query: string) => {
    if (query.length >= 2) {
      const results = searchAirports(query);
      setOriginOptions(
        results.map((airport) => ({
          value: airport.value,
          label: airport.label,
          geoId: airport.geoId
        }))
      );
    } else {
      setOriginOptions([]);
    }
  };

  const handleDestinationSearch = (query: string) => {
    if (query.length >= 2) {
      const results = searchAirports(query);
      setDestinationOptions(
        results.map((airport) => ({
          value: airport.value,
          label: airport.label,
          geoId: airport.geoId
        }))
      );
    } else {
      // Show popular destinations when query is cleared
      const popularAirports = airports.slice(0, 20);
      setDestinationOptions(
        popularAirports.map((airport) => ({
          value: airport.value,
          label: airport.label,
          geoId: airport.geoId
        }))
      );
    }
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    onFiltersChange({
      ...filters,
      departureDate: range?.from ? format(range.from, 'yyyy-MM-dd') : undefined,
      returnDate: range?.to ? format(range.to, 'yyyy-MM-dd') : undefined,
      minDepartureDate: undefined,
      maxDepartureDate: undefined
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  const sortingOptions = [
    { value: 'PRICE_ASC', label: t('search.sorting.priceAsc') },
    { value: 'PRICE_DESC', label: t('search.sorting.priceDesc') },
    {
      value: 'DEPARTURE_DATE_ASC',
      label: t('search.sorting.departureDateAsc')
    },
    {
      value: 'DEPARTURE_DATE_DESC',
      label: t('search.sorting.departureDateDesc')
    }
  ];

  return (
    <Card className="mb-6 border-none shadow-lg">
      <CardContent className="pt-6" onKeyDown={handleKeyDown}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Origin */}
          <Autocomplete
            value={filters.originCode}
            onChange={(value, geoId) => {
              onFiltersChange({
                ...filters,
                originCode: value,
                originGeoId: geoId
              });
            }}
            options={originOptions}
            onSearch={handleOriginSearch}
            placeholder={t('search.origin')}
          />

          {/* Destination */}
          <Combobox
            value={filters.destinationCode}
            onChange={(value, geoId) => {
              onFiltersChange({
                ...filters,
                destinationCode: value,
                destinationGeoId: geoId
              });
            }}
            options={destinationOptions}
            onSearch={handleDestinationSearch}
            placeholder={t('search.destination')}
            emptyText={t('search.noAirports')}
          />

          {/* Sorting */}
          <Select
            value={filters.sorting}
            onValueChange={(value: string) =>
              handleInputChange('sorting', value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder={t('search.sortBy')} />
            </SelectTrigger>
            <SelectContent>
              {sortingOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Trip Duration */}
          <Input
            type="number"
            placeholder={t('search.maxTripDays')}
            value={filters.maxTripDuration || ''}
            onChange={(e) =>
              handleInputChange('maxTripDuration', e.target.value)
            }
            min="1"
          />
        </div>

        {/* Date Selection */}
        <div className="mb-6">
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={handleDateChange}
            placeholder={t('search.selectDates')}
          />
        </div>

        {/* Search Button */}
        <div className="flex justify-center">
          <Button onClick={onSearch} size="lg" className="min-w-50">
            {t('search.searchButton')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
