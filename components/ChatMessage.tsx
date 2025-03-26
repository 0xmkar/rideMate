import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../constants/colors';

interface ChatMessageProps {
  message: {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
  };
  isCurrentUser: boolean;
  senderImage: string;
}

const ChatMessage = ({ message, isCurrentUser, senderImage }: ChatMessageProps) => {
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={[
      styles.container,
      isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer
    ]}>
      {!isCurrentUser && (
        <Image source={{ uri: senderImage }} style={styles.avatar} />
      )}
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        <Text style={[
          styles.messageText,
          isCurrentUser ? styles.currentUserText : styles.otherUserText
        ]}>
          {message.text}
        </Text>
        <Text style={[
          styles.timestamp,
          isCurrentUser ? styles.currentUserTimestamp : styles.otherUserTimestamp
        ]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  currentUserContainer: {
    justifyContent: 'flex-end',
  },
  otherUserContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageContainer: {
    maxWidth: '70%',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  currentUserMessage: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  otherUserMessage: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
  },
  currentUserText: {
    color: colors.white,
  },
  otherUserText: {
    color: colors.text,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  currentUserTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  otherUserTimestamp: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ChatMessage;
