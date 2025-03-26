"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"
import FormInput from "../components/FormInput"
import Button from "../components/Button"
import { colors } from "../constants/colors"
import { icons } from "../constants/icons"

const Signup = () => {
  const navigation = useNavigation()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignup = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      navigation.navigate("MainTabs" as never)
    }, 1500)
  }

  const handleLogin = () => {
    navigation.navigate("Login" as never)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar barStyle="dark-content" />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={icons.back} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join the community of riders</Text>
      </View>

      <View style={styles.form}>
        <FormInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          icon={icons.profile}
        />

        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          icon={icons.email}
        />

        <FormInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry={!showPassword}
          icon={showPassword ? icons.eye : icons.eyeOff}
          onIconPress={togglePasswordVisibility}
        />

        <FormInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry={!showPassword}
        />

        <Button
          title="Sign Up"
          onPress={handleSignup}
          loading={loading}
          disabled={!name || !email || !password || password !== confirmPassword}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>
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
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.secondary,
  },
  form: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: colors.text,
    fontSize: 14,
  },
  loginText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
})

export default Signup

