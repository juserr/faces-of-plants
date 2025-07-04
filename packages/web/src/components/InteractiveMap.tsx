'use client';

import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Icon, divIcon, LatLng } from 'leaflet';
import type { GBIFOccurrence } from '@faces-of-plants/core/src/types';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Simple Heatmap Component
const SimpleHeatmapLayer = ({ points }: { points: [number, number, number?][] }) => {
  const map = useMap();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawHeatmap = useCallback(() => {
    if (!map || !points.length) return;

    // Remove existing canvas if it exists
    if (canvasRef.current && canvasRef.current.parentNode) {
      canvasRef.current.parentNode.removeChild(canvasRef.current);
    }

    // Create new canvas for heatmap
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = map.getSize();
    canvas.width = size.x;
    canvas.height = size.y;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '400';
    canvas.style.mixBlendMode = 'multiply';

    const mapContainer = map.getContainer();
    mapContainer.appendChild(canvas);
    canvasRef.current = canvas;

    // Calculate point density for better visualization
    const pointCount = points.length;
    const baseRadius = Math.max(10, Math.min(30, pointCount / 20));
    
    // Draw heat points with varying intensity based on zoom level
    const zoom = map.getZoom();
    const zoomFactor = Math.max(0.5, Math.min(2, zoom / 10));
    
    points.forEach(([lat, lng, intensity = 1]) => {
      const point = map.latLngToContainerPoint([lat, lng]);
      
      // Skip points that are outside the current view
      if (point.x < -50 || point.x > size.x + 50 || point.y < -50 || point.y > size.y + 50) {
        return;
      }
      
      const radius = baseRadius * zoomFactor;
      
      // Enhanced gradient with better color transitions
      const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
      gradient.addColorStop(0, `rgba(220, 38, 127, ${0.8 * intensity})`); // Hot pink center
      gradient.addColorStop(0.2, `rgba(249, 115, 22, ${0.7 * intensity})`); // Orange
      gradient.addColorStop(0.4, `rgba(234, 179, 8, ${0.6 * intensity})`); // Yellow
      gradient.addColorStop(0.6, `rgba(34, 197, 94, ${0.4 * intensity})`); // Green
      gradient.addColorStop(0.8, `rgba(59, 130, 246, ${0.2 * intensity})`); // Blue
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)'); // Transparent blue edge
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, [map, points]);

  useEffect(() => {
    if (!map || !points.length) return;

    // Initial draw
    drawHeatmap();

    // Handle map zoom/pan events to redraw heatmap
    const handleMapUpdate = () => {
      drawHeatmap();
    };

    map.on('zoomend', handleMapUpdate);
    map.on('moveend', handleMapUpdate);

    return () => {
      map.off('zoomend', handleMapUpdate);
      map.off('moveend', handleMapUpdate);
      if (canvasRef.current && canvasRef.current.parentNode) {
        canvasRef.current.parentNode.removeChild(canvasRef.current);
      }
    };
  }, [drawHeatmap]);

  return null;
};

interface ClusterData {
  id: string;
  lat: number;
  lng: number;
  count: number;
  occurrences: GBIFOccurrence[];
}

// Custom clustering algorithm
const clusterOccurrences = (occurrences: GBIFOccurrence[], clusterRadius: number = 0.5): ClusterData[] => {
  const clusters: ClusterData[] = [];
  const processed = new Set<number>();

  occurrences.forEach((occurrence, index) => {
    if (processed.has(index)) return;

    const lat = occurrence.decimalLatitude!;
    const lng = occurrence.decimalLongitude!;
    const cluster: ClusterData = {
      id: `cluster-${index}`,
      lat,
      lng,
      count: 1,
      occurrences: [occurrence]
    };

    // Find nearby occurrences to cluster
    occurrences.forEach((other, otherIndex) => {
      if (processed.has(otherIndex) || index === otherIndex) return;

      const otherLat = other.decimalLatitude!;
      const otherLng = other.decimalLongitude!;
      
      // Simple distance calculation
      const distance = Math.sqrt(
        Math.pow(lat - otherLat, 2) + Math.pow(lng - otherLng, 2)
      );

      if (distance <= clusterRadius) {
        cluster.occurrences.push(other);
        cluster.count++;
        cluster.lat = (cluster.lat + otherLat) / 2; // Update cluster center
        cluster.lng = (cluster.lng + otherLng) / 2;
        processed.add(otherIndex);
      }
    });

    processed.add(index);
    clusters.push(cluster);
  });

  return clusters;
};

// Create custom cluster icon
const createClusterIcon = (count: number) => {
  let size = 30;
  let className = 'custom-cluster-small';
  
  if (count > 100) {
    size = 44;
    className = 'custom-cluster-large';
  } else if (count > 20) {
    size = 36;
    className = 'custom-cluster-medium';
  }

  return divIcon({
    html: `<div class="cluster-inner">${count}</div>`,
    className: className,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

interface InteractiveMapProps {
  occurrences: GBIFOccurrence[];
  dateRange?: { start: string; end: string };
  showHeatmap?: boolean;
  enableClustering?: boolean;
}

// Export functions
const exportToCSV = (occurrences: GBIFOccurrence[], filename: string = 'species-occurrences.csv') => {
  const headers = ['Species', 'Scientific Name', 'Latitude', 'Longitude', 'Date', 'Country', 'Recorded By'];
  const rows = occurrences.map(occ => [
    occ.species || occ.scientificName || 'Unknown',
    occ.scientificName || '',
    occ.decimalLatitude?.toString() || '',
    occ.decimalLongitude?.toString() || '',
    occ.eventDate ? new Date(occ.eventDate).toISOString().split('T')[0] : '',
    occ.country || '',
    occ.recordedBy || ''
  ]);

  const csvContent = [headers, ...rows].map(row => 
    row.map(field => `"${field.replace(/"/g, '""')}"`).join(',')
  ).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function InteractiveMap({ 
  occurrences = [], 
  dateRange,
  showHeatmap = false,
  enableClustering = true 
}: InteractiveMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Add cluster styles to document head
    const style = document.createElement('style');
    style.textContent = `
      .custom-cluster-small {
        background-color: rgba(34, 197, 94, 0.8);
        border: 2px solid rgba(34, 197, 94, 1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
      }
      
      .custom-cluster-medium {
        background-color: rgba(251, 191, 36, 0.8);
        border: 2px solid rgba(251, 191, 36, 1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
      }
      
      .custom-cluster-large {
        background-color: rgba(239, 68, 68, 0.8);
        border: 2px solid rgba(239, 68, 68, 1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
      }
      
      .cluster-inner {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Filter occurrences by date range in real-time
  const filteredOccurrences = useMemo(() => {
    if (!dateRange) return occurrences;
    
    return occurrences.filter(occ => {
      if (!occ.eventDate) return false;
      
      try {
        const occDate = new Date(occ.eventDate);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        
        // Check if date is valid and within range
        if (isNaN(occDate.getTime())) return false;
        return occDate >= startDate && occDate <= endDate;
      } catch (error) {
        // If date parsing fails, exclude the occurrence
        return false;
      }
    });
  }, [occurrences, dateRange]);

  // Filter for valid coordinates
  const validOccurrences = useMemo(() => {
    return filteredOccurrences.filter(occ => 
      occ.decimalLatitude && 
      occ.decimalLongitude &&
      !isNaN(occ.decimalLatitude) &&
      !isNaN(occ.decimalLongitude)
    );
  }, [filteredOccurrences]);

  // Create clusters when clustering is enabled
  const clusters = useMemo(() => {
    if (!enableClustering) return [];
    return clusterOccurrences(validOccurrences);
  }, [validOccurrences, enableClustering]);

  // Prepare heatmap data with density calculation
  const heatmapPoints = useMemo(() => {
    if (!showHeatmap) return [];
    
    // Calculate point density in a grid to create intensity values
    const gridSize = 0.1; // degrees for grid cells
    const densityMap = new Map<string, number>();
    
    // Count occurrences in each grid cell
    validOccurrences.forEach(occ => {
      const gridLat = Math.floor(occ.decimalLatitude! / gridSize) * gridSize;
      const gridLng = Math.floor(occ.decimalLongitude! / gridSize) * gridSize;
      const key = `${gridLat},${gridLng}`;
      densityMap.set(key, (densityMap.get(key) || 0) + 1);
    });
    
    // Find max density for normalization
    const maxDensity = Math.max(...Array.from(densityMap.values()));
    
    // Create heatmap points with calculated intensity
    return validOccurrences.map(occ => {
      const gridLat = Math.floor(occ.decimalLatitude! / gridSize) * gridSize;
      const gridLng = Math.floor(occ.decimalLongitude! / gridSize) * gridSize;
      const key = `${gridLat},${gridLng}`;
      const density = densityMap.get(key) || 1;
      const intensity = Math.min(1, density / maxDensity * 2); // Normalize and boost
      
      return [
        occ.decimalLatitude!,
        occ.decimalLongitude!,
        intensity
      ] as [number, number, number];
    });
  }, [validOccurrences, showHeatmap]);

  if (!isClient) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-600">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="relative">      {/* Map Stats */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
        <div className="text-sm font-medium text-gray-800">
          {validOccurrences.length} occurrence{validOccurrences.length !== 1 ? 's' : ''}
          {dateRange && (
            <div className="text-xs text-gray-600 mt-1">
              📅 Filtered by date range
            </div>
          )}
          {enableClustering && !showHeatmap && (
            <div className="text-xs text-blue-600 mt-1">
              🔗 Clustering enabled
            </div>
          )}
          {showHeatmap && (
            <div className="text-xs text-orange-600 mt-1">
              🔥 Heatmap visualization
            </div>
          )}
          {showHeatmap && enableClustering && (
            <div className="text-xs text-yellow-600 mt-1">
              ℹ️ Markers hidden in heatmap mode
            </div>
          )}
        </div>
      </div>

      {/* Heatmap Legend */}
      {showHeatmap && (
        <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
          <div className="text-sm font-medium text-gray-800 mb-2">Density Scale</div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Low</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>↑</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>↑</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>↑</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-pink-600"></div>
              <span>High</span>
            </div>
          </div>
        </div>
      )}

      {/* Export Controls */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => exportToCSV(validOccurrences, `species-occurrences-${new Date().toISOString().split('T')[0]}.csv`)}
            disabled={validOccurrences.length === 0}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              validOccurrences.length > 0
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            📊 Export CSV
          </button>
          {showHeatmap && (
            <span className="text-xs text-gray-600">
              {validOccurrences.length} points in heatmap
            </span>
          )}
        </div>
      </div>

      <MapContainer
        center={[51.505, -0.09]}
        zoom={2}
        style={{ height: '500px', width: '100%' }}
        className="rounded-lg shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Heatmap Layer */}
        {showHeatmap && heatmapPoints.length > 0 && (
          <SimpleHeatmapLayer 
            points={heatmapPoints}
          />
        )}

        {/* Markers/Clusters - hidden when heatmap is active for better visualization */}
        {!showHeatmap && (enableClustering ? (
          // Render clusters
          clusters.map((cluster) => {
            if (cluster.count === 1) {
              // Single occurrence - render as normal marker
              const occurrence = cluster.occurrences[0];
              return (
                <Marker
                  key={occurrence.key}
                  position={[occurrence.decimalLatitude!, occurrence.decimalLongitude!]}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg">{occurrence.species || occurrence.scientificName || 'Unknown species'}</h3>
                      <p className="text-sm text-gray-600">
                        <strong>Location:</strong> {occurrence.decimalLatitude?.toFixed(4)}, {occurrence.decimalLongitude?.toFixed(4)}
                      </p>
                      {occurrence.eventDate && (
                        <p className="text-sm text-gray-600">
                          <strong>Date:</strong> {new Date(occurrence.eventDate).toLocaleDateString()}
                        </p>
                      )}
                      {occurrence.country && (
                        <p className="text-sm text-gray-600">
                          <strong>Country:</strong> {occurrence.country}
                        </p>
                      )}
                      {occurrence.recordedBy && (
                        <p className="text-sm text-gray-600">
                          <strong>Recorded by:</strong> {occurrence.recordedBy}
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            } else {
              // Multiple occurrences - render as cluster
              return (
                <Marker
                  key={cluster.id}
                  position={[cluster.lat, cluster.lng]}
                  icon={createClusterIcon(cluster.count)}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg mb-2">Cluster of {cluster.count} occurrences</h3>
                      <div className="max-h-48 overflow-y-auto">
                        {cluster.occurrences.slice(0, 10).map((occurrence, index) => (
                          <div key={occurrence.key || index} className="mb-2 pb-2 border-b border-gray-200 last:border-b-0">
                            <p className="font-medium text-sm">{occurrence.species || occurrence.scientificName || 'Unknown species'}</p>
                            <p className="text-xs text-gray-600">
                              {occurrence.decimalLatitude?.toFixed(4)}, {occurrence.decimalLongitude?.toFixed(4)}
                            </p>
                            {occurrence.eventDate && (
                              <p className="text-xs text-gray-600">
                                {new Date(occurrence.eventDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        ))}
                        {cluster.count > 10 && (
                          <p className="text-xs text-gray-500 italic">
                            and {cluster.count - 10} more occurrences...
                          </p>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            }
          })
        ) : (
          // Render individual markers
          validOccurrences.map((occurrence) => (
            <Marker
              key={occurrence.key}
              position={[occurrence.decimalLatitude!, occurrence.decimalLongitude!]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{occurrence.species || occurrence.scientificName || 'Unknown species'}</h3>
                  <p className="text-sm text-gray-600">
                    <strong>Location:</strong> {occurrence.decimalLatitude?.toFixed(4)}, {occurrence.decimalLongitude?.toFixed(4)}
                  </p>
                  {occurrence.eventDate && (
                    <p className="text-sm text-gray-600">
                      <strong>Date:</strong> {new Date(occurrence.eventDate).toLocaleDateString()}
                    </p>
                  )}
                  {occurrence.country && (
                    <p className="text-sm text-gray-600">
                      <strong>Country:</strong> {occurrence.country}
                    </p>
                  )}
                  {occurrence.recordedBy && (
                    <p className="text-sm text-gray-600">
                      <strong>Recorded by:</strong> {occurrence.recordedBy}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))
        ))}
      </MapContainer>
    </div>
  );
}
