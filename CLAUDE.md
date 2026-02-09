I want to build a flight search SPA for finding deals from Belgrade, Serbia using a public GraphQL API.

**Tech Stack:**

- Pure React (Vite)
- shadcn/ui + Tailwind CSS
- React Query (TanStack Query)
- GraphQL client (graphql-request or similar)

**API Details:**

- Endpoint: https://vg-api.airtrfx.com/graphql
- Public endpoint (no authentication needed)
- GraphQL query structure and response provided below

**Core Features:**

1. **Initial Load:**
   - Automatically fetch and display all flights from Belgrade (BEG) without destination filter
   - Show results in a responsive 3-column grid (3-col desktop → 2-col tablet → 1-col mobile)

2. **Search & Filters:**
   - Origin airport selector (default: BEG - Belgrade)
   - Destination airport selector (optional - leave empty for "all destinations")
   - Date picker supporting BOTH:
     - Specific dates (exact departure + return date)
     - Flexible date range (show all flights within a date period)
   - Departure time range filter (filter on frontend if API doesn't support)
   - Trip duration filter (e.g., "up to 2 weeks", filter on frontend)
   - Travel class filter (if relevant from API data)

3. **Sorting Options:**
   - Price: low to high / high to low
   - Departure date: earliest first / latest first
   - Trip duration: shortest to longest

4. **UI/UX:**
   - Card-based grid layout for flight results
   - Each card shows: origin/destination cities, airport codes, dates (formatted), price with currency, travel class, "last seen" timestamp
   - Infinite scroll or "Load More" pagination
   - Mobile responsive design
   - Loading states and empty states
   - Use shadcn/ui components for filters, buttons, cards, date pickers, etc.

5. **Local Storage - Search History:**
   - Save recent search queries (origin, destination, dates, filters)
   - Display quick-access buttons for recent searches (last 5-10 searches)
   - Only store queries, NOT results (always fetch fresh data)
   - Clear history option

6. **Client-Side Filtering:**
   - If API doesn't support certain filters, implement them on the frontend after fetching results
   - Filter by departure time ranges
   - Filter by trip duration (days between departure and return)

**GraphQL Query Structure:**

```json
{
  "operationName": "GetStandardFareModule",
  "variables": {
    "page": {
      "tenant": "ju",
      "slug": "avio-karte-iz-beograda",
      "siteEdition": "sr-latn-rs"
    },
    "id": "652cf44673919744a40dd553",
    "pageNumber": 1,
    "limit": 50,
    "filters": {
      "origin": {
        "code": "BEG",
        "geoId": "6299779"
      },
      "destination": {
        "code": "VLC",
        "geoId": "6299357"
      },
      "sorting": "PRICE_ASC"
    }
  },
  "query": "query GetStandardFareModule($page: PageInput!, $id: String!, $pageNumber: Int, $limit: Int, $flatContext: FlatContextInput, $urlParameters: StandardFareModuleUrlParameters, $filters: StandardFareModuleFiltersInput, $nearestOriginAirport: AirportInput) { standardFareModule(page: $page, id: $id, pageNumber: $pageNumber, limit: $limit, flatContext: $flatContext, urlParameters: $urlParameters, filters: $filters, nearestOriginAirport: $nearestOriginAirport) { id metaData { name title subtitle footer viewType journeyType fareClickAction staticTrackingParameters __typename } pagination { currentPage from to lastPage itemsPerPage total __typename } fares(pageNumber: $pageNumber, limit: $limit, urlParameters: $urlParameters, nearestOriginAirport: $nearestOriginAirport) { image originCity destinationCity usdTotalPrice currencyCode currencySymbol originAirportCode destinationAirportCode formattedTravelClass travelClass departureDate formattedDepartureDate returnDate formattedReturnDate flightType formattedFlightType priceLastSeen { value unit __typename } formattedTotalPrice totalPrice promoCode __typename } error __typename } }"
}
```

**Example Response Structure:**
The response includes:

- `fares` array with flight objects containing: originCity, destinationCity, airport codes, dates, prices, travel class, priceLastSeen
- `pagination` object with currentPage, lastPage, total, itemsPerPage
- Each fare has: totalPrice, currencyCode, departureDate, returnDate, formattedDates, etc.

**Important Notes:**

- Flights are direct flights only (no layovers to filter)
- Use case: Last-minute deals and special offers
- Always fetch fresh data (don't cache results)
- Price is in RSD (Serbian Dinar) by default
- The API supports sorting: "PRICE_ASC", "PRICE_DESC", "DEPARTURE_DATE_ASC"

**Project Setup Requirements:**

1. Initialize Vite React project
2. Setup Tailwind CSS
3. Install and configure shadcn/ui
4. Setup React Query
5. Configure GraphQL client
6. Implement local storage utilities

**Deliverables:**

- Complete working React application
- Clean, well-organized component structure
- Responsive design following modern best practices
- Error handling and loading states
- Comments for complex logic

Please start by setting up the project structure, then implement the GraphQL integration, followed by the UI components and state management. Let me know if you need clarification on any requirements.
