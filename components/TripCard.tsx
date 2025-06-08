import React from 'react';
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
} from 'react-native';

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
}

interface TripCardProps {
  trip: Trip;
  onPress: () => void;
  variant?: 'default' | 'compact';
}

const TripCard: React.FC<TripCardProps> = ({ trip, onPress, variant = 'default' }) => {
  const cardHeight = variant === 'compact' ? 120 : 200;

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }, shadows.md as StyleProp<ViewStyle>]}
      onPress={onPress}
      activeOpacity={0.95}
    >
      <View style={[styles.imageContainer, { height: cardHeight }]}>
        <Image source={{ uri: trip.image }} style={styles.image} />

        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />

        {/* Female Only Badge */}
        {trip.femaleOnly && (
          <View style={styles.femaleTag}>
            <Image source={icons.female} style={styles.femaleIcon} />
            <Text style={styles.femaleText}>Women Only</Text>
          </View>
        )}

        {/* Title Overlay */}
        <View style={styles.titleOverlay}>
          <Text style={styles.title} numberOfLines={2}>
            {trip.title}
          </Text>
          <View style={styles.locationContainer}>
            <Image source={icons.location} style={styles.locationIcon} />
            <Text style={styles.locationText} numberOfLines={1}>
              {trip.startPoint} → {trip.destination}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <View style={styles.iconContainer}>
              <Image source={icons.calendar} style={styles.icon} />
            </View>
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{trip.duration}</Text>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.iconContainer}>
              <Image source={icons.money} style={styles.icon} />
            </View>
            <Text style={styles.infoLabel}>Budget</Text>
            <Text style={styles.infoValue}>{trip.budget}</Text>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.iconContainer}>
              <Image source={icons.bike} style={styles.icon} />
            </View>
            <Text style={styles.infoLabel}>Bike</Text>
            <Text style={styles.infoValue} numberOfLines={1}>
              {trip.bike}
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={onPress}>
            <Text style={styles.actionText}>View Details</Text>
            <Image
              source={icons.back}
              style={[styles.actionIcon, { transform: [{ rotate: '180deg' }] }]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
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
    backgroundColor: 'rgba(0,0,0,0.3)',
  } as ViewStyle,

  femaleTag: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    ...(shadows.sm as ViewStyle),
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

  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
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
    padding: spacing.md,
  } as ViewStyle,

  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  } as ViewStyle,

  infoItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  } as ViewStyle,

  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  } as ViewStyle,

  icon: {
    width: 16,
    height: 16,
    tintColor: colors.primary,
  } as ImageStyle,

  infoLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    fontWeight: typography.fontWeights.medium,
    marginBottom: 2,
  } as TextStyle,

  infoValue: {
    fontSize: typography.fontSizes.sm,
    color: colors.text,
    fontWeight: typography.fontWeights.semibold,
    textAlign: 'center',
  } as TextStyle,

  actionContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.md,
  } as ViewStyle,

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  } as ViewStyle,

  actionText: {
    color: colors.white,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    marginRight: spacing.xs,
  } as TextStyle,

  actionIcon: {
    width: 14,
    height: 14,
    tintColor: colors.white,
  } as ImageStyle,
});

export default TripCard;
