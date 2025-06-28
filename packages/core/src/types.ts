export interface GBIFSearchParams {
  q?: string;
  limit?: number;
  offset?: number;
  country?: string;
  basisOfRecord?: string;
  scientificName?: string;
  hasCoordinate?: boolean;
  hasGeospatialIssue?: boolean;
  year?: string;
}

export interface GBIFOccurrence {
  key: number;
  scientificName: string;
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
  decimalLatitude?: number;
  decimalLongitude?: number;
  country: string;
  stateProvince?: string;
  locality?: string;
  eventDate?: string;
  basisOfRecord: string;
  institutionCode?: string;
  collectionCode?: string;
  catalogNumber?: string;
}

export interface UserCollection {
  userId: string;
  collectionId: string;
  name: string;
  description: string;
  queries: SavedQuery[];
  species: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SavedQuery {
  id: string;
  query: string;
  userType: 'citizen' | 'researcher';
  results?: GBIFOccurrence[];
  timestamp: string;
}

export interface QueryHistory {
  userId: string;
  queryId: string;
  query: string;
  userType: 'citizen' | 'researcher';
  results: any;
  timestamp: string;
}

export interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'groq' | 'custom';
  apiKey: string;
  endpoint: string;
  model: string;
}
