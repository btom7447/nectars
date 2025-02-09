import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width: screenWidth } = Dimensions.get('window');

const PromoCarousel = () => {
  const carouselItems = [
    { id: 1, image: require('../assets/images/promotional-one.png') },
    { id: 2, image: require('../assets/images/promotional-two.png') },
    { id: 3, image: require('../assets/images/promotional-three.png') },
  ];

  return (
    <Swiper
      style={styles.carouselWrapper}
      autoplay
      autoplayTimeout={5} // 3 seconds per slide
      showsPagination={false}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    >
      {carouselItems.map((item) => (
        <View key={item.id} style={styles.carouselSlide}>
          <Image source={item.image} style={styles.carouselImage} resizeMode="cover" />
        </View>
      ))}
    </Swiper>
  );
};

export default PromoCarousel;

const styles = StyleSheet.create({
  carouselWrapper: {
    height: 120,
  },
  carouselSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    borderRadius: 10,
  },
});