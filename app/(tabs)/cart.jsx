import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useProductContext } from '../../Utility/productContext';

const Cart = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('checkout');
  const { cartItems } = useProductContext();
  console.log('cart items', cartItems)

  const placeOrder = () => {
    // Simulate an order process
    const isOrderSuccessful = Math.random() > 0.5; // Random success/failure for demo
    setTimeout(() => {
      setCurrentScreen(isOrderSuccessful ? 'order-success' : 'order-failed');
    }, 1000); // Simulating delay
  };

  const renderModalContent = () => {
    switch (currentScreen) {
      case 'checkout':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Checkout</Text>
            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={placeOrder}
            >
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        );
      case 'order-success':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Order Successful 🎉</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        );
      case 'order-failed':
        return (
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Order Failed 😔</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.cartPage}>
      <View style={styles.cartSection}>
        
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

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>{renderModalContent()}</View>
        </View>
      </Modal>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 300,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  placeOrderButton: {
    backgroundColor: '#53B175',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
