import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useProductContext } from '../../Utility/productContext';
import FavoriteCard from '../../components/FavoriteCard';
import NoFavorite from '../../components/NoFavorite';
import Toast from 'react-native-toast-message';

const Favorite = () => {
  const { favoriteProducts, clearFavoriteProducts, addToCart } = useProductContext();

  const addAllToCart = async () => {
    try {
      // Add each favorite product to the cart
      for (const product of favoriteProducts) {
        await addToCart(product);
      }
      // Clear all favorite products after adding them to the cart
      await clearFavoriteProducts();
      console.log('All favorite products added to cart and cleared from favorites.');
      Toast.show({
        type: 'success', 
        text1: 'Success!',
        text2: 'Favorite added to cart',
        position: 'top', 
        visibilityTime: 3000, 
      });
    } catch (error) {
      console.error('Error adding all to cart:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add favorite to cart',
        position: 'top',
        visibilityTime: 3000, 
      });
    }
  };

  if (!favoriteProducts || favoriteProducts.length === 0) {
    return <NoFavorite />;
  }

  return (
    <ScrollView style={styles.favoritePage}>
      <View style={styles.favoriteSection}>
        {favoriteProducts.map((product, index) => (
          <FavoriteCard key={index} product={product} />
        ))}

        <TouchableOpacity 
          onPress={addAllToCart}
          style={styles.addCart}
        >
          <Text style={styles.addCartText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>

      
    </ScrollView>
  )
}

export default Favorite

const styles = StyleSheet.create({
  favoritePage: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  favoriteSection: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
  }, 
  addCart: {
    marginTop: 30,
    width: '100%',
    backgroundColor: '#53B175',  
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  addCartText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 600,
    color: '#FFF',
  },
})