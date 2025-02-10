import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import PriceQuantity from './PriceQuantity'

const CartCard = ({ product }) => {
    const [quantity, setQuantity] = useState({product.quantity});
    
    // Update total price when quantity changes
    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
        setTotalPrice(newQuantity * selectedProduct.price);
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
                    quantity={product.quantity} 
                    onQuantityChange={handleQuantityChange}
                />
            </View>
        </View>
    )
}

export default CartCard

const styles = StyleSheet.create({
    cartCard: {
        width: '100%', 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        gap: 20, 
        borderBottomColor: '#E2E2E2', 
        borderBottomWidth: 1, 
    },
    productImage: {
        width: 70,
        height: 70,
    },
})