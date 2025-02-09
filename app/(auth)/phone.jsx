import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal'; 
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Phone = () => {
    const [countryCode, setCountryCode] = useState('NG'); // For flag and country
    const [callingCode, setCallingCode] = useState('+234'); // For the phone number prefix
    const [countryName, setCountryName] = useState('Nigeria'); // Country name
    const [number, setNumber] = useState('');
    const router = useRouter();

    const handlePress = async () => {
        try {
            // Create a country object to store
            const selectedCountry = {
                countryName,  // Ensure country name is stored
                countryCode,
                callingCode,
            };

            // Save the object as a JSON string in AsyncStorage
            await AsyncStorage.setItem('selectedCountry', JSON.stringify(selectedCountry));
            // Navigate to the OTP page
            router.push('/otp-page');
        } catch (error) {
            console.error('Error saving selected country:', error);
        }
    };

    const handleCountrySelect = (country) => {
        setCountryCode(country.cca2); // Country code (e.g., 'NG' for Nigeria)
        setCallingCode(`+${country.callingCode}`); // Calling code (e.g., '+234')
        setCountryName(country.name); // Country name

        // Save the object with country details
        const countryDetails = {
            countryName: country.name,
            countryCode: country.cca2,
            callingCode: `+${country.callingCode}`,
        };

        AsyncStorage.setItem('selectedCountry', JSON.stringify(countryDetails))
            .catch((error) => console.error('Error saving country details:', error));
    };

    return (
        <SafeAreaView style={styles.phoneContainer}>
            <Image
                source={require('../../assets/images/sign-mask.png')}
                resizeMode="contain"
                style={styles.phoneImage}
            />
            <ScrollView style={styles.container}>
                <Link href="/sign-in" style={styles.backLink}>
                    <Ionicons name="chevron-back" size={24} color="#000" style={styles.icon} />
                </Link>
                <Text style={styles.title}>Enter your mobile number</Text>
                <Text style={styles.subTitle}>Mobile Number</Text>
                <View style={styles.phoneInputContainer}>
                    <CountryPicker
                        countryCode={countryCode}
                        withFilter
                        withFlag
                        withCountryNameButton={false}
                        withCallingCode
                        onSelect={handleCountrySelect}
                        containerButtonStyle={styles.countryPicker}
                    />
                    <TextInput
                        style={styles.phoneInput}
                        placeholder="Enter your mobile number"
                        keyboardType="numeric"
                        value={`${callingCode} ${number}`}
                        onChangeText={(text) => {
                            const withoutCode = text.replace(callingCode, '').trim();
                            setNumber(withoutCode.slice(0, 15)); // Restrict input to 15 digits
                        }}
                    />
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={handlePress}
                style={styles.nextButton}
            >
                <Ionicons name="chevron-forward" size={26} color="#FFF" style={styles.icon} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

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
    title: {
        fontSize: 25,
        textAlign: 'left',
        color: 'black',
        fontWeight: '500',
        marginVertical: 20,
    },
    subTitle: {
        fontSize: 16,
        textAlign: 'left',
        color: 'gray',
        fontWeight: '500',
        marginTop: 50,
        marginLeft: 15,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'transparent',
    },
    countryPicker: {
        padding: 10,
    },
    phoneInput: {
        flex: 1,
        height: 50,
        fontSize: 18,
    },
    nextButton: {
        position: 'absolute',
        bottom: 80,
        right: 40,
        width: 60,
        height: 60,
        borderRadius: '50%',
        backgroundColor: '#53B175',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
    }
});

export default Phone;
