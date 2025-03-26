"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import MapViewComponent from "../components/MapView"
import Button from "../components/Button"
import { colors } from "../constants/colors"
import { icons } from "../constants/icons"
import { mockTrips } from "../constants/MockData"

// Type definitions
type RootStackParamList = {
  GroupChat: { tripId: string }
  // Add other screens here if needed
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

interface Trip {
  id: string
  title: string
  image: string
  startPoint: string
  destination: string
  duration: string
  budget: string
  bike: string
  description: string
  route: any
  members: Array<{
    id: string
    name: string
    image: string
  }>
  femaleOnly?: boolean
}

const TripDetails = () => {
  const navigation = useNavigation<NavigationProp>()
  const route = useRoute()
  const { tripId } = route.params as { tripId: string }

  const [trip, setTrip] = useState<Trip | null>(null)

  useEffect(() => {
    const selectedTrip = mockTrips.find((t) => t.id === tripId)
    setTrip(selectedTrip || null)
  }, [tripId])

  const handleJoinTrip = () => {
    console.log("Join trip:", tripId)
  }

  const handleGroupChat = () => {
    navigation.navigate("GroupChat", { tripId })
  }

  if (!trip) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading trip details...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={icons.back} style={styles.backIcon} />
      </TouchableOpacity>

      <Image source={{ uri: trip.image }} style={styles.coverImage} />

      {trip.femaleOnly && (
        <View style={styles.femaleTag}>
          <Image source={icons.female} style={styles.femaleIcon} />
          <Text style={styles.femaleText}>Female Only</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{trip.title}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image source={icons.location} style={styles.icon} />
            <Text style={styles.infoText}>
              {trip.startPoint} to {trip.destination}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image source={icons.calendar} style={styles.icon} />
            <Text style={styles.infoText}>{trip.duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <Image source={icons.money} style={styles.icon} />
            <Text style={styles.infoText}>{trip.budget}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image source={icons.bike} style={styles.icon} />
            <Text style={styles.infoText}>{trip.bike}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{trip.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Route</Text>
          <MapViewComponent
            route={trip.route}
            startPoint={trip.startPoint}
            destination={trip.destination}
            height={200}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Riders</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ridersContainer}>
            {trip.members.map((member) => (
              <View key={member.id} style={styles.riderItem}>
                <Image source={{ uri: member.image }} style={styles.riderImage} />
                <Text style={styles.riderName}>{member.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.actions}>
          <Button title="Join Trip" onPress={handleJoinTrip} type="primary" style={styles.actionButton} />
          <Button title="Group Chat" onPress={handleGroupChat} type="outline" style={styles.actionButton} />
        </View>
      </View>
    </ScrollView>
  )
}

// Styles remain exactly the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: colors.white,
  },
  coverImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  femaleTag: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(255, 105, 180, 0.8)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  femaleIcon: {
    width: 16,
    height: 16,
    tintColor: colors.white,
    marginRight: 6,
  },
  femaleText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.text,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 6,
    tintColor: colors.primary,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: colors.text,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.text,
  },
  ridersContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  riderItem: {
    alignItems: "center",
    marginRight: 16,
  },
  riderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  riderName: {
    fontSize: 12,
    color: colors.text,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
})

export default TripDetails
