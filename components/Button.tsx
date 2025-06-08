import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  style,
}) => {
  const getButtonStyle = (): StyleProp<ViewStyle>[] => {
    const baseStyle: StyleProp<ViewStyle>[] = [styles.button, styles[size]];
    if (fullWidth) baseStyle.push(styles.fullWidth);
    if (disabled || loading) baseStyle.push(styles.disabled);

    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primary, !disabled && shadows.sm];
      case 'secondary':
        return [...baseStyle, styles.secondary, !disabled && shadows.sm];
      case 'outline':
        return [...baseStyle, styles.outline];
      case 'ghost':
        return [...baseStyle, styles.ghost];
      case 'danger':
        return [...baseStyle, styles.danger, !disabled && shadows.sm];
      default:
        return [...baseStyle, styles.primary, !disabled && shadows.sm];
    }
  };

  const sizeTextStyleMap: Record<'sm' | 'md' | 'lg', TextStyle> = {
    sm: styles.textSm,
    md: styles.textMd,
    lg: styles.textLg,
  };

  const getTextStyle = (): StyleProp<TextStyle>[] => {
    const baseStyle: StyleProp<TextStyle>[] = [styles.text, sizeTextStyleMap[size]];
    switch (variant) {
      case 'primary':
      case 'danger':
        return [...baseStyle, styles.textPrimary];
      case 'secondary':
        return [...baseStyle, styles.textSecondary];
      case 'outline':
      case 'ghost':
        return [...baseStyle, styles.textOutline];
      default:
        return [...baseStyle, styles.textPrimary];
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.white}
            size="small"
          />
          <Text style={[...getTextStyle(), styles.loadingText]}>Loading...</Text>
        </View>
      );
    }

    if (icon) {
      return (
        <View style={[styles.iconContainer, iconPosition === 'right' && styles.iconRight]}>
          {iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={getTextStyle()}>{title}</Text>
          {iconPosition === 'right' && <View style={styles.iconRightElement}>{icon}</View>}
        </View>
      );
    }

    return <Text style={getTextStyle()}>{title}</Text>;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Button base
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    flexDirection: 'row',
  } as ViewStyle,

  // Sizes
  sm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  } as ViewStyle,
  md: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    minHeight: 44,
  } as ViewStyle,
  lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    minHeight: 52,
  } as ViewStyle,

  // Variants
  primary: {
    backgroundColor: colors.primary,
  } as ViewStyle,
  secondary: {
    backgroundColor: colors.gray100,
  } as ViewStyle,
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  } as ViewStyle,
  ghost: {
    backgroundColor: 'transparent',
  } as ViewStyle,
  danger: {
    backgroundColor: colors.error,
  } as ViewStyle,

  // States
  disabled: {
    opacity: 0.5,
  } as ViewStyle,
  fullWidth: {
    width: '100%',
  } as ViewStyle,

  // Text styles
  text: {
    fontWeight: typography.fontWeights.semibold,
    textAlign: 'center',
  } as TextStyle,
  textSm: {
    fontSize: typography.fontSizes.sm,
  } as TextStyle,
  textMd: {
    fontSize: typography.fontSizes.base,
  } as TextStyle,
  textLg: {
    fontSize: typography.fontSizes.lg,
  } as TextStyle,
  textPrimary: {
    color: colors.white,
  } as TextStyle,
  textSecondary: {
    color: colors.text,
  } as TextStyle,
  textOutline: {
    color: colors.primary,
  } as TextStyle,

  // Icon styles
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  iconLeft: {
    marginRight: spacing.sm,
  } as ViewStyle,
  iconRight: {
    flexDirection: 'row-reverse',
  } as ViewStyle,
  iconRightElement: {
    marginLeft: spacing.sm,
  } as ViewStyle,

  // Loading styles
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  loadingText: {
    marginLeft: spacing.sm,
  } as TextStyle,
});

export default Button;
