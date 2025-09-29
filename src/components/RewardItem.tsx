import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Reward } from '../redux/types';

interface Props {
  reward: Reward;
  onCollect: () => void;
  isCollected: boolean;
}

const RewardItem: React.FC<Props> = ({ reward, onCollect, isCollected }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = Math.min(screenWidth - 40, 350);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
    setActiveIndex(index);
  };

  return (
    <View style={[ styles.container, { opacity: isCollected ? 0.5 : 1 } ]}>
      <FlatList
        data={reward.pictures}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }}  style={[styles.image, { width: cardWidth }]} resizeMode="contain" />
        )}
      />

      {reward.pictures && reward.pictures.length > 1 && (
        <View style={styles.dotsContainer}>
          {reward.pictures.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      )}

      <Text style={styles.title}>{reward.name}</Text>
      <Text style={styles.points}>{reward.needed_points} pts</Text>

      {!isCollected ? (
        <TouchableOpacity style={styles.button} onPress={onCollect}>
          <Text style={styles.buttonText}>Collect</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.collected}>Already collected</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
    paddingBottom: 10,
    borderWidth: 1.5,
    borderColor: '#c4c4c4',
    width: 350,
  },
  image: {
    marginVertical: 5,
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bbb',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#0066cc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 10,
  },
  points: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#0066cc',
    margin: 10,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  collected: {
    margin: 10,
    textAlign: 'center',
    color: 'green',
    fontWeight: '600',
    fontSize: 16
  },
});

export default RewardItem;