import { createStackNavigator } from "@react-navigation/stack";

//>> Importin Screens
import { Calendario, LoginScreen } from '../../index'
import { Other } from '../../screens/app/home/Other'

//>> Creating Stack Navigator
const Stack = createStackNavigator();

export const CalendarStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CalendarStack"
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false
      }}
    >
      <Stack.Screen name="CalendarStack" component={Calendario} />
      <Stack.Screen name="Other" component={Other} />
    </Stack.Navigator>
  );
}
