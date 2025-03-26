import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { colors } from "../constants/colors"
import { icons } from "../constants/icons"

interface TripCardProps {
  trip: {
    id: string
    title: string
    startPoint: string
    destination: string
    distance: string
    duration: string
    budget: string
    bike: string
    femaleOnly: boolean
    image: string
  }
  onPress: () => void
}

const TripCard = ({ trip, onPress }: TripCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: trip.image }} style={styles.image} />

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
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  femaleTag: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255, 105, 180, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  femaleIcon: {
    width: 12,
    height: 12,
    tintColor: colors.white,
    marginRight: 4,
  },
  femaleText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "600",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: colors.text,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 4,
    tintColor: colors.primary,
  },
  infoText: {
    fontSize: 12,
    color: colors.text,
  },
})

export default TripCard

