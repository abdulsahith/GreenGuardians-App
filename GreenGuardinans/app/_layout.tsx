import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // If token exists, redirect to the home page
          console.log('Token found:', token);
          router.push('/(tabs)');
        } else {
          router.push('/pages/login');
        }
      } catch (error) {
        
        
         
      } finally {
        // Mark the auth check as complete
        setIsAuthChecked(true);
      }
    };

    checkLogin();

    const handle = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        console.log(token); // This should log the token if it was saved properly
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    handle();
  }, [router]); // Dependency array ensures router is initialized

  useEffect(() => {
    if (loaded && isAuthChecked) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isAuthChecked]); // Only hide splash screen after fonts loaded and auth checked

  if (!loaded || !isAuthChecked) {
    // Show nothing until fonts are loaded and auth is checked
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pages/login" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
