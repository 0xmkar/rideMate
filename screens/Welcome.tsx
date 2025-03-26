"use client"

import { useEffect } from "react"
import { View, Text, StyleSheet, Image, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Button from "../components/Button"
import { colors } from "../constants/colors"

const Welcome = () => {
  const navigation = useNavigation()

  useEffect(() => {
    StatusBar.setBarStyle("light-content")
  }, [])

  const handleGetStarted = () => {
    navigation.navigate("Login" as never)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />

        <View style={styles.logoContainer}>
          <Text style={styles.logo}>RideMate 🏍️</Text>
          <Text style={styles.tagline}>Find your perfect riding companions</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.description}>
            Plan trips, find riding buddies, and explore new routes with fellow motorcycle enthusiasts.
          </Text>

          <Button title="Get Started" onPress={handleGetStarted} style={styles.button} />

          <Text style={styles.termsText}>By continuing, you agree to our Terms of Service and Privacy Policy</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  logo: {
    fontSize: 42,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: colors.white,
    textAlign: "center",
  },
  footer: {
    padding: 24,
  },
  description: {
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    marginBottom: 16,
  },
  termsText: {
    fontSize: 12,
    color: colors.secondary,
    textAlign: "center",
  },
})

export default Welcome

