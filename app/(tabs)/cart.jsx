import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useProductContext } from '../../Utility/productContext';
import CheckoutModal from '../../components/CheckoutModal';
import NoCart from '../../components/NoCart';
import CartCard from '../../components/CartCard';

const Cart = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('checkout');
  const { cartItems } = useProductContext();
  console.log('cart items', cartItems);

  if (!cartItems || cartItems.length === 0) {
    return <NoCart />;
  }

  return (
    <ScrollView style={styles.cartPage}>
      <View style={styles.cartSection}>
        {cartItems.map((product, index) => (
          <CartCard key={index} product={product} />
        ))}
      </View>
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => {
          setCurrentScreen('checkout'); // Reset to checkout screen
          setModalVisible(true); // Open modal
        }}
      >
        <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
      </TouchableOpacity>

      <CheckoutModal
        modalVisible={modalVisible}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        closeModal={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cartPage: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  cartSection: {
    marginBottom: 20,
  },
  checkoutButton: {
    backgroundColor: '#53B175',
    padding: 15,
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
