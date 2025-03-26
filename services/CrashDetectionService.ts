// import { useState, useEffect, useRef } from 'react';
// import { accelerometer } from 'react-native-sensors';
// import { Alert, AppState, Platform } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { sendSMS } from 'react-native-sms';

// // Threshold values for crash detection
// const IMPACT_THRESHOLD = 15; // g-force
// const MONITORING_INTERVAL = 100; // ms
// const COOLDOWN_PERIOD = 10000; // 10 seconds cooldown after detection

// export const useCrashDetection = (isEnabled = true) => {
//   const [isMonitoring, setIsMonitoring] = useState(false);
//   const [lastLocation, setLastLocation] = useState(null);
//   const appState = useRef(AppState.currentState);
//   const lastCrashTime = useRef(0);
//   const subscription = useRef(null);

//   // Start location tracking
//   const startLocationTracking = () => {
//     Geolocation.watchPosition(
//       (position) => {
//         setLastLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           accuracy: position.coords.accuracy,
//         });
//       },
//       (error) => console.log('Location error:', error),
//       { 
//         enableHighAccuracy: true, 
//         distanceFilter: 10, 
//         interval: 5000,
//         fastestInterval: 2000,
//       }
//     );
//   };

//   // Get emergency contacts
//   const getEmergencyContacts = async () => {
//     try {
//       const contacts = await AsyncStorage.getItem('emergencyContacts');
//       return contacts ? JSON.parse(contacts) : [];
//     } catch (error) {
//       console.error('Error getting emergency contacts:', error);
//       return [];
//     }
//   };

//   // Send alert to emergency contacts
//   const sendAlert = async () => {
//     if (!lastLocation) return;
    
//     const contacts = await getEmergencyContacts();
//     if (contacts.length === 0) {
//       console.log('No emergency contacts found');
//       return;
//     }

//     const mapsUrl = `https://maps.google.com/?q=${lastLocation.latitude},${lastLocation.longitude}`;
//     const message = `EMERGENCY ALERT: Your contact may have been in a bike accident. Their last known location is: ${mapsUrl}`;
    
//     contacts.forEach(contact => {
//       if (Platform.OS === 'android') {
//         sendSMS(
//           contact.phone,
//           message,
//           'direct',
//           (completed) => {
//             console.log(`SMS ${completed ? 'sent' : 'failed'} to ${contact.name}`);
//           }
//         );
//       } else {
//         // For iOS, we need to use a different approach since direct SMS sending isn't supported
//         // This would typically involve opening the SMS app with pre-filled content
//         console.log(`Would send SMS to ${contact.name} on iOS`);
//       }
//     });
//   };

//   // Process accelerometer data to detect crashes
//   const processCrashDetection = (data) => {
//     const { x, y, z } = data;
//     const magnitude = Math.sqrt(x * x + y * y + z * z);
    
//     const currentTime = Date.now();
//     if (magnitude > IMPACT_THRESHOLD && (currentTime - lastCrashTime.current > COOLDOWN_PERIOD)) {
//       lastCrashTime.current = currentTime;
      
//       // Show confirmation dialog
//       Alert.alert(
//         "Possible Crash Detected",
//         "We detected a strong impact. Are you okay?",
//         [
//           {
//             text: "I'm fine",
//             style: "cancel"
//           },
//           { 
//             text: "Send Alert", 
//             onPress: () => sendAlert(),
//             style: "destructive"
//           }
//         ],
//         { cancelable: false, userInterfaceStyle: 'light' }
//       );
      
//       // Auto-send after 30 seconds if no response (user might be unconscious)
//       setTimeout(() => {
//         sendAlert();
//       }, 30000);
//     }
//   };

//   // Start monitoring for crashes
//   const startMonitoring = () => {
//     if (isMonitoring || !isEnabled) return;
    
//     setIsMonitoring(true);
//     startLocationTracking();
    
//     subscription.current = accelerometer.subscribe(
//       { next: processCrashDetection, error: (error) => console.log(error) },
//       { interval: MONITORING_INTERVAL }
//     );
    
//     console.log('Crash detection monitoring started');
//   };

//   // Stop monitoring
//   const stopMonitoring = () => {
//     if (!isMonitoring) return;
    
//     if (subscription.current) {
//       subscription.current.unsubscribe();
//       subscription.current = null;
//     }
    
//     Geolocation.stopObserving();
//     setIsMonitoring(false);
//     console.log('Crash detection monitoring stopped');
//   };

//   // Handle app state changes
//   useEffect(() => {
//     const subscription = AppState.addEventListener('change', nextAppState => {
//       if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
//         // App is going to background
//         if (isEnabled) {
//           // Keep monitoring in background if possible
//           console.log('App going to background, maintaining crash detection');
//         }
//       } else if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
//         // App is coming to foreground
//         if (isEnabled && !isMonitoring) {
//           startMonitoring();
//         }
//       }
//       appState.current = nextAppState;
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, [isEnabled, isMonitoring]);

//   // Start/stop monitoring based on enabled state
//   useEffect(() => {
//     if (isEnabled) {
//       startMonitoring();
//     } else {
//       stopMonitoring();
//     }
    
//     return () => {
//       stopMonitoring();
//     };
//   }, [isEnabled]);

//   return {
//     isMonitoring,
//     startMonitoring,
//     stopMonitoring,
//   };
// };




// import { useState, useEffect, useRef } from 'react';
// import { accelerometer } from 'react-native-sensors';
// import { Alert, AppState, Platform } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SendSMS from 'react-native-sms';

// enum AndroidSuccessTypes {
//   Sent = 'sent',
//   Queued = 'queued'
// }

// // Threshold values for crash detection
// const IMPACT_THRESHOLD = 15; // g-force
// const MONITORING_INTERVAL = 100; // ms
// const COOLDOWN_PERIOD = 10000; // 10 seconds cooldown after detection

// interface Contact {
//   name: string;
//   phone: string;
// }

// export const useCrashDetection = (isEnabled = true) => {
//   const [isMonitoring, setIsMonitoring] = useState(false);
//   const [lastLocation, setLastLocation] = useState<{ latitude: number; longitude: number; accuracy: number } | null>(null);
//   const appState = useRef(AppState.currentState);
//   const lastCrashTime = useRef(0);
//   const subscription = useRef<any>(null);

//   // Start location tracking
//   const startLocationTracking = () => {
//     Geolocation.watchPosition(
//       (position) => {
//         setLastLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           accuracy: position.coords.accuracy,
//         });
//       },
//       (error) => console.log('Location error:', error),
//       { 
//         enableHighAccuracy: true, 
//         distanceFilter: 10, 
//         interval: 5000,
//         fastestInterval: 2000,
//       }
//     );
//   };

//   // Get emergency contacts
//   const getEmergencyContacts = async (): Promise<Contact[]> => {
//     try {
//       const contacts = await AsyncStorage.getItem('emergencyContacts');
//       return contacts ? JSON.parse(contacts) : [];
//     } catch (error) {
//       console.error('Error getting emergency contacts:', error);
//       return [];
//     }
//   };

//   // Send alert to emergency contacts
//   const sendAlert = async () => {
//     if (!lastLocation) return;
    
//     const contacts = await getEmergencyContacts();
//     if (contacts.length === 0) {
//       console.log('No emergency contacts found');
//       return;
//     }
  
//     const mapsUrl = `https://maps.google.com/?q=${lastLocation.latitude},${lastLocation.longitude}`;
//     const message = `EMERGENCY ALERT: Your contact may have been in a bike accident. Their last known location is: ${mapsUrl}`;
    
//     contacts.forEach((contact: Contact) => {
//       if (Platform.OS === 'android') {
//         SendSMS.send({
//           body: message,
//           recipients: [contact.phone],
//           successTypes: [AndroidSuccessTypes.Sent],
//           allowAndroidSendWithoutReadPermission: true,
//         }, (completed, cancelled, error) => {
//           console.log(`SMS ${completed ? 'sent' : 'failed'} to ${contact.name}`);
//         });
//       } else {
//         console.log(`Would send SMS to ${contact.name} on iOS`);
//       }
//     });
//   };

//   // Process accelerometer data to detect crashes
//   const processCrashDetection = (data: { x: number; y: number; z: number }) => {
//     const { x, y, z } = data;
//     const magnitude = Math.sqrt(x * x + y * y + z * z);
    
//     const currentTime = Date.now();
//     if (magnitude > IMPACT_THRESHOLD && (currentTime - lastCrashTime.current > COOLDOWN_PERIOD)) {
//       lastCrashTime.current = currentTime;

//       Alert.alert(
//         "Possible Crash Detected",
//         "We detected a strong impact. Are you okay?",
//         [
//           {
//             text: "I'm fine",
//             style: "cancel"
//           },
//           { 
//             text: "Send Alert", 
//             onPress: () => sendAlert(),
//             style: "destructive"
//           }
//         ],
//         { cancelable: false }
//       );
      
//       setTimeout(() => {
//         sendAlert();
//       }, 30000);
//     }
//   };

//   // Start monitoring for crashes
//   const startMonitoring = () => {
//     if (isMonitoring || !isEnabled) return;
    
//     setIsMonitoring(true);
//     startLocationTracking();
    
//     subscription.current = accelerometer.subscribe(
//       processCrashDetection,
//       (error) => console.log(error),
//     );
    
//     console.log('Crash detection monitoring started');
//   };

//   // Stop monitoring
//   const stopMonitoring = () => {
//     if (!isMonitoring) return;
    
//     if (subscription.current) {
//       subscription.current.unsubscribe();
//       subscription.current = null;
//     }
    
//     Geolocation.stopObserving();
//     setIsMonitoring(false);
//     console.log('Crash detection monitoring stopped');
//   };

//   // Handle app state changes
//   useEffect(() => {
//     const subscriptionAppState = AppState.addEventListener('change', nextAppState => {
//       if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
//         if (isEnabled) {
//           console.log('App going to background, maintaining crash detection');
//         }
//       } else if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
//         if (isEnabled && !isMonitoring) {
//           startMonitoring();
//         }
//       }
//       appState.current = nextAppState;
//     });

//     return () => {
//       subscriptionAppState.remove();
//     };
//   }, [isEnabled, isMonitoring]);

//   // Start/stop monitoring based on enabled state
//   useEffect(() => {
//     if (isEnabled) {
//       startMonitoring();
//     } else {
//       stopMonitoring();
//     }
    
//     return () => {
//       stopMonitoring();
//     };
//   }, [isEnabled]);

//   return {
//     isMonitoring,
//     startMonitoring,
//     stopMonitoring,
//   };
// };


// import { useState, useEffect, useRef } from 'react';
// import { accelerometer } from 'react-native-sensors';
// import { Alert, AppState, Platform } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SendSMS from 'react-native-sms';

// // Type for SMS success types
// type AndroidSuccessTypes = 'sent' | 'queued';

// // Threshold values for crash detection
// const IMPACT_THRESHOLD = 15; // g-force
// const MONITORING_INTERVAL = 100; // ms
// const COOLDOWN_PERIOD = 10000; // 10 seconds cooldown after detection

// interface Contact {
//   name: string;
//   phone: string;
// }

// export const useCrashDetection = (isEnabled = true) => {
//   const [isMonitoring, setIsMonitoring] = useState(false);
//   const [lastLocation, setLastLocation] = useState<{ latitude: number; longitude: number; accuracy: number } | null>(null);
//   const appState = useRef(AppState.currentState);
//   const lastCrashTime = useRef(0);
//   const subscription = useRef<any>(null);

//   // Start location tracking
//   const startLocationTracking = () => {
//     Geolocation.watchPosition(
//       (position) => {
//         setLastLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           accuracy: position.coords.accuracy,
//         });
//       },
//       (error) => console.log('Location error:', error),
//       { 
//         enableHighAccuracy: true, 
//         distanceFilter: 10, 
//         interval: 5000,
//         fastestInterval: 2000,
//       }
//     );
//   };

//   // Get emergency contacts
//   const getEmergencyContacts = async (): Promise<Contact[]> => {
//     try {
//       const contacts = await AsyncStorage.getItem('emergencyContacts');
//       return contacts ? JSON.parse(contacts) : [];
//     } catch (error) {
//       console.error('Error getting emergency contacts:', error);
//       return [];
//     }
//   };

//   // Send alert to emergency contacts
//   const sendAlert = async () => {
//     if (!lastLocation) return;
    
//     const contacts = await getEmergencyContacts();
//     if (contacts.length === 0) {
//       console.log('No emergency contacts found');
//       return;
//     }
  
//     const mapsUrl = `https://maps.google.com/?q=${lastLocation.latitude},${lastLocation.longitude}`;
//     const message = `EMERGENCY ALERT: Your contact may have been in a bike accident. Their last known location is: ${mapsUrl}`;
    
//     contacts.forEach((contact: Contact) => {
//       if (Platform.OS === 'android') {
//         const successTypes: AndroidSuccessTypes[] = ['sent'];
        
//         SendSMS.send({
//           body: message,
//           recipients: [contact.phone],
//           successTypes,
//           allowAndroidSendWithoutReadPermission: true,
//         }, (completed, cancelled, error) => {
//           console.log(`SMS ${completed ? 'sent' : 'failed'} to ${contact.name}`);
//         });
//       } else {
//         console.log(`Would send SMS to ${contact.name} on iOS`);
//       }
//     });
//   };

//   // Process accelerometer data to detect crashes
//   const processCrashDetection = (data: { x: number; y: number; z: number }) => {
//     const { x, y, z } = data;
//     const magnitude = Math.sqrt(x * x + y * y + z * z);
    
//     const currentTime = Date.now();
//     if (magnitude > IMPACT_THRESHOLD && (currentTime - lastCrashTime.current > COOLDOWN_PERIOD)) {
//       lastCrashTime.current = currentTime;

//       Alert.alert(
//         "Possible Crash Detected",
//         "We detected a strong impact. Are you okay?",
//         [
//           {
//             text: "I'm fine",
//             style: "cancel"
//           },
//           { 
//             text: "Send Alert", 
//             onPress: () => sendAlert(),
//             style: "destructive"
//           }
//         ],
//         { cancelable: false }
//       );
      
//       setTimeout(() => {
//         sendAlert();
//       }, 30000);
//     }
//   };

//   // Start monitoring for crashes
//   const startMonitoring = () => {
//     if (isMonitoring || !isEnabled) return;
    
//     setIsMonitoring(true);
//     startLocationTracking();
    
//     subscription.current = accelerometer.subscribe(
//       processCrashDetection,
//       (error) => console.log(error),
//     );
    
//     console.log('Crash detection monitoring started');
//   };

//   // Stop monitoring
//   const stopMonitoring = () => {
//     if (!isMonitoring) return;
    
//     if (subscription.current) {
//       subscription.current.unsubscribe();
//       subscription.current = null;
//     }
    
//     Geolocation.stopObserving();
//     setIsMonitoring(false);
//     console.log('Crash detection monitoring stopped');
//   };

//   // Handle app state changes
//   useEffect(() => {
//     const subscriptionAppState = AppState.addEventListener('change', nextAppState => {
//       if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
//         if (isEnabled) {
//           console.log('App going to background, maintaining crash detection');
//         }
//       } else if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
//         if (isEnabled && !isMonitoring) {
//           startMonitoring();
//         }
//       }
//       appState.current = nextAppState;
//     });

//     return () => {
//       subscriptionAppState.remove();
//     };
//   }, [isEnabled, isMonitoring]);

//   // Start/stop monitoring based on enabled state
//   useEffect(() => {
//     if (isEnabled) {
//       startMonitoring();
//     } else {
//       stopMonitoring();
//     }
    
//     return () => {
//       stopMonitoring();
//     };
//   }, [isEnabled]);

//   return {
//     isMonitoring,
//     startMonitoring,
//     stopMonitoring,
//   };
// };

// import { useState, useEffect, useRef } from 'react';
// import { accelerometer } from 'react-native-sensors';
// import { Alert, AppState, Platform } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SendSMS, { AndroidSuccessTypes as LibraryAndroidSuccessTypes } from 'react-native-sms';

// // Threshold values for crash detection
// const IMPACT_THRESHOLD = 15; // g-force
// const MONITORING_INTERVAL = 100; // ms
// const COOLDOWN_PERIOD = 10000; // 10 seconds cooldown after detection

// interface Contact {
//   name: string;
//   phone: string;
// }

// export const useCrashDetection = (isEnabled = true) => {
//   const [isMonitoring, setIsMonitoring] = useState(false);
//   const [lastLocation, setLastLocation] = useState<{ latitude: number; longitude: number; accuracy: number } | null>(null);
//   const appState = useRef(AppState.currentState);
//   const lastCrashTime = useRef(0);
//   const subscription = useRef<any>(null);

//   // Start location tracking
//   const startLocationTracking = () => {
//     Geolocation.watchPosition(
//       (position) => {
//         setLastLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           accuracy: position.coords.accuracy,
//         });
//       },
//       (error) => console.log('Location error:', error),
//       { 
//         enableHighAccuracy: true, 
//         distanceFilter: 10, 
//         interval: 5000,
//         fastestInterval: 2000,
//       }
//     );
//   };

//   // Get emergency contacts
//   const getEmergencyContacts = async (): Promise<Contact[]> => {
//     try {
//       const contacts = await AsyncStorage.getItem('emergencyContacts');
//       return contacts ? JSON.parse(contacts) : [];
//     } catch (error) {
//       console.error('Error getting emergency contacts:', error);
//       return [];
//     }
//   };

//   // Send alert to emergency contacts
//   const sendAlert = async () => {
//     if (!lastLocation) return;
    
//     const contacts = await getEmergencyContacts();
//     if (contacts.length === 0) {
//       console.log('No emergency contacts found');
//       return;
//     }
  
//     const mapsUrl = `https://maps.google.com/?q=${lastLocation.latitude},${lastLocation.longitude}`;
//     const message = `EMERGENCY ALERT: Your contact may have been in a bike accident. Their last known location is: ${mapsUrl}`;
    
//     contacts.forEach((contact: Contact) => {
//       if (Platform.OS === 'android') {
//         // Use the library's imported AndroidSuccessTypes
//         const successTypes: LibraryAndroidSuccessTypes[] = ['SENT' as LibraryAndroidSuccessTypes];
        
//         SendSMS.send({
//           body: message,
//           recipients: [contact.phone],
//           successTypes,
//           allowAndroidSendWithoutReadPermission: true,
//         }, (completed, cancelled, error) => {
//           console.log(`SMS ${completed ? 'sent' : 'failed'} to ${contact.name}`);
//         });
//       } else {
//         console.log(`Would send SMS to ${contact.name} on iOS`);
//       }
//     });
//   };

//   // Process accelerometer data to detect crashes
//   const processCrashDetection = (data: { x: number; y: number; z: number }) => {
//     const { x, y, z } = data;
//     const magnitude = Math.sqrt(x * x + y * y + z * z);
    
//     const currentTime = Date.now();
//     if (magnitude > IMPACT_THRESHOLD && (currentTime - lastCrashTime.current > COOLDOWN_PERIOD)) {
//       lastCrashTime.current = currentTime;

//       Alert.alert(
//         "Possible Crash Detected",
//         "We detected a strong impact. Are you okay?",
//         [
//           {
//             text: "I'm fine",
//             style: "cancel"
//           },
//           { 
//             text: "Send Alert", 
//             onPress: () => sendAlert(),
//             style: "destructive"
//           }
//         ],
//         { cancelable: false }
//       );
      
//       setTimeout(() => {
//         sendAlert();
//       }, 30000);
//     }
//   };

//   // Start monitoring for crashes
//   const startMonitoring = () => {
//     if (isMonitoring || !isEnabled) return;
    
//     setIsMonitoring(true);
//     startLocationTracking();
    
//     subscription.current = accelerometer.subscribe(
//       processCrashDetection,
//       (error) => console.log(error),
//     );
    
//     console.log('Crash detection monitoring started');
//   };

//   // Stop monitoring
//   const stopMonitoring = () => {
//     if (!isMonitoring) return;
    
//     if (subscription.current) {
//       subscription.current.unsubscribe();
//       subscription.current = null;
//     }
    
//     Geolocation.stopObserving();
//     setIsMonitoring(false);
//     console.log('Crash detection monitoring stopped');
//   };

//   // Handle app state changes
//   useEffect(() => {
//     const subscriptionAppState = AppState.addEventListener('change', nextAppState => {
//       if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
//         if (isEnabled) {
//           console.log('App going to background, maintaining crash detection');
//         }
//       } else if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
//         if (isEnabled && !isMonitoring) {
//           startMonitoring();
//         }
//       }
//       appState.current = nextAppState;
//     });

//     return () => {
//       subscriptionAppState.remove();
//     };
//   }, [isEnabled, isMonitoring]);

//   // Start/stop monitoring based on enabled state
//   useEffect(() => {
//     if (isEnabled) {
//       startMonitoring();
//     } else {
//       stopMonitoring();
//     }
    
//     return () => {
//       stopMonitoring();
//     };
//   }, [isEnabled]);

//   return {
//     isMonitoring,
//     startMonitoring,
//     stopMonitoring,
//   };
// };


import { useState, useEffect, useRef } from 'react';
import { DeviceMotion, DeviceMotionMeasurement } from 'expo-sensors';
import { Alert, AppState, Platform } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SMS from 'expo-sms';
import * as Linking from 'expo-linking';

// Threshold values for crash detection
const IMPACT_THRESHOLD = 2.5; // g-force (lower for expo-sensors)
const MONITORING_INTERVAL = 100; // ms
const COOLDOWN_PERIOD = 10000; // 10 seconds cooldown after detection

interface Contact {
  name: string;
  phone: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export const useCrashDetection = (isEnabled = true) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastLocation, setLastLocation] = useState<LocationData | null>(null);
  const appState = useRef(AppState.currentState);
  const lastCrashTime = useRef(0);
  const subscription = useRef<ReturnType<typeof DeviceMotion.addListener> | null>(null);
  const locationSubscription = useRef<{ remove: () => void } | null>(null);

  // Start location tracking
  const startLocationTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
          timeInterval: 5000,
        },
        (location) => {
          // Safely handle location data with null checks
          if (
            location.coords.latitude != null && 
            location.coords.longitude != null && 
            location.coords.accuracy != null
          ) {
            setLastLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              accuracy: location.coords.accuracy,
            });
          }
        }
      );
    } catch (error) {
      console.log('Error starting location tracking:', error);
    }
  };

  // Get emergency contacts
  const getEmergencyContacts = async (): Promise<Contact[]> => {
    try {
      const contacts = await AsyncStorage.getItem('emergencyContacts');
      return contacts ? JSON.parse(contacts) : [];
    } catch (error) {
      console.error('Error getting emergency contacts:', error);
      return [];
    }
  };

  // Send alert to emergency contacts
  const sendAlert = async () => {
    if (!lastLocation) return;

    const contacts = await getEmergencyContacts();
    if (contacts.length === 0) {
      console.log('No emergency contacts found');
      return;
    }

    const mapsUrl = `https://maps.google.com/?q=${lastLocation.latitude},${lastLocation.longitude}`;
    const message = `EMERGENCY ALERT: Your contact may have been in a bike accident. Their last known location is: ${mapsUrl}`;

    // Check if SMS is available
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // Send SMS
      const phoneNumbers = contacts.map(contact => contact.phone);
      await SMS.sendSMSAsync(phoneNumbers, message);
    } else {
      // Fallback if SMS is not available
      console.log('SMS not available on this device');

      // Try to open messaging app with the first contact
      if (contacts.length > 0) {
        const phoneNumber = contacts[0].phone;
        const encodedMessage = encodeURIComponent(message);

        if (Platform.OS === 'ios') {
          Linking.openURL(`sms:${phoneNumber}&body=${encodedMessage}`);
        } else {
          Linking.openURL(`sms:${phoneNumber}?body=${encodedMessage}`);
        }
      }
    }
  };

  // Process accelerometer data to detect crashes
  const processCrashDetection = (data: DeviceMotionMeasurement) => {
    const { acceleration } = data;

    // Check if acceleration data is available
    if (!acceleration) return;

    const { x, y, z } = acceleration;
    
    // Ensure x, y, z are not null before calculating magnitude
    if (x !== null && y !== null && z !== null) {
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      const currentTime = Date.now();
      if (magnitude > IMPACT_THRESHOLD && (currentTime - lastCrashTime.current > COOLDOWN_PERIOD)) {
        lastCrashTime.current = currentTime;

        // Show confirmation dialog
        Alert.alert(
          "Possible Crash Detected",
          "We detected a strong impact. Are you okay?",
          [
            { text: "I'm fine", style: "cancel" },
            { text: "Send Alert", onPress: () => sendAlert(), style: "destructive" }
          ],
          { cancelable: false, userInterfaceStyle: 'light' }
        );

        // Auto-send after 30 seconds if no response
        setTimeout(() => {
          if (Date.now() - lastCrashTime.current >= 30000) {
            sendAlert();
          }
        }, 30000);
      }
    }
  };

  // Start monitoring for crashes
  const startMonitoring = async () => {
    if (isMonitoring || !isEnabled) return;

    try {
      DeviceMotion.setUpdateInterval(MONITORING_INTERVAL);

      // Start location tracking
      await startLocationTracking();

      // Subscribe to DeviceMotion updates
      subscription.current = DeviceMotion.addListener(processCrashDetection);

      setIsMonitoring(true);
      console.log('Crash detection monitoring started');
    } catch (error) {
      console.error('Error starting crash detection:', error);
    }
  };

  // Stop monitoring
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

    setIsMonitoring(false);
    console.log('Crash detection monitoring stopped');
  };

  // Handle app state changes
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

  return {
    isMonitoring,
    startMonitoring,
    stopMonitoring,
  };
};