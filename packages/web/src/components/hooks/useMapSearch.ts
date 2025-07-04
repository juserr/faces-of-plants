'use client';

import { useState, useCallback } from 'react';
import type { GBIFOccurrence } from '@faces-of-plants/core/src/types';
import { LatLngBounds } from 'leaflet';
import type { FilterState } from '../AdvancedFilters';

interface MapSearchParams {
  species?: string;
  country?: string;
  hasCoordinate?: boolean;
  limit?: number;
  // Advanced filters
  basisOfRecord?: string[];
  countries?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  elevationRange?: {
    min?: number;
    max?: number;
  };
  selectedHabitats?: string[];
}

export const useMapSearch = () => {
  const [occurrences, setOccurrences] = useState<GBIFOccurrence[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchOccurrences = useCallback(async (params: MapSearchParams = {}) => {
    setLoading(true);
    setError(null);

    try {
      const searchParams = {
        hasCoordinate: true,
        limit: 200,
        ...params,
      };

      console.log('[useMapSearch] Searching with params:', searchParams);

      const response = await fetch('/api/map-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });

      console.log('[useMapSearch] Response status:', response.status);

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('[useMapSearch] Response data:', data);
      
      if (data.success && data.data && Array.isArray(data.data.results)) {
        console.log('[useMapSearch] Setting occurrences:', data.data.results.length);
        setOccurrences(data.data.results);
      } else {
        console.log('[useMapSearch] No results or error:', data.error);
        setError(data.error || 'No results found');
        setOccurrences([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setOccurrences([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchInBounds = useCallback(async (bounds: LatLngBounds, species?: string) => {
    // For now, just do a regular search with the species
    // TODO: Implement bounds-based search later
    if (species) {
      await searchOccurrences({ species, limit: 300 });
    }
  }, [searchOccurrences]);

  const searchWithFilters = useCallback(async (
    species?: string, 
    filters?: FilterState
  ) => {
    const searchParams: MapSearchParams = {
      species,
      hasCoordinate: true,
      limit: 300,
    };

    // Apply advanced filters
    if (filters) {
      if (filters.basisOfRecord && filters.basisOfRecord.length > 0) {
        searchParams.basisOfRecord = filters.basisOfRecord;
      }
      
      if (filters.countries && filters.countries.length > 0) {
        searchParams.countries = filters.countries;
      }
      
      if (filters.dateRange) {
        searchParams.dateRange = filters.dateRange;
      }
      
      if (filters.elevationRange) {
        searchParams.elevationRange = filters.elevationRange;
      }
      
      if (filters.selectedHabitats && filters.selectedHabitats.length > 0) {
        searchParams.selectedHabitats = filters.selectedHabitats;
      }
    }

    await searchOccurrences(searchParams);
  }, [searchOccurrences]);

  return {
    occurrences,
    loading,
    error,
    searchOccurrences,
    searchInBounds,
    searchWithFilters,
  };
};
