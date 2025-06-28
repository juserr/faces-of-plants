import { GBIFClient } from "../gbif/client";

export const handler = async (event: any) => {
  try {
    const { id } = event.pathParameters || {};
    
    if (!id) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ error: 'Species ID is required' }),
      };
    }

    const gbifClient = new GBIFClient();
    const speciesInfo = await gbifClient.getSpeciesInfo(id);
    
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        speciesId: id,
        ...speciesInfo,
      }),
    };
  } catch (error) {
    console.error('Species handler error:', error);
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
