import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//>> Importin Screens
import { LoginScreen, SplashScreen, WelcomeScreen, RegisterScreen, ApplicationTab, RegisterPatientScreen, ForgotPasswordScreen, ResetPasswordScreen, VerifyCodeScreen, SelectProfilePhotoScreen } from '../index'
import { isIOS } from "../constants";

//>> Creating Stack Navigator
const Stack = createStackNavigator();

const RunStackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{gestureEnabled: false, animationEnabled: isIOS && false}} />
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
      <Stack.Screen name='RegisterPatientScreen' component={RegisterPatientScreen} />
      <Stack.Screen name='ApplicationTab' component={ApplicationTab} />
      <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
      <Stack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen} />
      <Stack.Screen name='VerifyCodeScreen' component={VerifyCodeScreen} options={{gestureEnabled: false}} />
      <Stack.Screen name='SelectProfilePhotoScreen' component={SelectProfilePhotoScreen} />
    </Stack.Navigator>
  );
}

export default function AppStack () {
  return (
    <NavigationContainer>
      <RunStackNav />
    </NavigationContainer>
  )
};