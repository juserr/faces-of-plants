interface LLMRequest {
  query: string;
  userType: 'citizen' | 'researcher';
}

export const handler = async (event: any): Promise<any> => {
  try {
    const { query, userType }: LLMRequest = JSON.parse(event.body || '{}');
    
    const config: {
      provider: string;
      apiKey: string;
      endpoint: string;
      model: string;
    } = {
      provider: process.env.LLM_PROVIDER as string,
      apiKey: process.env.LLM_API_KEY as string,
      endpoint: process.env.LLM_ENDPOINT as string,
      model: process.env.LLM_MODEL as string,
    };

    // Route to appropriate LLM provider
    switch (config.provider) {
      case 'openai':
        return await processWithOpenAI(query, userType, config);
      case 'anthropic':
        return await processWithClaude(query, userType, config);
      case 'groq':
        return await processWithGroq(query, userType, config);
      default:
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ error: 'Unsupported LLM provider' }),
        };
    }
  } catch (error) {
    console.error('LLM Proxy error:', error);
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

async function processWithOpenAI(query: string, userType: string, config: { apiKey: string; endpoint: string; model: string }): Promise<any> {
  const response = await fetch(`${config.endpoint}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for a biodiversity platform called "Faces of Plants" powered by GBIF data. The user is a ${userType}. Help them construct appropriate GBIF API queries based on their natural language input.`,
        },
        {
          role: 'user',
          content: query,
        },
      ],
    }),
  });

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
    usage?: any;
  };
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      response: data.choices?.[0]?.message?.content || '',
      usage: data.usage,
    }),
  };
}

async function processWithClaude(query: string, userType: string, config: any): Promise<any> {
  // Implementation for Anthropic Claude
  return {
    statusCode: 501,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ error: 'Claude integration not implemented yet' }),
  };
}

async function processWithGroq(query: string, userType: string, config: any): Promise<any> {
  // Implementation for Groq
  return {
    statusCode: 501,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ error: 'Groq integration not implemented yet' }),
  };
}
