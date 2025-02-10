import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import PriceQuantity from './PriceQuantity';
import { Ionicons } from '@expo/vector-icons';
import { useProductContext } from '../Utility/productContext';

const CartCard = ({ product }) => {
    const [quantity, setQuantity] = useState(product.quantity);
    const { removeFromCart } = useProductContext();

    // Handle quantity changes from the PriceQuantity component
    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    // Handle removing item from cart
     const handleRemove = (productId) => {
        removeFromCart(productId);
    };


    return (
        <View style={styles.cartCard}>
            <Image
                source={{ uri: product.Image[0].url }}
                style={styles.productImage}
                resizeMode="contain"
            />
            <View style={styles.productDetails}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.weight}>{product.weight}, Price</Text>
                <PriceQuantity
                    price={product.price}
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                />
            </View>
            <TouchableOpacity
                onPress={() => handleRemove(product.id)} 
                style={styles.closeButton}
            >
                <Ionicons name="close-outline" size={26} color="#B3B3B3" style={styles.closeIcon} />
            </TouchableOpacity>
        </View>
    );
};

export default CartCard;

const styles = StyleSheet.create({
    cartCard: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 1,
        paddingVertical: 10,
        position: 'relative',
        paddingTop: 20,
    },
    productImage: {
        width: 100,
        height: 100,
    },
    productDetails: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    weight: {
        fontSize: 16,
        color: '#555',
    },
    closeButton: {
        position: 'absolute',
        top: 20, 
        right: 0,
    },
});