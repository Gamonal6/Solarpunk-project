import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { BrandColors } from '@/constants/theme';

// This disables the default stack header in expo-router
export const unstable_settings = {
  headerShown: false,
};

const { width } = Dimensions.get('window');
const stampWidth = (width - 60) / 3; // 3 stamps per row with margins

interface Stamp {
  id: string;
  emoji: string;
  label: string;
  requirement: string;
  unlocked: boolean;
}

export default function StampsScreen() {
  const router = useRouter();

  // Define all available stamps
  const stamps: Stamp[] = [
    // Streak stamps
    { id: '1', emoji: '🔥', label: '3-day streak', requirement: 'Recycle 3 days in a row', unlocked: true },
    { id: '2', emoji: '🔥', label: '7-day streak', requirement: 'Recycle 7 days in a row', unlocked: true },
    { id: '3', emoji: '🔥', label: '14-day streak', requirement: 'Recycle 14 days in a row', unlocked: false },
    { id: '4', emoji: '🔥', label: '30-day streak', requirement: 'Recycle 30 days in a row', unlocked: false },
    { id: '5', emoji: '🔥', label: '60-day streak', requirement: 'Recycle 60 days in a row', unlocked: false },
    { id: '6', emoji: '🔥', label: '100-day streak', requirement: 'Recycle 100 days in a row', unlocked: false },
    
    // Items recycled stamps
    { id: '7', emoji: '♻️', label: '5 items', requirement: 'Recycle 5 items', unlocked: true },
    { id: '8', emoji: '♻️', label: '10 items', requirement: 'Recycle 10 items', unlocked: false },
    { id: '9', emoji: '♻️', label: '25 items', requirement: 'Recycle 25 items', unlocked: false },
    { id: '10', emoji: '♻️', label: '50 items', requirement: 'Recycle 50 items', unlocked: false },
    { id: '11', emoji: '♻️', label: '100 items', requirement: 'Recycle 100 items', unlocked: false },
    { id: '12', emoji: '♻️', label: '250 items', requirement: 'Recycle 250 items', unlocked: false },
    
    // Points stamps
    { id: '13', emoji: '⭐', label: '1,000 points', requirement: 'Earn 1,000 points', unlocked: true },
    { id: '14', emoji: '⭐', label: '5,000 points', requirement: 'Earn 5,000 points', unlocked: true },
    { id: '15', emoji: '⭐', label: '10,000 points', requirement: 'Earn 10,000 points', unlocked: false },
    { id: '16', emoji: '⭐', label: '25,000 points', requirement: 'Earn 25,000 points', unlocked: false },
    { id: '17', emoji: '⭐', label: '50,000 points', requirement: 'Earn 50,000 points', unlocked: false },
    { id: '18', emoji: '⭐', label: '100,000 points', requirement: 'Earn 100,000 points', unlocked: false },
    
    // Special achievement stamps
    { id: '19', emoji: '🌱', label: 'Eco Warrior', requirement: 'Recycle 5 different item types', unlocked: false },
    { id: '20', emoji: '🌍', label: 'Planet Saver', requirement: 'Recycle 100 items in one month', unlocked: false },
    { id: '21', emoji: '💚', label: 'Green Champion', requirement: 'Maintain a 30-day streak', unlocked: false },
    { id: '22', emoji: '🏆', label: 'Recycling Master', requirement: 'Recycle 500 total items', unlocked: false },
    { id: '23', emoji: '🌟', label: 'Weekly Hero', requirement: 'Recycle every day for a week', unlocked: true },
    { id: '24', emoji: '🎯', label: 'Perfect Week', requirement: 'Recycle 7 days straight', unlocked: true },
    
    // Monthly stamps
    { id: '25', emoji: '📅', label: 'Monthly Goal', requirement: 'Recycle 20 items in a month', unlocked: false },
    { id: '26', emoji: '📅', label: 'Monthly Master', requirement: 'Recycle 50 items in a month', unlocked: false },
    { id: '27', emoji: '📅', label: 'Monthly Legend', requirement: 'Recycle 100 items in a month', unlocked: false },
  ];

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <Text style={styles.back} onPress={() => router.back()}>
          {'<'}
        </Text>
        <Text style={styles.headerTitle}>Stamps</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Scrollable stamps grid */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.stampsGrid}>
          {stamps.map((stamp) => (
            <View 
              key={stamp.id} 
              style={[
                styles.stampCard,
                !stamp.unlocked && styles.stampCardLocked
              ]}
            >
              <Text style={[
                styles.stampEmoji,
                !stamp.unlocked && styles.stampEmojiLocked
              ]}>
                {stamp.unlocked ? stamp.emoji : '🔒'}
              </Text>
              <Text style={[
                styles.stampLabel,
                !stamp.unlocked && styles.stampLabelLocked
              ]}>
                {stamp.label}
              </Text>
              <Text style={[
                styles.stampRequirement,
                !stamp.unlocked && styles.stampRequirementLocked
              ]}>
                {stamp.requirement}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 15,
    backgroundColor: BrandColors.brandEmphasis,
  },
  back: {
    fontSize: 22,
    color: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  placeholder: {
    width: 22,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
  },
  stampsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  stampCard: {
    width: stampWidth,
    padding: 12,
    backgroundColor: '#fff7e7',
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffdfb0',
    marginBottom: 15,
    minHeight: 140,
    justifyContent: 'center',
  },
  stampCardLocked: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
    opacity: 0.6,
  },
  stampEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  stampEmojiLocked: {
    fontSize: 28,
  },
  stampLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  stampLabelLocked: {
    color: '#999',
  },
  stampRequirement: {
    fontSize: 9,
    color: '#666',
    textAlign: 'center',
    lineHeight: 12,
  },
  stampRequirementLocked: {
    color: '#999',
  },
});

