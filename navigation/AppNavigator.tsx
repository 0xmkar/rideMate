// // import { NavigationContainer } from "@react-navigation/native"
// // import { createStackNavigator } from "@react-navigation/stack"
// // import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// // import { Image } from "react-native"

// // // Import screens
// // import Welcome from "../screens/Welcome"
// // import Login from "../screens/Login"
// // import Signup from "../screens/Signup"
// // import Home from "../screens/Home"
// // import Explore from "../screens/Explore"
// // import TripPlanning from "../screens/TripPlanning"
// // import TripDetails from "../screens/TripDetails"
// // import GroupChat from "../screens/GroupChat"
// // import Profile from "../screens/Profile"

// // // Import icons
// // import { icons } from "../constants/icons"

// // const Stack = createStackNavigator()
// // const Tab = createBottomTabNavigator()

// // const MainTabs = () => {
// //   return (
// //     <Tab.Navigator
// //       screenOptions={{
// //         tabBarActiveTintColor: "#ab8bff",
// //         tabBarInactiveTintColor: "#a8b5db",
// //         tabBarStyle: {
// //           backgroundColor: "#000000",
// //           borderTopWidth: 0,
// //           paddingBottom: 5,
// //           paddingTop: 5,
// //         },
// //         headerShown: false,
// //       }}
// //     >
// //       <Tab.Screen
// //         name="Home"
// //         component={Home}
// //         options={{
// //           tabBarIcon: ({ color }) => (
// //             <Image source={icons.home} style={{ width: 24, height: 24, tintColor: color }} resizeMode="contain" />
// //           ),
// //         }}
// //       />
// //       <Tab.Screen
// //         name="Explore"
// //         component={Explore}
// //         options={{
// //           tabBarIcon: ({ color }) => (
// //             <Image source={icons.explore} style={{ width: 24, height: 24, tintColor: color }} resizeMode="contain" />
// //           ),
// //         }}
// //       />
// //       <Tab.Screen
// //         name="Profile"
// //         component={Profile}
// //         options={{
// //           tabBarIcon: ({ color }) => (
// //             <Image source={icons.profile} style={{ width: 24, height: 24, tintColor: color }} resizeMode="contain" />
// //           ),
// //         }}
// //       />
// //     </Tab.Navigator>
// //   )
// // }

// // const AppNavigator = () => {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
// //         <Stack.Screen name="Welcome" component={Welcome} />
// //         <Stack.Screen name="Login" component={Login} />
// //         <Stack.Screen name="Signup" component={Signup} />
// //         <Stack.Screen name="MainTabs" component={MainTabs} />
// //         <Stack.Screen name="TripPlanning" component={TripPlanning} />
// //         <Stack.Screen name="TripDetails" component={TripDetails} />
// //         <Stack.Screen name="GroupChat" component={GroupChat} />
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   )
// // }

// // export default AppNavigator

// import { createStackNavigator } from "@react-navigation/stack"
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import { Image } from "react-native"

// // Import screens
// import Welcome from "../screens/Welcome"
// import Login from "../screens/Login"
// import Signup from "../screens/Signup"
// import Home from "../screens/Home"
// import Explore from "../screens/Explore"
// import TripPlanning from "../screens/TripPlanning"
// import TripDetails from "../screens/TripDetails"
// import GroupChat from "../screens/GroupChat"
// import Profile from "../screens/Profile"

// // Import icons
// import { icons } from "../constants/icons"

// const Stack = createStackNavigator()
// const Tab = createBottomTabNavigator()

// const MainTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: "#ab8bff",
//         tabBarInactiveTintColor: "#a8b5db",
//         tabBarStyle: {
//           backgroundColor: "#000000",
//           borderTopWidth: 0,
//           paddingBottom: 5,
//           paddingTop: 5,
//         },
//         headerShown: false,
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Image source={icons.home} style={{ width: 24, height: 24, tintColor: color }} resizeMode="contain" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Explore"
//         component={Explore}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Image source={icons.explore} style={{ width: 24, height: 24, tintColor: color }} resizeMode="contain" />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Image source={icons.profile} style={{ width: 24, height: 24, tintColor: color }} resizeMode="contain" />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   )
// }

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Welcome" component={Welcome} />
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Signup" component={Signup} />
//       <Stack.Screen name="MainTabs" component={MainTabs} />
//       <Stack.Screen name="TripPlanning" component={TripPlanning} />
//       <Stack.Screen name="TripDetails" component={TripDetails} />
//       <Stack.Screen name="GroupChat" component={GroupChat} />
//     </Stack.Navigator>
//   )
// }

// export default AppNavigator


import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Image } from "react-native"

// Import screens
import Welcome from "../screens/Welcome"
import Login from "../screens/Login"
import Signup from "../screens/Signup"
import Home from "../screens/Home"
import Explore from "../screens/Explore"
import TripPlanning from "../screens/TripPlanning"
import TripDetails from "../screens/TripDetails"
import GroupChat from "../screens/GroupChat"
import Profile from "../screens/Profile"
import SafetySettings from "../screens/SafetySettings"

// Import icons
import { icons } from "../constants/icons"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#ab8bff",
        tabBarInactiveTintColor: "#a8b5db",
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopWidth: 0,
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={icons.home} style={{ width: 24, height: 24, tintColor: color }} resizeMode="contain" />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={icons.explore} style={{ width: 24, height: 24, tintColor: color }} resizeMode="contain" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={icons.profile} style={{ width: 24, height: 24, tintColor: color }} resizeMode="contain" />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

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
  )
}

export default AppNavigator