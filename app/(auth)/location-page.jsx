import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryPicker from 'react-native-country-picker-modal';
import { Link, useRouter } from 'expo-router';

const LocationPage = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    countryName: '',
    countryCode: 'NG',
    callingCode: '+234',
  });
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchSelectedCountry = async () => {
      try {
        const country = await AsyncStorage.getItem('selectedCountry');
        if (country) {
          const parsedCountry = JSON.parse(country);
          setSelectedCountry(parsedCountry);
        } else {
          console.log('No country found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error fetching selectedCountry:', error);
      }
    };

    fetchSelectedCountry();
  }, []);

  const handleCountrySelect = (country) => {
    const countryDetails = {
      countryName: country.name,
      countryCode: country.cca2,
      callingCode: `+${country.callingCode}`,
    };
    setSelectedCountry(countryDetails);
  };

  const handleSubmit = async () => {
    try {
      const locationData = {
        streetAddress: address,
        stateRegion: state,
        country: selectedCountry,
      };

      await AsyncStorage.setItem('locationData', JSON.stringify(locationData));
      console.log('location data', locationData)
      // Navigate to the next screen
      router.push('/sign-up');
    } catch (error) {
      console.error('Error saving location data:', error);
    }
  };

  return (
    <SafeAreaView style={styles.phoneContainer}>
      <Image
        source={require('../../assets/images/sign-mask.png')}
        resizeMode="contain"
        style={styles.phoneImage}
      />
      <ScrollView style={styles.container}>
        <Link href="/splash" style={styles.backLink}>
          <Ionicons name="chevron-back" size={24} color="#000" style={styles.icon} />
        </Link>
        <View style={styles.locationCaption}>
          <Image
            source={require('../../assets/images/locationImage.png')}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.title}>Select Your Location</Text>
          <Text style={styles.subTitle}>
            Switch on your location to stay in tune with what's happening in your area
          </Text>
        </View>

        {/* Address Input */}
        <View style={styles.countryPickerContainer}>
          <Text style={styles.label}>Your Street Address</Text>
          <TextInput
            style={styles.countryPicker}
            placeholder="Enter your address"
            value={address}
            onChangeText={(text) => setAddress(text)}
            autoComplete="street-address"
          />
        </View>

        {/* State/Region Input */}
        <View style={styles.countryPickerContainer}>
          <Text style={styles.label}>Your State/Region</Text>
          <TextInput
            style={styles.countryPicker}
            placeholder="Enter your state/region"
            value={state}
            onChangeText={(text) => setState(text)}
            autoComplete="address-level1"
          />
        </View>

        {/* Country Dropdown */}
        <View style={styles.countryPickerContainer}>
          <Text style={styles.label}>Your Country</Text>
          <CountryPicker
            countryCode={selectedCountry.countryCode}
            withFilter
            withFlag
            withCountryNameButton
            withCallingCode
            onSelect={handleCountrySelect}
            containerButtonStyle={styles.countryPicker}
          />
        </View>

        <TouchableOpacity  
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationPage;

const styles = StyleSheet.create({
  phoneContainer: {
    flex: 1,
    position: 'relative',
    padding: 20,
    backgroundColor: '#FFF',
  },
  container: {
    padding: 20,
  },
  phoneImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backLink: {
    marginBottom: 20,
  },
  locationCaption: {
    width: '100%',
    marginTop: 20,
    left: '50%',
    transform: [{ translateX: '-50%' }],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'left',
    color: 'black',
    fontWeight: '600',
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    fontWeight: '500',
    marginBottom: 50,
  },
  countryPickerContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    textAlign: 'left',
    color: 'gray',
    fontWeight: '500',
    marginBottom: 10,
  },
  countryPicker: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'transparent',
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
  },
  submitButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#53B175',  
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 30,
  },
  submitButtonText: {
    width: '100%',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});
