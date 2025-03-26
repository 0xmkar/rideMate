// react-native-maps.d.ts
import React from 'react';
import { ViewProps } from 'react-native';

declare module 'react-native-maps' {
  // Define the prop types
  export interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }

  export interface LatLng {
    latitude: number;
    longitude: number;
  }

  export interface MapViewProps extends ViewProps {
    provider?: any;
    initialRegion?: Region;
    region?: Region;
    onRegionChange?: (region: Region) => void;
    onRegionChangeComplete?: (region: Region) => void;
    [key: string]: any;
  }

  export interface MarkerProps extends ViewProps {
    coordinate: LatLng;
    title?: string;
    description?: string;
    pinColor?: string;
    [key: string]: any;
  }

  export interface PolylineProps extends ViewProps {
    coordinates: LatLng[];
    strokeColor?: string;
    strokeWidth?: number;
    [key: string]: any;
  }

  // Define the component types
  class MapViewComponent extends React.Component<MapViewProps> {}
  class MarkerComponent extends React.Component<MarkerProps> {}
  class PolylineComponent extends React.Component<PolylineProps> {}

  // Extend the MapViewComponent with static properties
  interface MapViewStatic extends React.ComponentClass<MapViewProps> {
    Marker: React.ComponentClass<MarkerProps>;
    Polyline: React.ComponentClass<PolylineProps>;
  }

  // Export the components
  const MapView: MapViewStatic;
  export default MapView;
  
  export const Marker: React.ComponentClass<MarkerProps>;
  export const Polyline: React.ComponentClass<PolylineProps>;
  export const PROVIDER_GOOGLE: any;
}