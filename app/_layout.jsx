import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { ProductProvider } from '../Utility/productContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast, { BaseToast, ErrorToast} from 'react-native-toast-message';

// Prevent the splash screen from hiding until the app is ready
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    // If there is an error loading the fonts, throw the error
    if (error) {
      throw error;
    }

    // Once fonts are loaded, hide the splash screen
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // If fonts are not loaded, show nothing (splash screen will still be shown)
  if (!fontsLoaded && !error) {
    return null; // This keeps the splash screen visible
  }

  // Customizing the Toast
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          width: '90%',
          borderLeftColor: '#53B175', 
          backgroundColor: '#FFF', 
          top: 20,
        }}
        contentContainerStyle={{
          paddingHorizontal: 15, 
        }}
        text1Style={{
          fontSize: 20, 
          fontWeight: 'bold',
          color: '#53B175', 
        }}
        text2Style={{
          fontSize: 18, 
          color: '#7C7C7C', 
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          width: '90%',
          borderLeftColor: '#F3603F', 
          backgroundColor: '#FFF',
          top: 20,
        }}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        text1Style={{
          fontSize: 20, 
          fontWeight: 'bold',
          color: '#F3603F', 
        }}
        text2Style={{
          fontSize: 18, 
          color: '#7C7C7C',
        }}
      />
    ),
  };

  return (
    <>
      <SafeAreaProvider>
        <ProductProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(product)" options={{ headerShown: false }} />
          </Stack>
        </ProductProvider>
      </SafeAreaProvider>
      <Toast config={toastConfig} />
    </>
  );
};

export default RootLayout;
