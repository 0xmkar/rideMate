// // screens/TripDetails.tsx - Premium Trip Details with Real Map Integration

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Animated,
//   StatusBar,
//   Platform,
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import MapViewComponent from '../components/MapView';
// import Button from '../components/Button';
// import { colors, spacing, borderRadius, typography, shadows } from '../constants/colors';
// import { icons } from '../constants/icons';
// import { mockTrips } from '../constants/MockData';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// type RootStackParamList = {
//   GroupChat: { tripId: string };
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// interface Trip {
//   id: string;
//   title: string;
//   image: string;
//   startPoint: string;
//   destination: string;
//   duration: string;
//   budget: string;
//   bike: string;
//   description: string;
//   route: any;
//   members: Array<{
//     id: string;
//     name: string;
//     image: string;
//   }>;
//   femaleOnly?: boolean;
//   difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Expert';
//   rating?: number;
//   reviews?: number;
//   distance?: string;
// }

// const TripDetails: React.FC = () => {
//   const navigation = useNavigation<NavigationProp>();
//   const route = useRoute();
//   const { tripId } = route.params as { tripId: string };

//   const [trip, setTrip] = useState<Trip | null>(null);
//   const [showFullMap, setShowFullMap] = useState(false);
//   const [selectedTab, setSelectedTab] = useState('overview');
  
//   // Animation refs
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(30)).current;

//   useEffect(() => {
//     const selectedTrip = mockTrips.find((t) => t.id === tripId);
//     if (selectedTrip) {
//       setTrip({
//         ...selectedTrip,
//         difficulty: 'Medium',
//         rating: 4.5,
//         reviews: 127,
//         distance: '1,200 km'
//       });
//     }

//     // Entrance animations
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [tripId]);

//   const handleJoinTrip = () => {
//     console.log('Join trip:', tripId);
//   };

//   const handleGroupChat = () => {
//     navigation.navigate('GroupChat', { tripId });
//   };

//   const getDifficultyColor = (difficulty?: string) => {
//     switch (difficulty) {
//       case 'Easy': return colors.success;
//       case 'Medium': return colors.warning;
//       case 'Hard': return colors.error;
//       case 'Expert': return colors.accent;
//       default: return colors.primary;
//     }
//   };

//   const renderStars = (rating: number = 0) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<Text key={i} style={styles.star}>⭐</Text>);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(<Text key={i} style={styles.starHalf}>⭐</Text>);
//       } else {
//         stars.push(<Text key={i} style={styles.starEmpty}>☆</Text>);
//       }
//     }
//     return stars;
//   };

//   const tabs = [
//     { id: 'overview', title: 'Overview', icon: '📋' },
//     { id: 'route', title: 'Route', icon: '🗺️' },
//     { id: 'members', title: 'Riders', icon: '👥' },
//     { id: 'reviews', title: 'Reviews', icon: '⭐' },
//   ];

//   const renderTabContent = () => {
//     if (!trip) return null;

//     switch (selectedTab) {
//       case 'overview':
//         return (
//           <View style={styles.tabContent}>
//             <Text style={styles.description}>{trip.description}</Text>
            
//             {/* Modern Info Cards Grid */}
//             <View style={styles.infoGrid}>
//               <View style={styles.infoCard}>
//                 <View style={styles.infoHeader}>
//                   <LinearGradient
//                     colors={[colors.primary, colors.primaryLight] as readonly [string, string]}
//                     style={styles.infoIconContainer}
//                   >
//                     <Image source={icons.calendar} style={styles.infoIcon} />
//                   </LinearGradient>
//                   <Text style={styles.infoLabel}>Duration</Text>
//                 </View>
//                 <Text style={styles.infoValue}>{trip.duration}</Text>
//               </View>

//               <View style={styles.infoCard}>
//                 <View style={styles.infoHeader}>
//                   <LinearGradient
//                     colors={[colors.success, colors.successLight] as readonly [string, string]}
//                     style={styles.infoIconContainer}
//                   >
//                     <Image source={icons.money} style={styles.infoIcon} />
//                   </LinearGradient>
//                   <Text style={styles.infoLabel}>Budget</Text>
//                 </View>
//                 <Text style={styles.infoValue}>{trip.budget}</Text>
//               </View>

//               <View style={styles.infoCard}>
//                 <View style={styles.infoHeader}>
//                   <LinearGradient
//                     colors={[colors.accent, colors.accentLight] as readonly [string, string]}
//                     style={styles.infoIconContainer}
//                   >
//                     <Image source={icons.location} style={styles.infoIcon} />
//                   </LinearGradient>
//                   <Text style={styles.infoLabel}>Distance</Text>
//                 </View>
//                 <Text style={styles.infoValue}>{trip.distance}</Text>
//               </View>

//               <View style={styles.infoCard}>
//                 <View style={styles.infoHeader}>
//                   <LinearGradient
//                     colors={[getDifficultyColor(trip.difficulty), getDifficultyColor(trip.difficulty) + '80'] as readonly [string, string]}
//                     style={styles.infoIconContainer}
//                   >
//                     <Image source={icons.bike} style={styles.infoIcon} />
//                   </LinearGradient>
//                   <Text style={styles.infoLabel}>Difficulty</Text>
//                 </View>
//                 <Text style={[styles.infoValue, { color: getDifficultyColor(trip.difficulty) }]}>
//                   {trip.difficulty}
//                 </Text>
//               </View>
//             </View>

//             {/* Trip Highlights */}
//             <View style={styles.highlightsSection}>
//               <Text style={styles.sectionTitle}>Trip Highlights</Text>
//               <View style={styles.highlightsList}>
//                 {[
//                   { icon: '🏔️', title: 'Scenic Mountain Views', desc: 'Breathtaking coastal landscapes' },
//                   { icon: '🏖️', title: 'Beach Stops', desc: 'Beautiful beaches along the route' },
//                   { icon: '🏛️', title: 'Cultural Sites', desc: 'Historic temples and monuments' },
//                   { icon: '🍽️', title: 'Local Cuisine', desc: 'Authentic Karnataka food experiences' },
//                 ].map((highlight, index) => (
//                   <View key={index} style={styles.highlightItem}>
//                     <Text style={styles.highlightIcon}>{highlight.icon}</Text>
//                     <View style={styles.highlightText}>
//                       <Text style={styles.highlightTitle}>{highlight.title}</Text>
//                       <Text style={styles.highlightDesc}>{highlight.desc}</Text>
//                     </View>
//                   </View>
//                 ))}
//               </View>
//             </View>
//           </View>
//         );

//       case 'route':
//         return (
//           <View style={styles.tabContent}>
//             {/* Real Map Integration */}
//             <View style={styles.mapSection}>
//               <View style={styles.mapHeader}>
//                 <Text style={styles.mapTitle}>Route Map</Text>
//                 <Text style={styles.mapSubtitle}>
//                   {trip.startPoint} → {trip.destination}
//                 </Text>
//               </View>
              
//               <TouchableOpacity 
//                 style={styles.mapContainer}
//                 onPress={() => setShowFullMap(!showFullMap)}
//                 activeOpacity={0.95}
//               >
//                 <View style={[styles.mapView, { height: showFullMap ? 400 : 250 }]}>
//                   <MapViewComponent
//                     route={trip.route}
//                     startPoint={trip.startPoint}
//                     destination={trip.destination}
//                     height={showFullMap ? 400 : 250}
//                   />
                  
//                   {/* Map Overlay Controls */}
//                   <BlurView intensity={80} style={styles.mapOverlay}>
//                     <Text style={styles.mapOverlayText}>
//                       {showFullMap ? '📐 Tap to minimize' : '🔍 Tap to expand'}
//                     </Text>
//                   </BlurView>
//                 </View>
//               </TouchableOpacity>
//             </View>
            
//             {/* Route Details */}
//             <View style={styles.routeDetailsCard}>
//               <Text style={styles.routeDetailsTitle}>Route Information</Text>
//               <View style={styles.routeStats}>
//                 <View style={styles.routeStat}>
//                   <Text style={styles.routeStatIcon}>🛣️</Text>
//                   <Text style={styles.routeStatValue}>1,200 km</Text>
//                   <Text style={styles.routeStatLabel}>Total Distance</Text>
//                 </View>
//                 <View style={styles.routeStat}>
//                   <Text style={styles.routeStatIcon}>⏱️</Text>
//                   <Text style={styles.routeStatValue}>18 hrs</Text>
//                   <Text style={styles.routeStatLabel}>Riding Time</Text>
//                 </View>
//                 <View style={styles.routeStat}>
//                   <Text style={styles.routeStatIcon}>⛽</Text>
//                   <Text style={styles.routeStatValue}>4 stops</Text>
//                   <Text style={styles.routeStatLabel}>Fuel Stops</Text>
//                 </View>
//               </View>
              
//               {/* Waypoints List */}
//               <View style={styles.waypointsList}>
//                 {[
//                   { name: 'Bangalore', distance: '0 km', type: 'start', time: '06:00 AM' },
//                   { name: 'Hassan', distance: '185 km', type: 'waypoint', time: '09:30 AM' },
//                   { name: 'Belur', distance: '220 km', type: 'waypoint', time: '10:15 AM' },
//                   { name: 'Chikmagalur', distance: '245 km', type: 'waypoint', time: '11:00 AM' },
//                   { name: 'Gokarna', distance: '380 km', type: 'end', time: '03:00 PM' },
//                 ].map((waypoint, index) => (
//                   <View key={index} style={styles.waypointItem}>
//                     <View style={[
//                       styles.waypointMarker,
//                       { backgroundColor: 
//                         waypoint.type === 'start' ? colors.success :
//                         waypoint.type === 'end' ? colors.error : colors.warning
//                       }
//                     ]} />
//                     <View style={styles.waypointInfo}>
//                       <Text style={styles.waypointName}>{waypoint.name}</Text>
//                       <Text style={styles.waypointDistance}>{waypoint.distance} • {waypoint.time}</Text>
//                     </View>
//                     {index < 4 && <View style={styles.waypointLine} />}
//                   </View>
//                 ))}
//               </View>
//             </View>
//           </View>
//         );

//       case 'members':
//         return (
//           <View style={styles.tabContent}>
//             <View style={styles.membersHeader}>
//               <Text style={styles.membersTitle}>Riding Squad ({trip.members.length}/10)</Text>
//               <View style={styles.membersProgress}>
//                 <View style={styles.progressBar}>
//                   <LinearGradient
//                     colors={[colors.primary, colors.primaryLight] as readonly [string, string]}
//                     style={[styles.progressFill, { width: `${(trip.members.length / 10) * 100}%` }]}
//                   />
//                 </View>
//                 <Text style={styles.progressText}>{10 - trip.members.length} spots left</Text>
//               </View>
//             </View>
            
//             <View style={styles.membersList}>
//               {trip.members.map((member, index) => (
//                 <Animated.View
//                   key={member.id}
//                   style={[
//                     styles.memberCard,
//                     {
//                       opacity: fadeAnim,
//                       transform: [{
//                         translateY: fadeAnim.interpolate({
//                           inputRange: [0, 1],
//                           outputRange: [30 + (index * 10), 0],
//                         })
//                       }]
//                     }
//                   ]}
//                 >
//                   <View style={styles.memberCardContent}>
//                     <View style={styles.memberImageContainer}>
//                       <Image source={{ uri: member.image }} style={styles.memberImage} />
//                       {index === 0 && (
//                         <LinearGradient
//                           colors={[colors.warning, colors.warningLight] as readonly [string, string]}
//                           style={styles.leaderBadge}
//                         >
//                           <Text style={styles.leaderBadgeText}>👑</Text>
//                         </LinearGradient>
//                       )}
//                     </View>
                    
//                     <View style={styles.memberInfo}>
//                       <Text style={styles.memberName}>{member.name}</Text>
//                       <Text style={styles.memberRole}>
//                         {index === 0 ? 'Trip Leader' : 'Rider'}
//                       </Text>
//                       <View style={styles.memberStats}>
//                         <View style={styles.memberStatItem}>
//                           <Text style={styles.memberStatIcon}>⭐</Text>
//                           <Text style={styles.memberStatText}>4.8</Text>
//                         </View>
//                         <View style={styles.memberStatItem}>
//                           <Text style={styles.memberStatIcon}>🏍️</Text>
//                           <Text style={styles.memberStatText}>15 trips</Text>
//                         </View>
//                       </View>
//                     </View>
                    
//                     <TouchableOpacity style={styles.memberAction}>
//                       <LinearGradient
//                         colors={[colors.primary, colors.primaryLight] as readonly [string, string]}
//                         style={styles.memberActionGradient}
//                       >
//                         <Text style={styles.memberActionIcon}>💬</Text>
//                       </LinearGradient>
//                     </TouchableOpacity>
//                   </View>
//                 </Animated.View>
//               ))}
//             </View>
//           </View>
//         );

//       case 'reviews':
//         return (
//           <View style={styles.tabContent}>
//             <View style={styles.reviewsOverview}>
//               <View style={styles.ratingCard}>
//                 <Text style={styles.overallRating}>{trip.rating?.toFixed(1)}</Text>
//                 <View style={styles.starsContainer}>
//                   {renderStars(trip.rating)}
//                 </View>
//                 <Text style={styles.reviewCount}>Based on {trip.reviews} reviews</Text>
//               </View>
              
//               {/* Rating Breakdown */}
//               <View style={styles.ratingBreakdown}>
//                 {[5, 4, 3, 2, 1].map((stars) => (
//                   <View key={stars} style={styles.ratingRow}>
//                     <Text style={styles.ratingRowStars}>{stars}★</Text>
//                     <View style={styles.ratingBarContainer}>
//                       <View style={styles.ratingBar}>
//                         <LinearGradient
//                           colors={[colors.primary, colors.primaryLight] as readonly [string, string]}
//                           style={[
//                             styles.ratingBarFill,
//                             { width: `${Math.random() * 80 + 20}%` } // Mock data
//                           ]}
//                         />
//                       </View>
//                     </View>
//                     <Text style={styles.ratingRowCount}>{Math.floor(Math.random() * 50)}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>
            
//             {/* Reviews List */}
//             <View style={styles.reviewsList}>
//               {[
//                 {
//                   name: 'Priya Sharma',
//                   rating: 5,
//                   comment: 'Absolutely incredible journey! The coastal views were breathtaking and the group was fantastic.',
//                   avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
//                   date: '2 weeks ago',
//                   helpful: 12
//                 },
//                 {
//                   name: 'Rahul Kumar',
//                   rating: 4,
//                   comment: 'Great experience overall. The mountain sections were challenging but fun!',
//                   avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
//                   date: '1 month ago',
//                   helpful: 8
//                 },
//               ].map((review, index) => (
//                 <View key={index} style={styles.reviewCard}>
//                   <View style={styles.reviewHeader}>
//                     <Image source={{ uri: review.avatar }} style={styles.reviewerAvatar} />
//                     <View style={styles.reviewerInfo}>
//                       <Text style={styles.reviewerName}>{review.name}</Text>
//                       <View style={styles.reviewRating}>
//                         {renderStars(review.rating)}
//                         <Text style={styles.reviewDate}>{review.date}</Text>
//                       </View>
//                     </View>
//                   </View>
//                   <Text style={styles.reviewComment}>{review.comment}</Text>
//                   <View style={styles.reviewActions}>
//                     <TouchableOpacity style={styles.helpfulButton}>
//                       <Text style={styles.helpfulIcon}>👍</Text>
//                       <Text style={styles.helpfulText}>Helpful ({review.helpful})</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               ))}
//             </View>
//           </View>
//         );

//       default:
//         return null;
//     }
//   };

//   if (!trip) {
//     return (
//       <View style={styles.loadingContainer}>
//         <LinearGradient
//           colors={[colors.primary, colors.primaryLight] as readonly [string, string]}
//           style={styles.loadingGradient}
//         >
//           <Text style={styles.loadingText}>Loading adventure...</Text>
//         </LinearGradient>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
//       {/* Hero Header */}
//       <View style={styles.heroHeader}>
//         <Image source={{ uri: trip.image }} style={styles.heroImage} />
        
//         {/* Gradient Overlay */}
//         <LinearGradient
//           colors={[
//             'transparent',
//             'rgba(0,0,0,0.3)',
//             'rgba(0,0,0,0.8)'
//           ] as readonly [string, string, string]}
//           style={styles.heroOverlay}
//         />

//         {/* Back Button */}
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <BlurView intensity={80} style={styles.backButtonBlur}>
//             <Image source={icons.back} style={styles.backIcon} />
//           </BlurView>
//         </TouchableOpacity>

//         {/* Female Only Tag */}
//         {trip.femaleOnly && (
//           <View style={styles.femaleTag}>
//             <BlurView intensity={30} style={styles.femaleTagBlur}>
//               <Image source={icons.female} style={styles.femaleIcon} />
//               <Text style={styles.femaleTagText}>Women Only</Text>
//             </BlurView>
//           </View>
//         )}

//         {/* Hero Content */}
//         <Animated.View 
//           style={[
//             styles.heroContent,
//             {
//               opacity: fadeAnim,
//               transform: [{ translateY: slideAnim }]
//             }
//           ]}
//         >
//           {/* Difficulty Tag */}
//           <View style={styles.heroTags}>
//             <BlurView intensity={30} style={styles.difficultyTag}>
//               <Text style={styles.difficultyTagIcon}>⚡</Text>
//               <Text style={[styles.difficultyTagText, { color: getDifficultyColor(trip.difficulty) }]}>
//                 {trip.difficulty}
//               </Text>
//             </BlurView>
//           </View>
          
//           <Text style={styles.heroTitle}>{trip.title}</Text>
          
//           <View style={styles.heroLocation}>
//             <Image source={icons.location} style={styles.locationIcon} />
//             <Text style={styles.locationText}>
//               {trip.startPoint} → {trip.destination}
//             </Text>
//           </View>
          
//           <View style={styles.heroRating}>
//             <View style={styles.starsContainer}>
//               {renderStars(trip.rating)}
//             </View>
//             <Text style={styles.ratingText}>
//               {trip.rating?.toFixed(1)} ({trip.reviews} reviews)
//             </Text>
//           </View>
//         </Animated.View>
//       </View>

//       {/* Tab Navigation */}
//       <View style={styles.tabNavigation}>
//         <BlurView intensity={95} style={styles.tabNavigationBlur}>
//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.tabsContainer}
//           >
//             {tabs.map((tab) => (
//               <TouchableOpacity
//                 key={tab.id}
//                 style={[
//                   styles.tab,
//                   selectedTab === tab.id && styles.tabActive,
//                 ]}
//                 onPress={() => setSelectedTab(tab.id)}
//                 activeOpacity={0.8}
//               >
//                 {selectedTab === tab.id && (
//                   <LinearGradient
//                     colors={[colors.primary, colors.primaryLight] as readonly [string, string]}
//                     style={styles.tabActiveBackground}
//                   />
//                 )}
//                 <Text style={styles.tabIcon}>{tab.icon}</Text>
//                 <Text style={[
//                   styles.tabText,
//                   selectedTab === tab.id && styles.tabTextActive,
//                 ]}>
//                   {tab.title}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </BlurView>
//       </View>

//       {/* Content */}
//       <ScrollView 
//         style={styles.content}
//         contentContainerStyle={styles.contentContainer}
//         showsVerticalScrollIndicator={false}
//       >
//         {renderTabContent()}
//       </ScrollView>

//       {/* Floating Action Bar */}
//       <View style={styles.floatingActionBar}>
//         <BlurView intensity={95} style={styles.actionBarBlur}>
//           <LinearGradient
//             colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'] as readonly [string, string]}
//             style={styles.actionBarGradient}
//           >
//             <View style={styles.actionButtons}>
//               <TouchableOpacity style={styles.secondaryActionButton} onPress={handleGroupChat}>
//                 <BlurView intensity={20} style={styles.secondaryActionBlur}>
//                   <Text style={styles.secondaryActionIcon}>💬</Text>
//                   <Text style={styles.secondaryActionText}>Group Chat</Text>
//                 </BlurView>
//               </TouchableOpacity>
              
//               <TouchableOpacity style={styles.primaryActionButton} onPress={handleJoinTrip}>
//                 <LinearGradient
//                   colors={[colors.primary, colors.primaryLight] as readonly [string, string]}
//                   style={styles.primaryActionGradient}
//                 >
//                   <Text style={styles.primaryActionIcon}>🏍️</Text>
//                   <Text style={styles.primaryActionText}>Join Trip</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>
//           </LinearGradient>
//         </BlurView>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   ratingText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 8,
//   },
  
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  
//   loadingGradient: {
//     paddingHorizontal: spacing.xl,
//     paddingVertical: spacing.lg,
//     borderRadius: borderRadius.lg,
//   },
  
//   loadingText: {
//     fontSize: typography.fontSizes.lg,
//     fontWeight: typography.fontWeights.bold,
//     color: colors.white,
//   },
  
//   heroHeader: {
//     height: screenHeight * 0.45,
//     position: 'relative',
//   },
  
//   heroImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
  
//   heroOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
  
//   backButton: {
//     position: 'absolute',
//     top: Platform.OS === 'ios' ? 50 : 40,
//     left: spacing.lg,
//     zIndex: 10,
//     borderRadius: borderRadius.lg,
//     overflow: 'hidden',
//   },
  
//   backButtonBlur: {
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.sm,
//   },
  
//   backIcon: {
//     width: 24,
//     height: 24,
//     tintColor: colors.white,
//   },
  
//   femaleTag: {
//     position: 'absolute',
//     top: Platform.OS === 'ios' ? 50 : 40,
//     right: spacing.lg,
//     borderRadius: borderRadius.full,
//     overflow: 'hidden',
//   },
  
//   femaleTagBlur: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.sm,
//     backgroundColor: 'rgba(255, 105, 180, 0.3)',
//   },
  
//   femaleIcon: {
//     width: 16,
//     height: 16,
//     tintColor: colors.white,
//     marginRight: spacing.sm,
//   },
  
//   femaleTagText: {
//     fontSize: typography.fontSizes.sm,
//     fontWeight: typography.fontWeights.bold,
//     color: colors.white,
//   },
  
//   heroContent: {
//     position: 'absolute',
//     bottom: spacing.xl,
//     left: spacing.lg,
//     right: spacing.lg,
//   },
  
//   heroTags: {
//     flexDirection: 'row',
//     gap: spacing.sm,
//     marginBottom: spacing.lg,
//   },
  
//   difficultyTag: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.sm,
//     borderRadius: borderRadius.full,
//     overflow: 'hidden',
//     gap: spacing.xs,
//   },
  
//   difficultyTagIcon: {
//     fontSize: 14,
//   },
  
//   difficultyTagText: {
//     fontSize: typography.fontSizes.sm,
//     fontWeight: typography.fontWeights.bold,
//   },
  
//   heroTitle: {
//     fontSize: typography.fontSizes.xxxxl,
//     fontWeight: typography.fontWeights.black,
//     color: colors.white,
//     marginBottom: spacing.md,
//     textShadowColor: 'rgba(0, 0, 0, 0.7)',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 4,
//   },
  
//   heroLocation: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: spacing.lg,
//   },
  
//   locationIcon: {
//     width: 18,
//     height: 18,
//     tintColor: colors.white,
//     marginRight: spacing.sm,
//   },
  
//   locationText: {
//     fontSize: typography.fontSizes.lg,
//     color: colors.white,
//     fontWeight: typography.fontWeights.semibold,
//     textShadowColor: 'rgba(0, 0, 0, 0.5)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 2,
//   },
  
//   heroRating: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: spacing.md,
//   },
  
//   starsContainer: {
//     flexDirection: 'row',
//   },
  
//   star: {
//     fontSize: 16,
//   },
  
//   starHalf: {
//     fontSize: 16,
//     opacity: 0.7,
//   },
  
//   starEmpty: {
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.3)',
//   },
  
//   tabNavigation: {
//     backgroundColor: 'transparent',
//     borderBottomWidth: 1,
//     borderBottomColor: colors.borderLight,
//   },
  
//   tabNavigationBlur: {
//     paddingVertical: spacing.md,
//   },
  
//   tabsContainer: {
//     paddingHorizontal: spacing.lg,
//     gap: spacing.md,
//   },
  
//   tab: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: spacing.md,
//     paddingHorizontal: spacing.lg,
//     borderRadius: borderRadius.xl,
//     position: 'relative',
//     minWidth: 100,
//   },
  
//   tabActive: {
//     // Styles handled by gradient background
//   },
  
//   tabActiveBackground: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     borderRadius: borderRadius.xl,
//   },
  
//   tabIcon: {
//     fontSize: 18,
//     marginRight: spacing.sm,
//   },
  
//   tabText: {
//     fontSize: typography.fontSizes.base,
//     fontWeight: typography.fontWeights.semibold,
//     color: colors.textSecondary,
//   },
  
//   tabTextActive: {
//     color: colors.white,
//     fontWeight: typography.fontWeights.bold,
//   },
  
//   content: {
//     flex: 1,
//   },
  
//   contentContainer: {
//     paddingHorizontal: spacing.lg,
//     paddingTop: spacing.lg,
//     paddingBottom: 120, // Space for floating action bar
//   },
  
//   tabContent: {
//     // Content wrapper
//   },
  
//   description: {
//     fontSize: typography.fontSizes.lg,
//     lineHeight: typography.lineHeights.relaxed * typography.fontSizes.lg,
//     color: colors.text,
//     marginBottom: spacing.xl,
//     fontWeight: typography.fontWeights.medium,
//   },
  
//   // Modern Info Cards
//   infoGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: spacing.lg,
//     marginBottom: spacing.xl,
//   },
  
//   infoCard: {
//     width: (screenWidth - spacing.lg * 3) / 2,
//     backgroundColor: colors.white,
//     borderRadius: borderRadius.xl,
//     padding: spacing.lg,
//     ...shadows.lg,
//     borderWidth: 1,
//     borderColor: colors.borderLight,
//   },
  
//   infoHeader: {
//     alignItems: 'center',
//     marginBottom: spacing.md,
//   },
  
//   infoIconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: spacing.sm,
//   },
  
//   infoIcon: {
//     width: 24,
//     height: 24,
//     tintColor: colors.white,
//   },
  
//   infoLabel: {
//     fontSize: typography.fontSizes.sm,
//     color: colors.textSecondary,
//     fontWeight: typography.fontWeights.semibold,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
  
//   infoValue: {
//     fontSize: typography.fontSizes.xl,
//     color: colors.text,
//     fontWeight: typography.fontWeights.black,
//     textAlign: 'center',
//   },
  
//   // Trip Highlights
//   highlightsSection: {
//     backgroundColor: colors.white,
//     borderRadius: borderRadius.xl,
//     padding: spacing.lg,
//     ...shadows.md,
//   },
  
//   sectionTitle: {
//     fontSize: typography.fontSizes.xl,
//     fontWeight: typography.fontWeights.bold,
//     color: colors.text,
//     marginBottom: spacing.lg,
//   },
  
//   highlightsList: {
//     gap: spacing.lg,
//   },
  
//   highlightItem: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
  
//   highlightIcon: {
//     fontSize: 24,
//     marginRight: spacing.md,
//     marginTop: 2,
//   },
  
//   highlightText: {
//     flex: 1,
//   },
  
//   highlightTitle: {
//     fontSize: typography.fontSizes.lg,
//     fontWeight: typography.fontWeights.bold,
//     color: colors.text,
//     marginBottom: spacing.xs,
//   },
  
//   highlightDesc: {
//     fontSize: typography.fontSizes.base,
//     color: colors.textSecondary,
//     lineHeight: typography.lineHeights.relaxed * typography.fontSizes.base,
//   },
  
//   // Real Map Styles
//   mapSection: {
//     marginBottom: spacing.xl,
//   },
  
//   mapHeader: {
//     marginBottom: spacing.lg,
//   },
  
//   mapTitle: {
//     fontSize: typography.fontSizes.xl,
//     fontWeight: typography.fontWeights.bold,
//     color: colors.text,
//     marginBottom: spacing.xs,
//   },
  
//   mapSubtitle: {
//     fontSize: typography.fontSizes.base,
//     color: colors.textSecondary,
//   },
  
//   mapContainer: {
//     borderRadius: borderRadius.xl,
//     overflow: 'hidden',
//     ...shadows.xl,
//     marginBottom: spacing.lg,
//   },
  
//   mapView: {
//     position: 'relative',
//   },
  
//   mapOverlay: {
//     position: 'absolute',
//     bottom: spacing.lg,
//     left: spacing.lg,
//     right: spacing.lg,
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.sm,
//     borderRadius: borderRadius.full,
//     overflow: 'hidden',
//   },
  
//   mapOverlayText: {
//     fontSize: typography.fontSizes.sm,
//     color: colors.text,
//     fontWeight: typography.fontWeights.semibold,
//     textAlign: 'center',
//   },
  
//   // Route Details Card
//   routeDetailsCard: {
//     backgroundColor: colors.white,
//     borderRadius: borderRadius.xl,
//     padding: spacing.lg,
//     ...shadows.lg,
//   },
  
//   routeDetailsTitle: {
//     fontSize: typography.fontSizes.xl,
//     fontWeight: typography.fontWeights.bold,
//     color: colors.text,
//     marginBottom: spacing.lg,
//   },
  
//   routeStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: spacing.xl,
//     paddingVertical: spacing.lg,
//     backgroundColor: colors.background,
//     borderRadius: borderRadius.lg,
//   },
  
//   routeStat: {
//     alignItems: 'center',
//   },
  
//   routeStatIcon: {
//     fontSize: 24,
//     marginBottom: spacing.sm,
//   },
  
//   routeStatValue: {
//     fontSize: typography.fontSizes.lg,
//     fontWeight: typography.fontWeights.black,
//     color: colors.text,
//     marginBottom: spacing.xs,
//   },
  
//   routeStatLabel: {
//     fontSize: typography.fontSizes.sm,
//     color: colors.textSecondary,
//     fontWeight: typography.fontWeights.medium,
//     textAlign: 'center',
//   },
  
//   // Waypoints
//   waypointsList: {
//     gap: spacing.md,
//   },
  
//   waypointItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     position: 'relative',
//   },
  
//   waypointMarker: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     marginRight: spacing.md,
//   },
  
//   waypointInfo: {
//     flex: 1,
//   },
  
//   waypointName: {
//     fontSize: typography.fontSizes.lg,
//     fontWeight: typography.fontWeights.bold,
//     color: colors.text,
//     marginBottom: 2,
//   },
  
//   waypointDistance: {
//     fontSize: typography.fontSizes.sm,
//     color: colors.textSecondary,
//   },
  
//   waypointLine: {
//     position: 'absolute',
//     left: 5,
//     top: 20,
//     width: 2,
//     height: 30,
//     backgroundColor: colors.borderLight,
//   },
  
//   // Members Section
//   membersHeader: {
//     marginBottom: spacing.xl,
//   },
  
//   membersTitle: {
//     fontSize: typography.fontSizes.xl,
//     fontWeight: typography.fontWeights.bold,
//     color: colors.text,
//     marginBottom: spacing.md,
//   },
  
//   membersProgress: {
//     gap: spacing.sm,
//   },
  
//   progressBar: {
//     height: 8,
//     backgroundColor: colors.borderLight,
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
  
//   progressFill: {
//     height: '100%',
//     borderRadius: 4,
//   },
  
//   progressText: {
//     fontSize: typography.fontSizes.sm,
//     color: colors.textSecondary,
//     fontWeight: typography.fontWeights.medium,
//   },
  
//   membersList: {
//     gap: spacing.lg,
//   },
  
//   memberCard: {
//     backgroundColor: colors.white,
//     borderRadius: borderRadius.xl,
//     padding: spacing.lg,
//     ...shadows.md,
//   },
  
//   memberCardContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
  
//   memberImageContainer: {
//     position: 'relative',
//     marginRight: spacing.lg,
//   },
  
//   memberImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     borderWidth: 3,
//     borderColor: colors.primary,
//   },
  
//   leaderBadge: {
//     position: 'absolute',
//     top: -5,
//     right: -5,
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  
//   leaderBadgeText: {
//     fontSize: 12,
//   },
  
//   memberInfo: {
//     flex: 1,
//   },
  
//   memberName: {
//     fontSize: typography.fontSizes.lg,
//     fontWeight: typography.fontWeights.bold,
//     color: colors.text,
//     marginBottom: spacing.xs,
//   },
  
//   memberRole: {
//     fontSize: typography.fontSizes.sm,
//     color: colors.textSecondary,
//     marginBottom: spacing.sm,
//     fontWeight: typography.fontWeights.medium,
//   },
  
//   memberStats: {
//     flexDirection: 'row',
//     gap: spacing.lg,
//   },
  
//   memberStatItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: spacing.xs,
//   },
  
//   memberStatIcon: {
//     fontSize: 14,
//   },
  
//   memberStatText: {
//     fontSize: typography.fontSizes.sm,
//     color: colors.textSecondary,
//     fontWeight: typography.fontWeights.medium,
//   },
  
//   memberAction: {
//     borderRadius: borderRadius.lg,
//     overflow: 'hidden',
//   },
  
//   memberActionGradient: {
//     width: 44,
//     height: 44,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
  
//   memberActionIcon: {
//     fontSize: 20,
//   },
  
//   // Reviews Section
//   reviewsOverview: {
//     backgroundColor: colors.white,
//     borderRadius: borderRadius.xl,
//     padding: spacing.lg,
//     marginBottom: spacing.xl,
//     ...shadows.lg,
//   },
  
//   ratingCard: {
//     alignItems: 'center',
//     marginBottom: spacing.xl,
//   },
  
//   overallRating: {
//     fontSize: typography.fontSizes.xxxxl,
//     fontWeight: typography.fontWeights.black,
//     color: colors.primary,
//     marginBottom: spacing.sm,
//   },
  
//   reviewCount: {
//     fontSize: typography.fontSizes.base,
//     color: colors.textSecondary,
//     fontWeight: typography.fontWeights.medium,
//     marginTop: spacing.sm,
//   },
  
//   ratingBreakdown: {
//     gap: spacing.sm,
//   },
  
//   ratingRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: spacing.md,
//   },
  
//   ratingRowStars: {
//     fontSize: typography.fontSizes.sm,
//     color: colors.textSecondary,
//     width: 30,
//   },
  
//   ratingBarContainer: {
//     flex: 1,
//   },
  
//   ratingBar: {
//     height: 6,
//     backgroundColor: colors.borderLight,
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
  
//   ratingBarFill: {
//     height: '100%',
//     borderRadius: 3,
//   },
  
//   ratingRowCount: {
//     fontSize: typography.fontSizes.sm,
//     color: colors.textSecondary,
//     width: 30,
//     textAlign: 'right',
//   },
  
//   reviewsList: {
//     gap: spacing.lg,
//   },
  
//   reviewCard: {
//     backgroundColor: colors.white,
//     borderRadius: borderRadius.xl,
//     padding: spacing.lg,
//     ...shadows.md,
//   },
  
//   reviewHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: spacing.md,
//   },
  
//   reviewerAvatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: spacing.md,
//     borderWidth: 2,
//     borderColor: colors.borderLight,
//   },
  
//   reviewerInfo: {
//     flex: 1,
//   },
  
//   reviewerName: {
//     fontSize: typography.fontSizes.lg,
//     fontWeight: typography.fontWeights.bold,
//     color: colors.text,
//     marginBottom: spacing.xs,
//   },
  
//   reviewRating: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: spacing.sm,
//   },
  
//   reviewDate: {
//     fontSize: typography.fontSizes.sm,
//     color: colors.textSecondary,
//   },
  
//   reviewComment: {
//     fontSize: typography.fontSizes.base,
//     color: colors.text,
//     lineHeight: typography.lineHeights.relaxed * typography.fontSizes.base,
//     marginBottom: spacing.md,
//   },
  
//   reviewActions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
  
//   helpfulButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: spacing.md,
//     paddingVertical: spacing.sm,
//     backgroundColor: colors.background,
//     borderRadius: borderRadius.md,
//     gap: spacing.xs,
//   },
  
//   helpfulIcon: {
//     fontSize: 14,
//   },
  
//   helpfulText: {
//     fontSize: typography.fontSizes.sm,
//     color: colors.textSecondary,
//     fontWeight: typography.fontWeights.medium,
//   },
  
//   // Floating Action Bar
//   floatingActionBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     paddingBottom: Platform.OS === 'ios' ? 34 : spacing.lg,
//     paddingHorizontal: spacing.lg,
//   },
  
//   actionBarBlur: {
//     borderRadius: borderRadius.xl,
//     overflow: 'hidden',
//     ...shadows.xl,
//   },
  
//   actionBarGradient: {
//     paddingVertical: spacing.lg,
//     paddingHorizontal: spacing.lg,
//   },
  
//   actionButtons: {
//     flexDirection: 'row',
//     gap: spacing.md,
//   },
  
//   secondaryActionButton: {
//     flex: 1,
//     borderRadius: borderRadius.lg,
//     overflow: 'hidden',
//   },
  
//   secondaryActionBlur: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: spacing.lg,
//     gap: spacing.sm,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//   },
  
//   secondaryActionIcon: {
//     fontSize: 18,
//   },
  
//   secondaryActionText: {
//     fontSize: typography.fontSizes.base,
//     fontWeight: typography.fontWeights.bold,
//     color: colors.text,
//   },
  
//   primaryActionButton: {
//     flex: 2,
//     borderRadius: borderRadius.lg,
//     overflow: 'hidden',
//   },
  
//   primaryActionGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: spacing.lg,
//     gap: spacing.sm,
//   },
  
//   primaryActionIcon: {
//     fontSize: 18,
//   },
  
//   primaryActionText: {
//     fontSize: typography.fontSizes.lg,
//     fontWeight: typography.fontWeights.bold,
//     color: colors.white,
//   },
// });

// export default TripDetails;


import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import MapViewComponent from "../components/MapView"
import Button from "../components/Button"
import { colors } from "../constants/colors"
import { icons } from "../constants/icons"
import { mockTrips } from "../constants/MockData"

// Type definitions
type RootStackParamList = {
  GroupChat: { tripId: string }
  // Add other screens here if needed
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

interface Trip {
  id: string
  title: string
  image: string
  startPoint: string
  destination: string
  duration: string
  budget: string
  bike: string
  description: string
  route: any
  members: Array<{
    id: string
    name: string
    image: string
  }>
  femaleOnly?: boolean
}

const TripDetails = () => {
  const navigation = useNavigation<NavigationProp>()
  const route = useRoute()
  const { tripId } = route.params as { tripId: string }

  const [trip, setTrip] = useState<Trip | null>(null)

  useEffect(() => {
    const selectedTrip = mockTrips.find((t) => t.id === tripId)
    setTrip(selectedTrip || null)
  }, [tripId])

  const handleJoinTrip = () => {
    console.log("Join trip:", tripId)
  }

  const handleGroupChat = () => {
    navigation.navigate("GroupChat", { tripId })
  }

  if (!trip) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading trip details...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={icons.back} style={styles.backIcon} />
      </TouchableOpacity>

      <Image source={{ uri: trip.image }} style={styles.coverImage} />

      {trip.femaleOnly && (
        <View style={styles.femaleTag}>
          <Image source={icons.female} style={styles.femaleIcon} />
          <Text style={styles.femaleText}>Female Only</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{trip.title}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image source={icons.location} style={styles.icon} />
            <Text style={styles.infoText}>
              {trip.startPoint} to {trip.destination}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image source={icons.calendar} style={styles.icon} />
            <Text style={styles.infoText}>{trip.duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <Image source={icons.money} style={styles.icon} />
            <Text style={styles.infoText}>{trip.budget}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image source={icons.bike} style={styles.icon} />
            <Text style={styles.infoText}>{trip.bike}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{trip.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Route</Text>
          <MapViewComponent
            route={trip.route}
            startPoint={trip.startPoint}
            destination={trip.destination}
            height={200}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Riders</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ridersContainer}>
            {trip.members.map((member) => (
              <View key={member.id} style={styles.riderItem}>
                <Image source={{ uri: member.image }} style={styles.riderImage} />
                <Text style={styles.riderName}>{member.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.actions}>
          <Button 
            title="Join Trip" 
            onPress={handleJoinTrip} 
            style={[styles.actionButton, styles.primaryButton]} 
          />
          <Button 
            title="Group Chat" 
            onPress={handleGroupChat} 
            style={[styles.actionButton, styles.outlineButton]} 
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: colors.white,
  },
  coverImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  femaleTag: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(255, 105, 180, 0.8)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  femaleIcon: {
    width: 16,
    height: 16,
    tintColor: colors.white,
    marginRight: 6,
  },
  femaleText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.text,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 6,
    tintColor: colors.primary,
  },
  infoText: {
    fontSize: 14,
    color: colors.text,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: colors.text,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.text,
  },
  ridersContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  riderItem: {
    alignItems: "center",
    marginRight: 16,
  },
  riderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  riderName: {
    fontSize: 12,
    color: colors.text,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    // Add other primary button styles here
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
    // Add other outline button styles here
  },
})

export default TripDetails