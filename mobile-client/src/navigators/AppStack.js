import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//>> Importin Screens
import { LoginScreen, SplashScreen, WelcomeScreen, RegisterScreen, ApplicationTab, RegisterPatientScreen, ForgotPasswordScreen, ResetPasswordScreen, VerifyCodeScreen, SelectProfilePhotoScreen, ForgotPassCodeScreen, ImmunizationRecord, SelectPatientScreen, SelectPatientPPScreen} from '../index'
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
      <Stack.Screen name='ApplicationTab' component={ApplicationTab} options={{gestureEnabled: false, animationEnabled: isIOS && false}} />
      <Stack.Screen name='SelectPatientScreen' component={SelectPatientScreen} options={{gestureEnabled: false, animationEnabled: isIOS && false}} />
      <Stack.Screen name='SplashVerifyCode' component={VerifyCodeScreen} options={{gestureEnabled: false, animationEnabled: isIOS && false}} />
      <Stack.Screen name='SplashSelectProfilePhoto' component={SelectProfilePhotoScreen} options={{gestureEnabled: false, animationEnabled: isIOS && false}}/>
      <Stack.Screen name='SelectPatientDashboard' component={SelectPatientScreen} />
      <Stack.Screen name='VerifyCodeScreen' component={VerifyCodeScreen} options={{gestureEnabled: false}} />
      <Stack.Screen name='ForgotPassCodeScreen' component={ForgotPassCodeScreen} options={{gestureEnabled: false}} />
      <Stack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen} options={{gestureEnabled: false}} />
      <Stack.Screen name='RegisterPatientScreen' component={RegisterPatientScreen} options={{gestureEnabled: false}} />
      <Stack.Screen name='RegisterPatientDashboard' component={RegisterPatientScreen} />
      <Stack.Screen name='ImmunizationRecordScreen' component={ImmunizationRecord} options={{gestureEnabled: false}} />
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
      <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
      <Stack.Screen name='SelectProfilePhotoScreen' component={SelectProfilePhotoScreen} />
      <Stack.Screen name='SelectPatientPPScreen' component={SelectPatientPPScreen} />
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