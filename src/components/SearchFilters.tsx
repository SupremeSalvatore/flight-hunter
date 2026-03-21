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
    let options = popularAirports.map((airport) => ({
      value: airport.value,
      label: airport.label,
      geoId: airport.geoId
    }));

    // Add selected destination if not in popular list
    if (filters.destinationCode) {
      const isInOptions = options.some(
        (opt) => opt.value === filters.destinationCode
      );
      if (!isInOptions) {
        const selectedAirport = airports.find(
          (airport) => airport.value === filters.destinationCode
        );
        if (selectedAirport) {
          options = [
            {
              value: selectedAirport.value,
              label: selectedAirport.label,
              geoId: selectedAirport.geoId
            },
            ...options
          ];
        }
      }
    }

    setDestinationOptions(options);
  }, [filters.destinationCode]);

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
    let options: ComboboxOption[] = [];

    if (query.length >= 2) {
      const results = searchAirports(query);
      options = results.map((airport) => ({
        value: airport.value,
        label: airport.label,
        geoId: airport.geoId
      }));
    } else {
      // Show popular destinations when query is cleared
      const popularAirports = airports.slice(0, 20);
      options = popularAirports.map((airport) => ({
        value: airport.value,
        label: airport.label,
        geoId: airport.geoId
      }));
    }

    // Always include selected destination if not in results
    if (filters.destinationCode) {
      const isInOptions = options.some(
        (opt) => opt.value === filters.destinationCode
      );
      if (!isInOptions) {
        const selectedAirport = airports.find(
          (airport) => airport.value === filters.destinationCode
        );
        if (selectedAirport) {
          options = [
            {
              value: selectedAirport.value,
              label: selectedAirport.label,
              geoId: selectedAirport.geoId
            },
            ...options
          ];
        }
      }
    }

    setDestinationOptions(options);
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

  const handleSwapLocations = () => {
    onFiltersChange({
      ...filters,
      originCode: filters.destinationCode,
      originGeoId: filters.destinationGeoId,
      destinationCode: filters.originCode,
      destinationGeoId: filters.originGeoId
    });
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 mb-4 items-end">
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

          {/* Swap Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleSwapLocations}
            className="h-10 w-10 shrink-0"
            title={t('search.swapLocations')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 16V4M7 4L3 8M7 4l4 4" />
              <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </Button>

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
