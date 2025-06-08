// services/CrashDetectionService.ts - Advanced Crash Detection with Modern Features

import { useState, useEffect, useRef } from 'react';
import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors';
import { Alert, AppState, Platform, Vibration } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SMS from 'expo-sms';
import * as Linking from 'expo-linking';
import * as Haptics from 'expo-haptics';

// Enhanced threshold values for crash detection
const IMPACT_THRESHOLD = 2.5; // g-force (lower for expo-sensors)
const MONITORING_INTERVAL = 50; // ms - More responsive
const COOLDOWN_PERIOD = 15000; // 15 seconds cooldown after detection
const AUTO_ALERT_DELAY = 30000; // 30 seconds before auto-send
const FALSE_ALARM_WINDOW = 10000; // 10 seconds to cancel

// Advanced detection parameters
const SUDDEN_DECELERATION_THRESHOLD = 1.8;
const GYROSCOPE_THRESHOLD = 3.0; // rad/s
const CONSECUTIVE_READINGS_REQUIRED = 3;

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface CrashEvent {
  id: string;
  timestamp: number;
  location: LocationData;
  impact: number;
  confirmed: boolean;
  alertsSent: boolean;
}

export const useCrashDetection = (isEnabled = true) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastLocation, setLastLocation] = useState<LocationData | null>(null);
  const [crashHistory, setCrashHistory] = useState<CrashEvent[]>([]);
  const [alertPending, setAlertPending] = useState(false);
  
  const appState = useRef(AppState.currentState);
  const lastCrashTime = useRef(0);
  const subscription = useRef<ReturnType<typeof DeviceMotion.addListener> | null>(null);
  const locationSubscription = useRef<{ remove: () => void } | null>(null);
  const alertTimeout = useRef<NodeJS.Timeout | null>(null);
  const consecutiveHighReadings = useRef(0);
  const previousAcceleration = useRef({ x: 0, y: 0, z: 0 });

  // Enhanced location tracking with better accuracy
  const startLocationTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      // Request background location permission for crash detection
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== 'granted') {
        console.log('Background location permission denied');
      }

      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 5, // Update every 5 meters
          timeInterval: 2000, // Update every 2 seconds
        },
        (location) => {
          if (
            location.coords.latitude != null && 
            location.coords.longitude != null && 
            location.coords.accuracy != null
          ) {
            setLastLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              accuracy: location.coords.accuracy,
              timestamp: Date.now(),
            });
          }
        }
      );
    } catch (error) {
      console.log('Error starting location tracking:', error);
    }
  };

  // Get emergency contacts with validation
  const getEmergencyContacts = async (): Promise<Contact[]> => {
    try {
      const contacts = await AsyncStorage.getItem('emergencyContacts');
      const parsedContacts = contacts ? JSON.parse(contacts) : [];
      
      // Validate contacts have required fields
      return parsedContacts.filter((contact: any) => 
        contact.name && contact.phone && contact.id
      );
    } catch (error) {
      console.error('Error getting emergency contacts:', error);
      return [];
    }
  };

  // Enhanced alert system with detailed information
  const sendAlert = async (crashEvent: CrashEvent) => {
    if (!lastLocation) {
      console.log('No location available for alert');
      return;
    }

    const contacts = await getEmergencyContacts();
    if (contacts.length === 0) {
      console.log('No emergency contacts found');
      return;
    }

    // Create detailed emergency message
    const mapsUrl = `https://maps.google.com/?q=${lastLocation.latitude},${lastLocation.longitude}`;
    const timestamp = new Date(crashEvent.timestamp).toLocaleString();
    const impactLevel = crashEvent.impact > 3 ? 'HIGH' : crashEvent.impact > 2 ? 'MEDIUM' : 'LOW';
    
    const message = `🚨 MOTORCYCLE EMERGENCY ALERT 🚨

Rider may need assistance!

📍 Location: ${mapsUrl}
⏰ Time: ${timestamp}
💥 Impact Level: ${impactLevel}
🎯 Accuracy: ${lastLocation.accuracy?.toFixed(0)}m

This is an automated alert from RideMate crash detection system.

Please check on the rider and contact emergency services if needed.`;

    try {
      // Check if SMS is available
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const phoneNumbers = contacts.map(contact => contact.phone);
        await SMS.sendSMSAsync(phoneNumbers, message);
        
        // Log successful alerts
        console.log(`Emergency alerts sent to ${contacts.length} contacts`);
        
        // Update crash event
        setCrashHistory(prev => prev.map(event => 
          event.id === crashEvent.id 
            ? { ...event, alertsSent: true }
            : event
        ));
        
        // Store alert in history
        await AsyncStorage.setItem('crashAlertHistory', JSON.stringify([
          ...crashHistory,
          { ...crashEvent, alertsSent: true }
        ]));
        
      } else {
        // Fallback - open SMS app
        const firstContact = contacts[0];
        const encodedMessage = encodeURIComponent(message);
        const smsUrl = Platform.OS === 'ios' 
          ? `sms:${firstContact.phone}&body=${encodedMessage}`
          : `sms:${firstContact.phone}?body=${encodedMessage}`;
        
        await Linking.openURL(smsUrl);
      }
    } catch (error) {
      console.error('Error sending emergency alert:', error);
    }
  };

  // Advanced crash detection algorithm
  const processCrashDetection = (data: DeviceMotionMeasurement) => {
    const { acceleration, rotation } = data;

    if (!acceleration) return;

    const { x, y, z } = acceleration;
    
    if (x !== null && y !== null && z !== null) {
      // Calculate impact magnitude
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      
      // Calculate sudden deceleration
      const deltaX = Math.abs(x - previousAcceleration.current.x);
      const deltaY = Math.abs(y - previousAcceleration.current.y);
      const deltaZ = Math.abs(z - previousAcceleration.current.z);
      const deceleration = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
      
      // Check rotational forces (if available)
      let rotationMagnitude = 0;
      if (rotation && rotation.alpha !== null && rotation.beta !== null && rotation.gamma !== null) {
        rotationMagnitude = Math.sqrt(
          rotation.alpha * rotation.alpha + 
          rotation.beta * rotation.beta + 
          rotation.gamma * rotation.gamma
        );
      }

      const currentTime = Date.now();
      
      // Advanced detection logic
      const isHighImpact = magnitude > IMPACT_THRESHOLD;
      const isSuddenDeceleration = deceleration > SUDDEN_DECELERATION_THRESHOLD;
      const isHighRotation = rotationMagnitude > GYROSCOPE_THRESHOLD;
      
      if ((isHighImpact || isSuddenDeceleration || isHighRotation) && 
          (currentTime - lastCrashTime.current > COOLDOWN_PERIOD)) {
        
        consecutiveHighReadings.current++;
        
        if (consecutiveHighReadings.current >= CONSECUTIVE_READINGS_REQUIRED) {
          lastCrashTime.current = currentTime;
          consecutiveHighReadings.current = 0;
          
          // Create crash event
          const crashEvent: CrashEvent = {
            id: `crash_${currentTime}`,
            timestamp: currentTime,
            location: lastLocation!,
            impact: magnitude,
            confirmed: false,
            alertsSent: false,
          };
          
          setCrashHistory(prev => [...prev, crashEvent]);
          setAlertPending(true);
          
          // Immediate haptic feedback
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          Vibration.vibrate([0, 500, 200, 500]);
          
          // Show crash detection dialog
          Alert.alert(
            "🚨 Crash Detected",
            `Strong impact detected (${magnitude.toFixed(1)}g).\n\nAre you okay?`,
            [
              {
                text: "I'm Fine",
                style: "cancel",
                onPress: () => {
                  setAlertPending(false);
                  if (alertTimeout.current) {
                    clearTimeout(alertTimeout.current);
                  }
                  setCrashHistory(prev => prev.map(event => 
                    event.id === crashEvent.id 
                      ? { ...event, confirmed: false }
                      : event
                  ));
                }
              },
              { 
                text: "Send Alert", 
                onPress: () => {
                  setAlertPending(false);
                  sendAlert(crashEvent);
                  setCrashHistory(prev => prev.map(event => 
                    event.id === crashEvent.id 
                      ? { ...event, confirmed: true }
                      : event
                  ));
                },
                style: "destructive"
              }
            ],
            { 
              cancelable: false
            }
          );

          // Auto-send alert after delay
          alertTimeout.current = setTimeout(() => {
            if (alertPending) {
              setAlertPending(false);
              sendAlert(crashEvent);
              setCrashHistory(prev => prev.map(event => 
                event.id === crashEvent.id 
                  ? { ...event, confirmed: true, alertsSent: true }
                  : event
              ));
              
              // Show auto-sent notification
              Alert.alert(
                "Emergency Alert Sent",
                "No response detected. Emergency contacts have been notified with your location.",
                [{ text: "OK" }]
              );
            }
          }, AUTO_ALERT_DELAY);
        }
      } else {
        // Reset consecutive readings if values return to normal
        consecutiveHighReadings.current = Math.max(0, consecutiveHighReadings.current - 1);
      }

      // Update previous values
      previousAcceleration.current = { x, y, z };
    }
  };

  // Start monitoring with enhanced settings
  const startMonitoring = async () => {
    if (isMonitoring || !isEnabled) return;

    try {
      // Set higher update interval for better detection
      DeviceMotion.setUpdateInterval(MONITORING_INTERVAL);

      // Start location tracking
      await startLocationTracking();

      // Subscribe to DeviceMotion updates
      subscription.current = DeviceMotion.addListener(processCrashDetection);

      setIsMonitoring(true);
      console.log('Enhanced crash detection monitoring started');
      
      // Haptic feedback to confirm activation
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
    } catch (error) {
      console.error('Error starting crash detection:', error);
    }
  };

  // Stop monitoring and cleanup
  const stopMonitoring = () => {
    if (!isMonitoring) return;

    if (subscription.current) {
      subscription.current.remove();
      subscription.current = null;
    }

    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }

    if (alertTimeout.current) {
      clearTimeout(alertTimeout.current);
      alertTimeout.current = null;
    }

    setIsMonitoring(false);
    setAlertPending(false);
    console.log('Crash detection monitoring stopped');
  };

  // Test crash detection (for development/testing)
  const triggerTestCrash = async () => {
    if (!isMonitoring) return;
    
    const testCrashEvent: CrashEvent = {
      id: `test_crash_${Date.now()}`,
      timestamp: Date.now(),
      location: lastLocation || { latitude: 0, longitude: 0, accuracy: 0, timestamp: Date.now() },
      impact: 3.5,
      confirmed: false,
      alertsSent: false,
    };
    
    setCrashHistory(prev => [...prev, testCrashEvent]);
    
    Alert.alert(
      "🧪 Test Crash Detection",
      "This is a test of the crash detection system.\n\nWould you like to test the alert system?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Test Alert", 
          onPress: () => sendAlert(testCrashEvent),
          style: "destructive"
        }
      ]
    );
  };

  // Handle app state changes for background monitoring
  useEffect(() => {
    const subscriptionAppState = AppState.addEventListener('change', nextAppState => {
      if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
        console.log('App going to background, maintaining crash detection');
      } else if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        if (isEnabled && !isMonitoring) {
          startMonitoring();
        }
      }
      appState.current = nextAppState;
    });

    return () => {
      subscriptionAppState.remove();
    };
  }, [isEnabled, isMonitoring]);

  // Start/stop monitoring based on enabled state
  useEffect(() => {
    if (isEnabled) {
      startMonitoring();
    } else {
      stopMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [isEnabled]);

  // Load crash history on mount
  useEffect(() => {
    const loadCrashHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('crashAlertHistory');
        if (history) {
          setCrashHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error loading crash history:', error);
      }
    };

    loadCrashHistory();
  }, []);

  return {
    isMonitoring,
    alertPending,
    crashHistory,
    lastLocation,
    startMonitoring,
    stopMonitoring,
    triggerTestCrash, // For testing purposes
  };
};