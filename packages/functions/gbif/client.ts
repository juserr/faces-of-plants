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
    
    // Always filter for Plantae kingdom
    const enhancedParams = {
      ...params,
      kingdom: 'Plantae'
    };
    
    Object.entries(enhancedParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const requestUrl = `${this.baseUrl}/occurrence/search?${searchParams.toString()}`;
    console.log(`[GBIFClient] Fetching from URL: ${requestUrl}`);
    console.log(`[GBIFClient] Filtering for Plantae kingdom only`);

    const response = await fetch(requestUrl);

    console.log(`[GBIFClient] Response Status: ${response.status}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[GBIFClient] Response Error: ${errorText}`);
      throw new Error(`GBIF API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json() as {
      results: any[];
      count: number;
      endOfRecords: boolean;
    };
    
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
