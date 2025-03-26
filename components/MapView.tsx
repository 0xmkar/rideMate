// import React from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// // Import directly but use type assertions where needed
// import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

// interface Location {
//   latitude: number;
//   longitude: number;
// }

// interface MapViewComponentProps {
//   route: Location[];
//   startPoint: string;
//   destination: string;
//   height?: number;
// }

// const MapViewComponent = ({
//   route,
//   startPoint,
//   destination,
//   height = 300,
// }: MapViewComponentProps) => {
//   if (!route || route.length === 0) {
//     return (
//       <View style={[styles.container, { height }]}>
//         <Text>No route data available</Text>
//       </View>
//     );
//   }

//   const initialRegion = {
//     latitude: route[0].latitude,
//     longitude: route[0].longitude,
//     latitudeDelta: 0.5,
//     longitudeDelta: 0.5,
//   };

//   return (
//     <View style={[styles.container, { height }]}>
//       {/* Use type assertion for MapView */}
//       {React.createElement(MapView as any, {
//         style: styles.map,
//         provider: PROVIDER_GOOGLE,
//         initialRegion: initialRegion
//       }, [
//         // Start Marker
//         React.createElement(Marker as any, {
//           key: "start",
//           coordinate: route[0],
//           title: startPoint,
//           description: "Starting Point",
//           pinColor: "blue"
//         }),
        
//         // End Marker
//         React.createElement(Marker as any, {
//           key: "end",
//           coordinate: route[route.length - 1],
//           title: destination,
//           description: "Destination",
//           pinColor: "red"
//         }),
        
//         // Route Polyline
//         React.createElement(Polyline as any, {
//           key: "route",
//           coordinates: route,
//           strokeColor: "blue",
//           strokeWidth: 3
//         }),
        
//         // Waypoint Markers
//         ...route.slice(1, -1).map((point, index) => 
//           React.createElement(Marker as any, {
//             key: `waypoint-${index}`,
//             coordinate: point,
//             title: `Waypoint ${index + 1}`,
//             pinColor: "orange"
//           })
//         )
//       ])}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default MapViewComponent;


import { View, StyleSheet, Text, Platform } from "react-native"
import { colors } from "../constants/colors"

// Conditionally import MapView to avoid web errors
let MapView: any
let Marker: any
let Polyline: any
let PROVIDER_GOOGLE: any

// Only import the native components on native platforms
if (Platform.OS !== "web") {
  const Maps = require("react-native-maps")
  MapView = Maps.default
  Marker = Maps.Marker
  Polyline = Maps.Polyline
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE
}

interface Location {
  latitude: number
  longitude: number
}

interface MapViewComponentProps {
  route: Location[]
  startPoint: string
  destination: string
  height?: number
}

const MapViewComponent = ({ route, startPoint, destination, height = 300 }: MapViewComponentProps) => {
  if (Platform.OS === "web") {
    // Render a placeholder on web
    return (
      <View style={[styles.container, { height }]}>
        <Text style={styles.placeholderText}>Map View (Not available on web)</Text>
        <Text style={styles.routeText}>
          Route: {startPoint} to {destination}
        </Text>
      </View>
    )
  }

  if (!route || route.length === 0) {
    return (
      <View style={[styles.container, { height }]}>
        <Text>No route data available</Text>
      </View>
    )
  }

  const initialRegion = {
    latitude: route[0].latitude,
    longitude: route[0].longitude,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  }

  return (
    <View style={[styles.container, { height }]}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={initialRegion}>
        {/* Start Marker */}
        <Marker coordinate={route[0]} title={startPoint} description="Starting Point" pinColor={colors.primary} />

        {/* End Marker */}
        <Marker coordinate={route[route.length - 1]} title={destination} description="Destination" pinColor="red" />

        {/* Route Polyline */}
        <Polyline coordinates={route} strokeColor={colors.primary} strokeWidth={3} />

        {/* Waypoint Markers */}
        {route.slice(1, -1).map((point, index) => (
          <Marker key={index} coordinate={point} title={`Waypoint ${index + 1}`} pinColor="orange" />
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.card,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.secondary,
  },
  routeText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.text,
  },
})

export default MapViewComponent

