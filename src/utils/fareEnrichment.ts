import { getAirportByCode } from '../data/airports';
import type { Fare } from '../types/flight.types';

/**
 * Enriches fare data with airport images from our static database
 * if the API doesn't provide one
 */
export function enrichFareWithImages(fare: Fare): Fare {
  // If the API already provided an image, use it
  if (fare.image) {
    return fare;
  }

  // Try to get the destination airport image from our database
  const destinationAirport = getAirportByCode(fare.destinationAirportCode);
  if (destinationAirport?.imageUrl) {
    return {
      ...fare,
      image: destinationAirport.imageUrl
    };
  }

  // No image available
  return fare;
}

/**
 * Enriches an array of fares with images
 */
export function enrichFaresWithImages(fares: Fare[]): Fare[] {
  return fares.map(enrichFareWithImages);
}
