import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../Screens/Home.js'
import Calendario from '../Screens/Calendario.js'
import Citas from '../Screens/Citas.js'
import MyCount from '../Screens/MyCount.js'


import React from 'react'

const Tab = createBottomTabNavigator();

  export const BottomTab = () => {
    return (
<Tab.Navigator screenOptions={{
        headerShown: false,
    }}> 
     
    <Tab.Screen 
    name='Home'
    component={Home}
    />
   
    <Tab.Screen 
    name='Calendario'
    component={Calendario}
    />
  
  
  <Tab.Screen 
  name='Citas'
  component={Citas}
  />
  
  
  <Tab.Screen 
  name='MyCount'
  component={MyCount}
  />
 </Tab.Navigator>
    );
  
  
  
  }
  
  