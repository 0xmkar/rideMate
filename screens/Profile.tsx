// screens/Profile.tsx - Ultra-Modern Profile Screen with Enhanced UI

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Animated,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Button from '../components/Button';
import { colors, spacing, borderRadius, typography, shadows } from '../constants/colors';
import { icons } from '../constants/icons';
import { mockUsers, mockTrips } from '../constants/MockData';
import { useCrashDetection } from '../services/CrashDetectionService';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type RootStackParamList = {
  TripDetails: { tripId: string };
  Welcome: undefined;
  SafetySettings: undefined;
};

const Profile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const user = mockUsers[0];
  const [crashDetectionEnabled, setCrashDetectionEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const profileScaleAnim = useRef(new Animated.Value(0.8)).current;
  
  const { isMonitoring } = useCrashDetection(crashDetectionEnabled);
  const userTrips = mockTrips.filter((trip) => trip.members.some((member: any) => member.id === user.id));

  useEffect(() => {
    loadSettings();
    
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(profileScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const loadSettings = async () => {
    try {
      // Load settings from AsyncStorage
      setCrashDetectionEnabled(true); // Mock data
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const toggleCrashDetection = async (value: boolean) => {
    setCrashDetectionEnabled(value);
  };

  const handleEditProfile = () => {
    console.log('Edit profile');
  };

  const handleLogout = () => {
    navigation.navigate('Welcome');
  };

  const navigateToSafetySettings = () => {
    navigation.navigate('SafetySettings');
  };

  const stats = [
    { label: 'Total KM', value: '3,247', icon: '🏍️', color: colors.primary },
    { label: 'Trips', value: '42', icon: '🗺️', color: colors.accent },
    { label: 'Safety Score', value: '98%', icon: '🛡️', color: colors.success },
    { label: 'Rank', value: '#156', icon: '🏆', color: colors.warning },
  ];

  const achievements = [
    { title: 'Mountain Rider', description: 'Completed 10 mountain trips', icon: '🏔️', earned: true },
    { title: 'Safety Champion', description: 'Zero accidents in 1000km', icon: '🛡️', earned: true },
    { title: 'Explorer', description: 'Visited 25 destinations', icon: '🌍', earned: true },
    { title: 'Group Leader', description: 'Led 5 group rides', icon: '👥', earned: false },
  ];

  const renderStatCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      style={[
        styles.statCard,
        {
          transform: [{
            translateY: slideAnim.interpolate({
              inputRange: [0, 30],
              outputRange: [0, 30 + (index * 5)],
            })
          }],
          opacity: fadeAnim,
        }
      ]}
    >
      <BlurView intensity={30} style={styles.statCardBlur}>
        <LinearGradient
          colors={[item.color + '20', item.color + '10'] as readonly [string, string]}
          style={styles.statIconContainer}
        >
          <Text style={styles.statIcon}>{item.icon}</Text>
        </LinearGradient>
        <Text style={styles.statValue}>{item.value}</Text>
        <Text style={styles.statLabel}>{item.label}</Text>
      </BlurView>
    </Animated.View>
  );

  const renderTripCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      style={[
        styles.tripCard,
        {
          transform: [{
            translateX: slideAnim.interpolate({
              inputRange: [0, 30],
              outputRange: [0, 50],
            })
          }],
          opacity: fadeAnim,
        }
      ]}
    >
      <TouchableOpacity
        style={styles.tripCardContent}
        onPress={() => navigation.navigate('TripDetails', { tripId: item.id })}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.image }} style={styles.tripImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)'] as readonly [string, string]}
          style={styles.tripOverlay}
        >
          <View style={styles.tripInfo}>
            <Text style={styles.tripTitle}>{item.title}</Text>
            <Text style={styles.tripDetails}>
              {item.startPoint} → {item.destination}
            </Text>
            <View style={styles.tripMeta}>
              <Text style={styles.tripDuration}>{item.duration}</Text>
              <Text style={styles.tripBudget}>{item.budget}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderAchievement = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      style={[
        styles.achievementCard,
        !item.earned && styles.achievementCardLocked,
        {
          transform: [{
            scale: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.9, 1],
            })
          }],
          opacity: fadeAnim,
        }
      ]}
    >
      <BlurView intensity={item.earned ? 40 : 20} style={styles.achievementBlur}>
        <Text style={[styles.achievementIcon, !item.earned && styles.achievementIconLocked]}>
          {item.icon}
        </Text>
        <Text style={[styles.achievementTitle, !item.earned && styles.achievementTitleLocked]}>
          {item.title}
        </Text>
        <Text style={[styles.achievementDescription, !item.earned && styles.achievementDescriptionLocked]}>
          {item.description}
        </Text>
        {item.earned && (
          <View style={styles.achievementBadge}>
            <Text style={styles.achievementBadgeText}>✓</Text>
          </View>
        )}
      </BlurView>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header with Gradient */}
      <LinearGradient
        colors={[colors.primary, colors.primaryLight, colors.accent] as readonly [string, string, string]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View 
          style={[
            styles.headerContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Profile Section */}
          <Animated.View
            style={[
              styles.profileSection,
              { transform: [{ scale: profileScaleAnim }] }
            ]}
          >
            <View style={styles.profileImageContainer}>
              <Image source={{ uri: user.image }} style={styles.profileImage} />
              <LinearGradient
                colors={[colors.success, colors.successLight] as readonly [string, string]}
                style={styles.statusRing}
              />
              <View style={styles.statusDot} />
            </View>
            
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userBio}>{user.bio}</Text>
            
            <BlurView intensity={30} style={styles.bikeInfo}>
              <Image source={icons.bike} style={styles.bikeIcon} />
              <Text style={styles.bikeText}>{user.bike}</Text>
            </BlurView>
            
            <Button
              title="Edit Profile"
              onPress={handleEditProfile}
              variant="glassmorphism"
              size="md"
              style={styles.editButton}
            />
          </Animated.View>
        </Animated.View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Statistics</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => renderStatCard({ item: stat, index }))}
          </View>
        </View>

        {/* Safety Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Hub</Text>
          
          <TouchableOpacity 
            style={styles.safetyCard}
            onPress={navigateToSafetySettings}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isMonitoring ? 
                [colors.success, colors.successLight] as readonly [string, string] : 
                [colors.gray400, colors.gray300] as readonly [string, string]
              }
              style={styles.safetyGradient}
            >
              <BlurView intensity={30} style={styles.safetyBlur}>
                <View style={styles.safetyHeader}>
                  <View style={styles.safetyIconContainer}>
                    <Text style={styles.safetyIcon}>🛡️</Text>
                  </View>
                  <View style={styles.safetyStatus}>
                    <View style={[styles.safetyDot, { backgroundColor: isMonitoring ? colors.success : colors.error }]} />
                    <Text style={styles.safetyStatusText}>
                      {isMonitoring ? 'Active' : 'Inactive'}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.safetyTitle}>Crash Detection</Text>
                <Text style={styles.safetyDescription}>
                  {isMonitoring ? 
                    'Your safety network is monitoring your rides' : 
                    'Enable crash detection for safer rides'
                  }
                </Text>
                
                <View style={styles.safetyControls}>
                  <Text style={styles.toggleLabel}>Enable</Text>
                  <Switch
                    value={crashDetectionEnabled}
                    onValueChange={toggleCrashDetection}
                    trackColor={{ false: colors.gray300, true: colors.primary }}
                    thumbColor={crashDetectionEnabled ? colors.white : colors.gray400}
                  />
                </View>
              </BlurView>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => renderAchievement({ item: achievement, index }))}
          </View>
        </View>

        {/* My Trips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Adventures</Text>
            <Text style={styles.tripCount}>{userTrips.length} trips</Text>
          </View>
          
          {userTrips.length > 0 ? (
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tripsContainer}
            >
              {userTrips.map((trip, index) => renderTripCard({ item: trip, index }))}
            </ScrollView>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>🗺️</Text>
              <Text style={styles.emptyStateText}>No trips yet</Text>
              <Text style={styles.emptyStateSubtext}>Start planning your first adventure!</Text>
            </View>
          )}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingsCard}>
            <BlurView intensity={20} style={styles.settingsBlur}>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>Dark Mode</Text>
                  <Text style={styles.settingDescription}>Switch to dark theme</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: colors.gray300, true: colors.primary }}
                  thumbColor={darkMode ? colors.white : colors.gray400}
                />
              </View>
            </BlurView>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <Button
            title="Sign Out"
            onPress={handleLogout}
            variant="outline"
            size="lg"
            fullWidth
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  header: {
    paddingTop: 60,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  
  headerContent: {
    alignItems: 'center',
  },
  
  profileSection: {
    alignItems: 'center',
  },
  
  profileImageContainer: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.white,
  },
  
  statusRing: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    top: -5,
    left: -5,
    opacity: 0.3,
  },
  
  statusDot: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.success,
    borderWidth: 3,
    borderColor: colors.white,
  },
  
  userName: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  
  userBio: {
    fontSize: typography.fontSizes.base,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  
  bikeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  
  bikeIcon: {
    width: 16,
    height: 16,
    tintColor: colors.white,
    marginRight: spacing.sm,
  },
  
  bikeText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.white,
  },
  
  editButton: {
    minWidth: 120,
  },
  
  content: {
    flex: 1,
    marginTop: -spacing.lg,
  },
  
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  
  section: {
    marginBottom: spacing.xl,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  
  sectionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  
  tripCount: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeights.medium,
  },
  
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  
  statCard: {
    width: (screenWidth - spacing.lg * 2 - spacing.md) / 2,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  
  statCardBlur: {
    padding: spacing.lg,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  
  statIcon: {
    fontSize: 24,
  },
  
  statValue: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.black,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeights.medium,
    textAlign: 'center',
  },
  
  safetyCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  
  safetyGradient: {
    padding: spacing.lg,
  },
  
  safetyBlur: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  
  safetyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  
  safetyIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  safetyIcon: {
    fontSize: 24,
  },
  
  safetyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  
  safetyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  
  safetyStatusText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.medium,
    color: colors.white,
  },
  
  safetyTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  
  safetyDescription: {
    fontSize: typography.fontSizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.lg,
  },
  
  safetyControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  toggleLabel: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.medium,
    color: colors.white,
  },
  
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  
  achievementCard: {
    width: (screenWidth - spacing.lg * 2 - spacing.md) / 2,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  
  achievementCardLocked: {
    opacity: 0.6,
  },
  
  achievementBlur: {
    padding: spacing.md,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  
  achievementIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  
  achievementIconLocked: {
    opacity: 0.5,
  },
  
  achievementTitle: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  
  achievementTitleLocked: {
    color: colors.textSecondary,
  },
  
  achievementDescription: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  achievementDescriptionLocked: {
    color: colors.textLight,
  },
  
  achievementBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  achievementBadgeText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: typography.fontWeights.bold,
  },
  
  tripsContainer: {
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  
  tripCard: {
    width: 250,
    height: 150,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  
  tripCardContent: {
    flex: 1,
    position: 'relative',
  },
  
  tripImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  
  tripOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  
  tripInfo: {
    // Content container
  },
  
  tripTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  
  tripDetails: {
    fontSize: typography.fontSizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.sm,
  },
  
  tripMeta: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  
  tripDuration: {
    fontSize: typography.fontSizes.xs,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: typography.fontWeights.medium,
  },
  
  tripBudget: {
    fontSize: typography.fontSizes.xs,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: typography.fontWeights.medium,
  },
  
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  
  emptyStateText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  
  emptyStateSubtext: {
    fontSize: typography.fontSizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  settingsCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  
  settingsBlur: {
    padding: spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  settingInfo: {
    flex: 1,
  },
  
  settingTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.medium,
    color: colors.text,
    marginBottom: 2,
  },
  
  settingDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  
  logoutSection: {
    marginTop: spacing.xl,
  },
  
  logoutButton: {
    borderColor: colors.error,
  },
});

export default Profile;