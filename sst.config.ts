/// <reference path="./.sst/platform/config.d.ts" />

export default {
  stage: "dev", // Set your default stage here
  app(input) {
    return {
      name: "faces-of-plants", // Prefix for all AWS resources
      region: "eu-central-1", // All Lambda/API/Dynamo resources in Frankfurt
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws", // Required for SST v3
    };
  },
  async run() {
    // DynamoDB tables for user collections and query history
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

    // Secret for LLM API key (set with `sst secret set LLM_API_KEY ... --stage <stage>`)
    const llmApiKey = new sst.Secret("LLM_API_KEY");

    // API Gateway (HTTP API) with Lambda routes
    // NOTE: Handler paths must match file names and export `handler`.
    const api = new sst.aws.ApiGatewayV2("FacesOfPlantsApi", {});
    api.route("POST /query", {
      handler: "packages/functions/api/query.handler",
      link: [userCollectionsTable, queryHistoryTable, llmApiKey],
      environment: {
        LLM_PROVIDER: "openai",
        GBIF_API_URL: "https://api.gbif.org/v1",
        USER_COLLECTIONS_TABLE: userCollectionsTable.name,
        QUERY_HISTORY_TABLE: queryHistoryTable.name,
      },
    });
    api.route("GET /species/{id}", {
      handler: "packages/functions/api/species.handler",
      link: [userCollectionsTable, queryHistoryTable],
      environment: {
        GBIF_API_URL: "https://api.gbif.org/v1",
        USER_COLLECTIONS_TABLE: userCollectionsTable.name,
        QUERY_HISTORY_TABLE: queryHistoryTable.name,
      },
    });
    api.route("POST /collections", {
      handler: "packages/functions/api/collections.handler",
      link: [userCollectionsTable, queryHistoryTable],
      environment: {
        USER_COLLECTIONS_TABLE: userCollectionsTable.name,
        QUERY_HISTORY_TABLE: queryHistoryTable.name,
      },
    });
    api.route("GET /collections/{userId}", {
      handler: "packages/functions/api/collections.handler",
      link: [userCollectionsTable, queryHistoryTable],
      environment: {
        USER_COLLECTIONS_TABLE: userCollectionsTable.name,
        QUERY_HISTORY_TABLE: queryHistoryTable.name,
      },
    });

    // Custom domain logic for Next.js/CloudFront
    // NOTE: For CloudFront, ACM certificate must be in us-east-1 (N. Virginia)
    // For API Gateway, ACM certificate must be in eu-central-1 (Frankfurt)
    const stage = process.env.SST_STAGE || "dev";
    let customDomain;
    if (stage === "production") {
      customDomain = {
        domainName: "facesofplants.org",
        hostedZone: "facesofplants.org",
        // certificateArn: "..." // (optional) specify if not auto-detected
      };
    } else {
      customDomain = {
        domainName: `dev.facesofplants.org`,
        hostedZone: "facesofplants.org",
      };
    }

    // Next.js site (served via CloudFront)
    const nextjsProps = {
      path: "packages/web",
      environment: {
        NEXT_PUBLIC_APP_NAME: "Faces of Plants",
        NEXT_PUBLIC_APP_TAGLINE: "Powered by GBIF",
        NEXT_PUBLIC_API_URL: api.url,
      },
    };
    if (customDomain) {
      nextjsProps.customDomain = customDomain;
    }
    const web = new sst.aws.Nextjs("FacesOfPlantsSite", nextjsProps);

    // Return resource references for use in other stacks or outputs
    return {
      api: api.url,
      web: web.url,
      tables: {
        userCollections: userCollectionsTable.name,
        queryHistory: queryHistoryTable.name,
      },
    };
  },
};
