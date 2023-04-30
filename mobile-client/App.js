import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text,View,Button } from 'react-native';
import Navigator  from './Navigators/Navigator';
import { BottomTab } from './Navigators/BottomTab';

export default function App(){
  return(
    <>
      <NavigationContainer>
        <Navigator></Navigator>
      </NavigationContainer>
    </>   
  )
 }
 