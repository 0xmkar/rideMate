import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  icon?: any;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
  onIconPress?: () => void;
}

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  icon,
  keyboardType = 'default',
  error,
  onIconPress,
}: FormInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.secondary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
        {icon && (
          <TouchableOpacity onPress={onIconPress} disabled={!onIconPress}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.notification,
  },
  input: {
    flex: 1,
    height: 48,
    color: colors.text,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.primary,
  },
  errorText: {
    color: colors.notification,
    fontSize: 12,
    marginTop: 4,
  },
});

export default FormInput;
