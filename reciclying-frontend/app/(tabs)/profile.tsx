import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { BrandColors } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileHeader />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <CalendarPreview />
        </View>

        {/* Stamp Section placeholder */}

        <View>
          <PointsActivity />
        </View>
      </ScrollView>
    </View>
  );
}

/* -----------------------------------------------------------
   PROFILE HEADER
----------------------------------------------------------- */
function ProfileHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{
          uri: 'https://hips.hearstapps.com/hmg-prod/images/cristiano-ronaldo-of-portugal-during-the-uefa-nations-news-photo-1748359673.pjpeg?crop=0.610xw:0.917xh;0.317xw,0.0829xh&resize=640:*',
        }}
        style={styles.avatar}
      />

      <Text style={styles.name}>John Doe</Text>

      <View style={styles.headerRowStats}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Points</Text>
          <Text style={styles.statBig}>(# points)</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Longest Streak</Text>
          <Text style={styles.statBig}>Streak #</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Recycled</Text>
          <Text style={styles.statBig}># Recycled</Text>
        </View>
      </View>
    </View>
  );
}

/* -----------------------------------------------------------
   CALENDAR PREVIEW
----------------------------------------------------------- */
function CalendarPreview() {
  const days = ['22', '23', '24', '25', '26', '27', '28'];

  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Calendar</Text>
        <Text style={styles.seeAll}>see all</Text>
      </View>

      <View style={styles.calendarRow}>
        {days.map((day) => (
          <View key={day} style={styles.circleContainer}>
            <View style={styles.circle} />
            <Text style={styles.dayLabel}>{day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/* -----------------------------------------------------------
   POINTS ACTIVITY
----------------------------------------------------------- */
function PointsActivity() {
  const router = useRouter();

  const items = [
    { date: 'Sep 05, 2025', action: 'Recycled', points: 5000 },
    { date: 'Aug 15, 2025', action: 'Recycled', points: 1500 },
    { date: 'Aug 15, 2025', action: 'Recycled', points: 1500 },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Points Activity</Text>

        <Pressable onPress={() => router.push('./PointsHistory')}>
          <Text style={styles.seeAll}>see all</Text>
        </Pressable>
      </View>

      {items.map((item, index) => (
        <View key={index} style={styles.activityRow}>
          <View>
            <Text style={styles.action}>{item.action}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <Text style={styles.points}>⭐ {item.points}</Text>
        </View>
      ))}
    </View>
  );
}

/* -----------------------------------------------------------
   STYLES
----------------------------------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  /* Header */
  headerContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    padding: 15,
    backgroundColor: BrandColors.brandEmphasis,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 999,
    marginBottom: 10,
  },
  name: {
    fontSize: 23,
    fontWeight: '600',
    marginBottom: 20,
    color: BrandColors.accentOutline,
  },
  headerRowStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statBox: {
    alignItems: 'center',
  },
  statBig: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },

  /* Sections */
  section: {
    marginTop: 20,
  },

  /* Card shared styles */
  card: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    padding: 20,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 19,
  },
  seeAll: {
    color: 'green',
    fontWeight: '500',
  },

  /* Calendar */
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: BrandColors.brandEmphasis,
  },
  dayLabel: {
    marginTop: 4,
    fontSize: 10,
  },

  /* Points Activity */
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  action: {
    fontSize: 14,
    fontWeight: '500',
  },
  date: {
    fontSize: 11,
    color: '#777',
  },
  points: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
});
