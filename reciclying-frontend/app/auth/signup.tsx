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
  Modal,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { BrandColors, Typography, Spacing, Dimensions } from '@/constants/theme';

interface School {
  id: string;
  name: string;
}

const MOCK_SCHOOLS: School[] = [
  { id: '1', name: 'University of South Florida' },
  { id: '2', name: 'Florida State University' },
  { id: '3', name: 'University of Florida' },
  { id: '4', name: 'Florida International University' },
  { id: '5', name: 'University of Central Florida' },
  { id: '6', name: 'Florida Atlantic University' },
  { id: '7', name: 'Florida A&M University' },
  { id: '8', name: 'New College of Florida' },
];

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      school: '',
    };

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!selectedSchool) {
      newErrors.school = 'Please select your school';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const isFormValid = validateEmail(email) && 
                     validatePassword(password) && 
                     password === confirmPassword && 
                     selectedSchool !== null;

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) setErrors({ ...errors, email: '' });
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password) setErrors({ ...errors, password: '' });
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
  };

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    setShowSchoolModal(false);
    if (errors.school) setErrors({ ...errors, school: '' });
    
    // Haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    try {
      // TODO: Implement actual signup logic
      console.log('Signup attempt:', { email, password, school: selectedSchool });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Signup Failed', 'Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginPress = () => {
    // Haptic feedback
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    router.push('/auth/login' as any);
  };

  const handleDismiss = () => {
    router.back();
  };

  const renderSchoolItem = ({ item }: { item: School }) => (
    <TouchableOpacity
      style={styles.schoolItem}
      onPress={() => handleSchoolSelect(item)}
    >
      <Text style={Typography.inputText}>{item.name}</Text>
      {selectedSchool?.id === item.id && (
        <Ionicons name="checkmark" size={20} color={BrandColors.brandEmphasis} />
      )}
    </TouchableOpacity>
  );

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
            <Text style={Typography.title}>SIGN </Text>
            <Text style={Typography.titleSecond}>UP</Text>
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
                errors.email ? styles.inputError : null,
              ]}
              value={email}
              onChangeText={handleEmailChange}
              placeholder="Enter your email"
              placeholderTextColor={`${BrandColors.secondaryInk}B3`}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
            {errors.email ? (
              <Text style={[Typography.errorText, styles.errorText]}>
                {errors.email}
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
                  errors.password ? styles.inputError : null,
                ]}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Create a password"
                placeholderTextColor={`${BrandColors.secondaryInk}B3`}
                secureTextEntry={!showPassword}
                returnKeyType="next"
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
            {errors.password ? (
              <Text style={[Typography.errorText, styles.errorText]}>
                {errors.password}
              </Text>
            ) : null}
          </View>

          {/* Confirm Password Field */}
          <View style={styles.fieldContainer}>
            <Text style={Typography.fieldLabel}>CONFIRM PASSWORD</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  errors.confirmPassword ? styles.inputError : null,
                ]}
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                placeholder="Confirm your password"
                placeholderTextColor={`${BrandColors.secondaryInk}B3`}
                secureTextEntry={!showConfirmPassword}
                returnKeyType="next"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                accessibilityLabel="Toggle password visibility"
                accessibilityRole="button"
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={24}
                  color={BrandColors.secondaryInk}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? (
              <Text style={[Typography.errorText, styles.errorText]}>
                {errors.confirmPassword}
              </Text>
            ) : null}
          </View>

          {/* School Field */}
          <View style={styles.fieldContainer}>
            <Text style={Typography.fieldLabel}>SCHOOL</Text>
            <TouchableOpacity
              style={[
                styles.input,
                styles.schoolSelector,
                errors.school ? styles.inputError : null,
              ]}
              onPress={() => setShowSchoolModal(true)}
              accessibilityLabel="Select your school"
              accessibilityRole="button"
            >
              <Text style={[
                selectedSchool ? Typography.inputText : Typography.placeholderText
              ]}>
                {selectedSchool ? selectedSchool.name : 'Select your school'}
              </Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={BrandColors.secondaryInk}
              />
            </TouchableOpacity>
            {errors.school ? (
              <Text style={[Typography.errorText, styles.errorText]}>
                {errors.school}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Social Login */}
        <View style={styles.socialContainer}>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Alert.alert('Apple Signup', 'Apple signup will be implemented.')}
              accessibilityLabel="Continue with Apple"
              accessibilityRole="button"
            >
              <Ionicons name="logo-apple" size={24} color={BrandColors.primaryInk} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Alert.alert('Google Signup', 'Google signup will be implemented.')}
              accessibilityLabel="Continue with Google"
              accessibilityRole="button"
            >
              <Ionicons name="logo-google" size={24} color={BrandColors.primaryInk} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Alert.alert('Facebook Signup', 'Facebook signup will be implemented.')}
              accessibilityLabel="Continue with Facebook"
              accessibilityRole="button"
            >
              <Ionicons name="logo-facebook" size={24} color={BrandColors.primaryInk} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => Alert.alert('X Signup', 'X signup will be implemented.')}
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

        {/* Signup Button */}
        <TouchableOpacity
          style={[
            styles.signupButton,
            !isFormValid ? styles.signupButtonDisabled : null,
          ]}
          onPress={handleSignup}
          disabled={!isFormValid || isLoading}
          accessibilityLabel="Create your account"
          accessibilityRole="button"
        >
          <Text style={Typography.buttonText}>
            {isLoading ? 'LOADING...' : 'CREATE YOUR ACCOUNT'}
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            <Text style={Typography.footerText}>I have an account? </Text>
            <Text 
              style={[Typography.linkText, styles.footerLink]}
              onPress={handleLoginPress}
            >
              log in
            </Text>
          </Text>
        </View>
      </ScrollView>

      {/* School Selection Modal */}
      <Modal
        visible={showSchoolModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={[Typography.title, styles.modalTitle]}>Select School</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowSchoolModal(false)}
            >
              <Ionicons name="close" size={24} color={BrandColors.primaryInk} />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={MOCK_SCHOOLS}
            keyExtractor={(item) => item.id}
            renderItem={renderSchoolItem}
            style={styles.schoolList}
          />
        </View>
      </Modal>
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
  schoolSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  signupButton: {
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
  signupButtonDisabled: {
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
  modalContainer: {
    flex: 1,
    backgroundColor: BrandColors.primaryBackground,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: Spacing.screen,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borders,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalCloseButton: {
    width: Dimensions.dismissButtonSize,
    height: Dimensions.dismissButtonSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  schoolList: {
    flex: 1,
    paddingHorizontal: Spacing.screen,
  },
  schoolItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borders,
  },
});
