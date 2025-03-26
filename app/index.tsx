// import { StatusBar } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import AppNavigator from "../navigation/AppNavigator";

// // Extend the global object inline
// declare global {
//   var __EXPO_ROUTER_CONTEXT: any; // Declare the global variable with an appropriate type
// }

// export default function Index() {
//   // Check if we're in Expo Router environment
//   const isExpoRouter = typeof global !== "undefined" && global.__EXPO_ROUTER_CONTEXT !== undefined;

//   // If using Expo Router, don't wrap with NavigationContainer
//   if (isExpoRouter) {
//     return (
//       <>
//         <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
//         <AppNavigator />
//       </>
//     );
//   }

//   // For standalone usage, include NavigationContainer
//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     </>
//   );
// }


import { StatusBar } from "react-native"
import AppNavigator from "../navigation/AppNavigator"

export default function Index() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <AppNavigator />
    </>
  )
}

