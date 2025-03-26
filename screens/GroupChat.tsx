"use client"

import { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import ChatMessage from "../components/ChatMessage"
import { colors } from "../constants/colors"
import { icons } from "../constants/icons"
import { mockMessages, mockTrips, mockUsers } from "../constants/MockData"

const GroupChat = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { tripId } = route.params as { tripId: string }

  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [trip, setTrip] = useState<any>(null)

  const flatListRef = useRef<FlatList>(null)

  useEffect(() => {
    // In a real app, you would fetch messages from an API
    setMessages(mockMessages)

    // Get trip details
    const selectedTrip = mockTrips.find((t) => t.id === tripId)
    setTrip(selectedTrip)
  }, [tripId])

  const handleSend = () => {
    if (newMessage.trim() === "") return

    const message = {
      id: Date.now().toString(),
      senderId: "1", // Current user ID (hardcoded for demo)
      text: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }

  const getUserById = (userId: string) => {
    return mockUsers.find((user) => user.id === userId) || mockUsers[0]
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{trip ? trip.title : "Group Chat"}</Text>

        <TouchableOpacity style={styles.infoButton}>
          <Image source={icons.info} style={styles.infoIcon} />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatMessage
            message={item}
            isCurrentUser={item.senderId === "1"} // Current user ID (hardcoded for demo)
            senderImage={getUserById(item.senderId).image}
          />
        )}
        contentContainerStyle={styles.messagesList}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          placeholderTextColor={colors.secondary}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={newMessage.trim() === ""}>
          <Image source={icons.send} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  backButton: {
    padding: 4,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: colors.text,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  infoButton: {
    padding: 4,
  },
  infoIcon: {
    width: 24,
    height: 24,
    tintColor: colors.text,
  },
  messagesList: {
    paddingVertical: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    color: colors.text,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
})

export default GroupChat

