import React from 'react';
import { FlatList, Text } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import RewardItem from '../components/RewardItem';
import { SafeAreaView } from 'react-native-safe-area-context';

const CollectedRewardsScreen = () => {
  const { collectedRewards } = useAppSelector((state) => state.rewards);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {collectedRewards.length === 0 ? (
        <Text style={{ textAlign: 'center', fontSize: 16 }}>
          No collected rewards yet
        </Text>
      ) : (
        <FlatList
          data={collectedRewards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RewardItem reward={item} isCollected={true} onCollect={() => {}} />
          )}
          columnWrapperStyle = {{ flexWrap: 'wrap', justifyContent:'space-evenly',  }}
          numColumns={2}
        />
      )}
    </SafeAreaView>
  );
};

export default CollectedRewardsScreen;