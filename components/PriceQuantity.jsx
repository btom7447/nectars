import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const PriceQuantity = ({ price, quantity, onQuantityChange }) => {
    return (
        <View style={styles.priceQuantityContainer}>
            <View style={styles.priceQuantityButtons}>
                <TouchableOpacity style={styles.button} onPress={() => onQuantityChange(Math.max(1, quantity - 1))}>
                    <Ionicons name="remove-outline" size={26} color="#B3B3B3" style={styles.closeIcon} />
                </TouchableOpacity>
                <View style={styles.quantityContainer}>
                    <Text style={styles.quantityText}>{quantity}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => onQuantityChange(quantity + 1)}>
                    <Ionicons name="add-outline" size={26} color="#53B175" style={styles.closeIcon} />
                </TouchableOpacity>
            </View>
            <Text style={styles.price}>${(price * quantity).toFixed(2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    priceQuantityContainer: {
        paddingVertical: 10, 
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    priceQuantityButtons: {
        gap: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', 
    },
    button: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
    },
    quantityContainer: {
        paddingVertical: 12,
        paddingHorizontal: 10, 
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E2E2E2',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    quantityText: {
        width: 25, 
        fontSize: 18,
        fontWeight: 500,
        color: '#000',
        textAlign: 'center',
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    minus: {
        fontSize: 50,
        fontWeight: 300,
        color: '#B3B3B3',
    }, 
    plus: {
        fontSize: 40,
        fontWeight: 400,
        color: '#53B175',
    }
});

export default PriceQuantity;
