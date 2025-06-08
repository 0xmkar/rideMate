// components/FormInput.tsx - Enhanced FormInput Component

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { colors, spacing, borderRadius, typography } from '../constants/colors';
import { icons } from '../constants/icons';

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
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  editable?: boolean;
  autoFocus?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  icon,
  keyboardType = 'default',
  error,
  onIconPress,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  editable = true,
  autoFocus = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showText, setShowText] = useState(!secureTextEntry);
  const animatedBorder = new Animated.Value(0);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedBorder, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedBorder, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const toggleSecureEntry = () => {
    setShowText(!showText);
  };

  const borderColor = animatedBorder.interpolate({
    inputRange: [0, 1],
    outputRange: [error ? colors.error : colors.border, colors.primary],
  });

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, error && styles.labelError]}>{label}</Text>
        {maxLength && (
          <Text style={styles.charCount}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
      
      <Animated.View
        style={[
          styles.inputContainer,
          { borderColor },
          error && styles.inputError,
          !editable && styles.inputDisabled,
          multiline && styles.inputMultiline,
        ]}
      >
        {icon && (
          <View style={styles.iconContainer}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          </View>
        )}
        
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputTextMultiline,
            !editable && styles.inputTextDisabled,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
          secureTextEntry={secureTextEntry && !showText}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          editable={editable}
          autoFocus={autoFocus}
        />
        
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeButton}>
            <Image
              source={showText ? icons.eye : icons.eyeOff}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
        
        {onIconPress && !secureTextEntry && (
          <TouchableOpacity onPress={onIconPress} style={styles.actionButton}>
            <Image source={icon} style={styles.actionIcon} />
          </TouchableOpacity>
        )}
        
        {/* Success indicator */}
        {value && !error && (
          <View style={styles.successIndicator}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        )}
      </Animated.View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}
      
      {/* Helper text or validation hints */}
      {!error && placeholder && isFocused && (
        <Text style={styles.helperText}>
          {keyboardType === 'email-address' ? 'Enter a valid email address' : 
           keyboardType === 'phone-pad' ? 'Enter your phone number' : 
           placeholder}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  
  label: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
  },
  
  labelError: {
    color: colors.error,
  },
  
  charCount: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    minHeight: 48,
  },
  
  inputMultiline: {
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
  },
  
  inputError: {
    borderColor: colors.error,
    backgroundColor: colors.error + '05',
  },
  
  inputDisabled: {
    backgroundColor: colors.gray100,
    borderColor: colors.gray300,
  },
  
  iconContainer: {
    marginRight: spacing.sm,
  },
  
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.textSecondary,
  },
  
  input: {
    flex: 1,
    fontSize: typography.fontSizes.base,
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  
  inputTextMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  
  inputTextDisabled: {
    color: colors.textSecondary,
  },
  
  eyeButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
  
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: colors.textSecondary,
  },
  
  actionButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
  
  actionIcon: {
    width: 18,
    height: 18,
    tintColor: colors.primary,
  },
  
  successIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
  },
  
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: typography.fontWeights.bold,
  },
  
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  
  errorText: {
    color: colors.error,
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.medium,
  },
  
  helperText: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
});

export default FormInput;