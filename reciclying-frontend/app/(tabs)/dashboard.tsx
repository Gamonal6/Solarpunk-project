import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { BrandColors, Typography, Spacing, Dimensions } from '@/constants/theme';

// Mock data
const MOCK_USER = {
  energy: 12,
  totalPoints: 1250,
  dailyRecycled: 3,
  dailyGoal: 5,
  streak: 7,
  position: 15,
};

const MOCK_CHALLENGES = [
  {
    id: 1,
    title: 'Weekly Warrior',
    subtitle: 'Recycle 20 items this week',
    progress: 15,
    total: 20,
    icon: 'trophy',
  },
  {
    id: 2,
    title: 'Eco Explorer',
    subtitle: 'Try 5 different recyclable materials',
    progress: 3,
    total: 5,
    icon: 'compass',
  },
];

const MOCK_LEADERBOARD = [
  { id: 1, name: 'Sarah Chen', points: 4520, avatar: '👩‍🎓', lastActive: '2 hours ago', rank: 1 },
  { id: 2, name: 'Mike Rodriguez', points: 3890, avatar: '👨‍💼', lastActive: '5 hours ago', rank: 2 },
  { id: 3, name: 'Emily Johnson', points: 3420, avatar: '👩‍🔬', lastActive: '1 day ago', rank: 3 },
  { id: 4, name: 'Alex Thompson', points: 2980, avatar: '👨‍🎨', lastActive: '2 days ago', rank: 4 },
  { id: 5, name: 'Jordan Lee', points: 2650, avatar: '👩‍💻', lastActive: '3 days ago', rank: 5 },
];

export default function DashboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'HOME' | 'USF'>('HOME');
  const [underlineAnimation] = useState(new Animated.Value(0));

  const handleTabPress = (tab: 'HOME' | 'USF') => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    setActiveTab(tab);
    
    // Animate underline
    Animated.timing(underlineAnimation, {
      toValue: tab === 'HOME' ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const renderTopStatusRow = () => (
    <View style={styles.statusRow}>
      <TouchableOpacity 
        style={[styles.chip, styles.energyChip]}
        onPress={() => {
          if (Platform.OS === 'ios') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          router.push('/streak/1' as any);
        }}
        accessibilityLabel="View streak details"
        accessibilityRole="button"
      >
        <Ionicons name="flash" size={16} color={BrandColors.brandEmphasis} />
        <Text style={Typography.chipText}>{MOCK_USER.energy}</Text>
      </TouchableOpacity>
      
      <View style={[styles.chip, styles.pointsChip]}>
        <Ionicons name="logo-bitcoin" size={16} color={BrandColors.primaryInk} />
        <Text style={Typography.chipText}>{MOCK_USER.totalPoints.toLocaleString()}</Text>
      </View>
    </View>
  );

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress('HOME')}
        accessibilityLabel="Switch to Home"
        accessibilityRole="button"
      >
        <Text style={[
          Typography.tabText,
          activeTab === 'HOME' ? Typography.tabTextActive : null
        ]}>
          HOME
        </Text>
        {activeTab === 'HOME' && <View style={[styles.tabUnderline, { left: 0, right: 0 }]} />}
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress('USF')}
        accessibilityLabel="Switch to USF"
        accessibilityRole="button"
      >
        <Text style={[
          Typography.tabText,
          activeTab === 'USF' ? Typography.tabTextActive : null
        ]}>
          USF
        </Text>
        {activeTab === 'USF' && <View style={[styles.tabUnderline, { left: 0, right: 0 }]} />}
      </TouchableOpacity>
    </View>
  );

  const renderCircularProgress = () => {
    const progress = MOCK_USER.dailyRecycled / MOCK_USER.dailyGoal;

    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressRing}>
          {/* Progress ring background */}
          <View style={[styles.progressTrack, { width: 160, height: 160, borderRadius: 80 }]} />
          {/* Progress ring fill */}
          <View style={[styles.progressFill, { 
            width: 160, 
            height: 160, 
            borderRadius: 80,
            borderWidth: 20,
            borderColor: BrandColors.brandEmphasis,
            transform: [{ rotate: `${progress * 360}deg` }]
          }]} />
          {/* Center content */}
          <View style={styles.progressCenter}>
            <Text style={[Typography.progressNumber, { fontSize: 32 }]}>
              {MOCK_USER.dailyRecycled}/{MOCK_USER.dailyGoal}
            </Text>
            <Text style={[Typography.cardMeta, { fontSize: 14 }]}>recycled</Text>
          </View>
        </View>
        
        <Text style={[Typography.fieldLabel, styles.progressLabel]}>DAILY RECYCLED</Text>
        
        <TouchableOpacity
          style={[styles.scanButton, MOCK_USER.dailyRecycled >= MOCK_USER.dailyGoal ? styles.scanButtonCompleted : null]}
          onPress={() => {
            if (Platform.OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            // TODO: Navigate to scan screen
          }}
          accessibilityLabel="Scan items"
          accessibilityRole="button"
        >
          <Text style={[Typography.buttonText, styles.scanButtonText]}>
            {MOCK_USER.dailyRecycled >= MOCK_USER.dailyGoal ? 'Add more' : 'Scan'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHomeTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Daily Recycled Card */}
      <View style={styles.card}>
        {renderCircularProgress()}
      </View>

      {/* Challenges Card */}
      <View style={styles.card}>
        <View style={styles.challengeHeader}>
          <Text style={Typography.cardTitle}>CHALLENGES</Text>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'ios') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              router.push('/challenges' as any);
            }}
          >
            <Text style={Typography.linkText}>see all</Text>
          </TouchableOpacity>
        </View>
        
        {MOCK_CHALLENGES.map((challenge, index) => (
          <View key={challenge.id}>
            <View style={styles.challengeItem}>
              <View style={styles.challengeIcon}>
                <Ionicons name={challenge.icon as any} size={20} color={BrandColors.primaryInk} />
              </View>
              <View style={styles.challengeContent}>
                <Text style={Typography.cardBody}>{challenge.title}</Text>
                <Text style={Typography.cardMeta}>{challenge.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={BrandColors.secondaryInk} />
            </View>
            
            <View style={styles.challengeProgress}>
              <View style={styles.progressBarTrack}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { width: `${(challenge.progress / challenge.total) * 100}%` }
                  ]} 
                />
              </View>
              <View style={styles.progressBadge}>
                <Text style={Typography.cardMeta}>{challenge.progress}/{challenge.total}</Text>
              </View>
            </View>
            
            {index < MOCK_CHALLENGES.length - 1 && <View style={styles.challengeDivider} />}
          </View>
        ))}
      </View>

      {/* Local Streak/Position Summary */}
      <View style={[styles.card, styles.summaryCard]}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryColumn}>
            <Text style={Typography.cardMeta}>POINTS</Text>
            <Text style={Typography.progressNumber}>{MOCK_USER.totalPoints}</Text>
          </View>
          <TouchableOpacity 
            style={styles.summaryColumn}
            onPress={() => {
              if (Platform.OS === 'ios') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }
              router.push('/streak/1' as any);
            }}
            accessibilityLabel="View streak details"
            accessibilityRole="button"
          >
            <Text style={Typography.cardMeta}>STREAK</Text>
            <Text style={Typography.progressNumber}>{MOCK_USER.streak}</Text>
          </TouchableOpacity>
          <View style={styles.summaryColumn}>
            <Text style={Typography.cardMeta}>POSITION</Text>
            <Text style={Typography.progressNumber}>#{MOCK_USER.position}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderUSFTab = () => {
    // Calculate proportional heights based on points
    const top3Users = MOCK_LEADERBOARD.slice(0, 3);
    const maxPoints = Math.max(...top3Users.map(user => user.points));
    const minHeight = 60; // Minimum bar height
    const maxHeight = 140; // Maximum bar height
    
    const calculateBarHeight = (points: number) => {
      const ratio = points / maxPoints;
      return Math.max(minHeight, Math.min(maxHeight, ratio * maxHeight));
    };

    return (
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Top 3 Podium Section */}
        <View style={styles.podiumSection}>
          <View style={styles.podiumContainer}>
            {/* Rank 1 - Tallest bar */}
            <View style={styles.podiumItem}>
              <View style={styles.podiumAvatar}>
                <Text style={styles.avatarText}>{top3Users[0].avatar}</Text>
              </View>
              <View style={[
                styles.podiumBar, 
                styles.firstPlaceBar, 
                { height: calculateBarHeight(top3Users[0].points) }
              ]}>
                <Text style={styles.podiumBarText}>{top3Users[0].points.toLocaleString()}</Text>
              </View>
              <Text style={styles.podiumName}>{top3Users[0].name}</Text>
              <Text style={styles.podiumSubtitle}>{top3Users[0].points.toLocaleString()} pts</Text>
            </View>

            {/* Rank 2 - Medium bar */}
            <View style={styles.podiumItem}>
              <View style={styles.podiumAvatar}>
                <Text style={styles.avatarText}>{top3Users[1].avatar}</Text>
              </View>
              <View style={[
                styles.podiumBar, 
                styles.secondPlaceBar, 
                { height: calculateBarHeight(top3Users[1].points) }
              ]}>
                <Text style={styles.podiumBarText}>{top3Users[1].points.toLocaleString()}</Text>
              </View>
              <Text style={styles.podiumName}>{top3Users[1].name}</Text>
              <Text style={styles.podiumSubtitle}>{top3Users[1].points.toLocaleString()} pts</Text>
            </View>

            {/* Rank 3 - Shortest bar */}
            <View style={styles.podiumItem}>
              <View style={styles.podiumAvatar}>
                <Text style={styles.avatarText}>{top3Users[2].avatar}</Text>
              </View>
              <View style={[
                styles.podiumBar, 
                styles.thirdPlaceBar, 
                { height: calculateBarHeight(top3Users[2].points) }
              ]}>
                <Text style={styles.podiumBarText}>{top3Users[2].points.toLocaleString()}</Text>
              </View>
              <Text style={styles.podiumName}>{top3Users[2].name}</Text>
              <Text style={styles.podiumSubtitle}>{top3Users[2].points.toLocaleString()} pts</Text>
            </View>
          </View>
        </View>

      {/* Ranked List Section */}
      <View style={styles.rankedListSection}>
        {MOCK_LEADERBOARD.map((user, index) => (
          <View key={user.id}>
            <TouchableOpacity
              style={styles.rankedRow}
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                // TODO: Navigate to user profile
              }}
              accessibilityLabel={`Rank ${user.rank}: ${user.name}, ${user.points} points`}
              accessibilityRole="button"
            >
              <Text style={styles.rankNumber}>
                {String(user.rank).padStart(2, '0')}
              </Text>
              
              <View style={styles.rankedAvatar}>
                <Text style={styles.avatarText}>{user.avatar}</Text>
              </View>
              
              <View style={styles.rankedContent}>
                <Text style={styles.rankedName}>{user.name}</Text>
                <Text style={styles.rankedSubtitle}>Active {user.lastActive}</Text>
              </View>
              
              <View style={styles.rankedPoints}>
                <Text style={styles.rankedPointsText}>{user.points.toLocaleString()}</Text>
                <View style={styles.pointsCoin}>
                  <Ionicons name="logo-bitcoin" size={12} color={BrandColors.primaryInk} />
                </View>
              </View>
            </TouchableOpacity>
            
            {index < MOCK_LEADERBOARD.length - 1 && <View style={styles.rankedDivider} />}
          </View>
        ))}
      </View>
    </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {renderTopStatusRow()}
      {renderTabBar()}
      
      {activeTab === 'HOME' ? renderHomeTab() : renderUSFTab()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.primaryBackground,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screen,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Dimensions.chipHeight,
    borderRadius: Dimensions.chipRadius,
    paddingHorizontal: 12,
    gap: 8,
  },
  energyChip: {
    backgroundColor: BrandColors.optionalSurface,
  },
  pointsChip: {
    backgroundColor: BrandColors.accentOutline,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screen,
    marginBottom: 8,
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    height: Dimensions.tabBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: BrandColors.brandEmphasis,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: Spacing.screen,
  },
  card: {
    backgroundColor: BrandColors.white,
    borderRadius: Dimensions.cardRadius,
    padding: 16,
    marginBottom: 20,
    // Shadow
    ...(Platform.OS === 'ios' ? {
      shadowColor: BrandColors.black,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    } : {
      elevation: 3,
    }),
  },
  summaryCard: {
    backgroundColor: BrandColors.accentOutline,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressRing: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressTrack: {
    position: 'absolute',
    borderWidth: 20,
    borderColor: BrandColors.borders,
  },
  progressFill: {
    position: 'absolute',
    borderWidth: 20,
    borderColor: BrandColors.brandEmphasis,
  },
  progressCenter: {
    alignItems: 'center',
  },
  progressLabel: {
    marginBottom: 20,
  },
  scanButton: {
    height: 48,
    borderRadius: Dimensions.buttonRadius,
    backgroundColor: BrandColors.accentOutline,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  scanButtonCompleted: {
    opacity: 0.8,
  },
  scanButtonText: {
    color: BrandColors.primaryInk,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  challengeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BrandColors.optionalSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  challengeContent: {
    flex: 1,
  },
  challengeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  progressBarTrack: {
    flex: 1,
    height: 4,
    backgroundColor: BrandColors.borders,
    borderRadius: 2,
  },
  progressBarFill: {
    height: 4,
    backgroundColor: BrandColors.brandEmphasis,
    borderRadius: 2,
  },
  progressBadge: {
    backgroundColor: BrandColors.apple,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  challengeDivider: {
    height: 1,
    backgroundColor: BrandColors.borders,
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryColumn: {
    alignItems: 'center',
  },
  // New Podium Section Styles
  podiumSection: {
    marginBottom: 24,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 24,
    gap: 20,
  },
  podiumItem: {
    alignItems: 'center',
    width: 70,
  },
  podiumAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BrandColors.optionalSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  podiumBar: {
    width: 65,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  firstPlaceBar: {
    backgroundColor: BrandColors.apple,
  },
  secondPlaceBar: {
    backgroundColor: BrandColors.brandEmphasis,
  },
  thirdPlaceBar: {
    backgroundColor: BrandColors.positiveAccent,
  },
  podiumBarText: {
    fontSize: 16,
    fontWeight: '700',
    color: BrandColors.white,
    textAlign: 'center',
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '500',
    color: BrandColors.primaryInk,
    textAlign: 'center',
    marginBottom: 2,
  },
  podiumSubtitle: {
    fontSize: 12,
    color: BrandColors.secondaryInk,
    textAlign: 'center',
  },
  
  // New Ranked List Styles
  rankedListSection: {
    backgroundColor: BrandColors.white,
    borderRadius: 16,
    paddingVertical: 8,
    // Shadow
    ...(Platform.OS === 'ios' ? {
      shadowColor: BrandColors.black,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    } : {
      elevation: 3,
    }),
  },
  rankedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 72,
  },
  rankNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: BrandColors.primaryInk,
    width: 40,
    textAlign: 'left',
  },
  rankedAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BrandColors.optionalSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  rankedContent: {
    flex: 1,
  },
  rankedName: {
    fontSize: 16,
    fontWeight: '500',
    color: BrandColors.primaryInk,
    marginBottom: 2,
  },
  rankedSubtitle: {
    fontSize: 12,
    color: BrandColors.secondaryInk,
  },
  rankedPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rankedPointsText: {
    fontSize: 16,
    fontWeight: '500',
    color: BrandColors.primaryInk,
  },
  pointsCoin: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: BrandColors.accentOutline,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankedDivider: {
    height: 1,
    backgroundColor: BrandColors.borders,
    marginLeft: 68,
  },
  avatarText: {
    fontSize: 20,
  },
});
