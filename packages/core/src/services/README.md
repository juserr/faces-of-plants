# Abstraction Layer for Service Integration

This module provides a strategic abstraction layer for integrating, orchestrating, and extending service providers and capabilities in the Faces of Plants platform.

## Features
- **Service Registration:** Register and discover service providers and their capabilities.
- **Unified Execution:** Execute service requests in a decoupled, extensible way.
- **Workflow Orchestration:** Chain multiple service calls for agent-like or research workflows.
- **Plugin Support:** Register providers via plugins/extensions.
- **MCP Protocol Ready:** Hooks for Model Context Protocol (MCP) handshake and request conversion.

## Usage

```ts
import { AbstractionLayer } from './AbstractionLayer';
import { ServiceProvider, ServiceRequest } from '../types';

const layer = new AbstractionLayer();
await layer.registerProvider({
  id: 'gbif',
  name: 'Global Biodiversity Information Facility',
  capabilities: [/* ... */]
});

const result = await layer.execute({
  serviceId: 'gbif',
  capabilityId: 'species_search',
  parameters: { q: 'Quercus' }
});
```

## Extending
- Add new providers by implementing the `ServiceProvider` interface.
- Add new capabilities to providers.
- Use `registerPlugin` for plugin/extension support.
- Use `runWorkflow` for multi-step/agent workflows.

## Roadmap
- Input/output schema validation
- Event hooks for plugins
- Logging and monitoring
- Advanced error handling

## See Also
- `ServiceRegistry.ts`
- `ServiceExecutor.ts`
- `types.ts`
