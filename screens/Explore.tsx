"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import SearchBar from "../components/SearchBar"
import TripCard from "../components/TripCard"
import { colors } from "../constants/colors"
import { mockTrips } from "../constants/MockData"

// Define the navigation parameters for your app
type RootStackParamList = {
  TripDetails: {
    tripId: string;
  };
};

// Use the defined parameters in the navigation hook
const Explore = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("1")

  const handleSearch = () => {
    console.log("Search pressed:", searchQuery)
  }

  const handleTripPress = (tripId: string) => {
    navigation.navigate("TripDetails", { tripId }) // Correctly typed navigation
  }

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  // Filter trips based on selected category
  const filteredTrips =
    selectedCategory === "1"
      ? mockTrips
      : selectedCategory === "6"
        ? mockTrips.filter((trip) => trip.femaleOnly)
        : mockTrips

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Trips</Text>

      <SearchBar
        placeHolder="Search for destinations..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onPress={handleSearch}
      />

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.categoryItem, selectedCategory === item.id && styles.selectedCategory]}
              onPress={() => handleCategoryPress(item.id)}
            >
              <Text style={[styles.categoryText, selectedCategory === item.id && styles.selectedCategoryText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={filteredTrips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TripCard trip={item} onPress={() => handleTripPress(item.id)} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

const categories = [
  { id: "1", name: "All" },
  { id: "2", name: "Mountain" },
  { id: "3", name: "Coastal" },
  { id: "4", name: "Desert" },
  { id: "5", name: "City" },
  { id: "6", name: "Female Only" },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.text,
  },
  categoriesContainer: {
    marginVertical: 16,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: colors.text,
  },
  selectedCategoryText: {
    color: colors.white,
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 20,
  },
})

export default Explore
