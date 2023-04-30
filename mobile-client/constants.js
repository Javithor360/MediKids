import { Platform } from "react-native";
import Constants from 'expo-constants';

export const isIOS = Platform.OS === 'ios';

export const navBarHeight = Constants?.platform?.android?.navigationBarHeight;