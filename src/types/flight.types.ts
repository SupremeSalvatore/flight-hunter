// API Response Types based on the GraphQL schema

export interface PriceLastSeen {
  value: string;
  unit: 'day' | 'hour' | 'hours' | 'days';
  __typename: string;
}

export interface Redemption {
  unit: string;
  amount: number;
  taxAmount: number;
  category: string;
  formattedTaxAmount: string;
  formattedAmount: string;
  shortenedFormattedTaxAmount: string;
  __typename: string;
}

export interface Fare {
  image: string | null;
  originCity: string;
  destinationCity: string;
  usdTotalPrice: number;
  currencyCode: string;
  currencySymbol: string;
  originAirportCode: string;
  destinationAirportCode: string;
  formattedTravelClass: string;
  travelClass: string;
  brandedFareClass: string | null;
  farenetTravelClass: string;
  departureDate: string; // ISO date format YYYY-MM-DD
  formattedDepartureDate: string;
  returnDate: string; // ISO date format YYYY-MM-DD
  formattedReturnDate: string;
  flightType: string;
  formattedFlightType: string;
  formattedAdditionalFeesAmount: string | null;
  priceLastSeen: PriceLastSeen;
  redemption: Redemption | null;
  formattedTotalPrice: string;
  totalPrice: number;
  promoCode: string;
  __typename: string;
}

export interface Pagination {
  currentPage: number;
  from: number;
  to: number;
  lastPage: number;
  itemsPerPage: number;
  total: number;
  __typename: string;
}

export interface StandardFareModuleMetaData {
  name: string;
  title: string;
  subtitle: string;
  footer: string;
  viewType: string;
  journeyType: string | null;
  fareClickAction: string;
  staticTrackingParameters: Record<string, any>;
  __typename: string;
}

export interface VisualizationSettings {
  includeImages: boolean;
  includeCta: boolean;
  numberOfColumns: number;
  textAlignment: string;
  showJourneyType: boolean;
  showTravelClass: boolean;
  showFareTimestamp: boolean;
  showDates: boolean;
  showTaxesFees: boolean;
  carouselVisualizationType: string | null;
  ctaButtonStyle: string;
  __typename: string;
}

export interface FilterSettings {
  visualization: string;
  showOriginFilter: boolean;
  showDestinationFilter: boolean;
  showBudgetFilter: boolean;
  showTravelClassFilter: boolean;
  showtTravelDatesFilter: boolean;
  showBrandedTravelClassFilter: boolean;
  locationAttributesFilters: any | null;
  validateOriginsCountryMarket: boolean;
  currencyCode: string;
  restrictOriginFilter: boolean;
  restrictDestinationFilter: boolean;
  showRedemptionUnitFilter: boolean;
  showNumberOfStopsFilter: boolean;
  showJourneyTypeFilter: boolean;
  showSortingFilter: boolean;
  __typename: string;
}

export interface AirportServiceRestriction {
  geoId: string;
  type: string;
  __typename: string;
}

export interface FilterRestrictions {
  origin: AirportServiceRestriction | null;
  destination: AirportServiceRestriction | null;
  __typename: string;
}

export interface LocationAttributes {
  categoryId: string;
  tags: string[];
  __typename: string;
}

export interface PrepopulationSettings {
  originAirportCode: string;
  destinationAirportCode: string;
  budgetMaximumAmount: number | null;
  travelClass: string | null;
  travelDatesDeparture: string | null;
  travelDatesReturn: string | null;
  brandedTravelClasses: any | null;
  locationAttributes: LocationAttributes | null;
  redemptionUnit: string;
  numberOfStops: number | null;
  journeyType: string;
  sorting: string;
  geolocation: boolean;
  numberOfPassengers: number | null;
  __typename: string;
}

export interface StandardFareModule {
  id: string;
  metaData: StandardFareModuleMetaData;
  visualizationSettings: VisualizationSettings;
  filterSettings: FilterSettings;
  sortingFilterValues: string[];
  filterRestrictions: FilterRestrictions;
  prepopulationSettings: PrepopulationSettings;
  pagination: Pagination;
  fares: Fare[];
  error: string | null;
  __typename: string;
}

export interface FlightSearchResponse {
  data: {
    standardFareModule: StandardFareModule;
  };
}

// GraphQL Query Variables
export interface AirportInput {
  code: string;
  geoId?: string;
}

export interface StandardFareModuleFiltersInput {
  origin?: AirportInput;
  destination?: AirportInput;
  sorting?:
    | 'PRICE_ASC'
    | 'PRICE_DESC'
    | 'DEPARTURE_DATE_ASC'
    | 'DEPARTURE_DATE_DESC';
  budgetMaximumAmount?: number;
}

export interface PageInput {
  tenant: string;
  slug: string;
  siteEdition: string;
}

export interface FlatContextInput {
  siteEditionCountryGeoId: string;
  templateId: string;
  templateName: string;
  originLocationLevel: string;
  originGeoId: string;
  OriginAirportName: string;
  OriginCityName: string;
  OriginStateName: string;
  OriginCountryName: string;
  fromOriginCityName: string;
  fromOriginCountryName: string;
  toOriginCityName: string;
  toOriginCountryName: string;
}

export interface GraphQLVariables {
  page: PageInput;
  id: string;
  pageNumber: number;
  limit: number;
  flatContext?: FlatContextInput;
  urlParameters?: Record<string, any>;
  filters?: StandardFareModuleFiltersInput;
  nearestOriginAirport?: Record<string, any>;
}

// Frontend Filter Types
export interface SearchFilters {
  originCode: string;
  originGeoId?: string;
  destinationCode: string;
  destinationGeoId?: string;
  departureDate?: string;
  returnDate?: string;
  minDepartureDate?: string;
  maxDepartureDate?: string;
  minTripDuration?: number; // days
  maxTripDuration?: number; // days
  travelClass?: string;
  sorting:
    | 'PRICE_ASC'
    | 'PRICE_DESC'
    | 'DEPARTURE_DATE_ASC'
    | 'DEPARTURE_DATE_DESC';
}

// Search History Type
export interface SearchHistory {
  id: string;
  timestamp: number;
  filters: SearchFilters;
  label: string; // human-readable label like "BEG → VLC, 31 Mar - 28 Apr"
}
