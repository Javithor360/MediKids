
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Login from '../Screens/Login'
import Register from '../Screens/Register.js'
import RegisterP from '../Screens/RegisterP.js'

const Stack = createStackNavigator()

export default function Navigator(){
    return (

    <Stack.Navigator
    screenOptions={{
        headerShown: false,
    }}
    >
    <Stack.Screen
        name = 'Login'
        component={Login}
        />


        <Stack.Screen
        name = 'Register'
        component={Register}
        />
  <Stack.Screen
        name = 'RegisterP'
        component={RegisterP}
        />
 
 <Stack.Screen
        name = 'Main'
        component={Main}
        />
    </Stack.Navigator>
    )
  }

