"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import SearchBar from "../components/SearchBar"
import TripCard from "../components/TripCard"
import Button from "../components/Button"
import { colors } from "../constants/colors"
import { mockTrips } from "../constants/MockData"

// Define the navigation parameters for your app
type RootStackParamList = {
  TripDetails: { tripId: string };
  TripPlanning: undefined;
};

const Home = () => {
  // Properly typed useNavigation hook
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    console.log("Search pressed:", searchQuery)
  }

  const handleTripPress = (tripId: string) => {
    // Correctly typed navigation call
    navigation.navigate("TripDetails", { tripId })
  }

  const handleCreateTrip = () => {
    // Navigate without parameters
    navigation.navigate("TripPlanning")
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RideMate 🏍️</Text>
        <TouchableOpacity>
          <Image source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <SearchBar
        placeHolder="Search for trips..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onPress={handleSearch}
      />

      <View style={styles.createTripContainer}>
        <Button title="Create New Trip" onPress={handleCreateTrip} type="primary" />
      </View>

      <Text style={styles.sectionTitle}>Upcoming Trips</Text>

      <FlatList
        data={mockTrips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TripCard trip={item} onPress={() => handleTripPress(item.id)} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  createTripContainer: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: colors.text,
  },
  listContent: {
    paddingBottom: 20,
  },
})

export default Home
