import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { BrandColors, Typography, Spacing, Dimensions } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleLoginPress = () => {
    // Haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    router.push('/auth/login' as any);
  };

  const handleSignupPress = () => {
    // Haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    router.push('/auth/signup' as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Icon placeholder */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="leaf" size={48} color={BrandColors.brandEmphasis} />
          </View>
        </View>

        {/* App Title */}
        <Text style={styles.appTitle}>SOLARPUNK</Text>
        <Text style={styles.appSubtitle}>RECYCLING</Text>

        {/* Description */}
        <Text style={styles.description}>
          Make the campus more sustainable with AI-verified recycling and earn dining points.
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginPress}
            accessibilityLabel="Log in to your account"
            accessibilityRole="button"
          >
            <Text style={[Typography.buttonText, styles.buttonText]}>LOG IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignupPress}
            accessibilityLabel="Create a new account"
            accessibilityRole="button"
          >
            <Text style={[Typography.buttonText, styles.signupButtonText]}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.primaryBackground,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.screen,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: BrandColors.optionalSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: BrandColors.primaryInk,
    textAlign: 'center',
    letterSpacing: 2,
  },
  appSubtitle: {
    fontSize: 32,
    fontWeight: '400',
    color: BrandColors.primaryInk,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: BrandColors.secondaryInk,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 40,
  },
  loginButton: {
    height: Dimensions.buttonHeight,
    borderRadius: Dimensions.buttonRadius,
    backgroundColor: BrandColors.brandEmphasis,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    ...(Platform.OS === 'ios' ? {
      shadowColor: BrandColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    } : {
      elevation: 3,
    }),
  },
  signupButton: {
    height: Dimensions.buttonHeight,
    borderRadius: Dimensions.buttonRadius,
    borderWidth: 2,
    borderColor: BrandColors.brandEmphasis,
    backgroundColor: BrandColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: BrandColors.white,
  },
  signupButtonText: {
    color: BrandColors.brandEmphasis,
  },
});
