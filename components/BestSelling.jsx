import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getStoredAirtableData } from '../Utility/api';

const BestSelling = () => {
    const [bestSellingItems, setBestSellingItems] = useState([]);

    useEffect(() => {
        const fetchBestSellingItems = async () => {
            try {
                const data = await getStoredAirtableData();

                const filteredItems = data.filter(item => item.selling === "true");
                setBestSellingItems(filteredItems);

            } catch (error) {
                console.error('Error fetching best selling items:', error);
            }
        };

        fetchBestSellingItems();
    }, []);

    return (
        <View style={styles.exOfferContainer}>
            <View style={styles.exOfferCaption}>
                <Text style={styles.title}>Best Selling</Text>
                <Text style={styles.seeAll}>See all</Text>
            </View>
            <FlatList
                data={bestSellingItems}
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

export default BestSelling;

const styles = StyleSheet.create({
    exOfferContainer: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 10,
        marginTop: 20,
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

    },
    seeAll: {
        color: '#53B175',
        fontSize: 18,
        fontWeight: '500',
    },
});