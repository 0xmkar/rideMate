// components/Button.tsx - Ultra-Modern Button Component with 2025 Features

import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  Animated,
  Vibration,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors, spacing, borderRadius, typography, shadows } from '../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient' | 'glassmorphism' | 'neumorphism';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  gradient?: string[];
  hapticFeedback?: boolean;
  animationType?: 'scale' | 'bounce' | 'pulse' | 'glow';
  shadowIntensity?: 'none' | 'low' | 'medium' | 'high';
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
  textStyle,
  gradient = [colors.primary, colors.primaryLight],
  hapticFeedback = true,
  animationType = 'scale',
  shadowIntensity = 'medium',
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animationType === 'pulse' && !disabled) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.02,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    if (animationType === 'glow' && !disabled) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [animationType, disabled]);

  const handlePressIn = () => {
    if (disabled || loading) return;

    if (hapticFeedback) {
      Vibration.vibrate(10);
    }

    switch (animationType) {
      case 'scale':
      case 'bounce':
        Animated.spring(scaleAnim, {
          toValue: 0.95,
          useNativeDriver: true,
          tension: 300,
          friction: 10,
        }).start();
        break;
    }
  };

  const handlePressOut = () => {
    if (disabled || loading) return;

    switch (animationType) {
      case 'scale':
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 300,
          friction: 10,
        }).start();
        break;
      case 'bounce':
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 200,
          friction: 3,
        }).start();
        break;
    }
  };

  const handlePress = () => {
    if (disabled || loading) return;
    onPress();
  };

  const getButtonStyle = (): StyleProp<ViewStyle>[] => {
    const baseStyle: StyleProp<ViewStyle>[] = [
      styles.button,
      styles[size],
      getShadowStyle(),
    ];
    
    if (fullWidth) baseStyle.push(styles.fullWidth);
    if (disabled || loading) baseStyle.push(styles.disabled);

    // Don't add variant styles for gradient and glassmorphism as they use custom rendering
    if (variant !== 'gradient' && variant !== 'glassmorphism') {
      baseStyle.push(styles[variant]);
    }

    return baseStyle;
  };

  const getShadowStyle = () => {
    if (disabled || shadowIntensity === 'none') return {};
    
    switch (shadowIntensity) {
      case 'low': return shadows.sm;
      case 'medium': return shadows.md;
      case 'high': return shadows.lg;
      default: return shadows.md;
    }
  };

  const getTextStyle = (): StyleProp<TextStyle>[] => {
    const sizeKey = `text${size.charAt(0).toUpperCase() + size.slice(1)}` as 'textXs' | 'textSm' | 'textMd' | 'textLg' | 'textXl';
    const baseStyle: StyleProp<TextStyle>[] = [
      styles.text,
      styles[sizeKey],
    ];

    switch (variant) {
      case 'primary':
      case 'danger':
      case 'gradient':
        baseStyle.push(styles.textPrimary);
        break;
      case 'secondary':
      case 'neumorphism':
        baseStyle.push(styles.textSecondary);
        break;
      case 'outline':
      case 'ghost':
        baseStyle.push(styles.textOutline);
        break;
      case 'glassmorphism':
        baseStyle.push(styles.textGlass);
        break;
    }

    return baseStyle;
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
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
          {iconPosition === 'right' && <View style={styles.iconRightElement}>{icon}</View>}
        </View>
      );
    }

    return <Text style={[...getTextStyle(), textStyle]}>{title}</Text>;
  };

  const getAnimatedStyle = () => {
    const animatedStyles: any = {};

    switch (animationType) {
      case 'scale':
      case 'bounce':
        animatedStyles.transform = [{ scale: scaleAnim }];
        break;
      case 'pulse':
        animatedStyles.transform = [{ scale: pulseAnim }];
        break;
      case 'glow':
        animatedStyles.shadowOpacity = glowAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.2, 0.8],
        });
        break;
    }

    return animatedStyles;
  };

  // Render gradient button
  if (variant === 'gradient') {
    return (
      <Animated.View style={[getAnimatedStyle()]}>
        <TouchableOpacity
          style={[...getButtonStyle(), style]}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={gradient as unknown as readonly [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
          >
            {renderContent()}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Render glassmorphism button
  if (variant === 'glassmorphism') {
    return (
      <Animated.View style={[getAnimatedStyle()]}>
        <TouchableOpacity
          style={[...getButtonStyle(), styles.glassmorphism, style]}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          activeOpacity={0.8}
        >
          <BlurView intensity={30} style={styles.blurContainer}>
            {renderContent()}
          </BlurView>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Render regular button
  return (
    <Animated.View style={[getAnimatedStyle()]}>
      <TouchableOpacity
        style={[...getButtonStyle(), style]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {renderContent()}
      </TouchableOpacity>
    </Animated.View>
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
  xs: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    minHeight: 32,
  } as ViewStyle,
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
  xl: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
    minHeight: 60,
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
    borderWidth: 2,
    borderColor: colors.primary,
  } as ViewStyle,
  ghost: {
    backgroundColor: 'transparent',
  } as ViewStyle,
  danger: {
    backgroundColor: colors.error,
  } as ViewStyle,
  neumorphism: {
    backgroundColor: colors.gray100,
    shadowColor: colors.white,
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 0,
  } as ViewStyle,
  glassmorphism: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  } as ViewStyle,

  // Special containers
  gradientContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
  } as ViewStyle,

  blurContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
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
  textXs: {
    fontSize: typography.fontSizes.xs,
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
  textXl: {
    fontSize: typography.fontSizes.xl,
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
  textGlass: {
    color: colors.white,
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