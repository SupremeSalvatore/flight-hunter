import { GraphQLClient } from 'graphql-request';
import type {
  FlightSearchResponse,
  GraphQLVariables,
  StandardFareModuleFiltersInput
} from '../types/flight.types';

const API_URL = 'https://vg-api.airtrfx.com/graphql';

// Initialize GraphQL client
export const graphQLClient = new GraphQLClient(API_URL);

// GraphQL query string - exact copy from working API payload
const GET_STANDARD_FARE_MODULE = `query GetStandardFareModule($page: PageInput!, $id: String!, $pageNumber: Int, $limit: Int, $flatContext: FlatContextInput, $urlParameters: StandardFareModuleUrlParameters, $filters: StandardFareModuleFiltersInput, $nearestOriginAirport: AirportInput) {
  standardFareModule(page: $page, id: $id, pageNumber: $pageNumber, limit: $limit, flatContext: $flatContext, urlParameters: $urlParameters, filters: $filters, nearestOriginAirport: $nearestOriginAirport) {
    id
    metaData {
      name
      title
      subtitle
      footer
      viewType
      journeyType
      fareClickAction
      staticTrackingParameters
      __typename
    }
    visualizationSettings {
      includeImages
      includeCta
      numberOfColumns
      textAlignment
      showJourneyType
      showTravelClass
      showFareTimestamp
      showDates
      showTaxesFees
      carouselVisualizationType
      ctaButtonStyle
      __typename
    }
    filterSettings {
      visualization
      showOriginFilter
      showDestinationFilter
      showBudgetFilter
      showTravelClassFilter
      showtTravelDatesFilter
      showBrandedTravelClassFilter
      locationAttributesFilters
      validateOriginsCountryMarket
      currencyCode
      restrictOriginFilter
      restrictDestinationFilter
      showRedemptionUnitFilter
      showNumberOfStopsFilter
      showJourneyTypeFilter
      showSortingFilter
      __typename
    }
    sortingFilterValues
    filterRestrictions {
      origin {
        geoId
        type
        __typename
      }
      destination {
        geoId
        type
        __typename
      }
      __typename
    }
    prepopulationSettings {
      originAirportCode
      destinationAirportCode
      budgetMaximumAmount
      travelClass
      travelDatesDeparture
      travelDatesReturn
      brandedTravelClasses
      locationAttributes {
        categoryId
        tags
        __typename
      }
      redemptionUnit
      numberOfStops
      journeyType
      sorting
      geolocation
      numberOfPassengers
      __typename
    }
    pagination {
      currentPage
      from
      to
      lastPage
      itemsPerPage
      total
      __typename
    }
    fares(pageNumber: $pageNumber, limit: $limit, urlParameters: $urlParameters, nearestOriginAirport: $nearestOriginAirport) {
      image
      originCity
      destinationCity
      usdTotalPrice
      currencyCode
      currencySymbol
      originAirportCode
      destinationAirportCode
      formattedTravelClass
      travelClass
      brandedFareClass
      farenetTravelClass
      departureDate
      formattedDepartureDate
      returnDate
      formattedReturnDate
      flightType
      formattedFlightType
      formattedAdditionalFeesAmount
      priceLastSeen {
        value
        unit
        __typename
      }
      redemption {
        unit
        amount
        taxAmount
        category
        formattedTaxAmount
        formattedAmount
        shortenedFormattedTaxAmount
        formattedTaxAmount
        __typename
      }
      formattedTotalPrice
      totalPrice
      promoCode
      __typename
    }
    error
    __typename
  }
}
`;

// API service functions
export interface FetchFlightsParams {
  originCode?: string;
  originGeoId?: string;
  destinationCode?: string;
  destinationGeoId?: string;
  pageNumber?: number;
  limit?: number;
  sorting?:
    | 'PRICE_ASC'
    | 'PRICE_DESC'
    | 'DEPARTURE_DATE_ASC'
    | 'DEPARTURE_DATE_DESC';
}

export async function fetchFlights({
  originCode = 'BEG',
  originGeoId = '6299779',
  destinationCode = '',
  destinationGeoId,
  pageNumber = 1,
  limit = 50,
  sorting = 'PRICE_ASC'
}: FetchFlightsParams = {}): Promise<FlightSearchResponse> {
  const filters: StandardFareModuleFiltersInput = {
    origin: {
      code: originCode,
      geoId: originGeoId
    },
    sorting
  };

  // Only add destination if provided
  if (destinationCode && destinationGeoId) {
    filters.destination = {
      code: destinationCode,
      geoId: destinationGeoId
    };
  }

  const variables: GraphQLVariables = {
    page: {
      tenant: 'ju',
      slug: 'avio-karte-iz-beograda',
      siteEdition: 'sr-latn-rs'
    },
    id: '652cf44673919744a40dd553',
    pageNumber,
    limit,
    flatContext: {
      siteEditionCountryGeoId: '6290252',
      templateId: '63ef2127aa30db1d00000247',
      templateName: 'from-city',
      originLocationLevel: 'City',
      originGeoId: '792680',
      OriginAirportName: 'BEG',
      OriginCityName: 'Beograd',
      OriginStateName: 'City of Belgrade',
      OriginCountryName: 'Srbija',
      fromOriginCityName: 'iz Beograda',
      fromOriginCountryName: 'iz Srbije',
      toOriginCityName: 'za Beograd',
      toOriginCountryName: 'za Srbiju'
    },
    filters,
    urlParameters: {},
    nearestOriginAirport: {}
  };

  try {
    const data = await graphQLClient.request<FlightSearchResponse['data']>(
      GET_STANDARD_FARE_MODULE,
      variables
    );

    return { data };
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw error;
  }
}
