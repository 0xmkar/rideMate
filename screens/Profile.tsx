import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import Button from "../components/Button"
import { colors } from "../constants/colors"
import { icons } from "../constants/icons"
import { mockUsers, mockTrips } from "../constants/MockData"

// Define the navigation parameters for your app
type RootStackParamList = {
  TripDetails: { tripId: string };
  Welcome: undefined; // Assuming this route exists
};

const Profile = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const user = mockUsers[0] // Hardcoded for demo

  // Filter trips where user is a member
  const userTrips = mockTrips.filter((trip) => trip.members.some((member: any) => member.id === user.id))

  const handleEditProfile = () => {
    console.log("Edit profile")
  }

  const handleLogout = () => {
    navigation.navigate("Welcome") // Correctly typed navigation call
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: user.image }} style={styles.profileImage} />
        </View>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image source={icons.bike} style={styles.infoIcon} />
            <Text style={styles.infoText}>{user.bike}</Text>
          </View>
        </View>

        <Button title="Edit Profile" onPress={handleEditProfile} type="outline" style={styles.editButton} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Trips</Text>

        {userTrips.length > 0 ? (
          userTrips.map((trip) => (
            <TouchableOpacity
              key={trip.id}
              style={styles.tripItem}
              onPress={() => navigation.navigate("TripDetails", { tripId: trip.id })} // Correctly typed navigation call
            >
              <Image source={{ uri: trip.image }} style={styles.tripImage} />
              <View style={styles.tripInfo}>
                <Text style={styles.tripTitle}>{trip.title}</Text>
                <Text style={styles.tripDetails}>
                  {trip.startPoint} to {trip.destination}
                </Text>
                <Text style={styles.tripDetails}>
                  {trip.duration} • {trip.budget}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>You haven't joined any trips yet.</Text>
        )}
      </View>

      <Button title="Logout" onPress={handleLogout} type="secondary" style={styles.logoutButton} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: colors.secondary,
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 32,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    tintColor: colors.primary,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
  },
  editButton: {
    width: 150,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: colors.text,
  },
  tripItem: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tripImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
   },
   tripInfo:{
     flex :1,padding :12
   },
   tripTitle:{
     fontSize :16,fontWeight :"600",color :colors.text,marginBottom :4
   },
   tripDetails:{
     fontSize :12,color :colors.secondary,marginBottom :2
   },
   emptyText:{
     textAlign :"center",color :colors.secondary,marginVertical :24
   },
   logoutButton:{
     marginTop :32
   }
})

export default Profile
