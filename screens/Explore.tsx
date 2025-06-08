// screens/Explore.tsx - Enhanced Explore Screen

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
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
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [selectedFilter, setSelectedFilter] = useState('all');

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

  // Filter trips based on selected category and filters
  const filteredTrips = mockTrips.filter((trip) => {
    let matchesCategory = true;
    let matchesFilter = true;
    
    // Category filtering
    if (selectedCategory === '6') {
      matchesCategory = trip.femaleOnly;
    } else if (selectedCategory !== '1') {
      // Add more category logic here based on trip properties
      matchesCategory = true;
    }
    
    // Additional filtering
    if (selectedFilter === 'budget') {
      matchesFilter = parseInt(trip.budget.replace(/[^\d]/g, '')) <= 20000;
    } else if (selectedFilter === 'duration') {
      matchesFilter = parseInt(trip.duration.split(' ')[0]) <= 5;
    }
    
    return matchesCategory && matchesFilter;
  });

  const categories = [
    { id: '1', name: 'All', icon: '🌍', color: colors.primary },
    { id: '2', name: 'Mountain', icon: '🏔️', color: colors.success },
    { id: '3', name: 'Coastal', icon: '🏖️', color: colors.info },
    { id: '4', name: 'Desert', icon: '🏜️', color: colors.warning },
    { id: '5', name: 'City', icon: '🏙️', color: colors.secondary },
    { id: '6', name: 'Women Only', icon: '👩', color: colors.accent },
  ];

  const filters = [
    { id: 'all', name: 'All Trips', icon: '🔍' },
    { id: 'budget', name: 'Budget Friendly', icon: '💰' },
    { id: 'duration', name: 'Short Trips', icon: '⏱️' },
    { id: 'popular', name: 'Popular', icon: '⭐' },
  ];

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        { backgroundColor: selectedCategory === item.id ? item.color : colors.gray100 },
      ]}
      onPress={() => handleCategoryPress(item.id)}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text
        style={[
          styles.categoryText,
          { color: selectedCategory === item.id ? colors.white : colors.text },
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderFilterItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        selectedFilter === item.id && styles.filterItemSelected,
      ]}
      onPress={() => handleFilterPress(item.id)}
    >
      <Text style={styles.filterIcon}>{item.icon}</Text>
      <Text
        style={[
          styles.filterText,
          selectedFilter === item.id && styles.filterTextSelected,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore Adventures</Text>
        <Text style={styles.subtitle}>Discover amazing motorcycle journeys</Text>
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        {/* Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filters</Text>
          <FlatList
            data={filters}
            keyExtractor={(item) => item.id}
            renderItem={renderFilterItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          />
        </View>

        {/* Stats Banner */}
        <View style={[styles.statsBanner, shadows.sm]}>
          <View style={styles.statsItem}>
            <Text style={styles.statsNumber}>{filteredTrips.length}</Text>
            <Text style={styles.statsLabel}>Available Trips</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsItem}>
            <Text style={styles.statsNumber}>24</Text>
            <Text style={styles.statsLabel}>Active Riders</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsItem}>
            <Text style={styles.statsNumber}>156</Text>
            <Text style={styles.statsLabel}>Routes Mapped</Text>
          </View>
        </View>

        {/* Featured Trips */}
        {filteredTrips.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedCategory === '1' ? 'Featured Trips' : categories.find(c => c.id === selectedCategory)?.name + ' Trips'}
              </Text>
              <Text style={styles.resultsCount}>
                {filteredTrips.length} trip{filteredTrips.length !== 1 ? 's' : ''}
              </Text>
            </View>

            <FlatList
              data={filteredTrips}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TripCard trip={item} onPress={() => handleTripPress(item.id)} />
              )}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🔍</Text>
            <Text style={styles.emptyStateTitle}>No trips found</Text>
            <Text style={styles.emptyStateSubtitle}>
              Try adjusting your filters or search for something else
            </Text>
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={() => {
                setSelectedCategory('1');
                setSelectedFilter('all');
                setSearchQuery('');
              }}
            >
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingHorizontal: spacing.md,
    paddingTop: 60,
    paddingBottom: spacing.lg,
    backgroundColor: colors.primary,
  },
  
  title: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  
  subtitle: {
    fontSize: typography.fontSizes.base,
    color: colors.primaryLight,
    opacity: 0.9,
  },
  
  searchContainer: {
    paddingHorizontal: spacing.md,
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
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  
  sectionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  
  resultsCount: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeights.medium,
  },
  
  categoriesContainer: {
    paddingHorizontal: spacing.md,
  },
  
  categoryItem: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
    minWidth: 90,
    ...shadows.sm,
  },
  
  categoryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  
  categoryText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.semibold,
    textAlign: 'center',
  },
  
  filtersContainer: {
    paddingHorizontal: spacing.md,
  },
  
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  
  filterItemSelected: {
    backgroundColor: colors.primary,
  },
  
  filterIcon: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  
  filterText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.text,
  },
  
  filterTextSelected: {
    color: colors.white,
  },
  
  statsBanner: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    marginBottom: spacing.xl,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
  },
  
  statsItem: {
    flex: 1,
    alignItems: 'center',
  },
  
  statsNumber: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  
  statsLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  statsDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
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
    marginBottom: spacing.lg,
  },
  
  resetButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  
  resetButtonText: {
    color: colors.white,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
  },
});

export default Explore;