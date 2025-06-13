import * as L from 'leaflet';

declare module 'react-leaflet' {
  export interface MapContainerProps {
    center: L.LatLngExpression;
    zoom: number;
    scrollWheelZoom: boolean;
    style?: React.CSSProperties;
    className?: string;
  }
  
  export interface TileLayerProps {
    attribution: string;
    url: string;
  }
  
  export interface MarkerProps {
    position: L.LatLngExpression;
  }
}
