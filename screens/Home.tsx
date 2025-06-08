// screens/Home.tsx - Enhanced Home Screen

import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import TripCard from '../components/TripCard';
import Button from '../components/Button';
import { colors, spacing, borderRadius, typography, shadows } from '../constants/colors';
import { mockTrips } from '../constants/MockData';

const { width: screenWidth } = Dimensions.get('window');

type RootStackParamList = {
  TripDetails: { tripId: string };
  TripPlanning: undefined;
};

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
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

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000);
  };

  const quickActions = [
    { id: '1', title: 'Create Trip', icon: '🏍️', color: colors.primary },
    { id: '2', title: 'Join Ride', icon: '👥', color: colors.success },
    { id: '3', title: 'Safety Check', icon: '🛡️', color: colors.warning },
    { id: '4', title: 'Route Plan', icon: '🗺️', color: colors.info },
  ];

  const renderQuickAction = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.quickActionCard, { backgroundColor: item.color + '20' }]}
      onPress={() => item.id === '1' && handleCreateTrip()}
    >
      <Text style={styles.quickActionIcon}>{item.icon}</Text>
      <Text style={[styles.quickActionText, { color: item.color }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>{greeting} 👋</Text>
            <Text style={styles.userName}>Ready for an adventure?</Text>
          </View>
          <TouchableOpacity style={styles.profileContainer}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
              style={styles.profileImage} 
            />
            <View style={styles.statusIndicator} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
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

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <FlatList
            data={quickActions}
            renderItem={renderQuickAction}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContainer}
          />
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, shadows.sm]}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Trips Joined</Text>
          </View>
          <View style={[styles.statCard, shadows.sm]}>
            <Text style={styles.statNumber}>3.2k</Text>
            <Text style={styles.statLabel}>KM Traveled</Text>
          </View>
          <View style={[styles.statCard, shadows.sm]}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Riding Buddies</Text>
          </View>
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
        <View style={[styles.ctaContainer, shadows.md]}>
          <View style={styles.ctaGradient}>
            <Text style={styles.ctaTitle}>Start Your Journey</Text>
            <Text style={styles.ctaSubtitle}>Create a new trip and find riding companions</Text>
            <Button
              title="Create New Trip"
              onPress={handleCreateTrip}
              variant="primary"
              style={styles.ctaButton}
            />
          </View>
        </View>

        {/* Upcoming Trips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Trips</Text>
          <FlatList
            data={mockTrips.slice(1)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TripCard 
                trip={item} 
                onPress={() => handleTripPress(item.id)} 
                variant="compact"
              />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  header: {
    backgroundColor: colors.primary,
    paddingTop: 60,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  headerLeft: {
    flex: 1,
  },
  
  greeting: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.white,
    marginBottom: 4,
  },
  
  userName: {
    fontSize: typography.fontSizes.base,
    color: colors.primaryLight,
    opacity: 0.9,
  },
  
  profileContainer: {
    position: 'relative',
  },
  
  profileImage: {
    width: 48,
    height: 48,
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
  
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  
  searchContainer: {
    marginTop: -spacing.lg,
    marginBottom: spacing.lg,
    zIndex: 10,
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
  },
  
  seeAllText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: typography.fontWeights.semibold,
  },
  
  quickActionsContainer: {
    paddingVertical: spacing.sm,
  },
  
  quickActionCard: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    ...shadows.sm,
  },
  
  quickActionIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  
  quickActionText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.semibold,
    textAlign: 'center',
  },
  
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  
  statNumber: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  ctaContainer: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  
  ctaGradient: {
    backgroundColor: colors.accent,
    padding: spacing.lg,
    alignItems: 'center',
  },
  
  ctaTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  
  ctaSubtitle: {
    fontSize: typography.fontSizes.base,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  
  ctaButton: {
    backgroundColor: colors.white,
    minWidth: 160,
  },
});

export default Home;