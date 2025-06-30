// Strategic Service Integration Layer for extensibility, plugin support, and future MCP/agent workflows

import { ServiceRegistry } from './ServiceRegistry';
import { ServiceExecutor } from './ServiceExecutor';
import {
  ServiceProvider,
  ServiceRequest,
  ServiceResponse,
  ServiceCapability
} from '../types';

export class AbstractionLayer {
  private registry: ServiceRegistry;
  private executor: ServiceExecutor;

  constructor() {
    this.registry = new ServiceRegistry();
    this.executor = new ServiceExecutor(this.registry);
  }

  async registerProvider(provider: ServiceProvider): Promise<void> {
    await this.registry.registerProvider(provider);
  }

  async registerProviders(providers: ServiceProvider[]): Promise<void> {
    for (const provider of providers) {
      await this.registerProvider(provider);
    }
  }

  getAllCapabilities(): ServiceCapability[] {
    return this.registry.getAllCapabilities();
  }

  async execute<T = any>(request: ServiceRequest): Promise<ServiceResponse<T>> {
    return this.executor.execute<T>(request);
  }

  async runWorkflow(requests: ServiceRequest[]): Promise<ServiceResponse[]> {
    const results: ServiceResponse[] = [];
    for (const req of requests) {
      const res = await this.execute(req);
      results.push(res);
      if (!res.success) break;
    }
    return results;
  }

  async registerPlugin(plugin: { providers: ServiceProvider[] }): Promise<void> {
    await this.registerProviders(plugin.providers);
  }

  async handleMCPHandshake(request: any): Promise<any> {
    return {
      protocolVersion: '1.0.0',
      capabilities: this.getAllCapabilities(),
      serverInfo: {
        name: 'Faces of Plants Service Layer',
        version: '1.0.0'
      }
    };
  }

  async convertMCPRequest(mcpRequest: any): Promise<ServiceRequest> {
    return {
      serviceId: mcpRequest.method.split('/')[0],
      capabilityId: mcpRequest.method.split('/')[1],
      parameters: mcpRequest.params,
      metadata: {
        requestId: mcpRequest.id,
        context: mcpRequest.context
      }
    };
  }
}

// Example usage (to be removed in production):
// const layer = new AbstractionLayer();
// await layer.registerProvider({ ... });
// const result = await layer.execute({ ... });
// const workflowResults = await layer.runWorkflow([ ... ]);
