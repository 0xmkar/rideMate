// navigation/AppNavigator.tsx - Enhanced Navigation with Modern UI

import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

// Import screens
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import Explore from "../screens/Explore";
import TripPlanning from "../screens/TripPlanning";
import TripDetails from "../screens/TripDetails";
import GroupChat from "../screens/GroupChat";
import Profile from "../screens/Profile";
import SafetySettings from "../screens/SafetySettings";

// Import design system
import { colors, spacing, borderRadius, typography, shadows } from "../constants/colors";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Tab Bar Icon Component
const TabIcon = ({ icon, label, focused, color }: {
  icon: string;
  label: string;
  focused: boolean;
  color: string;
}) => {
  return (
    <View style={styles.tabIconContainer}>
      {focused && (
        <LinearGradient
          colors={[colors.primary, colors.primaryLight] as readonly [string, string]}
          style={styles.tabIconBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      )}
      <Text style={[
        styles.tabIcon,
        { color: focused ? colors.white : color }
      ]}>
        {icon}
      </Text>
      <Text style={[
        styles.tabLabel,
        { 
          color: focused ? colors.white : color,
          fontWeight: focused ? typography.fontWeights.semibold : typography.fontWeights.medium
        }
      ]}>
        {label}
      </Text>
      {focused && <View style={styles.tabIndicator} />}
    </View>
  );
};

// Enhanced Tab Bar Component
const CustomTabBar = (props: any) => {
  const { state, descriptors, navigation } = props;

  return (
    <View style={styles.tabBarContainer}>
      {/* Glassmorphism Background */}
      <BlurView intensity={80} style={styles.tabBarBlur}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.1)',
            'rgba(255, 255, 255, 0.05)',
          ] as readonly [string, string]}
          style={styles.tabBarGradient}
        >
          <View style={styles.tabBarContent}>
            {state.routes.map((route: any, index: number) => {
              const { options } = descriptors[route.key];
              const label = options.tabBarLabel || options.title || route.name;
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };

              // Get icon based on route name
              const getTabIcon = (routeName: string) => {
                switch (routeName) {
                  case 'Home':
                    return '🏠';
                  case 'Explore':
                    return '🧭';
                  case 'Profile':
                    return '👤';
                  default:
                    return '📱';
                }
              };

              return (
                <TouchableOpacity
                  key={route.key}
                  style={styles.tabItem}
                  accessible
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  activeOpacity={0.7}
                >
                  <TabIcon
                    icon={getTabIcon(route.name)}
                    label={label}
                    focused={isFocused}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </LinearGradient>
      </BlurView>
      
      {/* Shadow/Border */}
      <View style={styles.tabBarShadow} />
    </View>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: Platform.OS === 'android',
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: 'Explore',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="TripPlanning" component={TripPlanning} />
      <Stack.Screen name="TripDetails" component={TripDetails} />
      <Stack.Screen name="GroupChat" component={GroupChat} />
      <Stack.Screen name="SafetySettings" component={SafetySettings} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 34 : spacing.md, // Safe area for iOS
    paddingHorizontal: spacing.lg,
  },

  tabBarBlur: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    ...shadows.lg,
  },

  tabBarGradient: {
    paddingVertical: spacing.sm,
  },

  tabBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  tabBarShadow: {
    position: 'absolute',
    top: 0,
    left: spacing.lg,
    right: spacing.lg,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },

  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 50,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
  },

  tabIconBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: borderRadius.lg,
    opacity: 0.9,
  },

  tabIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },

  tabLabel: {
    fontSize: typography.fontSizes.xs,
    textAlign: 'center',
  },

  tabIndicator: {
    position: 'absolute',
    bottom: -spacing.sm,
    width: 20,
    height: 3,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xs,
  },
});

export default AppNavigator;
        