// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Image } from 'react-native';
// import { colors } from '../constants/colors';
// import { icons } from '../constants/icons';
// import Button from './Button';

// type Contact = {
//   id: string;
//   name: string;
//   phone: string;
// };

// const EmergencyContactsManager = () => {
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   const loadContacts = async () => {
//     try {
//       const savedContacts = await AsyncStorage.getItem('emergencyContacts');
//       if (savedContacts) {
//         setContacts(JSON.parse(savedContacts));
//       }
//     } catch (error) {
//       console.error('Error loading contacts:', error);
//     }
//   };

//   const saveContacts = async (updatedContacts: Contact[]) => {
//     try {
//       await AsyncStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
//       setContacts(updatedContacts);
//     } catch (error) {
//       console.error('Error saving contacts:', error);
//     }
//   };

//   const addContact = () => {
//     if (!name.trim() || !phone.trim()) {
//       Alert.alert('Error', 'Please enter both name and phone number');
//       return;
//     }

//     if (!/^\+?[0-9]{10,15}$/.test(phone.replace(/[\s-]/g, ''))) {
//       Alert.alert('Error', 'Please enter a valid phone number');
//       return;
//     }

//     if (isEditing && editingId) {
//       const updatedContacts = contacts.map(contact => 
//         contact.id === editingId ? { ...contact, name, phone } : contact
//       );
//       saveContacts(updatedContacts);
//     } else {
//       const newContact = {
//         id: Date.now().toString(),
//         name,
//         phone,
//       };
//       saveContacts([...contacts, newContact]);
//     }

//     setName('');
//     setPhone('');
//     setIsEditing(false);
//     setEditingId(null);
//   };

//   const editContact = (contact: Contact) => {
//     setName(contact.name);
//     setPhone(contact.phone);
//     setIsEditing(true);
//     setEditingId(contact.id);
//   };

//   const deleteContact = (id: string) => {
//     Alert.alert(
//       'Delete Contact',
//       'Are you sure you want to delete this emergency contact?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'Delete', 
//           onPress: () => {
//             const updatedContacts = contacts.filter(contact => contact.id !== id);
//             saveContacts(updatedContacts);
//           },
//           style: 'destructive'
//         },
//       ]
//     );
//   };

//   const renderContactItem = ({ item }: { item: Contact }) => (
//     <View style={styles.contactItem}>
//       <View style={styles.contactInfo}>
//         <Text style={styles.contactName}>{item.name}</Text>
//         <Text style={styles.contactPhone}>{item.phone}</Text>
//       </View>
//       <View style={styles.contactActions}>
//         <TouchableOpacity onPress={() => editContact(item)} style={styles.actionButton}>
//           <Image source={icons.info} style={styles.actionIcon} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => deleteContact(item.id)} style={styles.actionButton}>
//           <Image source={icons.back} style={[styles.actionIcon, { transform: [{ rotate: '90deg' }] }]} />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Emergency Contacts</Text>
//       <Text style={styles.description}>
//         These contacts will receive an alert with your location if a crash is detected.
//       </Text>
      
//       <View style={styles.card}>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Contact Name"
//             value={name}
//             onChangeText={setName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Phone Number"
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-pad"
//           />
//           <Button 
//             title={isEditing ? "Update Contact" : "Add Contact"} 
//             onPress={addContact} 
//             type="primary"
//           />
//         </View>

//         {contacts.length > 0 ? (
//           <FlatList
//             data={contacts}
//             renderItem={renderContactItem}
//             keyExtractor={item => item.id}
//             style={styles.contactsList}
//           />
//         ) : (
//           <View style={styles.emptyState}>
//             <Text style={styles.emptyStateText}>No emergency contacts added yet</Text>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 24,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: colors.text,
//   },
//   description: {
//     fontSize: 14,
//     color: colors.secondary,
//     marginBottom: 16,
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
//   inputContainer: {
//     marginBottom: 20,
//   },
//   input: {
//     backgroundColor: colors.background,
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: colors.border,
//   },
//   contactsList: {
//     maxHeight: 300,
//   },
//   contactItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: colors.background,
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 8,
//   },
//   contactInfo: {
//     flex: 1,
//   },
//   contactName: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: colors.text,
//   },
//   contactPhone: {
//     fontSize: 14,
//     color: colors.secondary,
//     marginTop: 2,
//   },
//   contactActions: {
//     flexDirection: 'row',
//   },
//   actionButton: {
//     padding: 8,
//     marginLeft: 4,
//   },
//   actionIcon: {
//     width: 20,
//     height: 20,
//     tintColor: colors.secondary,
//   },
//   emptyState: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyStateText: {
//     fontSize: 16,
//     color: colors.secondary,
//     textAlign: 'center',
//   },
// });

// export default EmergencyContactsManager;



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import { colors } from '../constants/colors';
import { icons } from '../constants/icons';
import Button from './Button';

type Contact = {
  id: string;
  name: string;
  phone: string;
};

const EmergencyContactsManager = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const savedContacts = await AsyncStorage.getItem('emergencyContacts');
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const saveContacts = async (updatedContacts: Contact[]) => {
    try {
      await AsyncStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
      setContacts(updatedContacts);
    } catch (error) {
      console.error('Error saving contacts:', error);
    }
  };

  const addContact = () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Error', 'Please enter both name and phone number');
      return;
    }

    if (!/^\+?[0-9]{10,15}$/.test(phone.replace(/[\s-]/g, ''))) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    if (isEditing && editingId) {
      const updatedContacts = contacts.map(contact => 
        contact.id === editingId ? { ...contact, name, phone } : contact
      );
      saveContacts(updatedContacts);
    } else {
      const newContact = {
        id: Date.now().toString(),
        name,
        phone,
      };
      saveContacts([...contacts, newContact]);
    }

    setName('');
    setPhone('');
    setIsEditing(false);
    setEditingId(null);
  };

  const editContact = (contact: Contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setIsEditing(true);
    setEditingId(contact.id);
  };

  const deleteContact = (id: string) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this emergency contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => {
            const updatedContacts = contacts.filter(contact => contact.id !== id);
            saveContacts(updatedContacts);
          },
          style: 'destructive'
        },
      ]
    );
  };

  const renderContactItem = ({ item }: { item: Contact }) => (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
      <View style={styles.contactActions}>
        <TouchableOpacity onPress={() => editContact(item)} style={styles.actionButton}>
          <Image source={icons.info} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteContact(item.id)} style={styles.actionButton}>
          <Image source={icons.back} style={[styles.actionIcon, { transform: [{ rotate: '90deg' }] }]} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      <Text style={styles.description}>
        These contacts will receive an alert with your location if a crash is detected.
      </Text>
      
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contact Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <Button 
            title={isEditing ? "Update Contact" : "Add Contact"} 
            onPress={addContact} 
            type="primary"
          />
        </View>

        {contacts.length > 0 ? (
          <FlatList
            data={contacts}
            renderItem={renderContactItem}
            keyExtractor={item => item.id}
            style={styles.contactsList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No emergency contacts added yet</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 16,
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
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactsList: {
    maxHeight: 300,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  contactPhone: {
    fontSize: 14,
    color: colors.secondary,
    marginTop: 2,
  },
  contactActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  actionIcon: {
    width: 20,
    height: 20,
    tintColor: colors.secondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'center',
  },
});

export default EmergencyContactsManager;