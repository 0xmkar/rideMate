import React from "react"
import { View, StyleSheet, Text, Platform } from "react-native"
import { colors } from "../constants/colors"

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

const MapViewComponent: React.FC<MapViewComponentProps> = ({ 
  route, 
  startPoint, 
  destination, 
  height = 300 
}) => {
  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapIcon}>🗺️</Text>
        <Text style={styles.mapTitle}>Route Map</Text>
        <View style={styles.routeContainer}>
          <Text style={styles.locationText}>{startPoint}</Text>
          <Text style={styles.arrow}>↓</Text>
          {route && route.length > 2 && (
            <>
              <Text style={styles.waypointText}>
                {route.length - 2} waypoint{route.length - 2 !== 1 ? 's' : ''}
              </Text>
              <Text style={styles.arrow}>↓</Text>
            </>
          )}
          <Text style={styles.locationText}>{destination}</Text>
        </View>
        
        {Platform.OS === "web" ? (
          <Text style={styles.note}>
            📱 Interactive map available on mobile app
          </Text>
        ) : (
          <Text style={styles.note}>
            🔧 Map functionality will be available when configured
          </Text>
        )}
        
        {route && route.length > 0 && (
          <View style={styles.routeInfo}>
            <Text style={styles.routeInfoText}>
              {route.length} coordinates plotted
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  mapIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  routeContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
    marginVertical: 4,
  },
  waypointText: {
    fontSize: 14,
    color: colors.secondary,
    textAlign: "center",
    marginVertical: 4,
  },
  arrow: {
    fontSize: 20,
    color: colors.primary,
    marginVertical: 4,
  },
  note: {
    fontSize: 12,
    color: colors.secondary,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 16,
  },
  routeInfo: {
    backgroundColor: colors.primary + "20",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  routeInfoText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "500",
  },
})

export default MapViewComponent