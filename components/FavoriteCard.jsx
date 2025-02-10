import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'
import { useProductContext } from '../Utility/productContext';

const FavoriteCard = ({ product }) => {
    const router = useRouter();
    const { setSelectedProduct, addToCart } = useProductContext();
    const [quantity, setQuantity] = useState(1);

    const handleProductPress = () => {
        setSelectedProduct(product); // Save the product in context
        router.push(`/(product)/${product.id}`); // Navigate to the details page
    };
    return (
        <View style={styles.favoriteCard}>
            <View style={styles.productDetails}>
                <Image
                    source={{ uri: product.Image[0].url }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
                <View style={styles.productTexts}>
                    <Text style={styles.title}>
                        {product.name}
                    </Text>
                    <Text style={styles.subTitle}>
                        {product.weight}, Price
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={handleProductPress}
                style={styles.priceButton}  
            >
                <Text style={styles.price}>
                    ${product.price}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#000" style={styles.nextButton} />
            </TouchableOpacity>
        </View>
    )
}

export default FavoriteCard

const styles = StyleSheet.create({
    favoriteCard: {
        width: '100%',
        paddingVertical: 10,
        display: 'flex', 
        flexDirection: 'row',
        gap: 10, 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottomColor: '#E2E2E2', 
        borderBottomWidth: 1,
    }, 
    productDetails: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: 20,
    },
    productImage: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 18,
        fontWeight: 600,
        color: '#000',
        marginBottom: 5,
    }, 
    subTitle: {
        fontSize: 16,
        color: '#7C7C7C',
    }, 
    priceButton: {
        display: 'flex',
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'center', 
    }, 
    price: {
        fontSize: 18,
        fontWeight: 600,
        color: '#000',
    }
})