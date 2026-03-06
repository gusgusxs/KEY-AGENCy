// lib/filters.ts
export type FilterStatus = 'all' | 'online' | 'offline' | 'rejected';

export interface ListingFilters {
  status: FilterStatus;
  searchQuery: string;
  priceRange?: { min: number; max: number };
  propertyType?: string;
  location?: string;
}

export interface Listing {
  id: string | number;
  title?: string;
  location?: string;
  price?: number;
  status?: string;
  type?: string;
  [key: string]: any;
}

/**
 * Filter listings based on status
 */
export function filterByStatus(listings: Listing[], status: FilterStatus): Listing[] {
  if (status === 'all') return listings;
  return listings.filter((item) => item.status === status);
}

/**
 * Filter listings based on search query
 * Searches in: title, id, location
 */
export function filterBySearch(listings: Listing[], searchQuery: string): Listing[] {
  if (!searchQuery) return listings;
  
  const query = searchQuery.toLowerCase().trim();
  return listings.filter((item) => {
    const titleMatch = item.title?.toLowerCase().includes(query);
    const idMatch = String(item.id).includes(query);
    const locationMatch = item.location?.toLowerCase().includes(query);
    return titleMatch || idMatch || locationMatch;
  });
}

/**
 * Filter listings based on price range
 */
export function filterByPriceRange(
  listings: Listing[],
  priceRange?: { min: number; max: number }
): Listing[] {
  if (!priceRange) return listings;
  
  return listings.filter((item) => {
    const price = item.price ?? 0;
    return price >= priceRange.min && price <= priceRange.max;
  });
}

/**
 * Filter listings based on property type
 */
export function filterByPropertyType(listings: Listing[], propertyType?: string): Listing[] {
  if (!propertyType) return listings;
  return listings.filter((item) => item.type === propertyType);
}

/**
 * Filter listings based on location
 */
export function filterByLocation(listings: Listing[], location?: string): Listing[] {
  if (!location) return listings;
  return listings.filter((item) => item.location?.includes(location));
}

/**
 * Apply all filters to listings
 */
export function applyFilters(listings: Listing[], filters: ListingFilters): Listing[] {
  let filtered = listings;
  
  // Apply status filter
  filtered = filterByStatus(filtered, filters.status);
  
  // Apply search filter
  filtered = filterBySearch(filtered, filters.searchQuery);
  
  // Apply price range filter
  if (filters.priceRange) {
    filtered = filterByPriceRange(filtered, filters.priceRange);
  }
  
  // Apply property type filter
  if (filters.propertyType) {
    filtered = filterByPropertyType(filtered, filters.propertyType);
  }
  
  // Apply location filter
  if (filters.location) {
    filtered = filterByLocation(filtered, filters.location);
  }
  
  return filtered;
}

/**
 * Get count of listings by status
 */
export function getListingCountByStatus(listings: Listing[]): Record<FilterStatus, number> {
  return {
    all: listings.length,
    online: listings.filter((item) => item.status === 'online').length,
    offline: listings.filter((item) => item.status === 'offline').length,
    rejected: listings.filter((item) => item.status === 'rejected').length,
  };
}
