import { createStackNavigator } from "@react-navigation/stack";

//>> Importin Screens
import { HomeScreen } from '../../index'
import { Other } from '../../screens/app/home/Other'

//>> Creating Stack Navigator
const Stack = createStackNavigator();

export const HomeStack
 = () => {
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
    </Stack.Navigator>
  );
}

