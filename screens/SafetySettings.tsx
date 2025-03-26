// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Image } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { colors } from '../constants/colors';
// import { icons } from '../constants/icons';
// // import Button from '../components/Button';
// import EmergencyContactsManager from '../components/EmergencyContactsManager';

// const SafetySettings = () => {
//   const navigation = useNavigation();
//   const [crashDetectionEnabled, setCrashDetectionEnabled] = useState(false);
//   const [autoAlertEnabled, setAutoAlertEnabled] = useState(false);
  
//   useEffect(() => {
//     loadSettings();
//   }, []);

//   const loadSettings = async () => {
//     try {
//       const crashDetection = await AsyncStorage.getItem('crashDetectionEnabled');
//       const autoAlert = await AsyncStorage.getItem('autoAlertEnabled');
      
//       setCrashDetectionEnabled(crashDetection === 'true');
//       setAutoAlertEnabled(autoAlert === 'true');
//     } catch (error) {
//       console.error('Error loading safety settings:', error);
//     }
//   };

//   const saveSetting = async (key, value) => {
//     try {
//       await AsyncStorage.setItem(key, value.toString());
//     } catch (error) {
//       console.error(`Error saving ${key}:`, error);
//     }
//   };

//   const toggleCrashDetection = (value) => {
//     setCrashDetectionEnabled(value);
//     saveSetting('crashDetectionEnabled', value);
//   };

//   const toggleAutoAlert = (value) => {
//     setAutoAlertEnabled(value);
//     saveSetting('autoAlertEnabled', value);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Image source={icons.back} style={styles.backIcon} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Safety Settings</Text>
//       </View>

//       <View style={styles.content}>
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Crash Detection</Text>
          
//           <View style={styles.card}>
//             <View style={styles.settingItem}>
//               <View style={styles.settingInfo}>
//                 <Text style={styles.settingTitle}>Enable Crash Detection</Text>
//                 <Text style={styles.settingDescription}>
//                   Automatically detect potential crashes while riding
//                 </Text>
//               </View>
//               <Switch
//                 value={crashDetectionEnabled}
//                 onValueChange={toggleCrashDetection}
//                 trackColor={{ false: colors.border, true: colors.primary }}
//                 thumbColor={crashDetectionEnabled ? colors.primary : colors.white}
//               />
//             </View>

//             <View style={styles.settingItem}>
//               <View style={styles.settingInfo}>
//                 <Text style={styles.settingTitle}>Auto-Send Alerts</Text>
//                 <Text style={styles.settingDescription}>
//                   Automatically send alerts if you don't respond after a crash is detected
//                 </Text>
//               </View>
//               <Switch
//                 value={autoAlertEnabled}
//                 onValueChange={toggleAutoAlert}
//                 trackColor={{ false: colors.border, true: colors.primary }}
//                 thumbColor={autoAlertEnabled ? colors.primary : colors.white}
//                 disabled={!crashDetectionEnabled}
//               />
//             </View>
//           </View>
//         </View>

//         <EmergencyContactsManager />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     paddingTop: 50,
//     backgroundColor: colors.primary,
//   },
//   backButton: {
//     padding: 8,
//   },
//   backIcon: {
//     width: 24,
//     height: 24,
//     tintColor: colors.white,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: colors.white,
//     marginLeft: 16,
//   },
//   content: {
//     padding: 16,
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 16,
//     color: colors.text,
//   },
//   card: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: colors.black,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   settingItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   settingInfo: {
//     flex: 1,
//     paddingRight: 16,
//   },
//   settingTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: colors.text,
//   },
//   settingDescription: {
//     fontSize: 14,
//     color: colors.secondary,
//     marginTop: 4,
//   },
// });

// export default SafetySettings;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/colors';
import { icons } from '../constants/icons';
import EmergencyContactsManager from '../components/EmergencyContactsManager';

const SafetySettings: React.FC = () => {
  const navigation = useNavigation();
  const [crashDetectionEnabled, setCrashDetectionEnabled] = useState<boolean>(false);
  const [autoAlertEnabled, setAutoAlertEnabled] = useState<boolean>(false);
  
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async (): Promise<void> => {
    try {
      const crashDetection = await AsyncStorage.getItem('crashDetectionEnabled');
      const autoAlert = await AsyncStorage.getItem('autoAlertEnabled');
      
      setCrashDetectionEnabled(crashDetection === 'true');
      setAutoAlertEnabled(autoAlert === 'true');
    } catch (error) {
      console.error('Error loading safety settings:', error);
    }
  };

  const saveSetting = async (key: string, value: boolean): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  };

  const toggleCrashDetection = (value: boolean): void => {
    setCrashDetectionEnabled(value);
    saveSetting('crashDetectionEnabled', value);
  };

  const toggleAutoAlert = (value: boolean): void => {
    setAutoAlertEnabled(value);
    saveSetting('autoAlertEnabled', value);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Safety Settings</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crash Detection</Text>
          
          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Enable Crash Detection</Text>
                <Text style={styles.settingDescription}>
                  Automatically detect potential crashes while riding
                </Text>
              </View>
              <Switch
                value={crashDetectionEnabled}
                onValueChange={toggleCrashDetection}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={crashDetectionEnabled ? colors.primary : colors.white}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Auto-Send Alerts</Text>
                <Text style={styles.settingDescription}>
                  Automatically send alerts if you don't respond after a crash is detected
                </Text>
              </View>
              <Switch
                value={autoAlertEnabled}
                onValueChange={toggleAutoAlert}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={autoAlertEnabled ? colors.primary : colors.white}
                disabled={!crashDetectionEnabled}
              />
            </View>
          </View>
        </View>

        <EmergencyContactsManager />
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: colors.primary,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: colors.white,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flex: 1,
    paddingRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.secondary,
    marginTop: 4,
  },
});

export default SafetySettings;