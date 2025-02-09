import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const GroceryCard = ({ category, backgroundColor }) => {
    return (
        <View style={[styles.groceryCard, { backgroundColor }]}>
            <Image
                source={{ uri: category.image[0].url }} 
                style={styles.productImage}
                resizeMode="contain"
            />
            <Text style={styles.productName}>{category?.name || 'Unnamed Category'}</Text> 
        </View>
    );
};

export default GroceryCard;

const styles = StyleSheet.create({
    groceryCard: {
        marginRight: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});