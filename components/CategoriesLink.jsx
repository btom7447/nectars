import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import GroceryCard from './GroceryCard';

// List of colors
const colors = ['#f8a54c35', '#53b17550'];

// Function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const CategoriesLink = ({ categories }) => {
    // Shuffle the colors array
    const shuffledColors = shuffleArray([...colors]);

    return (
        <View style={styles.groceriesContainer}>
            <Text style={styles.title}>Groceries</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <GroceryCard 
                        category={item} 
                        backgroundColor={shuffledColors[index % shuffledColors.length]} 
                    /> 
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    groceriesContainer: {
        marginTop: 10,
    },
    title: {
        fontSize: 25,
        textAlign: 'left',
        color: 'black',
        fontWeight: '600',
        marginBottom: 10,
    },
});

export default CategoriesLink;