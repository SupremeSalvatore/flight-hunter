# Flight Hunter

A modern React SPA for finding flight deals from Belgrade, Serbia.

## Features

- 🔍 Search flights from Belgrade (BEG) to any destination
- 📅 Flexible date search or specific date selection
- 🎯 Advanced filtering (trip duration, travel class, price)
- 📊 Multiple sorting options (price, departure date, duration)
- 💾 Search history saved locally
- 📱 Fully responsive design
- ⚡ Built with Vite for fast development

## Tech Stack

- **React 19** with TypeScript
- **Vite** for blazing fast builds
- **TailwindCSS** for styling
- **shadcn/ui** components
- **React Query (TanStack Query)** for data fetching
- **graphql-request** for API communication
- **date-fns** for date utilities

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## API

The app uses the Air Serbia GraphQL API:
- Endpoint: `https://vg-api.airtrfx.com/graphql`
- Public endpoint (no authentication required)

## Features

### Search Filters

- **Origin Airport**: Default is BEG (Belgrade)
- **Destination**: Optional - leave empty for all destinations
- **Date Selection**:
  - Specific dates (exact departure & return)
  - Flexible date range (search within a period)
- **Trip Duration**: Filter by maximum trip length
- **Sorting**: Price, departure date, or trip duration

### Search History

- Automatically saves your last 10 searches
- Quick access buttons to rerun previous searches
- Clear history option available

### Flight Cards

Each flight displays:
- Origin and destination cities with airport codes
- Departure and return dates
- Trip duration in days
- Travel class
- Price in RSD
- Last seen timestamp

## Project Structure

```
src/
├── components/
│   ├── ui/              # Base UI components (Button, Card, Input, Select)
│   ├── FlightCard.tsx   # Individual flight card component
│   ├── FlightGrid.tsx   # Grid layout for flight cards
│   ├── SearchFilters.tsx # Search and filter interface
│   └── SearchHistory.tsx # Recent searches component
├── services/
│   └── flightService.ts # GraphQL API service
├── types/
│   └── flight.types.ts  # TypeScript type definitions
├── utils/
│   ├── dateUtils.ts     # Date formatting utilities
│   ├── flightFilters.ts # Client-side filtering logic
│   └── localStorage.ts  # Search history storage
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles with Tailwind

```

## License

MIT
