import { createStackNavigator } from "@react-navigation/stack";

//>> Importin Screens
import { MyAcountScreen, PatientPerfilScreen } from '../../index'

//>> Creating Stack Navigator
const Stack = createStackNavigator();

export const MyAccountStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false
      }}
    >
      <Stack.Screen name="MyAccountScreen" component={MyAcountScreen} />
      <Stack.Screen name='PatientPerfilScreen' component={PatientPerfilScreen} />
    </Stack.Navigator>
  );
}

