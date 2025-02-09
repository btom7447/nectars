import { Link } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const OtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(null); // Track focused input
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    // Move to next input if a digit is entered
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
    setOtp(newOtp);
  };

  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePress = () => {
    // Add functionality for OTP verification
    console.log('Entered OTP:', otp.join(''));
  };

  const nextPage = () => {
    router.push('/location-page');
};

  return (
    <SafeAreaView style={styles.phoneContainer}>
      <Image
        source={require('../../assets/images/sign-mask.png')}
        resizeMode="contain"
        style={styles.phoneImage}
      />
      <ScrollView style={styles.container}>
        <Link href="/phone" style={styles.backLink}>
          <Ionicons name="chevron-back" size={24} color="#000" style={styles.icon} />
        </Link>
        <Text style={styles.title}>Enter your 4-digit code</Text>
        <Text style={styles.subTitle}>Code</Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={[
                styles.otpInput,
                focusedIndex === index && styles.activeInput, // Add active styles
                otp[index] && styles.filledInput, // Add filled styles
              ]}
              value={digit}
              keyboardType="numeric"
              maxLength={1}
              onFocus={() => setFocusedIndex(index)} // Update focused index
              onBlur={() => setFocusedIndex(null)} // Clear focused index on blur
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(digit, index);
                }
              }}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonCaption}>
        <Text style={styles.resend}>Resend Code</Text>
        <TouchableOpacity onPress={nextPage} style={styles.nextButton}>
          <Ionicons name="chevron-forward" size={26} color="#FFF" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OtpPage;

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
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  otpInput: {
    flex: 1,
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 300,
  },
  activeInput: {
    borderColor: '#53B175', 
  },
  filledInput: {
    borderWidth: 2,
    borderColor: '#53B175', 
  },
  resend: {
    fontSize: 18,
    textAlign: 'left',
    color: '#53B175',
    fontWeight: '500',
    marginBottom: 5,
  },
  buttonCaption: {
    width: '100%',
    position: 'absolute',
    bottom: 80,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
