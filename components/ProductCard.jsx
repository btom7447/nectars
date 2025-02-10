import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useProductContext } from '../Utility/productContext';
import Toast from 'react-native-toast-message';

const ProductCard = ({ product }) => {
    const router = useRouter();
    const { setSelectedProduct, addToCart } = useProductContext();
    const [quantity, setQuantity] = useState(1);
    

    const handleProductPress = () => {
        setSelectedProduct(product); // Save the product in context
        router.push(`/(product)/${product.id}`); // Navigate to the details page
    };

    // Handle Adding Product to cart
    const handleAddToCart = async () => {
        try {
            await addToCart(product, quantity);
            Toast.show({
                type: 'success', 
                text1: 'Success!',
                text2: `${product.name} added to cart.`,
                position: 'top', 
                visibilityTime: 30000, 
            });
        } catch (error) {
            console.error('Error adding to cart:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: `Failed to add ${product.name} to cart.`,
                position: 'top',
            });
        }
    };

    return (
        <TouchableOpacity onPress={handleProductPress}>
            <View style={styles.productCard}>
                <Image
                    source={{ uri: product.Image[0].url }} 
                    style={styles.productImage}
                    resizeMode="contain"
                />
                <Text style={styles.productName}>{product.name}</Text> 
                <Text style={styles.productQuantity}>{product.weight}, Priceg</Text> 
                <View style={styles.productPriceCaption}>
                    <Text style={styles.productPrice}>${product.price}</Text> 
                    <TouchableOpacity
                        onPress={handleAddToCart}
                        style={styles.addCartButton}
                    >
                        <Ionicons name="add" size={28} color="#FFF" style={styles.addCartIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;


const styles = StyleSheet.create({
    productCard: {
        width: 170,
        marginRight: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        backgroundColor: '#FFF',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start'
    },
    productImage: {
        margin: 'auto',
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    productQuantity: {
        fontSize: 14,
        color: '#7C7C7C',
        marginBottom: 20,
    },
    productPriceCaption: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    addCartButton: {
        backgroundColor: '#53B175',
        borderRadius: 10,
        padding: 5,
    },
});