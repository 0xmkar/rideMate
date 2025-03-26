import { View, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native"
import { colors } from "../constants/colors"
import { icons } from "../constants/icons"

interface SearchBarProps {
  placeHolder: string
  value: string
  onChangeText: (text: string) => void
  onPress: () => void
}

const SearchBar = ({ placeHolder, value, onChangeText, onPress }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        placeholderTextColor={colors.secondary}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image source={icons.search} style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 50,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    height: 48,
    color: colors.text,
  },
  button: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.primary,
  },
})

export default SearchBar

