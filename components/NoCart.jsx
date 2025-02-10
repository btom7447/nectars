import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const NoCart = () => {
    const navigation = useNavigation();

    const handleExplore = () => {
        navigation.navigate('Explore');
    }

    return (
        <View style={styles.NoCartContainer}>
            <Text style={styles.title}>Your cart is empty</Text>
            <Text style={styles.subTitle}> 
                Start shopping today and fill your cart with great deals!
            </Text>
            <TouchableOpacity
                onPress={handleExplore}
                style={styles.exploreButton}
            >
                <Text style={styles.exploreText}>Explore</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NoCart

const styles = StyleSheet.create({
    NoCartContainer: {
        padding: 20, 
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#FFF',
    }, 
    title: {
        fontSize: 25,
        fontWeight: 600,
        color: '#000',
        textAlign: 'center',
        marginBottom: 10, 
    },
    subTitle: {
        fontSize: 18,
        color: '#7C7C7C',
        fontWeight: 500,
        textAlign: 'center',
        marginBottom: 30,
    },
    exploreButton: {
        width: '100%',
        backgroundColor: '#53B175',  
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 10,
    },
    exploreText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 600,
        color: '#FFF',
    }
})