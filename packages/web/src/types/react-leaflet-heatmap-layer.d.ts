declare module 'react-leaflet-heatmap-layer' {
  import { ComponentType } from 'react';
  import { LatLngTuple } from 'leaflet';

  export interface HeatmapLayerProps {
    points: LatLngTuple[] | Array<[number, number, number]>;
    longitudeExtractor?: (point: any) => number;
    latitudeExtractor?: (point: any) => number;
    intensityExtractor?: (point: any) => number;
    fitBoundsOnLoad?: boolean;
    fitBoundsOnUpdate?: boolean;
    radius?: number;
    blur?: number;
    maxZoom?: number;
    max?: number;
    minOpacity?: number;
    gradient?: Record<string, string>;
  }

  export const HeatmapLayer: ComponentType<HeatmapLayerProps>;
}
