import React from 'react'
//>>Libraries
import { createBottomTabNavigator as createTabNav } from "@react-navigation/bottom-tabs";
import { useEffect, useRef } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { isIOS } from '../constants';

//>>Stacks screens
import { HomeStack } from '../navigators/Dashboard/HomeStack';
import { CalendarStack } from '../navigators/Dashboard/CalendarStack';
import { AppointmentStack } from '../navigators/Dashboard/AppointmentStack';
import { MyAccountStack } from './Dashboard/MyAccountStack';
import { MedicinasStack } from './Dashboard/MedicinasStack';
import { useTranslation } from 'react-i18next';

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
        0.2: { opacity: 0.2, duration: 1.5 },
        0.4: { opacity: 0.4, duration: 1.5 },
        0.6: { opacity: 0.6, duration: 1.5 },
        0.8: { opacity: 0.8, duration: 1.5 },
        1: { opacity: 1 }
      });
      textViewRef.current.animate({
        0: { opacity: 0, translateY: 5 },
        0.1: { opacity: 0.1, translateY: 4.7 },
        0.2: { opacity: 0.2, translateY: 4.4 },
        0.3: { opacity: 0.3, translateY: 3.9 },
        0.4: { opacity: 0.4, translateY: 3.2 },
        0.5: { opacity: 0.5, translateY: 2.5 },
        0.6: { opacity: 0.6, translateY: 1.8 },
        0.7: { opacity: 0.7, translateY: 1.3 },
        0.8: { opacity: 0.8, translateY: 1.1 },
        0.9: { opacity: 0.9, translateY: 1.05 },
        1: { translateY: 1 }
      });
      icontViewRef.current.animate({
        0: { translateY: 5 },
        0.1: { translateY: 4.7 },
        0.2: { translateY: 4.4 },
        0.3: { translateY: 3.9 },
        0.4: { translateY: 3.2 },
        0.5: { translateY: 2.5 },
        0.6: { translateY: 1.8 },
        0.7: { translateY: 1.3 },
        0.8: { translateY: 1.1 },
        0.9: { translateY: 1.05 },
        1: { translateY: 1 }
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
        0: { translateY: -5 },
        0.2: { translateY: -1 },
        0.4: { translateY: 1 },
        0.6: { translateY: 1 },
        0.8: { translateY: 1 },
        1: { translateY: 1 }
      });
    }
  }, [focused])

  //>>ButtonComponent
  return (
    <View style={{width: '19.5%', alignItems: 'center',}}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', margin: 0,}}>
        <Animatable.View
          ref={viewRef}
          style={{backgroundColor: '#C3C3E4', height:'56%', width: '55%', borderRadius: 10, position: 'absolute', top: 8}} />
        <View style={{backgroundColor: focused ? null : null , justifyContent: 'center', alignItems: 'center',}}>
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
  const { t } = useTranslation();
  //>>Tab items props array
  const TabProps = [
    {route: 'HomeStack', label: `${t('tabNav.inicio')}`, iconName: 'home-variant', component: HomeStack, color: 'red'},
    {route: 'Calendar', label: `${t('tabNav.Calendario')}`, iconName: 'calendar-clock', component: CalendarStack, color: 'red'},
    {route: 'Appointment', label: `${t('tabNav.Citas')}`, iconName: 'clipboard-text', component: AppointmentStack, color: 'red'},
    {route: 'Medicinas', label: `${t('tabNav.Medicinas')}`, iconName: 'pill', component: MedicinasStack, color: 'red'},
    {route: 'MyAccount', label: `${t('tabNav.Mi_Cuenta')}`, iconName: 'account-circle', component: MyAccountStack, color: 'red'},
  ]

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
          height: isIOS ? 100 : 75,
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