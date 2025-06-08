// screens/Login.tsx - Enhanced Login Screen

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { colors, spacing, borderRadius, typography, shadows } from '../constants/colors';
import { icons } from '../constants/icons';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      return;
    }
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('MainTabs' as never);
    }, 1500);
  };

  const handleSignup = () => {
    navigation.navigate('Signup' as never);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login pressed`);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = email && password && validateEmail(email);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>

        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>🏍️</Text>
              <Text style={styles.appName}>RideMate</Text>
            </View>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to continue your riding journey</Text>
          </View>

          {/* Login Form */}
          <View style={[styles.formContainer, shadows.lg]}>
            <View style={styles.form}>
              <FormInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                icon={icons.email}
                error={email && !validateEmail(email) ? 'Please enter a valid email' : undefined}
              />

              <FormInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                icon={showPassword ? icons.eye : icons.eyeOff}
                onIconPress={togglePasswordVisibility}
                error={password && password.length < 6 ? 'Password must be at least 6 characters' : undefined}
              />

              {/* Remember Me & Forgot Password */}
              <View style={styles.optionsRow}>
                <TouchableOpacity 
                  style={styles.rememberMeContainer}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                    {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.rememberMeText}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <Button 
                title="Sign In" 
                onPress={handleLogin} 
                loading={loading} 
                disabled={!isFormValid}
                size="lg"
                fullWidth
                style={styles.loginButton}
              />
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.divider} />
            </View>

            {/* Social Login */}
            <View style={styles.socialContainer}>
              <TouchableOpacity 
                style={[styles.socialButton, shadows.sm]}
                onPress={() => handleSocialLogin('Google')}
              >
                <Text style={styles.socialIcon}>🌐</Text>
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.socialButton, shadows.sm]}
                onPress={() => handleSocialLogin('Facebook')}
              >
                <Text style={styles.socialIcon}>📘</Text>
                <Text style={styles.socialText}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  scrollView: {
    flex: 1,
  },
  
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
    paddingBottom: spacing.lg,
  },
  
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  
  backIcon: {
    width: 20,
    height: 20,
    tintColor: colors.text,
  },
  
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  
  logo: {
    fontSize: 32,
    marginRight: spacing.sm,
  },
  
  appName: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
  },
  
  title: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: typography.fontSizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.base,
  },
  
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  
  form: {
    marginBottom: spacing.lg,
  },
  
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: typography.fontWeights.bold,
  },
  
  rememberMeText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text,
  },
  
  forgotPasswordText: {
    color: colors.primary,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
  },
  
  loginButton: {
    marginTop: spacing.sm,
  },
  
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray100,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  
  socialIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  
  socialText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text,
  },
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  footerText: {
    color: colors.text,
    fontSize: typography.fontSizes.base,
  },
  
  signupText: {
    color: colors.primary,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.bold,
  },
});

export default Login;