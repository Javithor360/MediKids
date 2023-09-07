
//>> Import libraries.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { View } from "react-native";


//>> Import Components
import { setStatement } from "./src/store/slices/starterSlice";
import { CustomStatusBar, getResponsible } from "./src";
import { setLogginValues } from "./src/store/slices/responsibleSlice";

export default function AppCommon ({children}) {
  //>> Set dispatch of Redux
  const dispatch = useDispatch()

  //>> Get statusBar color from the storage
  const statusBarColor = useSelector(state => state.starter.StatusBarColor);

  //! App's Session validation.
  /*
    ? What the values of the State means?
    * State: false - The user doesnt registered any email.
    * State: true - The user has been logged.
  */
  const validateSession = async () => {
    try {
      const value = await AsyncStorage.getItem('userSession');

      if (value) {
        const {Email, isLoggedIn, jwtToken} = JSON.parse(value);

        // Validate if the user has logged in.
        if(isLoggedIn) {
          loggedIn(Email, jwtToken);
          return dispatch(setStatement({Email: Email, State: true}));
        } else {
          // if the user doesnt login.
          return dispatch(setStatement({Email: Email, State: false}))
        }
        
      } else {
        // User doesnt registered.
        return dispatch(setStatement({Email: null, State: false}));
      }
    } catch (error) {
      console.log(error);
    }
  }

  //! App's Sessions in loggin.
  const loggedIn = async (Email, jwtToken) => {
    try {
      const {data} = await getResponsible(Email);

      dispatch(setLogginValues({
        FirstNames: data.Responsible_user.First_Names, 
        LastNames: data.Responsible_user.Last_Names,
        Email: data.Responsible_user.Email,
        DUI: data.Responsible_user.DUI,
        Birthdate: data.Responsible_user.Birthdate,
        Age: data.Responsible_user.Age,
        Phone: data.Responsible_user.Phone,
        ProfilePhotoUrl: data.Responsible_user.Profile_Photo_Url,
        Profile_Photo_Name: data.Responsible_user.Profile_Photo_Name,
        Email_Verify_code: data.Responsible_user.Email_Verify_code,
        jwtToken: jwtToken,
      }))
    } catch (error) {
      console.log(error);
    }
  }
  
  
  //! Check Permissions of the application.
  const checkPermissions = async () => {
    try {
      const {status} = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status !== 'granted'){
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      }
    } catch (error) {
      console.log(error);
    }
  }

  //! Component initialization
  useEffect(() => {
    // AsyncStorage.removeItem('userSession');
    checkPermissions();
    validateSession();
  }, []);

  return (
    <>
      <View style={{flex:1, position:'relative'}}>
        <CustomStatusBar bgColor={statusBarColor} />
        {children}
      </View>
    </>
    
  );
}