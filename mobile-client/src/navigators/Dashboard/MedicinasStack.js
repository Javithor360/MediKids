import { createStackNavigator } from "@react-navigation/stack";

//>> Importin Screens
import {Medicinas } from '../../index'
import { Other } from '../../screens/app/home/Other'

//>> Creating Stack Navigator
const Stack = createStackNavigator();

export const MedicinasStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Medicinas"
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false
      }}
    >
      <Stack.Screen name="Medicinas" component={Medicinas} />
    
    </Stack.Navigator>
  );
}
