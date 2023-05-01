
//>> importing 
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import * as ss from 'expo-splash-screen'
import  { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RunStack from './src/navigators/RunStack';

export default function App() {
  const [AssetsLoaded, setAssetsLoaded] = useState(false);
  const [ValidatedSession, setValidatedSession] = useState(false);

  //>> Loading Assets
  const loadAssetsAsync = async () => {
    const imageAssets = [
      require('./assets/logos/adaptive-icon.png'),
      require('./assets/waves/waves_start_top.png'),
      require('./assets/waves/waves_start_buttom.png'),
    ];
    const cacheImages = imageAssets.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  //>> Loading Fonts
  const [fontsLoaded] = useFonts({
    poppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    poppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
  })

  //>> App's Starts
  useEffect(() => {
    (async () => {
      await ss.preventAutoHideAsync();
      loadAssetsAsync().then(() => setAssetsLoaded(true));
      // ValidateSession();
    })()
  }, []);

  //>> Validating User Session
  //! WORK IN PROGRESS.
  const ValidateSession = async () => {
    try {
      const resp = await AsyncStorage.getItem('userSession');
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }

  //>> Continuing the App
  useEffect(() => {
    if (fontsLoaded && AssetsLoaded) {
      (async () => {
        await ss.hideAsync();
      })()
    }
  }, [fontsLoaded, AssetsLoaded]);

  return fontsLoaded && (
    <>
      <NavigationContainer>
        <RunStack />
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

