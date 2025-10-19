import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { BrandColors, Typography, Spacing, Dimensions } from '@/constants/theme';

// Mock data for challenges
const MOCK_CHALLENGES = [
  {
    id: 1,
    title: 'Weekly Warrior',
    subtitle: 'Recycle 20 items this week',
    progress: 15,
    total: 20,
    percentage: 75,
    icon: 'trophy',
    type: 'recycling',
    badgeColor: BrandColors.brandEmphasis,
  },
  {
    id: 2,
    title: 'Eco Explorer',
    subtitle: 'Try 5 different recyclable materials',
    progress: 3,
    total: 5,
    percentage: 60,
    icon: 'compass',
    type: 'recycling',
    badgeColor: BrandColors.brandEmphasis,
  },
  {
    id: 3,
    title: 'Green Streak',
    subtitle: 'Recycle every day for 7 days',
    progress: 5,
    total: 7,
    percentage: 71,
    icon: 'flame',
    type: 'streak',
    badgeColor: BrandColors.apple,
  },
  {
    id: 4,
    title: 'Plastic Free Week',
    subtitle: 'Avoid single-use plastic for 7 days',
    progress: 2,
    total: 7,
    percentage: 29,
    icon: 'leaf',
    type: 'streak',
    badgeColor: BrandColors.apple,
  },
  {
    id: 5,
    title: 'Campus Cleanup',
    subtitle: 'Help clean up 10 areas on campus',
    progress: 7,
    total: 10,
    percentage: 70,
    icon: 'trash',
    type: 'recycling',
    badgeColor: BrandColors.brandEmphasis,
  },
  {
    id: 6,
    title: 'Compost Champion',
    subtitle: 'Compost organic waste for 14 days',
    progress: 0,
    total: 14,
    percentage: 0,
    icon: 'nutrition',
    type: 'streak',
    badgeColor: BrandColors.apple,
  },
];

const MOCK_USER_POINTS = 1250;

export default function ChallengesScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const handleChallengePress = (challenge: any) => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Navigate to streak detail for streak challenges
    if (challenge.type === 'streak') {
      router.push(`/streak/${challenge.id}` as any);
    } else {
      // TODO: Navigate to other challenge detail pages
      console.log('Challenge pressed:', challenge.title);
    }
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
      
      <Text style={styles.topBarTitle}>CHALLENGES</Text>
      
      <View style={styles.pointsBadge}>
        <Ionicons name="logo-bitcoin" size={16} color={BrandColors.primaryInk} />
        <Text style={styles.pointsText}>{MOCK_USER_POINTS.toLocaleString()}</Text>
      </View>
    </View>
  );

  const renderChallengeCard = (challenge: any) => (
    <TouchableOpacity
      key={challenge.id}
      style={styles.challengeCard}
      onPress={() => handleChallengePress(challenge)}
      accessibilityLabel={`${challenge.title}: ${challenge.progress} of ${challenge.total} completed`}
      accessibilityRole="button"
    >
      <View style={styles.cardContent}>
        {/* Left side - Badge */}
        <View style={[styles.challengeBadge, { backgroundColor: challenge.badgeColor }]}>
          <Ionicons name={challenge.icon as any} size={24} color={BrandColors.white} />
        </View>
        
        {/* Right side - Content */}
        <View style={styles.challengeContent}>
          <View style={styles.challengeText}>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <Text style={styles.challengeSubtitle}>{challenge.subtitle}</Text>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBarTrack}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${challenge.percentage}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressPercentage}>{challenge.percentage}%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderTopBar()}
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_CHALLENGES.map(renderChallengeCard)}
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
  topBarTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: BrandColors.primaryInk,
    textAlign: 'center',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BrandColors.accentOutline,
    borderRadius: Dimensions.chipRadius,
    height: Dimensions.chipHeight,
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
  challengeCard: {
    backgroundColor: BrandColors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BrandColors.borders,
    padding: 16,
    marginBottom: 20,
    // Shadow
    ...(Platform.OS === 'ios' ? {
      shadowColor: BrandColors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    } : {
      elevation: 2,
    }),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  challengeContent: {
    flex: 1,
  },
  challengeText: {
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: BrandColors.primaryInk,
    marginBottom: 4,
  },
  challengeSubtitle: {
    fontSize: 13,
    color: BrandColors.secondaryInk,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: BrandColors.borders,
    borderRadius: 3,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: BrandColors.brandEmphasis,
    borderRadius: 3,
  },
  progressPercentage: {
    fontSize: 12,
    color: BrandColors.secondaryInk,
    minWidth: 30,
    textAlign: 'right',
  },
});
