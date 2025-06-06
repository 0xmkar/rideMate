// const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require('nativewind/metro');

// const config = getDefaultConfig(__dirname)

// module.exports = withNativeWind(config, { input: './app/globals.css' })



const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add resolver configuration for web compatibility
config.resolver = {
  ...config.resolver,
  alias: {
    ...config.resolver.alias,
    // Redirect react-native-maps to web fallback on web platform
    'react-native-maps': path.resolve(__dirname, 'web-fallbacks/react-native-maps.js'),
  },
  platforms: ['ios', 'android', 'native', 'web'],
  resolverMainFields: ['react-native', 'browser', 'main'],
};

module.exports = withNativeWind(config, { input: './app/globals.css' });