import { ServiceRequest, ServiceResponse } from '../types';
import { ServiceRegistry } from './ServiceRegistry';
// Import GBIFClient from the functions package
import { GBIFClient } from '../../../functions/gbif/client';

export class ServiceExecutor {
  constructor(private registry: ServiceRegistry) {}

  async execute<T>(request: ServiceRequest): Promise<ServiceResponse<T>> {
    const startTime = Date.now();
    try {
      const provider = this.registry.getProvider(request.serviceId);
      if (!provider) throw new Error(`Service not found: ${request.serviceId}`);
      const capability = this.registry.getCapability(request.serviceId, request.capabilityId);
      if (!capability) throw new Error(`Capability not found: ${request.capabilityId}`);
      // TODO: Validate input against schema
      const result = await this.executeService(provider, capability, request.parameters);
      return {
        success: true,
        data: result,
        metadata: {
          requestId: request.metadata?.requestId || 'unknown',
          executionTime: Date.now() - startTime,
          serviceVersion: capability.version
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          requestId: request.metadata?.requestId || 'unknown',
          executionTime: Date.now() - startTime,
          serviceVersion: 'unknown'
        }
      };
    }
  }

  private async executeService(provider: any, capability: any, parameters: Record<string, any>): Promise<any> {
    switch (provider.id) {
      case 'gbif':
        return this.executeGBIFService(capability.id, parameters);
      case 'openai':
        return this.executeLLMService(capability.id, parameters);
      default:
        throw new Error(`Unknown service provider: ${provider.id}`);
    }
  }

  private async executeGBIFService(capabilityId: string, parameters: any): Promise<any> {
    const gbif = new GBIFClient();
    switch (capabilityId) {
      case 'species_search':
        return gbif.searchOccurrences(parameters);
      default:
        throw new Error(`Unknown GBIF capability: ${capabilityId}`);
    }
  }

  private async executeLLMService(capabilityId: string, parameters: any): Promise<any> {
    // TODO: Implement your LLM logic here
    return { mock: 'LLM result', capabilityId, parameters };
  }
}
