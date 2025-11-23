import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { BrandColors, Typography, Spacing, Dimensions } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    return email.includes('@');
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const isFormValid = validateEmail(email) && validatePassword(password);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError('');
  };

  const handleLogin = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    
    // Haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    try {
      // TODO: Implement actual login logic
      console.log('Login attempt:', { email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to main app
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    Alert.alert('Forgot Password', 'Password reset functionality will be implemented.');
  };

  const handleSocialLogin = (provider: string) => {
    // Haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    Alert.alert(`${provider} Login`, `${provider} login will be implemented.`);
  };

  const handleSignupPress = () => {
    // Haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    router.push('/auth/signup' as any);
  };

  const handleDismiss = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header with dismiss button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={handleDismiss}
          accessibilityLabel="Close"
          accessibilityRole="button"
        >
          <Ionicons 
            name="close" 
            size={22} 
            color={BrandColors.primaryInk} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleContainer}>
            <Text style={Typography.title}>LOG </Text>
            <Text style={Typography.titleSecond}>IN</Text>
          </Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Email Field */}
          <View style={styles.fieldContainer}>
            <Text style={Typography.fieldLabel}>EMAIL</Text>
            <TextInput
              style={[
                styles.input,
                emailError ? styles.inputError : null,
              ]}
              value={email}
              onChangeText={handleEmailChange}
              placeholder="Enter your email"
              placeholderTextColor={`${BrandColors.secondaryInk}B3`}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => {
                // Focus password field
              }}
            />
            {emailError ? (
              <Text style={[Typography.errorText, styles.errorText]}>
                {emailError}
              </Text>
            ) : null}
          </View>

          {/* Password Field */}
          <View style={styles.fieldContainer}>
            <Text style={Typography.fieldLabel}>PASSWORD</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  passwordError ? styles.inputError : null,
                ]}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Enter your password"
                placeholderTextColor={`${BrandColors.secondaryInk}B3`}
                secureTextEntry={!showPassword}
                returnKeyType="go"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                accessibilityLabel="Toggle password visibility"
                accessibilityRole="button"
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color={BrandColors.secondaryInk}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={[Typography.errorText, styles.errorText]}>
                {passwordError}
              </Text>
            ) : null}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>
              <Text style={Typography.helperText}>FORGOT YOUR </Text>
              <Text style={[Typography.helperText, { color: BrandColors.accentOutline }]}>
                PASSWORD?
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Social Login */}
        <View style={styles.socialContainer}>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Apple')}
              accessibilityLabel="Continue with Apple"
              accessibilityRole="button"
            >
              <Ionicons name="logo-apple" size={24} color={BrandColors.primaryInk} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Google')}
              accessibilityLabel="Continue with Google"
              accessibilityRole="button"
            >
              <Ionicons name="logo-google" size={24} color={BrandColors.primaryInk} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Facebook')}
              accessibilityLabel="Continue with Facebook"
              accessibilityRole="button"
            >
              <Ionicons name="logo-facebook" size={24} color={BrandColors.primaryInk} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('X')}
              accessibilityLabel="Continue with X"
              accessibilityRole="button"
            >
              <Ionicons name="logo-twitter" size={24} color={BrandColors.primaryInk} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={Typography.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[
            styles.loginButton,
            !isFormValid ? styles.loginButtonDisabled : null,
          ]}
          onPress={handleLogin}
          disabled={!isFormValid || isLoading}
          accessibilityLabel="Log in"
          accessibilityRole="button"
        >
          <Text style={Typography.buttonText}>
            {isLoading ? 'LOADING...' : 'LOG IN'}
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            <Text style={Typography.footerText}>I don't have an account? </Text>
            <Text 
              style={[Typography.linkText, styles.footerLink]}
              onPress={handleSignupPress}
            >
              sign up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.primaryBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: Spacing.screen,
    paddingBottom: 10,
  },
  dismissButton: {
    width: Dimensions.dismissButtonSize,
    height: Dimensions.dismissButtonSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screen,
    paddingBottom: 40,
  },
  titleContainer: {
    marginTop: Spacing.titleTop,
    marginBottom: 32,
  },
  formContainer: {
    marginBottom: Spacing.blockGap,
  },
  fieldContainer: {
    marginBottom: Spacing.fieldToLabel,
  },
  input: {
    height: Dimensions.inputHeight,
    borderRadius: Dimensions.inputRadius,
    borderWidth: 1,
    borderColor: BrandColors.borders,
    backgroundColor: BrandColors.white,
    paddingHorizontal: 14,
    ...Typography.inputText,
  },
  inputError: {
    borderWidth: 2,
    borderColor: BrandColors.error,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordContainer: {
    marginTop: Spacing.fieldToHelper,
  },
  forgotPasswordText: {
    flexDirection: 'row',
  },
  errorText: {
    marginTop: 4,
  },
  socialContainer: {
    marginBottom: Spacing.blockGap,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    width: Dimensions.socialButtonSize,
    height: Dimensions.socialButtonSize,
    borderRadius: Dimensions.socialButtonRadius,
    borderWidth: 2,
    borderColor: BrandColors.accentOutline,
    backgroundColor: BrandColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.dividerMargin,
    marginBottom: Spacing.blockGap,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BrandColors.borders,
  },
  loginButton: {
    height: Dimensions.buttonHeight,
    borderRadius: Dimensions.buttonRadius,
    backgroundColor: BrandColors.primaryInk,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.footerGap,
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
  loginButtonDisabled: {
    opacity: 0.5,
  },
  footerContainer: {
    alignItems: 'flex-start',
  },
  footerText: {
    flexDirection: 'row',
  },
  footerLink: {
    textDecorationLine: 'underline',
  },
});
