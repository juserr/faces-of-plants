/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "faces-of-plants", // This becomes the prefix for all AWS resources
      region: "eu-central-1", // Frankfurt region
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws", // Required for SST v3
    };
  },
  async run() {
    // Create DynamoDB tables with consistent naming
    const userCollectionsTable = new sst.aws.Dynamo("FacesOfPlantsUserCollections", {
      fields: {
        userId: "string",
        collectionId: "string",
      },
      primaryIndex: { hashKey: "userId", rangeKey: "collectionId" },
    });

    const queryHistoryTable = new sst.aws.Dynamo("FacesOfPlantsQueryHistory", {
      fields: {
        userId: "string",
        queryId: "string",
      },
      primaryIndex: { hashKey: "userId", rangeKey: "queryId" },
    });

    // Create a secret for the LLM API key
    const llmApiKey = new sst.Secret("LLM_API_KEY");

    // Create API Gateway with Lambda functions
    const api = new sst.aws.ApiGatewayV2("FacesOfPlantsApi", {
      routes: {
        "POST /query": {
          function: {
            handler: "packages/functions/api/query.handler",
            link: [userCollectionsTable, queryHistoryTable, llmApiKey],
            environment: {
              LLM_PROVIDER: "openai",
              GBIF_API_URL: "https://api.gbif.org/v1",
            },
          },
        },
        "GET /species/{id}": {
          function: {
            handler: "packages/functions/api/species.handler",
            link: [userCollectionsTable, queryHistoryTable],
            environment: {
              GBIF_API_URL: "https://api.gbif.org/v1",
            },
          },
        },
        "POST /collections": {
          function: {
            handler: "packages/functions/api/collections.handler",
            link: [userCollectionsTable, queryHistoryTable],
          },
        },
        "GET /collections/{userId}": {
          function: {
            handler: "packages/functions/api/collections.handler",
            link: [userCollectionsTable, queryHistoryTable],
          },
        },
      },
    });

    // Create Next.js site
    const web = new sst.aws.Nextjs("FacesOfPlantsSite", {
      path: "packages/web",
      environment: {
        NEXT_PUBLIC_APP_NAME: "Faces of Plants",
        NEXT_PUBLIC_APP_TAGLINE: "Powered by GBIF",
        NEXT_PUBLIC_API_URL: api.url,
      },
    });

    return {
      api: api.url,
      web: web.url,
      tables: {
        userCollections: userCollectionsTable.name,
        queryHistory: queryHistoryTable.name,
      },
    };
  },
});
