"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import FormInput from "../components/FormInput"
import Button from "../components/Button"
import { colors } from "../constants/colors"
import { icons } from "../constants/icons"

const bikeOptions = [
  "Royal Enfield Himalayan",
  "KTM Duke 390",
  "Royal Enfield Classic 350",
  "Bajaj Dominar 400",
  "Honda CB350",
  "Other",
]

const TripPlanning = () => {
  const navigation = useNavigation()
  const [startPoint, setStartPoint] = useState("")
  const [destination, setDestination] = useState("")
  const [selectedBike, setSelectedBike] = useState("")
  const [budget, setBudget] = useState("")
  const [days, setDays] = useState("")
  const [femaleOnly, setFemaleOnly] = useState(false)
  const [showBikeOptions, setShowBikeOptions] = useState(false)

  const handleCreateTrip = () => {
    // Here you would normally save the trip data
    console.log({
      startPoint,
      destination,
      selectedBike,
      budget,
      days,
      femaleOnly,
    })

    // Navigate back to home
    navigation.navigate("MainTabs" as never)
  }

  const toggleBikeOptions = () => {
    setShowBikeOptions(!showBikeOptions)
  }

  const selectBike = (bike: string) => {
    setSelectedBike(bike)
    setShowBikeOptions(false)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={icons.back} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Plan Your Trip</Text>

      <View style={styles.form}>
        <FormInput
          label="Starting Point"
          value={startPoint}
          onChangeText={setStartPoint}
          placeholder="Enter your starting location"
          icon={icons.location}
        />

        <FormInput
          label="Destination"
          value={destination}
          onChangeText={setDestination}
          placeholder="Enter your destination"
          icon={icons.location}
        />

        <View style={styles.bikeSelector}>
          <Text style={styles.label}>Your Bike</Text>
          <TouchableOpacity style={styles.bikeInput} onPress={toggleBikeOptions}>
            <Text style={selectedBike ? styles.bikeText : styles.bikePlaceholder}>
              {selectedBike || "Select your bike"}
            </Text>
            <Image source={icons.down} style={styles.downIcon} />
          </TouchableOpacity>

          {showBikeOptions && (
            <View style={styles.bikeOptionsContainer}>
              {bikeOptions.map((bike, index) => (
                <TouchableOpacity key={index} style={styles.bikeOption} onPress={() => selectBike(bike)}>
                  <Text style={styles.bikeOptionText}>{bike}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <FormInput
          label="Budget (₹)"
          value={budget}
          onChangeText={setBudget}
          placeholder="Enter your budget"
          keyboardType="numeric"
          icon={icons.money}
        />

        <FormInput
          label="Number of Days"
          value={days}
          onChangeText={setDays}
          placeholder="Enter number of days"
          keyboardType="numeric"
          icon={icons.calendar}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Female Riders Only</Text>
          <Switch
            value={femaleOnly}
            onValueChange={setFemaleOnly}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={femaleOnly ? colors.white : colors.white}
          />
        </View>

        <Button
          title="Create Trip"
          onPress={handleCreateTrip}
          disabled={!startPoint || !destination || !selectedBike || !budget || !days}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: colors.text,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: colors.text,
  },
  form: {
    marginBottom: 24,
  },
  bikeSelector: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: colors.text,
  },
  bikeInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: colors.white,
  },
  bikeText: {
    color: colors.text,
  },
  bikePlaceholder: {
    color: colors.secondary,
  },
  downIcon: {
    width: 16,
    height: 16,
    tintColor: colors.primary,
  },
  bikeOptionsContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: colors.white,
  },
  bikeOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bikeOptionText: {
    color: colors.text,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  switchLabel: {
    fontSize: 16,
    color: colors.text,
  },
})

export default TripPlanning

