import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

const CheckoutModal = ({
  modalVisible,
  currentScreen,
  setCurrentScreen,
  closeModal,
}) => {
  const placeOrder = () => {
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
              onPress={closeModal}
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
              onPress={closeModal}
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
    <Modal
      visible={modalVisible}
      transparent
      animationType="slide"
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>{renderModalContent()}</View>
      </View>
    </Modal>
  );
};

export default CheckoutModal;

const styles = StyleSheet.create({
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
