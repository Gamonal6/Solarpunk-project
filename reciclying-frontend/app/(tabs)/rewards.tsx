import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Svg, { Circle } from 'react-native-svg';

import { BrandColors } from '@/constants/theme';

// This disables the default stack header in expo-router
export const unstable_settings = {
  headerShown: false,
};

interface BrandReward {
  id: string;
  name: string;
  logo?: string;
  progress: number;
  total: number;
  image?: string;
  points?: number;
}

const MOCK_BRANDS: BrandReward[] = [
  {
    id: '2',
    name: 'Chick-fil-A',
    progress: 1,
    total: 10,
    points: 10,
    logo: 'https://logos-world.net/wp-content/uploads/2021/08/Chick-fil-A-Logo.png'
  },
  {
    id: '4',
    name: 'Starbucks',
    progress: 1,
    total: 5,
    points: 5,
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/Starbucks-Logo.png'
  },
  {
    id: '5',
    name: 'Panda Express',
    progress: 1,
    total: 15,
    points: 15,
    logo: 'https://logos-world.net/wp-content/uploads/2022/02/Panda-Express-Logo.png'
  },
];

const MOCK_REDEEMED = [
  {
    id: '1',
    name: 'Chick-fil-A',
    value: '$15.00',
    points: 1069,
    logo: 'https://logos-world.net/wp-content/uploads/2021/08/Chick-fil-A-Logo.png'
  },
];

export default function RewardsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'POINTS' | 'REDEEMED'>('POINTS');

  const handleTabPress = (tab: 'POINTS' | 'REDEEMED') => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setActiveTab(tab);
  };

  const CircleProgress = ({ progress, total }: { progress: number; total: number }) => {
    const size = 50;
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const percent = progress / total;
    const strokeDashoffset = circumference - percent * circumference;

    return (
      <View style={styles.circleContainer}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={BrandColors.borders}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FFD700"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        <View style={styles.circleTextContainer}>
          <Text style={styles.circleText}>{`${progress} / ${total}`}</Text>
        </View>
      </View>
    );
  };

  const renderPointsTab = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {MOCK_BRANDS.map((brand) => (
        <TouchableOpacity
          key={brand.id}
          style={styles.brandCard}
          onPress={() => {
            if (Platform.OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
          }}
        >
          <View style={styles.brandRow}>
            <View style={styles.brandInfo}>
              <View style={styles.brandLogoPlaceholder}>
                {brand.logo ? (
                  <Image
                    source={{ uri: brand.logo }}
                    style={styles.brandLogo}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={styles.brandLogoText}>{brand.name.charAt(0)}</Text>
                )}
              </View>

              <View style={styles.brandDetails}>
                <Text style={styles.brandName}>{brand.name}</Text>
                {brand.points && (
                  <Text style={styles.brandPoints}>${brand.points}</Text>
                )}
              </View>
            </View>

            <CircleProgress progress={brand.progress} total={brand.total} />
          </View>

          {brand.image && (
            <View style={styles.brandImagePlaceholder}>
              <Ionicons name="image-outline" size={24} color={BrandColors.secondaryInk} />
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderRedeemedTab = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {MOCK_REDEEMED.map((item) => (
        <View key={item.id} style={styles.redeemCard}>
          <View style={styles.redeemRow}>
            <View style={styles.brandLogoPlaceholder}>
              {item.logo ? (
                <Image
                  source={{ uri: item.logo }}
                  style={styles.brandLogo}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.brandLogoText}>{item.name.charAt(0)}</Text>
              )}
            </View>

            <View style={styles.redeemInfo}>
              <Text style={styles.redeemName}>{item.name}</Text>
              <Text style={styles.redeemValue}>{item.value}</Text>
            </View>

            <TouchableOpacity
              style={styles.redeemButton}
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
              }}
            >
              <Text style={styles.redeemButtonText}>REDEEM</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>REWARDS</Text>
        <Text style={styles.headerPoints}>1000 points</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'POINTS' && styles.tabActive]}
          onPress={() => handleTabPress('POINTS')}
        >
          <Text style={[styles.tabText, activeTab === 'POINTS' && styles.tabTextActive]}>
            OFFERS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'REDEEMED' && styles.tabActive]}
          onPress={() => handleTabPress('REDEEMED')}
        >
          <Text style={[styles.tabText, activeTab === 'REDEEMED' && styles.tabTextActive]}>
            READY TO USE
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'POINTS' ? renderPointsTab() : renderRedeemedTab()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  header: {
    backgroundColor: BrandColors.brandEmphasis,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 1,
  },

  headerPoints: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: BrandColors.borders,
  },

  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },

  tabActive: { borderBottomColor: BrandColors.accentOutline },

  tabText: { fontSize: 14, fontWeight: '600', color: 'black' },

  tabTextActive: { color: BrandColors.accentOutline },

  scrollView: { flex: 1 },

  brandCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  brandInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },

  brandLogoPlaceholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: BrandColors.optionalSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  brandLogo: { width: 55, height: 55, borderRadius: 30 },

  brandLogoText: {
    fontSize: 20,
    fontWeight: '700',
    color: BrandColors.brandEmphasis,
  },

  brandDetails: { flex: 1 },

  brandName: {
    fontSize: 16,
    fontWeight: '600',
    color: BrandColors.primaryInk,
  },

  brandPoints: {
    fontSize: 12,
    color: BrandColors.accentOutline,
    marginTop: 4,
  },

  brandImagePlaceholder: {
    height: 120,
    backgroundColor: BrandColors.optionalSurface,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  redeemCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },

  redeemRow: { flexDirection: 'row', alignItems: 'center' },

  redeemInfo: { flex: 1, marginLeft: 12 },

  redeemName: {
    fontSize: 16,
    fontWeight: '600',
    color: BrandColors.primaryInk,
  },

  redeemValue: {
    fontSize: 14,
    fontWeight: '700',
    color: BrandColors.brandEmphasis,
  },

  redeemButton: {
    backgroundColor: BrandColors.brandEmphasis,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },

  redeemButtonText: { color: 'white', fontSize: 14, fontWeight: '700' },

  circleContainer: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center' },

  circleTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleText: { fontSize: 12, fontWeight: '700', color: BrandColors.primaryInk },
});
