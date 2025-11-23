import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { BrandColors } from '@/constants/theme';

export default function PointsHistory() {
  const router = useRouter();

  const history = [
    { day: 12, action: 'Recycled', date: 'Sep 12, 2025', points: 3000, month: 'Sep' },
    { day: 23, action: 'Recycled', date: 'Sep 23, 2025', points: 5000, month: 'Sep' },
    { day: 28, action: 'Recycled', date: 'Sep 28, 2025', points: 2000, month: 'Sep' },
    { day: 1, action: 'Recycled', date: 'Aug 1, 2025', points: 1500, month: 'Aug' },
    { day: 15, action: 'Recycled', date: 'Aug 15, 2025', points: 1500, month: 'Aug' },
    { day: 22, action: 'Recycled', date: 'Aug 22, 2025', points: 2500, month: 'Aug' },
    { day: 5, action: 'Recycled', date: 'July 5, 2025', points: 1800, month: 'Jul' },
    { day: 12, action: 'Recycled', date: 'July 12, 2025', points: 2000, month: 'Jul' },
    { day: 25, action: 'Recycled', date: 'July 25, 2025', points: 3200, month: 'Jul' },
    { day: 3, action: 'Recycled', date: 'June 3, 2025', points: 1200, month: 'Jun' },
    { day: 14, action: 'Recycled', date: 'June 14, 2025', points: 1000, month: 'Jun' },
    { day: 20, action: 'Recycled', date: 'June 20, 2025', points: 1500, month: 'Jun' },
    { day: 8, action: 'Recycled', date: 'May 8, 2025', points: 2000, month: 'May' },
    { day: 18, action: 'Recycled', date: 'May 18, 2025', points: 1800, month: 'May' },
  ].sort((a, b) => {
    // Sort by date (most recent first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Calculate total points
  const totalPoints = history.reduce((sum, item) => sum + item.points, 0);

  // Group points by month
  const monthlyData = history.reduce((acc, item) => {
    if (!acc[item.month]) {
      acc[item.month] = 0;
    }
    acc[item.month] += item.points;
    return acc;
  }, {} as Record<string, number>);

  // Define month order (May on left, Sep on right)
  const monthOrder = ['May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const graphData = monthOrder.map(month => ({
    month,
    points: monthlyData[month] || 0,
  }));

  // Find max points for scaling
  const maxPoints = Math.max(...graphData.map(d => d.points), 1);

  return (
    <View style={styles.container}>
      {/* BACK + POINTS - Fixed at top */}
      <View style={styles.topRow}>
        <Text style={styles.back} onPress={() => router.back()}>
          {'<'}
        </Text>
        <Text style={styles.points}>⭐ {totalPoints.toLocaleString()}</Text>
      </View>

      {/* Scrollable content */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* BAR GRAPH WITH MONTHS */}
        <View style={styles.graphCard}>
          {/* GRAPH HEADER */}
          <Text style={styles.sectionLabel}>RECEIVED POINTS</Text>
          <View style={styles.graphContainer}>
            {/* Graph area */}
            <View style={styles.graphArea}>
              {/* Bars */}
              <View style={styles.graphRow}>
                {graphData.map((data, idx) => (
                  <View key={idx} style={styles.graphBarWrapper}>
                    <View
                      style={[
                        styles.graphBar,
                        { height: (data.points / maxPoints) * 200 },
                      ]}
                    />
                    <Text style={styles.monthLabel}>{data.month}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Y-axis labels */}
            <View style={styles.yAxisContainer}>
              {[4, 3, 2, 1, 0].map((multiplier) => {
                const value = Math.round((maxPoints / 4) * multiplier);
                return (
                  <Text key={multiplier} style={styles.yAxisLabel}>
                    {value > 0 ? value.toLocaleString() : ''}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>

        {/* HISTORY LIST */}
        <View style={styles.historyCard}>
          <Text style={styles.sectionLabel}>HISTORY</Text>
          {history.map((item, i) => (
            <View key={i} style={[styles.historyItem, i === 0 && styles.historyItemFirst]}>
              <View>
                <Text style={styles.dayText}>{String(item.day).padStart(2, '0')}</Text>
                <Text style={styles.action}>{item.action}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text style={styles.historyPoints}>⭐ {item.points}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 15,
    backgroundColor: BrandColors.brandEmphasis,
  },
  scrollContent: {
    flex: 1,
  },
  back: { fontSize: 22, marginRight: 20, color: 'white' },
  points: { fontSize: 20, fontWeight: '700', color: 'white', },
  sectionLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: BrandColors.brandEmphasis,
    marginBottom: 15,
  },
  graphCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    padding: 20,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 20,
    paddingBottom: 10,
  },
  graphContainer: {
    flexDirection: 'row',
    height: 250,
  },
  yAxisContainer: {
    justifyContent: 'space-between',
    paddingLeft: 8,
    height: 200,
    marginTop: 20,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#666',
  },
  graphArea: {
    flex: 1,
  },
  graphRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    marginTop: 20,
  },
  graphBarWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  graphBar: {
    width: 20,
    backgroundColor: BrandColors.accentOutline,
    borderRadius: 10,
    marginBottom: 5,
  },
  monthLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  historyCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    padding: 20,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  historyItemFirst: {
    marginTop: 0,
  },
  dayText: { fontSize: 22, fontWeight: '800', color: BrandColors.accentOutline },
  action: { fontSize: 14, fontWeight: '600' },
  date: { color: '#888', fontSize: 11 },
  historyPoints: { fontSize: 14, fontWeight: '700', color: "black" },
});
