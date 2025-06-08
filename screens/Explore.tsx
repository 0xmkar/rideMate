// screens/Explore.tsx - Ultra-Modern Explore Screen with Enhanced UI

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import SearchBar from '../components/SearchBar';
import TripCard from '../components/TripCard';
import { colors, spacing, borderRadius, typography, shadows } from '../constants/colors';
import { mockTrips } from '../constants/MockData';

const { width: screenWidth } = Dimensions.get('window');

type RootStackParamList = {
  TripDetails: { tripId: string };
};

const Explore: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showMap, setShowMap] = useState(false);
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
      Animated.timing(headerAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSearch = () => {
    console.log('Search pressed:', searchQuery);
  };

  const handleTripPress = (tripId: string) => {
    navigation.navigate('TripDetails', { tripId });
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };

  // Enhanced mock data with more details
  const enhancedTrips = mockTrips.map(trip => ({
    ...trip,
    difficulty: ['Easy', 'Medium', 'Hard', 'Expert'][Math.floor(Math.random() * 4)] as 'Easy' | 'Medium' | 'Hard' | 'Expert',
    rating: 3.5 + Math.random() * 1.5,
    reviews: Math.floor(Math.random() * 200) + 10,
    joinedMembers: Math.floor(Math.random() * 8) + 2,
    maxMembers: 10,
  }));

  // Filter trips based on selected category and filters
  const filteredTrips = enhancedTrips.filter((trip) => {
    let matchesCategory = true;
    let matchesFilter = true;
    
    // Category filtering
    if (selectedCategory === 'women') {
      matchesCategory = trip.femaleOnly;
    } else if (selectedCategory === 'mountain') {
      matchesCategory = trip.title.toLowerCase().includes('mountain') || trip.title.toLowerCase().includes('himalayan');
    } else if (selectedCategory === 'coastal') {
      matchesCategory = trip.title.toLowerCase().includes('coastal') || trip.title.toLowerCase().includes('gokarna');
    } else if (selectedCategory === 'desert') {
      matchesCategory = trip.title.toLowerCase().includes('desert') || trip.title.toLowerCase().includes('rajasthan');
    }
    
    // Filter logic
    if (selectedFilter === 'budget') {
      matchesFilter = parseInt(trip.budget.replace(/[^\d]/g, '')) <= 15000;
    } else if (selectedFilter === 'short') {
      matchesFilter = parseInt(trip.duration.split(' ')[0]) <= 3;
    } else if (selectedFilter === 'popular') {
      matchesFilter = (trip.rating || 0) >= 4.0;
    }
    
    return matchesCategory && matchesFilter;
  });

  const categories = [
    { id: 'all', name: 'All', icon: '🌍', gradient: [colors.primary, colors.primaryLight] },
    { id: 'mountain', name: 'Mountain', icon: '🏔️', gradient: [colors.success, colors.successLight] },
    { id: 'coastal', name: 'Coastal', icon: '🏖️', gradient: [colors.info, colors.infoLight] },
    { id: 'desert', name: 'Desert', icon: '🏜️', gradient: [colors.warning, colors.warningLight] },
    { id: 'women', name: 'Women Only', icon: '👩', gradient: [colors.accent, colors.accentLight] },
  ];

  const filters = [
    { id: 'all', name: 'All Trips', icon: '🔍', color: colors.primary },
    { id: 'budget', name: 'Budget Friendly', icon: '💰', color: colors.success },
    { id: 'short', name: 'Short Trips', icon: '⏱️', color: colors.warning },
    { id: 'popular', name: 'Popular', icon: '⭐', color: colors.accent },
  ];

  const stats = [
    { number: filteredTrips.length.toString(), label: 'Available Trips' },
    { number: '24', label: 'Active Riders' },
    { number: '156', label: 'Routes Mapped' },
  ];

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.categoryItemSelected,
      ]}
      onPress={() => handleCategoryPress(item.id)}
      activeOpacity={0.8}
    >
      {selectedCategory === item.id ? (
        <LinearGradient
          colors={item.gradient as readonly [string, string]}
          style={styles.categoryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.categoryIcon}>{item.icon}</Text>
          <Text style={styles.categoryTextSelected}>{item.name}</Text>
        </LinearGradient>
      ) : (
        <BlurView intensity={20} style={styles.categoryBlur}>
          <Text style={styles.categoryIcon}>{item.icon}</Text>
          <Text style={styles.categoryText}>{item.name}</Text>
        </BlurView>
      )}
    </TouchableOpacity>
  );

  const renderFilterItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        selectedFilter === item.id && styles.filterItemSelected,
      ]}
      onPress={() => handleFilterPress(item.id)}
      activeOpacity={0.8}
    >
      <BlurView 
        intensity={selectedFilter === item.id ? 40 : 20} 
        style={styles.filterBlur}
      >
        <View style={[
          styles.filterIconContainer,
          selectedFilter === item.id && { backgroundColor: item.color + '20' }
        ]}>
          <Text style={styles.filterIcon}>{item.icon}</Text>
        </View>
        <Text style={[
          styles.filterText,
          selectedFilter === item.id && { color: item.color, fontWeight: typography.fontWeights.bold }
        ]}>
          {item.name}
        </Text>
      </BlurView>
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
              outputRange: [0, 20 + (index * 5)],
            })
          }],
          opacity: fadeAnim,
        }
      ]}
    >
      <BlurView intensity={30} style={styles.statCardBlur}>
        <Text style={styles.statNumber}>{item.number}</Text>
        <Text style={styles.statLabel}>{item.label}</Text>
      </BlurView>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Enhanced Header with Gradient */}
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
              opacity: headerAnim,
              transform: [{
                translateY: headerAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                })
              }]
            }
          ]}
        >
          {/* Header Title */}
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Explore Adventures</Text>
              <Text style={styles.subtitle}>Discover amazing motorcycle journeys</Text>
            </View>
            
            {/* Map Toggle */}
            <TouchableOpacity 
              style={styles.mapToggle}
              onPress={() => setShowMap(!showMap)}
            >
              <BlurView intensity={30} style={styles.mapToggleBlur}>
                <Text style={styles.mapToggleIcon}>{showMap ? '📋' : '🗺️'}</Text>
              </BlurView>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <SearchBar
              placeHolder="Search destinations, routes..."
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
        showsVerticalScrollIndicator={false}
      >
        {/* Categories Section */}
        <Animated.View 
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </Animated.View>

        {/* Filters Section */}
        <Animated.View 
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Filters</Text>
          <FlatList
            data={filters}
            keyExtractor={(item) => item.id}
            renderItem={renderFilterItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          />
        </Animated.View>

        {/* Stats Banner */}
        <View style={styles.section}>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => renderStatCard({ item: stat, index }))}
          </View>
        </View>

        {/* Map View Toggle */}
        {showMap && (
          <Animated.View 
            style={[
              styles.mapSection,
              {
                opacity: fadeAnim,
                transform: [{ scale: fadeAnim }]
              }
            ]}
          >
            <BlurView intensity={20} style={styles.mapContainer}>
              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapIcon}>🗺️</Text>
                <Text style={styles.mapTitle}>Interactive Map</Text>
                <Text style={styles.mapSubtitle}>
                  Showing {filteredTrips.length} trips in your area
                </Text>
                
                {/* Mock map pins */}
                <View style={styles.mapPins}>
                  {filteredTrips.slice(0, 5).map((trip, index) => (
                    <TouchableOpacity
                      key={trip.id}
                      style={[
                        styles.mapPin,
                        {
                          left: 50 + (index * 40),
                          top: 80 + (index % 2) * 30,
                        }
                      ]}
                      onPress={() => handleTripPress(trip.id)}
                    >
                      <LinearGradient
                        colors={[colors.primary, colors.primaryLight] as readonly [string, string]}
                        style={styles.mapPinGradient}
                      >
                        <Text style={styles.mapPinText}>📍</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </BlurView>
          </Animated.View>
        )}

        {/* Featured Trips */}
        {filteredTrips.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedCategory === 'all' ? 'Featured Trips' : 
                 categories.find(c => c.id === selectedCategory)?.name + ' Adventures'}
              </Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <BlurView intensity={20} style={styles.viewAllBlur}>
                  <Text style={styles.viewAllText}>{filteredTrips.length} trips</Text>
                </BlurView>
              </TouchableOpacity>
            </View>

            <FlatList
              data={filteredTrips}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <Animated.View
                  style={{
                    opacity: fadeAnim,
                    transform: [{
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50 + (index * 10), 0],
                      })
                    }]
                  }}
                >
                  <TripCard 
                    trip={item} 
                    onPress={() => handleTripPress(item.id)}
                    showJoinButton={true}
                    onJoinPress={() => console.log('Join trip:', item.id)}
                  />
                </Animated.View>
              )}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <Animated.View 
            style={[
              styles.emptyState,
              {
                opacity: fadeAnim,
                transform: [{ scale: fadeAnim }]
              }
            ]}
          >
            <BlurView intensity={20} style={styles.emptyStateBlur}>
              <Text style={styles.emptyStateIcon}>🔍</Text>
              <Text style={styles.emptyStateTitle}>No adventures found</Text>
              <Text style={styles.emptyStateSubtitle}>
                Try adjusting your filters or search for something else
              </Text>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={() => {
                  setSelectedCategory('all');
                  setSelectedFilter('all');
                  setSearchQuery('');
                }}
              >
                <LinearGradient
                  colors={[colors.primary, colors.primaryLight] as readonly [string, string]}
                  style={styles.resetButtonGradient}
                >
                  <Text style={styles.resetButtonText}>Reset Filters</Text>
                </LinearGradient>
              </TouchableOpacity>
            </BlurView>
          </Animated.View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <LinearGradient
                colors={[colors.success, colors.successLight] as readonly [string, string]}
                style={styles.quickActionGradient}
              >
                <Text style={styles.quickActionIcon}>🎯</Text>
                <Text style={styles.quickActionText}>Plan Trip</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <LinearGradient
                colors={[colors.accent, colors.accentLight] as readonly [string, string]}
                style={styles.quickActionGradient}
              >
                <Text style={styles.quickActionIcon}>👥</Text>
                <Text style={styles.quickActionText}>Join Group</Text>
              </LinearGradient>
            </TouchableOpacity>
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
  
  title: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  
  subtitle: {
    fontSize: typography.fontSizes.base,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  
  mapToggle: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  
  mapToggleBlur: {
    padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  mapToggleIcon: {
    fontSize: 20,
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
  
  viewAllButton: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  
  viewAllBlur: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  
  viewAllText: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: typography.fontWeights.semibold,
  },
  
  categoriesContainer: {
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  
  categoryItem: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    minWidth: 100,
    ...shadows.sm,
  },
  
  categoryItemSelected: {
    ...shadows.md,
  },
  
  categoryGradient: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  
  categoryBlur: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  categoryIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  
  categoryText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.text,
    textAlign: 'center',
  },
  
  categoryTextSelected: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    textAlign: 'center',
  },
  
  filtersContainer: {
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  
  filterItem: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  
  filterItemSelected: {
    ...shadows.md,
  },
  
  filterBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  filterIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  filterIcon: {
    fontSize: 16,
  },
  
  filterText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.text,
  },
  
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  
  statCard: {
    flex: 1,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  
  statCardBlur: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  statNumber: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.black,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  
  statLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: typography.fontWeights.medium,
  },
  
  mapSection: {
    marginBottom: spacing.xl,
  },
  
  mapContainer: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  
  mapPlaceholder: {
    height: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  
  mapIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  
  mapTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  
  mapSubtitle: {
    fontSize: typography.fontSizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  mapPins: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  
  mapPin: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  
  mapPinGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  mapPinText: {
    fontSize: 16,
  },
  
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  
  emptyStateBlur: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  
  emptyStateTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  
  emptyStateSubtitle: {
    fontSize: typography.fontSizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.base,
    marginBottom: spacing.xl,
  },
  
  resetButton: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  
  resetButtonGradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  
  resetButtonText: {
    color: colors.white,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
  },
  
  quickActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  
  quickAction: {
    flex: 1,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  
  quickActionGradient: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  
  quickActionIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  
  quickActionText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
  },
});

export default Explore;