import { createStackNavigator } from "@react-navigation/stack";

//>> Importin Screens
import { HomeScreen,NotificationScreen,MyVaccines } from '../../index'
import { Other } from '../../screens/app/home/Other'
import  SpecialityInfoN  from "../../screens/app/home/SpecialityInfoN";

//>> Creating Stack Navigator
const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Other" component={Other} />
      <Stack.Screen name='NotificationScreen' component={NotificationScreen} />
      <Stack.Screen name='MyVaccines' component={MyVaccines} />
      <Stack.Screen name='SpecialityInfoN' component={SpecialityInfoN} />

    </Stack.Navigator>
  );
}

