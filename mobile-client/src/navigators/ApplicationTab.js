import React from 'react'
//>>Libraries
import { createBottomTabNavigator as createTabNav } from "@react-navigation/bottom-tabs";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

//>>Stacks screens
import { HomeStack } from '../navigators/Dashboard/HomeStack';
import { CalendarStack } from '../navigators/Dashboard/CalendarStack';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

//>>Tab items props array
const TabProps = [
  {route: 'HomeStack', label: 'Inicio', iconName: 'home-variant', component: HomeStack, color: 'red'},
  {route: 'Calendario', label: 'Calendario', iconName: 'calendar-month', component: CalendarStack, color: 'red'},
  {route: 'Caledndario', label: 'Citas', iconName: 'clipboard-text-clock', component: CalendarStack, color: 'red'},
  {route: 'Calenddario', label: 'Mi cuenta', iconName: 'account-circle', component: CalendarStack, color: 'red'},
]

const Tab = createTabNav();

//>>Tab button function

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textViewRef = useRef(null);
  const icontViewRef = useRef(null);

  //>>Animation values
  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { opacity: 0 },
        0.2: { opacity: 0.2, duration: 10 },
        0.4: { opacity: 0.4, duration: 10 },
        0.6: { opacity: 0.6, duration: 10 },
        0.8: { opacity: 0.8, duration: 10 },
        1: { opacity: 1 },
      });
      textViewRef.current.animate({
        0: { opacity: 0, translateY: 5},
        0.3: { opacity: 0.3, translateY: 3 },
        0.5: { opacity: 0.6, translateY: 2 },
        0.8: {  opacity: 0.8, translateY: 1.5 },
        1: { translateY: 1 },
      });
      icontViewRef.current.animate({
        0: { translateY: 5},
        0.3: { translateY: 3 },
        0.5: { translateY: 2 },
        0.8: { translateY: 1.5 },
        1: { translateY: 1 },
      });
      
    } else {
      viewRef.current.animate({ 
        0: { opacity: 0},
        1: { opacity: 0 },
      });
      textViewRef.current.animate({
        0: { opacity: 1, translateY: .5},
        0.3: { opacity: 0.7, translateY: 4 },
        0.5: { opacity: 0.5, duration: 3 },
        0.8: { opacity: 0.2, duration: 1 },
        1: { opacity: 0 },
      });
      icontViewRef.current.animate({
        0: { translateY: -5},
        0.3: { translateY: 3 },
        0.5: { translateY: 2 },
        0.8: { translateY: 1.5 },
        1: { translateY: 1 },
      });
    }
  }, [focused])

  //>>ButtonComponent
  return (
    <View style={{width: '23%', alignItems: 'center',}}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', margin: 0}}>
        <Animatable.View
          ref={viewRef}
          style={{backgroundColor: '#C3C3E4', height: '50%', width: '50%', borderRadius: 10, position: 'absolute', top: 8}} />
        <View style={[styles.btn, { backgroundColor: focused ? null : null , justifyContent: 'center', alignItems: 'center',}]}>
          <Animatable.View ref={icontViewRef}>
            <MaterialCommunityIcons name={item.iconName} color={'white'} size={36} />
          </Animatable.View>
          <Animatable.View
            ref={textViewRef}>
            {focused && <Text style={{
              color: 'white', textAlign: 'center',
            }}>{item.label}</Text>}
          </Animatable.View>
        </View>
        </TouchableOpacity>
      </View>
  )
}

export const ApplicationTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          display: "flex",
          backgroundColor: '#A375FF',
          height: '8%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      {TabProps.map((item, index) => {
        return (
          <Tab.Screen style={{backgroundColor: 'blue',}} key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabItemContainer:{
    height: '100%',
    width: 95, 
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Itemdefault:{
    height: '70%', 
    width: '70%', 
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'absolute',
    top: 4,
  },
  tabItemSelectedBg:{
    backgroundColor: '#C3C3E4', 
    borderRadius: 12, 
    width: 10,
  },
})