import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";

const dynamodb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event: any) => {
  try {
    const method = event.httpMethod || event.requestContext?.http?.method;
    
    if (method === 'POST') {
      // Create a new collection
      const { userId, name, description, queries, species } = JSON.parse(event.body || '{}');
      
      if (!userId || !name) {
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ error: 'userId and name are required' }),
        };
      }

      const collectionId = `collection-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const collection = {
        userId,
        collectionId,
        name,
        description: description || '',
        queries: queries || [],
        species: species || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await dynamodb.send(new PutCommand({
        TableName: Resource.FacesOfPlantsUserCollections.name,
        Item: collection,
      }));

      return {
        statusCode: 201,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(collection),
      };
    } 
    
    if (method === 'GET') {
      // Get collections for a user
      const { userId } = event.pathParameters || {};
      
      if (!userId) {
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ error: 'userId is required' }),
        };
      }

      const result = await dynamodb.send(new QueryCommand({
        TableName: Resource.FacesOfPlantsUserCollections.name,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      }));

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userId,
          collections: result.Items || [],
        }),
      };
    }

    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (error) {
    console.error('Collections handler error:', error);
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
