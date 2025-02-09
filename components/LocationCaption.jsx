import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchInput from './SearchInput';

const LocationCaption = () => {
    const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const fetchSelectedLocation = async () => {
      try {
        const location = await AsyncStorage.getItem('locationData');
        if (location) {
          const parsedLocation = JSON.parse(location);
          setLocationData(parsedLocation); // Save location data in state
        } else {
          console.log('No location data found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error fetching locationData:', error);
      }
    };

    fetchSelectedLocation();
  }, []);

    return (
        <View style={styles.shopCaption}>
            <Image
                source={require('../assets/images/auth-logo.png')}
                resizeMode="contain"
                style={styles.captionLogo}
            />
            <View style={styles.captionTextContainer}>
                <Ionicons name="location" size={28} color="#000" style={styles.captionIcon} />
                {/* Render location data */}
                <Text style={styles.captionText}>
                    {locationData ? `${locationData.stateRegion}, ${locationData.country.countryName}` : 'Please save your location'}
                </Text>
            </View>
            {/* SEARCH INPUT */}
            <SearchInput />
      </View>
    )
}

export default LocationCaption

const styles = StyleSheet.create({
    shopCaption: {
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 10,
    },
    captionLogo: {
        width: 40, 
        height: 40,
    },
    captionTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 10,
    },  
    captionText: {
        fontSize: 20,
        textAlign: 'left',
        color: 'black',
        fontWeight: '500',
    },
})