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
      {/* Header with time and close button */}
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
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
                isActive && styles.activeDay
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
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
    paddingVertical: 15,
  },
  navArrow: {
    fontSize: 24,
    color: BrandColors.brandEmphasis,
    fontWeight: '600',
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: BrandColors.brandEmphasis,
    letterSpacing: 1,
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borders,
  },
  dayName: {
    fontSize: 11,
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
    paddingBottom: 10,
  },
  streakDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
    marginRight: 6,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#DC2626',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dayNumber: {
    fontSize: 14,
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
  activeCircle: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFB6C1', // Pink color
    zIndex: -1,
  },
});

