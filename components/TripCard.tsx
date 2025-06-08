// components/TripCard.tsx - Ultra-Modern Trip Card with 2025 Design

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors, spacing, borderRadius, typography, shadows } from '../constants/colors';
import { icons } from '../constants/icons';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth - spacing.md * 2;

interface Trip {
  id: string;
  title: string;
  startPoint: string;
  destination: string;
  distance: string;
  duration: string;
  budget: string;
  bike: string;
  femaleOnly: boolean;
  image: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  rating?: number;
  reviews?: number;
  joinedMembers?: number;
  maxMembers?: number;
}

interface TripCardProps {
  trip: Trip;
  onPress: () => void;
  variant?: 'default' | 'compact' | 'featured';
  showJoinButton?: boolean;
  onJoinPress?: () => void;
}

const TripCard: React.FC<TripCardProps> = ({ 
  trip, 
  onPress, 
  variant = 'default',
  showJoinButton = false,
  onJoinPress
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy': return colors.success;
      case 'Medium': return colors.warning;
      case 'Hard': return colors.error;
      case 'Expert': return colors.accent;
      default: return colors.primary;
    }
  };

  const getDifficultyGradient = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy': return [colors.success, colors.successLight];
      case 'Medium': return [colors.warning, colors.warningLight];
      case 'Hard': return [colors.error, colors.errorLight];
      case 'Expert': return [colors.accent, colors.accentLight];
      default: return [colors.primary, colors.primaryLight];
    }
  };

  const cardHeight = variant === 'compact' ? 140 : variant === 'featured' ? 280 : 220;

  const renderStars = (rating: number = 0) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Text key={i} style={styles.star}>⭐</Text>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Text key={i} style={styles.star}>⭐</Text>);
      } else {
        stars.push(<Text key={i} style={styles.starEmpty}>☆</Text>);
      }
    }
    return stars;
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          width: cardWidth,
          transform: [{ scale: scaleAnim }],
          opacity: fadeAnim,
        },
        variant === 'featured' && styles.featuredContainer,
      ]}
    >
      <TouchableOpacity
        style={[styles.card, shadows.lg as StyleProp<ViewStyle>]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.95}
      >
        {/* Image Container with Enhanced Overlay */}
        <View style={[styles.imageContainer, { height: cardHeight }]}>
          <Image source={{ uri: trip.image }} style={styles.image} />

          {/* Dynamic Gradient Overlay */}
          <LinearGradient
            colors={[
              'transparent',
              'rgba(0,0,0,0.3)',
              'rgba(0,0,0,0.8)'
            ] as readonly [string, string, string]}
            style={styles.gradientOverlay}
            locations={[0, 0.5, 1]}
          />

          {/* Top Tags Row */}
          <View style={styles.topTagsContainer}>
            {/* Difficulty Badge */}
            {trip.difficulty && (
              <LinearGradient
                colors={getDifficultyGradient(trip.difficulty) as unknown as readonly [string, string, ...string[]]}
                style={styles.difficultyBadge}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.difficultyText}>{trip.difficulty}</Text>
              </LinearGradient>
            )}

            {/* Female Only Badge */}
            {trip.femaleOnly && (
              <BlurView intensity={40} style={styles.femaleTag}>
                <Image source={icons.female} style={styles.femaleIcon} />
                <Text style={styles.femaleText}>Women Only</Text>
              </BlurView>
            )}
          </View>

          {/* Rating and Reviews */}
          {(trip.rating || trip.reviews) && (
            <BlurView intensity={30} style={styles.ratingContainer}>
              <View style={styles.ratingRow}>
                {renderStars(trip.rating)}
                <Text style={styles.ratingText}>
                  {trip.rating?.toFixed(1)} ({trip.reviews || 0})
                </Text>
              </View>
            </BlurView>
          )}

          {/* Member Count */}
          {(trip.joinedMembers || trip.maxMembers) && (
            <BlurView intensity={30} style={styles.membersContainer}>
              <Image source={icons.group} style={styles.membersIcon} />
              <Text style={styles.membersText}>
                {trip.joinedMembers || 0}/{trip.maxMembers || 10}
              </Text>
            </BlurView>
          )}

          {/* Title and Location Overlay */}
          <BlurView intensity={20} style={styles.titleOverlay}>
            <Text style={styles.title} numberOfLines={2}>
              {trip.title}
            </Text>
            <View style={styles.locationContainer}>
              <Image source={icons.location} style={styles.locationIcon} />
              <Text style={styles.locationText} numberOfLines={1}>
                {trip.startPoint} → {trip.destination}
              </Text>
            </View>
          </BlurView>
        </View>

        {/* Enhanced Content Section */}
        <LinearGradient
          colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,1)'] as readonly [string, string]}
          style={styles.content}
        >
          {/* Info Grid with Modern Design */}
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <LinearGradient
                colors={[colors.primary + '20', colors.primaryLight + '10'] as readonly [string, string]}
                style={styles.iconContainer}
              >
                <Image source={icons.calendar} style={styles.icon} />
              </LinearGradient>
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>{trip.duration}</Text>
            </View>

            <View style={styles.infoItem}>
              <LinearGradient
                colors={[colors.success + '20', colors.successLight + '10'] as readonly [string, string]}
                style={styles.iconContainer}
              >
                <Image source={icons.money} style={styles.icon} />
              </LinearGradient>
              <Text style={styles.infoLabel}>Budget</Text>
              <Text style={styles.infoValue}>{trip.budget}</Text>
            </View>

            <View style={styles.infoItem}>
              <LinearGradient
                colors={[colors.accent + '20', colors.accentLight + '10'] as readonly [string, string]}
                style={styles.iconContainer}
              >
                <Image source={icons.bike} style={styles.icon} />
              </LinearGradient>
              <Text style={styles.infoLabel}>Bike</Text>
              <Text style={styles.infoValue} numberOfLines={1}>
                {trip.bike}
              </Text>
            </View>
          </View>

          {/* Action Section with Modern Buttons */}
          <View style={styles.actionContainer}>
            {showJoinButton ? (
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.secondaryAction}
                  onPress={onPress}
                >
                  <Text style={styles.secondaryActionText}>Details</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.primaryAction}
                  onPress={onJoinPress}
                >
                  <LinearGradient
                    colors={[colors.primary, colors.primaryLight] as readonly [string, string]}
                    style={styles.primaryActionGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.primaryActionText}>Join Trip</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.actionButton} onPress={onPress}>
                <BlurView intensity={20} style={styles.actionButtonBlur}>
                  <Text style={styles.actionText}>View Details</Text>
                  <Image
                    source={icons.back}
                    style={[styles.actionIcon, { transform: [{ rotate: '180deg' }] }]}
                  />
                </BlurView>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  } as ViewStyle,

  featuredContainer: {
    marginHorizontal: -spacing.sm,
    width: cardWidth + spacing.md,
  } as ViewStyle,

  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  } as ViewStyle,

  imageContainer: {
    position: 'relative',
    width: '100%',
  } as ViewStyle,

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  } as ImageStyle,

  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  } as ViewStyle,

  topTagsContainer: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  } as ViewStyle,

  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  } as ViewStyle,

  difficultyText: {
    color: colors.white,
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.bold,
  } as TextStyle,

  femaleTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  } as ViewStyle,

  femaleIcon: {
    width: 12,
    height: 12,
    tintColor: colors.white,
    marginRight: 4,
  } as ImageStyle,

  femaleText: {
    color: colors.white,
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.semibold,
  } as TextStyle,

  ratingContainer: {
    position: 'absolute',
    top: spacing.md + 40,
    left: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  } as ViewStyle,

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  } as ViewStyle,

  star: {
    fontSize: 12,
  } as TextStyle,

  starEmpty: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  } as TextStyle,

  ratingText: {
    color: colors.white,
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.medium,
  } as TextStyle,

  membersContainer: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  } as ViewStyle,

  membersIcon: {
    width: 12,
    height: 12,
    tintColor: colors.white,
    marginRight: 4,
  } as ImageStyle,

  membersText: {
    color: colors.white,
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.semibold,
  } as TextStyle,

  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    overflow: 'hidden',
  } as ViewStyle,

  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  } as TextStyle,

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  locationIcon: {
    width: 14,
    height: 14,
    tintColor: colors.white,
    marginRight: 6,
  } as ImageStyle,

  locationText: {
    color: colors.white,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  } as TextStyle,

  content: {
    padding: spacing.lg,
  } as ViewStyle,

  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  } as ViewStyle,

  infoItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  } as ViewStyle,

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  } as ViewStyle,

  icon: {
    width: 18,
    height: 18,
    tintColor: colors.primary,
  } as ImageStyle,

  infoLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    fontWeight: typography.fontWeights.medium,
    marginBottom: 2,
    textAlign: 'center',
  } as TextStyle,

  infoValue: {
    fontSize: typography.fontSizes.sm,
    color: colors.text,
    fontWeight: typography.fontWeights.bold,
    textAlign: 'center',
  } as TextStyle,

  actionContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.md,
  } as ViewStyle,

  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  } as ViewStyle,

  secondaryAction: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  } as ViewStyle,

  secondaryActionText: {
    color: colors.text,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
  } as TextStyle,

  primaryAction: {
    flex: 2,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  } as ViewStyle,

  primaryActionGradient: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  } as ViewStyle,

  primaryActionText: {
    color: colors.white,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
  } as TextStyle,

  actionButton: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  } as ViewStyle,

  actionButtonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  } as ViewStyle,

  actionText: {
    color: colors.primary,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
    marginRight: spacing.sm,
  } as TextStyle,

  actionIcon: {
    width: 14,
    height: 14,
    tintColor: colors.primary,
  } as ImageStyle,
});

export default TripCard;