import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);


    // Load favorites from AsyncStorage on initial render
    useEffect(() => {
        const loadStorageData = async () => {
            try {
                const favorites = await AsyncStorage.getItem('favoriteProducts');
                const cart = await AsyncStorage.getItem('cartItems');
                if (favorites) setFavoriteProducts(JSON.parse(favorites));
                if (cart) setCartItems(JSON.parse(cart));
            } catch (error) {
                console.error('Error loading data from AsyncStorage:', error);
            }
        };
        loadStorageData();
    }, []);

    // Save a product to favorites
    const saveFavorite = async (product) => {
        try {
            const updatedFavorites = [...favoriteProducts, product];
            setFavoriteProducts(updatedFavorites);
            await AsyncStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Error saving favorite:', error);
        }
    };

    // Remove a product from favorites
    const removeFavorite = async (productId) => {
        try {
            const updatedFavorites = favoriteProducts.filter(product => product.id !== productId);
            setFavoriteProducts(updatedFavorites);
            await AsyncStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    // Check if a product is in favorites
    const isFavorite = (productId) => {
        return favoriteProducts.some(product => product.id === productId);
    };

    // Save the cart to AsyncStorage
    const saveCart = async (updatedCart) => {
        try {
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    };

    // Add an item to the cart or update its quantity
    const addToCart = async (product, quantity = 1) => {
        try {
            const existingItem = cartItems.find((item) => item.id === product.id);
            let updatedCart;

            if (existingItem) {
                updatedCart = cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                updatedCart = [...cartItems, { ...product, quantity }];
            }

            setCartItems(updatedCart);
            await saveCart(updatedCart);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const fetchCartItems = async () => {
        try {
            const cartData = await AsyncStorage.getItem('cartItems');
            if (cartData) {
                const parsedCart = JSON.parse(cartData);
                setCartItems(parsedCart);
                console.log('Cart Items:', parsedCart); // Log the items in the console
            } else {
                console.log('Cart is empty');
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const clearAsyncStorage = async () => {
        try {
            // Remove 'cartItems' key from AsyncStorage
            await AsyncStorage.removeItem('cartItems');
            // Reset cartItems state to an empty array
            setCartItems([]);
            console.log('Cart items successfully cleared from AsyncStorage!');
        } catch (error) {
            console.error('Failed to clear cart items from AsyncStorage:', error);
        }
    };
    
    const clearFavoriteProducts = async () => {
        try {
            // Remove 'favoriteProducts' key from AsyncStorage
            await AsyncStorage.removeItem('favoriteProducts');
            // Reset favoriteProducts state to an empty array
            setFavoriteProducts([]);
            console.log('Favorite products successfully cleared from AsyncStorage!');
        } catch (error) {
            console.error('Failed to clear favorite products from AsyncStorage:', error);
        }
    };    

    return (
        <ProductContext.Provider
            value={{
                selectedProduct,
                setSelectedProduct,
                favoriteProducts,
                saveFavorite,
                removeFavorite,
                isFavorite,
                cartItems,
                addToCart,
                fetchCartItems,
                clearAsyncStorage,
                clearFavoriteProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);