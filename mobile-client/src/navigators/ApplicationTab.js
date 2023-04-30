import { createBottomTabNavigator as createTabNav } from "@react-navigation/bottom-tabs";

//>> import components
import { HomeStack } from '../index'

//>> Create the Tab navigation function 
const Tab = createTabNav();

//>> Tab Navigation component
export const ApplicationTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="HomeStack" component={ HomeStack } options={{}} />
    </Tab.Navigator>
  )
}

