import { View, Text, ScrollView, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import FormField from '../../components/FormField';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = async () => {
      if (form.username === "" || form.email === "" || form.password === "") {
        Alert.alert("Error", "Please fill in all fields");
          return;
        }
  
        setSubmitting(true);
    
        try {
        // Store the loggedIn status in AsyncStorage as 'true' (string)
        await AsyncStorage.setItem('loggedIn', 'true');
    
        // Replace the following lines with your authentication logic
        // Example:
        // const result = await createUser(form.email, form.password, form.username);
        // setUser(result);
        // setIsLogged(true);
    
        // Navigate to the shop screen
        router.replace("/(tabs)/shop");
          } catch (error) {
        Alert.alert("Error", error.message || "Something went wrong");
          } finally {
        setSubmitting(false);
      }
    };
  

  return (
    <SafeAreaView style={styles.authContainer}>
      <Image
        source={require('../../assets/images/sign-mask.png')}
        resizeMode="contain"
        style={styles.phoneImage}
      />
      <Image
        source={require('../../assets/images/auth-logo.png')}
        resizeMode="contain"
        style={styles.authLogo}
      />
      <ScrollView style={styles.container}>
        {/* AUTH FORM */}
        <View style={styles.authForm}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subTitle}>
            Enter your email and password
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={styles.formFieldMarginTop}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={styles.formFieldMarginTop}
            secureTextEntry
          />

          {/* PRIVACY POLICY  */}
          <Text style={styles.privacyText}>
            By continuing you agree to our {''}
            <Link href="/home" style={styles.privacyLink}>
              Terms of Service
            </Link> 
            {''} and {''}
            <Link href="/home" style={styles.privacyLink}>
              Privacy Policy
            </Link> 
          </Text>

          <TouchableOpacity  
            onPress={submit}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          {/* ALREADY HAVE AN ACCOUNT */}
          <Text style={styles.alreadyAcc}>
            Don't have an account?? {''}
            <Link href="/sign-up" style={styles.privacyLink}>
              Sign Up
            </Link> 
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    position: 'relative',
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
  authLogo: {
    marginVertical: 50,
    left: '50%',
    transform: [{ translateX: '-50%' }],
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
    marginBottom: 30,
  },
  privacyText: {
    fontSize: 16,
    textAlign: 'left',
    color: 'gray',
    fontWeight: '400',
    lineHeight: 30,
  },
  alreadyAcc: {
    width: '100%',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    fontWeight: '400',
    lineHeight: 30,
  },
  privacyLink: {
    color: '#53B175',
    fontWeight: 500,
  },
  authForm: {
    width: '100%', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
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

export default SignIn;