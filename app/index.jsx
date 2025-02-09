import React, { useEffect } from 'react';
import { View, Image, StatusBar, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { MotiView } from 'moti'; 
import { useRouter } from 'expo-router';  
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Index = () => {
  const router = useRouter(); 

  useEffect(() => {
    const navigateBasedOnLogin = async () => {
      try {
        // Retrieve the 'loggedIn' variable from AsyncStorage
        const loggedIn = await AsyncStorage.getItem('loggedIn');

        // Navigate based on the value of 'loggedIn'
        if (loggedIn === 'true') {
          router.push('/(tabs)/shop'); // Navigate to the shop screen
        } else {
          router.push('/(auth)/splash'); // Navigate to the splash screen
        }
      } catch (error) {
        console.error('Error retrieving loggedIn value:', error);
        router.push('/(auth)/splash'); // Fallback to splash screen
      }
    };

    // Set a timeout before navigating
    const timer = setTimeout(() => {
      navigateBasedOnLogin();
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.centeredView}>
          {/* Use MotiView for animation */}
          <MotiView
            from={{ scale: 0.5 }}  // Start small
            animate={{ scale: 1 }}  // Animate to full size
            transition={{ type: 'timing', duration: 800 }}  
          >
            <Image
              source={require('../assets/images/splash-icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </MotiView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#53B175',
    flex: 1,
  },
  scrollView: {
    height: '100%',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 160,
    height: 160,
  },
});

export default Index;
