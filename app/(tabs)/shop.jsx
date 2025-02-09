import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import PromoCarousel from '../../components/PromoCarousel';
import LocationCaption from '../../components/LocationCaption';
import { fetchAirtableData, getStoredAirtableData } from '../../Utility/api';
import { fetchCategoriesData, getStoredCategoriesData } from '../../Utility/fetchCategories';
import ExclusiveOffer from '../../components/ExclusiveOffer';
import BestSelling from '../../components/BestSelling';
import CategoriesLink from '../../components/CategoriesLink';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch items data
  useEffect(() => {
    const fetchItems = async () => {
      let storedData = await getStoredAirtableData();
      if (storedData.length === 0) {
        storedData = await fetchAirtableData();
      }
      setItems(storedData);
    };

    fetchItems();
  }, []);

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      let storedData = await getStoredCategoriesData();
      if (storedData.length === 0) {
        storedData = await fetchCategoriesData();
      }
      setCategories(storedData);
    };

    fetchCategories();
  }, []);

  return (
    <SafeAreaView style={styles.shopContainer}>
      {/* CAPTION (TOP) */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <LocationCaption />
      {/* CONTENT (SCROLL) */}
      <ScrollView style={styles.container}>
        <PromoCarousel />
        <ExclusiveOffer items={items} />
        <CategoriesLink categories={categories} /> 
        <BestSelling items={items} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Shop;

const styles = StyleSheet.create({
  shopContainer: {
    flex: 1,
    position: 'relative',
    padding: 20,
    backgroundColor: '#FFF',
    paddingBottom: 100,
  },
  container: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
});