//>> importing libraries
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import * as ss from "expo-splash-screen";
import { Asset } from "expo-asset";
import { Provider } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { LogBox } from "react-native";

//>> Importing Components
import AppStack from "./src/navigators/AppStack";
import store from "./src/store/app/store";
import AppCommon from "./AppCommon";
import { toastConfig } from "./src";
import "./src/localization/i18n";

LogBox.ignoreAllLogs();

export default function App() {
  const [AssetsLoaded, setAssetsLoaded] = useState(false);
  const [Continue, setContinue] = useState(false);

  //>> Loading Assets
  const loadAssetsAsync = async () => {
    const imageAssets = [
      require("./assets/logos/adaptive-icon.png"),
      require("./assets/waves/waves_start_top.png"),
      require("./assets/waves/waves_start_buttom.png"),
      require("./assets/bg/gastro_bg_card.png"),
      require("./assets/bg/neumologia_bg_card.png"),
      require("./assets/bg/oto_bg_card.png"),
    ];
    const cacheImages = imageAssets.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  //>> Loading Fonts
  const [fontsLoaded] = useFonts({
    poppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    poppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  //>> App's Starts
  useEffect(() => {
    (async () => {
      await ss.preventAutoHideAsync();
      loadAssetsAsync().then(() => setAssetsLoaded(true));
    })();
  }, []);

  //>> Continuing the App
  useEffect(() => {
    if (fontsLoaded && AssetsLoaded) {
      (async () => {
        await ss.hideAsync();
        setContinue(true);
      })();
    }
  }, [fontsLoaded, AssetsLoaded]);

  return (
    Continue && (
      <Provider store={store}>
        <AppCommon>
          <AppStack />
        </AppCommon>
        <ExpoStatusBar style="auto" />
        <Toast config={toastConfig} />
      </Provider>
    )
  );
}
