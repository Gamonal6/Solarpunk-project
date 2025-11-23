import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter} from 'expo-router';

export const unstable_settings = {
  headerShown: false,
};

export default function PointsHistory() {
  const router = useRouter();

  const history = [
    { day: 5, action: 'Recycled', date: 'Sep 23, 2025', points: 5000 },
    { day: 15, action: 'Recycled', date: 'Aug 15, 2025', points: 1500 },
    { day: 15, action: 'Recycled', date: 'Aug 1, 2025', points: 1500 },
    { day: 20, action: 'Recycled', date: 'July 12, 2025', points: 2000 },
    { day: 10, action: 'Recycled', date: 'June 14, 2025', points: 1000 },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* BACK + POINTS */}
      <View style={styles.topRow}>
        <Text style={styles.back} onPress={() => router.back()}>
          {'<'}
        </Text>
        <Text style={styles.points}>🪙 7,000</Text>
      </View>

      {/* GRAPH HEADER */}
      <Text style={styles.sectionLabel}>RECEIVED POINTS</Text>

      {/* SIMPLE GRAPH MOCKUP */}
      <View style={styles.graphRow}>
        {[800, 1200, 1600, 2400, 3600, 4000, 5000].map((h, idx) => (
          <View key={idx} style={[styles.graphBar, { height: h / 20 }]} />
        ))}
      </View>

      {/* HISTORY LIST */}
      <Text style={[styles.sectionLabel, { marginTop: 30 }]}>HISTORY</Text>

      {history.map((item, i) => (
        <View key={i} style={styles.historyItem}>
          <View>
            <Text style={styles.dayText}>{String(item.day).padStart(2, '0')}</Text>
            <Text style={styles.action}>{item.action}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <Text style={styles.historyPoints}>🪙 {item.points}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', flex: 1, paddingTop: 60 },

  topRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25 },
  back: { fontSize: 22, marginRight: 20 },
  points: { fontSize: 20, fontWeight: '700' },

  sectionLabel: {
    marginTop: 25,
    marginLeft: 25,
    fontSize: 13,
    fontWeight: '700',
    color: '#777',
  },

  graphRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  graphBar: {
    width: 18,
    backgroundColor: '#f2cf32',
    borderRadius: 10,
  },

  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 25,
  },
  dayText: { fontSize: 22, fontWeight: '700' },
  action: { fontSize: 14, fontWeight: '600' },
  date: { color: '#888', fontSize: 11 },
  historyPoints: { fontSize: 14, fontWeight: '700', color: '#f2cf32' },
});
