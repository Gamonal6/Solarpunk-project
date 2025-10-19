import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { BrandColors, Typography, Spacing } from '@/constants/theme';

// Mock data for streak details
const MOCK_STREAK_DATA = {
  id: '1',
  title: '30-day recycling streak',
  subtitle: '30 days, 30 actions. Don\'t break the chain!',
  progress: 79,
  totalDays: 30,
  currentDay: 24,
  badgeIcon: 'flame',
  history: [
    { day: 24, action: 'Recycled', date: 'Dec 15, 2024', completed: true },
    { day: 23, action: 'Recycled', date: 'Dec 14, 2024', completed: true },
    { day: 22, action: 'Recycled', date: 'Dec 13, 2024', completed: true },
    { day: 21, action: 'Recycled', date: 'Dec 12, 2024', completed: true },
    { day: 20, action: 'Recycled', date: 'Dec 11, 2024', completed: true },
    { day: 19, action: 'Recycled', date: 'Dec 10, 2024', completed: true },
    { day: 18, action: 'Recycled', date: 'Dec 9, 2024', completed: true },
    { day: 17, action: 'Recycled', date: 'Dec 8, 2024', completed: true },
    { day: 16, action: 'Recycled', date: 'Dec 7, 2024', completed: true },
    { day: 15, action: 'Recycled', date: 'Dec 6, 2024', completed: true },
  ],
};

const MOCK_USER_POINTS = 1250;

export default function StreakDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const streakData = MOCK_STREAK_DATA; // In real app, fetch by id

  const handleBackPress = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const renderTopBar = () => (
    <View style={styles.topBar}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackPress}
        accessibilityLabel="Go back"
        accessibilityRole="button"
      >
        <Ionicons name="arrow-back" size={24} color={BrandColors.primaryInk} />
      </TouchableOpacity>
      
      <View style={styles.pointsBadge}>
        <Ionicons name="logo-bitcoin" size={16} color={BrandColors.primaryInk} />
        <Text style={styles.pointsText}>{MOCK_USER_POINTS.toLocaleString()}</Text>
      </View>
    </View>
  );

  const renderStreakBadge = () => (
    <View style={styles.badgeSection}>
      <View style={styles.streakBadge}>
        {/* Outer circle with border */}
        <View style={styles.badgeOuter}>
          {/* Inner graphic */}
          <View style={styles.badgeInner}>
            <Ionicons name={streakData.badgeIcon as any} size={40} color={BrandColors.brandEmphasis} />
          </View>
        </View>
      </View>
    </View>
  );

  const renderStreakInfo = () => (
    <View style={styles.streakInfoSection}>
      <Text style={styles.streakTitle}>{streakData.title}</Text>
      <Text style={styles.streakSubtitle}>{streakData.subtitle}</Text>
    </View>
  );

  const renderProgressSection = () => (
    <View style={styles.progressSection}>
      <View style={styles.progressBarTrack}>
        <View 
          style={[
            styles.progressBarFill, 
            { width: `${streakData.progress}%` }
          ]} 
        />
      </View>
      <Text style={styles.progressLabel}>{streakData.progress}% complete</Text>
    </View>
  );

  const renderHistorySection = () => (
    <View style={styles.historySection}>
      <Text style={styles.historyHeader}>HISTORY</Text>
      
      {streakData.history.map((entry, index) => (
        <View key={index} style={styles.historyRow}>
          <Text style={styles.dayNumber}>
            {String(entry.day).padStart(2, '0')}
          </Text>
          <Text style={styles.actionText}>{entry.action}</Text>
          <Text style={styles.dateText}>{entry.date}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderTopBar()}
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderStreakBadge()}
        {renderStreakInfo()}
        {renderProgressSection()}
        {renderHistorySection()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.primaryBackground,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screen,
    paddingTop: 24,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.accentOutline,
    borderRadius: 16,
    height: 28,
    paddingHorizontal: 12,
    gap: 6,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '500',
    color: BrandColors.primaryInk,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.screen,
    paddingBottom: 40,
  },
  
  // Streak Badge Section
  badgeSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  streakBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: BrandColors.optionalSurface,
    borderWidth: 2,
    borderColor: BrandColors.accentOutline,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: BrandColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    // Subtle shadow for depth
    ...(Platform.OS === 'ios' ? {
      shadowColor: BrandColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    } : {
      elevation: 2,
    }),
  },
  
  // Streak Info Section
  streakInfoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: BrandColors.primaryInk,
    textAlign: 'center',
    marginBottom: 12,
  },
  streakSubtitle: {
    fontSize: 14,
    color: BrandColors.secondaryInk,
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Progress Section
  progressSection: {
    marginBottom: 24,
  },
  progressBarTrack: {
    width: '100%',
    height: 6,
    backgroundColor: BrandColors.borders,
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: BrandColors.brandEmphasis,
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 12,
    color: BrandColors.secondaryInk,
    textAlign: 'left',
  },
  
  // History Section
  historySection: {
    marginTop: 24,
  },
  historyHeader: {
    fontSize: 12,
    color: BrandColors.secondaryInk,
    fontWeight: '600',
    letterSpacing: 0.24, // +2% tracking
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    minHeight: 40,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: BrandColors.brandEmphasis,
    width: 30,
    textAlign: 'left',
  },
  actionText: {
    fontSize: 14,
    color: BrandColors.primaryInk,
    flex: 1,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 12,
    color: BrandColors.secondaryInk,
    width: 80,
    textAlign: 'right',
  },
});
