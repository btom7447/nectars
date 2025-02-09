import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getStoredAirtableData } from '../Utility/api';

const ExclusiveOffer = () => {
    const [exclusiveItems, setExclusiveItems] = useState([]);

    // Function to shuffle an array (Fisher-Yates shuffle)
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Random index
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    };

    useEffect(() => {
        const fetchExclusiveItems = async () => {
            try {
                const data = await getStoredAirtableData();

                // Filter items where 'exclusive' is "true"
                const filteredItems = data.filter(item => item.exclusive === "true");

                // Shuffle the filtered items
                const shuffledItems = shuffleArray(filteredItems);

                // Set the shuffled items in state
                setExclusiveItems(shuffledItems);

            } catch (error) {
                console.error('Error fetching exclusive items:', error);
            }
        };

        fetchExclusiveItems();
    }, []);

    return (
        <View style={styles.exOfferContainer}>
            <View style={styles.exOfferCaption}>
                <Text style={styles.title}>Exclusive Offer</Text>
                <Text style={styles.seeAll}>See all</Text>
            </View>
            <FlatList
                data={exclusiveItems}
                keyExtractor={(item) => item.id} 
                renderItem={({ item }) => (
                    <ProductCard product={item} /> 
                )}
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

export default ExclusiveOffer;

const styles = StyleSheet.create({
    exOfferContainer: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 10,
        marginBottom: 20,
    },
    exOfferCaption: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    title: {
        fontSize: 25,
        textAlign: 'left',
        color: 'black',
        fontWeight: '600',
        marginVertical: 20,
    },
    seeAll: {
        color: '#53B175',
        fontSize: 18,
        fontWeight: '500',
    },
});