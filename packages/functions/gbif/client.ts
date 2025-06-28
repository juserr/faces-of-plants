import { GBIFSearchParams, GBIFOccurrence } from "../../core/src/types";

export class GBIFClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.GBIF_API_URL || 'https://api.gbif.org/v1';
  }

  async searchOccurrences(params: GBIFSearchParams): Promise<{
    results: GBIFOccurrence[];
    count: number;
    endOfRecords: boolean;
  }> {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(
      `${this.baseUrl}/occurrence/search?${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`GBIF API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      results: data.results || [],
      count: data.count || 0,
      endOfRecords: data.endOfRecords || false,
    };
  }

  async getSpeciesInfo(key: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/species/${key}`);
    
    if (!response.ok) {
      throw new Error(`GBIF API error: ${response.status}`);
    }

    return response.json();
  }
}
