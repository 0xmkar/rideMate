// screens/Home.tsx - Ultra-Modern Dashboard with 2025 UI Trends

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  RefreshControl,
  Animated,
  StatusBar,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import SearchBar from '../components/SearchBar';
import TripCard from '../components/TripCard';
import Button from '../components/Button';
import { colors, spacing, borderRadius, typography, shadows } from '../constants/colors';
import { mockTrips } from '../constants/MockData';

const { width: screenWidth } = Dimensions.get('window');

type RootStackParamList = {
  TripDetails: { tripId: string };
  TripPlanning: undefined;
  SafetySettings: undefined;
};

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [currentWeather, setCurrentWeather] = useState({ temp: '24°C', condition: '☀️' });


  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const weatherAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Entrance animation
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
    ]).start();

    // Weather icon animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(weatherAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(weatherAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleSearch = () => {
    console.log('Search pressed:', searchQuery);
  };

  const handleTripPress = (tripId: string) => {
    navigation.navigate('TripDetails', { tripId });
  };

  const handleCreateTrip = () => {
    navigation.navigate('TripPlanning');
  };

  const handleSafetySettings = () => {
    navigation.navigate('SafetySettings');
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const quickActions = [
    { 
      id: '1', 
      title: 'Plan Trip', 
      icon: '🗺️', 
      gradient: [colors.primary, colors.primaryLight],
      onPress: handleCreateTrip 
    },
    { 
      id: '2', 
      title: 'Find Riders', 
      icon: '👥', 
      gradient: [colors.accent, colors.accentLight],
      onPress: () => navigation.navigate('Explore' as never) 
    },
    { 
      id: '3', 
      title: 'Safety Hub', 
      icon: '🛡️', 
      gradient: [colors.emergency, colors.errorLight],
      onPress: handleSafetySettings 
    },
    { 
      id: '4', 
      title: 'Live Tracking', 
      icon: '📍', 
      gradient: [colors.success, colors.successLight],
      onPress: () => {} 
    },
  ];

  const rideStats = [
    { 
      label: 'Total Distance', 
      value: '3,247', 
      unit: 'km', 
      icon: '🏍️',
      change: '+12%',
      trend: 'up'
    },
    { 
      label: 'Trips Completed', 
      value: '42', 
      unit: '', 
      icon: '✅',
      change: '+5',
      trend: 'up'
    },
    { 
      label: 'Riding Hours', 
      value: '186', 
      unit: 'hrs', 
      icon: '⏱️',
      change: '+8%',
      trend: 'up'
    },
    { 
      label: 'Safety Score', 
      value: '98', 
      unit: '%', 
      icon: '🛡️',
      change: '+2%',
      trend: 'up'
    },
  ];

  const weatherRotate = weatherAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const renderQuickAction = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.quickActionCard}
      onPress={item.onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={item.gradient as readonly [string, string]}
        style={styles.quickActionGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.quickActionIcon}>{item.icon}</Text>
        <Text style={styles.quickActionText}>{item.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderStatCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      style={[
        styles.statCard,
        {
          transform: [{
            translateY: slideAnim.interpolate({
              inputRange: [0, 30],
              outputRange: [0, 30 + (index * 10)],
            })
          }]
        }
      ]}
    >
      <BlurView intensity={20} style={styles.statCardBlur}>
        <View style={styles.statHeader}>
          <Text style={styles.statIcon}>{item.icon}</Text>
          <View style={[styles.trendIndicator, item.trend === 'up' ? styles.trendUp : styles.trendDown]}>
            <Text style={styles.trendText}>{item.change}</Text>
          </View>
        </View>
        <Text style={styles.statValue}>{item.value}<Text style={styles.statUnit}>{item.unit}</Text></Text>
        <Text style={styles.statLabel}>{item.label}</Text>
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
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>{greeting} 👋</Text>
              <Text style={styles.userName}>Ready for adventure?</Text>
            </View>
            
            <View style={styles.headerRight}>
              {/* Weather Widget */}
              <TouchableOpacity style={styles.weatherWidget}>
                <BlurView intensity={30} style={styles.weatherBlur}>
                  <Animated.Text 
                    style={[
                      styles.weatherIcon,
                      { transform: [{ rotate: weatherRotate }] }
                    ]}
                  >
                    {currentWeather.condition}
                  </Animated.Text>
                  <Text style={styles.weatherTemp}>{currentWeather.temp}</Text>
                </BlurView>
              </TouchableOpacity>
              
              {/* Profile */}
              <TouchableOpacity style={styles.profileContainer}>
                <Image 
                  source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
                  style={styles.profileImage} 
                />
                <View style={styles.statusIndicator} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <SearchBar
              placeHolder="Search destinations, riders..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onPress={handleSearch}
              showFilter={true}
            />
          </View>
        </Animated.View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <Animated.View 
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <FlatList
            data={quickActions}
            renderItem={renderQuickAction}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContainer}
          />
        </Animated.View>

        {/* Ride Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <FlatList
            data={rideStats}
            renderItem={renderStatCard}
            keyExtractor={(item) => item.label}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.statsGrid}
          />
        </View>

        {/* Safety Status */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.safetyCard}
            onPress={handleSafetySettings}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.success, colors.successLight] as readonly [string, string]}
              style={styles.safetyGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.safetyContent}>
                <View style={styles.safetyHeader}>
                  <Text style={styles.safetyIcon}>🛡️</Text>
                  <View style={styles.safetyStatus}>
                    <View style={styles.safetyDot} />
                    <Text style={styles.safetyStatusText}>Active</Text>
                  </View>
                </View>
                <Text style={styles.safetyTitle}>Crash Detection</Text>
                <Text style={styles.safetySubtitle}>Your safety network is monitoring your rides</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Featured Trip */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Adventure</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          {mockTrips.length > 0 && (
            <TripCard 
              trip={mockTrips[0]} 
              onPress={() => handleTripPress(mockTrips[0].id)} 
            />
          )}
        </View>

        {/* Create Trip CTA */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.ctaContainer}
            onPress={handleCreateTrip}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[colors.accent, colors.accentLight] as readonly [string, string]}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <BlurView intensity={20} style={styles.ctaBlur}>
                <Text style={styles.ctaIcon}>🚀</Text>
                <Text style={styles.ctaTitle}>Start Your Journey</Text>
                <Text style={styles.ctaSubtitle}>Create a new trip and find riding companions</Text>
                <Button
                  title="Plan Now"
                  onPress={handleCreateTrip}
                  variant="glassmorphism"
                  size="md"
                  style={styles.ctaButton}
                />
              </BlurView>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {[
              { icon: '🏍️', title: 'Completed "Coastal Highway"', time: '2 hours ago', color: colors.success },
              { icon: '👥', title: 'Joined "Weekend Warriors"', time: '1 day ago', color: colors.accent },
              { icon: '🛡️', title: 'Safety check completed', time: '2 days ago', color: colors.primary },
            ].map((activity, index) => (
              <TouchableOpacity key={index} style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                  <Text style={styles.activityIconText}>{activity.icon}</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    // Animation container
  },
  
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  
  headerLeft: {
    flex: 1,
  },
  
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  
  greeting: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: 4,
  },
  
  userName: {
    fontSize: typography.fontSizes.base,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  
  weatherWidget: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  
  weatherBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  
  weatherIcon: {
    fontSize: 16,
  },
  
  weatherTemp: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.white,
  },
  
  profileContainer: {
    position: 'relative',
  },
  
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.white,
  },
  
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.white,
  },
  
  searchContainer: {
    zIndex: 10,
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
  
  seeAllText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: typography.fontWeights.semibold,
  },
  
  quickActionsContainer: {
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  
  quickActionCard: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  
  quickActionGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },
  
  quickActionIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  
  quickActionText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.semibold,
    color: colors.white,
    textAlign: 'center',
  },
  
  statsGrid: {
    gap: spacing.md,
  },
  
  statCard: {
    flex: 1,
    marginHorizontal: spacing.xs,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  
  statCardBlur: {
    padding: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  
  statIcon: {
    fontSize: 20,
  },
  
  trendIndicator: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  
  trendUp: {
    backgroundColor: colors.success + '20',
  },
  
  trendDown: {
    backgroundColor: colors.error + '20',
  },
  
  trendText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.medium,
    color: colors.success,
  },
  
  statValue: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.black,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  
  statUnit: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.textSecondary,
  },
  
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeights.medium,
  },
  
  safetyCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  
  safetyGradient: {
    padding: spacing.lg,
  },
  
  safetyContent: {
    // Content container
  },
  
  safetyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
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
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
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
    marginBottom: spacing.xs,
  },
  
  safetySubtitle: {
    fontSize: typography.fontSizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  
  ctaContainer: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  
  ctaGradient: {
    padding: spacing.lg,
  },
  
  ctaBlur: {
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  
  ctaIcon: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
  
  ctaTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  
  ctaSubtitle: {
    fontSize: typography.fontSizes.base,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.base,
  },
  
  ctaButton: {
    minWidth: 120,
  },
  
  activityList: {
    gap: spacing.md,
  },
  
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  
  activityIconText: {
    fontSize: 18,
  },
  
  activityContent: {
    flex: 1,
  },
  
  activityTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.medium,
    color: colors.text,
    marginBottom: 2,
  },
  
  activityTime: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
});
export default Home;