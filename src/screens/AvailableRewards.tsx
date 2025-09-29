import React, { useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchRewards, collectReward } from '../redux/rewardsSlice';
import RewardItem from '../components/RewardItem';
import { Reward } from '../redux/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type NavProps = NativeStackNavigationProp<RootStackParamList, 'AvailableRewards'>;

const AvailableRewardsScreen: React.FC = () => {
  const navigation = useNavigation<NavProps>();
  const dispatch = useAppDispatch();
  const { availableRewards, collectedRewards, loading, error, page, hasMore } =
    useAppSelector((state) => state.rewards);

  useEffect(() => {
    if (availableRewards.length === 0) {
      dispatch(fetchRewards(1));
    }
  }, [dispatch, availableRewards.length]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchRewards(page + 1));
    }
  }, [dispatch, loading, hasMore, page]);

  const renderItem: ListRenderItem<Reward> = useCallback(
    ({ item }) => (
      <RewardItem
        reward={item}
        isCollected={collectedRewards.some((r) => r.id === item.id)}
        onCollect={() => dispatch(collectReward(item))}
      />
    ),
    [dispatch, collectedRewards]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e5e5e5' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Available Rewards</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CollectedRewards')}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>My Rewards</Text>
        </TouchableOpacity>
      </View>

      {loading && availableRewards.length === 0 ? (
        <ActivityIndicator style={styles.center} size="large" />
      ) : error ? (
        <Text style={styles.center}>Error: {error}</Text>
      ) : (
        <FlatList<Reward>
          data={availableRewards}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ActivityIndicator style={{ marginVertical: 16 }} /> : null}
          columnWrapperStyle={{ flexWrap: 'wrap', justifyContent:'space-evenly' }}
          numColumns={2}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, textAlign: 'center', marginTop: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    alignSelf: 'center'
  },
  headerButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 10,
    paddingVertical: 7.5,
    borderRadius: 5,
  },
  headerButtonText: { 
    color: '#fff', 
    fontWeight: '600',
    fontSize: 16
  },
});

export default AvailableRewardsScreen;