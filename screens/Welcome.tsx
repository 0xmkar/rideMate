// screens/Welcome.tsx - Enhanced Welcome Screen

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import { colors, spacing, borderRadius, typography } from '../constants/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Welcome: React.FC = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    
    // Animate entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('Login' as never);
  };

  const features = [
    { icon: '🏍️', title: 'Plan Adventures', subtitle: 'Create epic motorcycle journeys' },
    { icon: '👥', title: 'Find Companions', subtitle: 'Connect with fellow riders' },
    { icon: '🛡️', title: 'Stay Safe', subtitle: 'Advanced crash detection' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Background Image with Overlay */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        }}
        style={styles.backgroundImage}
      />
      
      <View style={styles.overlay} />

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>RideMate</Text>
            <Text style={styles.logoEmoji}>🏍️</Text>
          </View>
          <Text style={styles.tagline}>Your Ultimate Riding Companion</Text>
          
          {/* Features Preview */}
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <Animated.View 
                key={index}
                style={[
                  styles.featureItem,
                  {
                    opacity: fadeAnim,
                    transform: [{
                      translateX: slideAnim.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, (index - 1) * 30],
                      }),
                    }],
                  },
                ]}
              >
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.description}>
            Join thousands of motorcycle enthusiasts. Plan trips, find riding buddies, 
            and explore new routes with safety features that keep you protected.
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              title="Start Your Journey"
              onPress={handleGetStarted}
              size="lg"
              fullWidth
              style={styles.primaryButton}
            />
            
            <Button
              title="Learn More"
              onPress={() => {}}
              variant="ghost"
              size="lg"
              fullWidth
              style={styles.secondaryButton}
            />
          </View>

          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  
  backgroundImage: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'cover',
  },
  
  overlay: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: 80,
    paddingBottom: 40,
  },
  
  logoSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  
  logo: {
    fontSize: 48,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  
  logoEmoji: {
    fontSize: 48,
    marginLeft: spacing.sm,
  },
  
  tagline: {
    fontSize: typography.fontSizes.lg,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: spacing.xl,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: spacing.xl,
  },
  
  featureItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  
  featureIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  
  featureTitle: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 4,
  },
  
  featureSubtitle: {
    fontSize: typography.fontSizes.xs,
    color: colors.white,
    opacity: 0.8,
    textAlign: 'center',
  },
  
  bottomSection: {
    alignItems: 'center',
  },
  
  description: {
    fontSize: typography.fontSizes.base,
    color: colors.white,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.base,
    marginBottom: spacing.xl,
    opacity: 0.9,
  },
  
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  
  primaryButton: {
    backgroundColor: colors.primary,
  },
  
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.white,
  },
  
  termsText: {
    fontSize: typography.fontSizes.xs,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: typography.lineHeights.normal * typography.fontSizes.xs,
  },
  
  linkText: {
    color: colors.primaryLight,
    fontWeight: typography.fontWeights.semibold,
  },
});

export default Welcome;