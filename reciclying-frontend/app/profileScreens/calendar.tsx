import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { BrandColors } from '@/constants/theme';

// This disables the default stack header in expo-router
export const unstable_settings = {
  headerShown: false,
};

export default function CalendarScreen() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // September 2025

  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = monthNames[month];

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Dates with activity (highlighted)
  const activeDates = [22, 23, 24, 25, 26, 27, 28, 29, 30];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(year, month + (direction === 'next' ? 1 : -1), 1));
  };

  // Generate calendar days
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <View style={styles.container}>
      {/* Header with close button */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeIcon}>X</Text>
        </Pressable>
      </View>

      {/* Month Navigation */}
      <View style={styles.monthNav}>
        <Pressable onPress={() => navigateMonth('prev')}>
          <Text style={styles.navArrow}>←</Text>
        </Pressable>
        <Text style={styles.monthTitle}>{monthName} {year}</Text>
        <Pressable onPress={() => navigateMonth('next')}>
          <Text style={styles.navArrow}>→</Text>
        </Pressable>
      </View>

      {/* Days of week header */}
      <View style={styles.daysHeader}>
        {dayNames.map((day) => (
          <Text key={day} style={styles.dayName}>
            {day}
          </Text>
        ))}
      </View>

      {/* Streak indicator */}
      <View style={styles.streakContainer}>
        <View style={styles.streakDot} />
        <Text style={styles.streakText}>STREAK</Text>
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <View key={`empty-${index}`} style={styles.calendarDay} />;
          }
          
          const isActive = activeDates.includes(day);
          const isPast = day <= 21;

          return (
            <View key={day} style={styles.calendarDay}>
              {isActive && <View style={styles.activeCircle} />}
              <Text style={[
                styles.dayNumber,
                isPast && !isActive && styles.pastDay,
                isActive && styles.activeDayGreen
              ]}>
                {String(day).padStart(2, '0')}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  closeButton: {
    padding: 5,
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  navArrow: {
    fontSize: 28,
    color: BrandColors.accentOutline,
    fontWeight: '600',
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: BrandColors.brandEmphasis,
    letterSpacing: 1,
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borders,
  },
  dayName: {
    fontSize: 13,
    fontWeight: '600',
    color: BrandColors.secondaryInk,
    flex: 1,
    textAlign: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
  },
  streakDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: BrandColors.brandEmphasis,
    marginRight: 8,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '700',
    color: BrandColors.brandEmphasis,
    letterSpacing: 0.5,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    minHeight: 50,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  pastDay: {
    color: '#999',
  },
  activeDay: {
    color: '#000',
    fontWeight: '600',
  },
  activeDayGreen: {
    color: BrandColors.brandEmphasis, // Green color for streak days
    fontWeight: '700',
    fontSize: 19,
  },
  activeCircle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: BrandColors.brandEmphasis, // Green color to match streak
    opacity: 0.2, // Subtle background highlight
    zIndex: -1,
  },
});

