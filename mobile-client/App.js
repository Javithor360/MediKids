import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text,View,Button } from 'react-native';
import Navigator from './Navigators/Navigator';

export default function App(){
  return(
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
  )
 }
 