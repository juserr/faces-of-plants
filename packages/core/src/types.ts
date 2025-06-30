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

// Service integration types
export interface ServiceCapability {
  id: string;
  name: string;
  description: string;
  inputSchema: object;
  outputSchema: object;
  version: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  baseUrl?: string;
  capabilities: ServiceCapability[];
  authenticate?: () => Promise<void>;
  discover?: () => Promise<ServiceCapability[]>;
}

export interface ServiceRequest {
  serviceId: string;
  capabilityId: string;
  parameters: Record<string, any>;
  metadata?: {
    requestId: string;
    userId?: string;
    context?: Record<string, any>;
  };
}

export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    requestId: string;
    executionTime: number;
    serviceVersion: string;
  };
}
