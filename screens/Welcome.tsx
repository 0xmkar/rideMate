// screens/Welcome.tsx - Ultra-Modern Welcome Screen with 2025 Design Trends

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Button from '../components/Button';
import { colors, spacing, borderRadius, typography, shadows } from '../constants/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Welcome: React.FC = () => {
  const navigation = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    
    // Complex entrance animation sequence
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation animation for logo
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation for features
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Auto-advance slides
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('Login' as never);
  };

  const handleSkip = () => {
    navigation.navigate('Login' as never);
  };

  const heroSlides = [
    {
      title: "Plan Epic Adventures",
      subtitle: "Create unforgettable motorcycle journeys with AI-powered route planning",
      icon: "🏍️",
      gradient: ["#6366f1", "#8b5cf6"],
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Find Your Tribe",
      subtitle: "Connect with fellow riders and join group adventures worldwide",
      icon: "👥",
      gradient: ["#ec4899", "#f97316"],
      image: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Stay Protected",
      subtitle: "Advanced crash detection keeps you safe on every ride",
      icon: "🛡️",
      gradient: ["#10b981", "#06b6d4"],
      image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  const features = [
    { 
      icon: '🎯', 
      title: 'Smart Planning', 
      description: 'AI finds the best routes for you',
      color: colors.primary,
    },
    { 
      icon: '⚡', 
      title: 'Real-time Safety', 
      description: 'Instant crash detection & alerts',
      color: colors.emergency,
    },
    { 
      icon: '🌐', 
      title: 'Global Community', 
      description: 'Connect with riders worldwide',
      color: colors.accent,
    },
    { 
      icon: '📱', 
      title: 'Smart Integration', 
      description: 'Works with all your devices',
      color: colors.accentSecondary,
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Riders" },
    { number: "200K+", label: "Routes Mapped" },
    { number: "99.9%", label: "Safety Record" },
  ];

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Dynamic Background with Slides */}
      <ImageBackground
        source={{ uri: heroSlides[currentSlide].image }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <LinearGradient
          colors={[
            `${heroSlides[currentSlide].gradient[0]}99`,
            `${heroSlides[currentSlide].gradient[1]}CC`,
            '#000000BB'
          ] as readonly [string, string, string]}
          style={styles.gradientOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </ImageBackground>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <BlurView intensity={20} style={styles.skipButtonBlur}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </BlurView>
        </TouchableOpacity>

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
          {/* Hero Section */}
          <View style={styles.heroSection}>
            {/* Animated Logo */}
            <Animated.View 
              style={[
                styles.logoContainer,
                { transform: [{ rotate: rotation }] }
              ]}
            >
              <LinearGradient
                colors={heroSlides[currentSlide].gradient as unknown as readonly [string, string]}
                style={styles.logoGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.logoIcon}>{heroSlides[currentSlide].icon}</Text>
              </LinearGradient>
            </Animated.View>

            {/* Brand Name with Glassmorphism */}
            <BlurView intensity={30} style={styles.brandContainer}>
              <Text style={styles.brandName}>RideMate</Text>
              <Text style={styles.brandTagline}>Your Ultimate Riding Companion</Text>
            </BlurView>

            {/* Dynamic Hero Content */}
            <Animated.View 
              style={[
                styles.heroContent,
                { transform: [{ scale: pulseAnim }] }
              ]}
            >
              <Text style={styles.heroTitle}>{heroSlides[currentSlide].title}</Text>
              <Text style={styles.heroSubtitle}>{heroSlides[currentSlide].subtitle}</Text>
            </Animated.View>

            {/* Slide Indicators */}
            <View style={styles.slideIndicators}>
              {heroSlides.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.slideIndicator,
                    index === currentSlide && styles.slideIndicatorActive
                  ]}
                  onPress={() => setCurrentSlide(index)}
                />
              ))}
            </View>
          </View>

          {/* Stats Section with Neumorphism */}
          <BlurView intensity={20} style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <Animated.View 
                key={index}
                style={[
                  styles.statItem,
                  {
                    transform: [{
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [30, 0],
                      })
                    }]
                  }
                ]}
              >
                <Text style={styles.statNumber}>{stat.number}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Animated.View>
            ))}
          </BlurView>

          {/* Features Grid */}
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>Why RideMate?</Text>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.featureCard,
                    {
                      transform: [{
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [50 + (index * 10), 0],
                        })
                      }]
                    }
                  ]}
                >
                  <BlurView intensity={40} style={styles.featureCardBlur}>
                    <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                      <Text style={styles.featureIconText}>{feature.icon}</Text>
                    </View>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </BlurView>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <Button
              title="Start Your Journey"
              onPress={handleGetStarted}
              size="lg"
              fullWidth
              style={[styles.primaryButton]}
              gradient={heroSlides[currentSlide].gradient as [string, string]}
            />
            
            <TouchableOpacity style={styles.secondaryButton} onPress={() => {}}>
              <BlurView intensity={30} style={styles.secondaryButtonBlur}>
                <Text style={styles.secondaryButtonText}>Learn More</Text>
              </BlurView>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.linkText}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
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
  },
  
  backgroundImageStyle: {
    resizeMode: 'cover',
  },
  
  gradientOverlay: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
  },
  
  scrollContainer: {
    flex: 1,
  },
  
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    paddingBottom: 40,
  },
  
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  
  skipButtonBlur: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  
  skipButtonText: {
    color: colors.white,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
  },
  
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  
  heroSection: {
    alignItems: 'center',
    marginTop: spacing.xxxl,
  },
  
  logoContainer: {
    marginBottom: spacing.xl,
  },
  
  logoGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.xl,
  },
  
  logoIcon: {
    fontSize: 48,
  },
  
  brandContainer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },
  
  brandName: {
    fontSize: typography.fontSizes.xxxxl,
    fontWeight: typography.fontWeights.black,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  
  brandTagline: {
    fontSize: typography.fontSizes.lg,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  
  heroContent: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  
  heroTitle: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  
  heroSubtitle: {
    fontSize: typography.fontSizes.lg,
    color: colors.white,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.lg,
    paddingHorizontal: spacing.md,
  },
  
  slideIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  
  slideIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  slideIndicatorActive: {
    backgroundColor: colors.white,
    width: 24,
  },
  
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.lg,
    marginVertical: spacing.xl,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  
  statItem: {
    alignItems: 'center',
  },
  
  statNumber: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.black,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.white,
    opacity: 0.8,
    textAlign: 'center',
  },
  
  featuresSection: {
    marginVertical: spacing.xl,
  },
  
  featuresTitle: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  
  featureCard: {
    width: (screenWidth - spacing.lg * 2 - spacing.md) / 2,
    marginBottom: spacing.md,
  },
  
  featureCardBlur: {
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    overflow: 'hidden',
  },
  
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  
  featureIconText: {
    fontSize: 24,
  },
  
  featureTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  
  featureDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.white,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: typography.lineHeights.normal * typography.fontSizes.sm,
  },
  
  actionSection: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  
  primaryButton: {
    height: 56,
    borderRadius: borderRadius.xl,
  },
  
  secondaryButton: {
    height: 56,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  
  secondaryButtonBlur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  
  secondaryButtonText: {
    color: colors.white,
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
  },
  
  footer: {
    marginTop: spacing.xl,
    alignItems: 'center',
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