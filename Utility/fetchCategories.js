import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_CATEGORIES_ID } from '@env';

// Fetch categories data from Airtable
export const fetchCategoriesData = async () => {
  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_CATEGORIES_ID}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      }
    );

    const categories = response.data.records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));

    // Save data to AsyncStorage
    await AsyncStorage.setItem('categoriesData', JSON.stringify(categories));
    console.log('Categories data saved to AsyncStorage.');
    return categories;
  } catch (error) {
    console.error('Error fetching categories data:', error);
    return [];
  }
};

// Get stored categories data from AsyncStorage
export const getStoredCategoriesData = async () => {
  try {
    const data = await AsyncStorage.getItem('categoriesData');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading categories data from AsyncStorage:', error);
    return [];
  }
};

// Clear categories data from AsyncStorage
export const clearCategoriesData = async () => {
  try {
    await AsyncStorage.removeItem('categoriesData');
    console.log('categoriesData successfully cleared from AsyncStorage!');
  } catch (error) {
    console.error('Failed to clear categoriesData from AsyncStorage:', error);
  }
};

// clearCategoriesData()