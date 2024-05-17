
//>> Import Libraries
import { View, Text, Dimensions } from 'react-native'
import Constants from 'expo-constants';

//>> Constants
const {width} = Dimensions.get('screen')

export const CustomStatusBar = ({bgColor}) => {
  return (
    <View style={{height:Constants.statusBarHeight, backgroundColor:bgColor, position:'absolute', top:0, width: width, zIndex: 10000}}/>
  )
}

