// components/SearchBar.tsx - Enhanced SearchBar Component

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '../constants/colors';
import { icons } from '../constants/icons';

interface SearchBarProps {
  placeHolder: string;
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  showFilter?: boolean;
  onFilterPress?: () => void;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeHolder,
  value,
  onChangeText,
  onPress,
  onFocus,
  onBlur,
  showFilter = false,
  onFilterPress,
  autoFocus = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusedScale = new Animated.Value(1);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(focusedScale, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start();
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(focusedScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onBlur?.();
  };

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        isFocused && styles.containerFocused,
        { transform: [{ scale: focusedScale }] },
        shadows.sm
      ]}
    >
      <Image source={icons.search} style={styles.searchIcon} />
      
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        placeholderTextColor={colors.textLight}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus={autoFocus}
        returnKeyType="search"
        onSubmitEditing={onPress}
      />
      
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <View style={styles.clearIconContainer}>
            <Image source={icons.back} style={[styles.clearIcon, { transform: [{ rotate: '45deg' }] }]} />
          </View>
        </TouchableOpacity>
      )}
      
      {showFilter && (
        <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
          <Image source={icons.info} style={styles.filterIcon} />
        </TouchableOpacity>
      )}
      
      {onPress && !value && (
        <TouchableOpacity style={styles.searchButton} onPress={onPress}>
          <Image source={icons.search} style={styles.searchButtonIcon} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 48,
  },
  
  containerFocused: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: colors.textSecondary,
    marginRight: spacing.sm,
  },
  
  input: {
    flex: 1,
    fontSize: typography.fontSizes.base,
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  
  clearButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
  },
  
  clearIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  clearIcon: {
    width: 12,
    height: 12,
    tintColor: colors.white,
  },
  
  filterButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.sm,
  },
  
  filterIcon: {
    width: 18,
    height: 18,
    tintColor: colors.primary,
  },
  
  searchButton: {
    backgroundColor: colors.primary,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.xs,
  },
  
  searchButtonIcon: {
    width: 18,
    height: 18,
    tintColor: colors.white,
  },
});

export default SearchBar;