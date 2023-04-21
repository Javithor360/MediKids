
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Login from '../Screens/Login.js'
import Register from '../Screens/Register.js'
import RegisterP from '../Screens/RegisterP.js'
import Home from '../Screens/Home.js'
import ForgotPassword from '../Screens/ForgotPassword.js'
import Cod from '../Screens/Cod.js'




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
        name = 'Home'
        component={Home}
        />
         <Stack.Screen
        name = 'ForgotPassword'
        component={ForgotPassword}
        />
  <Stack.Screen
        name = 'Cod'
        component={Cod}
        />

 
    </Stack.Navigator>
    


    
    )
    
  }

  