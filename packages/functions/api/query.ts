import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { GBIFClient } from "../gbif/client";

const dynamodb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event: any) => {
  try {
    const { query, userType, filters } = JSON.parse(event.body || '{}');
    
    const gbifClient = new GBIFClient();
    
    // Convert natural language query to GBIF parameters
    const searchParams = await convertQueryToGBIFParams(query, userType, filters);
    
    // Search GBIF data
    const results = await gbifClient.searchOccurrences(searchParams);
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        query,
        searchParams,
        ...results,
      }),
    };
  } catch (error) {
    console.error('Query handler error:', error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

async function convertQueryToGBIFParams(query: string, userType: string, filters: any) {
  // This would typically use the LLM to convert natural language to GBIF parameters
  // For now, return basic search parameters
  return {
    q: query,
    limit: userType === 'researcher' ? 100 : 20,
    hasCoordinate: true,
    hasGeospatialIssue: false,
    ...filters,
  };
}
