import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    // Load favorites from AsyncStorage on initial render
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const favorites = await AsyncStorage.getItem('favoriteProducts');
                if (favorites) {
                    setFavoriteProducts(JSON.parse(favorites));
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };
        loadFavorites();
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

    return (
        <ProductContext.Provider
            value={{
                selectedProduct,
                setSelectedProduct,
                favoriteProducts,
                saveFavorite,
                removeFavorite,
                isFavorite,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);