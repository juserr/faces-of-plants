import { NextRequest, NextResponse } from "next/server";
import { AbstractionLayer } from "@faces-of-plants/core/src/services/AbstractionLayer";

const abstractionLayer = new AbstractionLayer();

// Register GBIF provider (minimal example, expand as needed)
abstractionLayer.registerProvider({
  id: "gbif",
  name: "Global Biodiversity Information Facility",
  capabilities: [
    {
      id: "species_search",
      name: "Species Search",
      description: "Search for plant species using GBIF API.",
      inputSchema: {},
      outputSchema: {},
      version: "1.0.0",
    },
  ],
});

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'question' field." },
        { status: 400 }
      );
    }
    // Log the incoming question
    console.log("[API/chat] Received question:", question);
    // Use abstraction layer to execute a GBIF search
    const result = await abstractionLayer.execute({
      serviceId: "gbif",
      capabilityId: "species_search",
      parameters: { q: question },
      metadata: { requestId: Date.now().toString() },
    });
    // Log the result from the abstraction layer
    console.log("[API/chat] Abstraction layer result:", result);
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("[API/chat] Error:", err);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
