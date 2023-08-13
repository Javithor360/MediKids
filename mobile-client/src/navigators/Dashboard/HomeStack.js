import { createStackNavigator } from "@react-navigation/stack";

//>> Importin Screens
import { HomeScreen,NotificationScreen, PatientPerfilScreen } from '../../index'
import { Other } from '../../screens/app/home/Other'
import  SpecialityInfoN  from "../../screens/app/home/SpecialityInfoN";
import Otorrino from "../../screens/app/home/Otorrino"
import Gastro from "../../screens/app/home/Gastro"

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
      <Stack.Screen name='MyVaccines' component={PatientPerfilScreen} />
      <Stack.Screen name='SpecialityInfoN' component={SpecialityInfoN} />
      <Stack.Screen name='Otorrino' component={Otorrino} />
      <Stack.Screen name='Gastro' component={Gastro} />


    </Stack.Navigator>
  );
}

