import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_ITEMS_ID } from '@env'

export const fetchAirtableData = async () => {
  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_ITEMS_ID}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      }
    );

    const items = response.data.records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
    console.log('data', items)


    // Save data to AsyncStorage
    await AsyncStorage.setItem('airtableData', JSON.stringify(items));
    return items;
  } catch (error) {
    console.error('Error fetching Airtable data:', error);
    return [];
  }
};

export const getStoredAirtableData = async () => {
  try {
    const data = await AsyncStorage.getItem('airtableData');

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading Airtable data from AsyncStorage:', error);
    return [];
  }
};

const clearAsyncStorage = async () => {
  try {
    // Remove only the 'airtableData' key from AsyncStorage
    await AsyncStorage.removeItem('airtableData');
    console.log('airtableData successfully cleared from AsyncStorage!');
  } catch (error) {
    console.error('Failed to clear airtableData from AsyncStorage:', error);
  }
};

// Call the function to clear only airtableData
// clearAsyncStorage();
