import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, Share } from 'react-native';
import { useProductContext } from '../../Utility/productContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import PriceQuantity from '../../components/PriceQuantity';
import DetailsAccordion from '../../components/DetailsAccordion';
import ViewShot from "react-native-view-shot";
import Toast from 'react-native-toast-message';

const ProductDetails = () => {
    const { selectedProduct, saveFavorite, removeFavorite, isFavorite, addToCart } = useProductContext();
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(selectedProduct.price);
    const [favoriteStatus, setFavoriteStatus] = useState(false);
    const router = useRouter();
    const viewShotRef = useRef();

    // Update total price when quantity changes
    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
        setTotalPrice(newQuantity * selectedProduct.price);
    };

    // Handle Adding Product to cart
    const handleAddToCart = async () => {
        try {
            await addToCart(selectedProduct, quantity);
            Toast.show({
                type: 'success', 
                text1: 'Success!',
                text2: `${selectedProduct.name} added to cart.`,
                position: 'top', 
                visibilityTime: 3000, 
            });
        } catch (error) {
            console.error('Error adding to cart:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: `Failed to add ${selectedProduct.name} to cart.`,
                position: 'top',
                visibilityTime: 3000, 
            });
        }
    };

    // Handle Sharing of Product
    const handleShare = async () => {
        try {
            // Capture the screenshot
            const uri = await viewShotRef.current.capture();
            console.log("Captured URI:", uri);
    
            // Create a dynamic link to the product
            const productLink = `myapp://product/${selectedProduct.id}`;
            const shareMessage = `Check out this product on Nectar App!\n\n${productLink}`;
    
            // Share the screenshot with the link
            const result = await Share.share({
                message: shareMessage,
                url: uri,
            });
    
            if (result.action === Share.sharedAction) {
                console.log("Shared successfully!");
            } else if (result.action === Share.dismissedAction) {
                console.log("Share dismissed.");
            }
        } catch (error) {
            console.error("Error sharing:", error);
        }
    };
    
    // Sync favorite status with context
    useEffect(() => {
        const checkFavoriteStatus = async () => {
            const status = isFavorite(selectedProduct.id);
            setFavoriteStatus(status);
        };
        checkFavoriteStatus();
    }, [selectedProduct.id]);

    // Handle toggling the favorite status
    const handleToggleFavorite = async () => {
        try {
            if (favoriteStatus) {
                await removeFavorite(selectedProduct.id);
                setFavoriteStatus(false); // Directly update the state to `false`
            } else {
                await saveFavorite(selectedProduct);
                setFavoriteStatus(true); // Directly update the state to `true`
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    if (!selectedProduct) {
        return <Text>No product selected</Text>;
    }

    return (
        <SafeAreaView style={styles.detailsContainer}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.statusBar}></View>
            <ScrollView style={styles.detailsScroll}>
                <View style={styles.detailsCaption}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={26} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                        <Ionicons name="share-outline" size={26} color="#000" />
                    </TouchableOpacity>
                </View>
                <ViewShot ref={viewShotRef} style={styles.shareableView}>
                    <View style={styles.imageCarouselContainer}>
                        <Image
                            source={{ uri: selectedProduct.Image[0].url }}
                            style={styles.productImage}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.shareTextContainer}>
                        <Text style={styles.productName}>{selectedProduct.name}</Text>
                        <Text style={styles.productPrice}>Price: ${selectedProduct.price}</Text>
                        <Text style={styles.productDescription}>{selectedProduct.description}</Text>
                    </View>
                </ViewShot>
                <View style={styles.imageCarouselContainer}>
                    <Image
                        source={{ uri: selectedProduct.Image[0].url }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.detailsText}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleToggleFavorite}>
                        <Ionicons
                            name={favoriteStatus ? 'heart' : 'heart-outline'}
                            size={30}
                            color={favoriteStatus ? '#53B175' : '#7C7C7C'}
                        />
                    </TouchableOpacity>
                    <Text style={styles.productName}>{selectedProduct.name}</Text>
                    <Text style={styles.productWeight}>{selectedProduct.weight}, Price</Text>
                    <PriceQuantity 
                        price={selectedProduct.price} 
                        quantity={quantity} 
                        onQuantityChange={handleQuantityChange} 
                    />
                    <View style={styles.accordionSection}>
                        <DetailsAccordion 
                            title='Product Detail' 
                            content={selectedProduct.description}
                        />
                        <DetailsAccordion 
                            title='Nutritions'
                            content={selectedProduct.nutritional_value}
                        />
                    </View>
                    <TouchableOpacity 
                        style={styles.addCartButton} 
                        onPress={handleAddToCart}
                    >
                        <Text style={styles.addCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    shareableView: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        position: 'absolute',
        top: -1000,
    },
    shareTextContainer: {
        padding: 10,
    },
    statusBar: {
        backgroundColor: '#F2F3F2',
        marginTop: -60,
        height: 60,
    },
    detailsContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#FFF',
    },
    detailsCaption: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 10,
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        gap: 20,
        backgroundColor: '#F2F3F2',
    },
    imageCarouselContainer: {
        padding: 20,
        backgroundColor: '#F2F3F2',
        borderBottomRightRadius: 40, 
        borderBottomLeftRadius: 40,
    },
    productImage: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    detailsText: {
        marginTop: 30,
        position: 'relative',
        padding: 20,
        backgroundColor: '#FFF',
    },
    saveButton: {
        position: 'absolute', 
        top: 20, 
        right: 20,
        zIndex: 100,
    },
    productName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    productWeight: {
        fontSize: 18,
        color: '#7C7C7C',
        fontWeight: 500,
        marginBottom: 30,
    },
    addCartButton: {
        marginTop: 30,
        width: '100%',
        backgroundColor: '#53B175',  
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginTop: 30,
    },
    addCartText: {
        width: '100%',
        fontSize: 20,
        color: 'white',
        fontWeight: 500,
        textAlign: 'center',
    }
});

export default ProductDetails;