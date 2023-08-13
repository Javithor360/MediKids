import { createStackNavigator } from "@react-navigation/stack";

//>> Importin Screens
import { AppointmentMainScreen, AppointmentProcessScreen, HistorialAppointment } from '../../index'
import { Other } from '../../screens/app/home/Other'

//>> Creating Stack Navigator
const Stack = createStackNavigator();

export const AppointmentStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AppointmentStack"
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false
      }}
    >
      <Stack.Screen name="AppointmentStack" component={AppointmentMainScreen} />
      <Stack.Screen name="AppointmentProcessScreen" component={AppointmentProcessScreen} />
      <Stack.Screen name="HistorialAppointment" component={HistorialAppointment} />
      <Stack.Screen name="Other" component={Other} />
    </Stack.Navigator>
  );
}
