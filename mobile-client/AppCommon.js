
//>> Import libraries.
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';

//>> Import Components
import { setStatement } from "./src/store/slices/starterSlice";
import { getResponsible } from "./src";

export default function AppCommon ({children}) {
  //>> Set dispatch of Redux
  const dispatch = useDispatch()

  //! App's Session validation.
  /*
    ? What the values of the State means?
    * State: 0 - The user doesnt registered any email.
    * State: 1 - The user has registered but not verified the email.
    * State: 2 - The user has been logged.
  */
  const validateSession = async () => {
    try {
      const value = await AsyncStorage.getItem('userSession');

      if (value) {
        const {Email, isLoggedIn} = JSON.parse(value) 
        //! Get the data from the server.
        const {data} = await getResponsible(Email);

        if(isLoggedIn) {
          loggedIn();
          return dispatch(setStatement({Email: data.Responsible_user.Email, State: 2}));
        }
        
        if(data.Responsible_user.Email_Verify_code != null) {
          // User has already registered but doesnt verify their email.
          return dispatch(setStatement({Email: data.Responsible_user.Email, State: 1}))
        }
        
      } else {
        // User doesnt registered any email.
        return dispatch(setStatement({Email: null, State: 0}));
      }
    } catch (error) {
      console.log(error);
    }
  }

  //! App's Sessions in loggin.
  const loggedIn = async () => {
    try {
      
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

  //>> TEST ASYNC STORAGE
  const setAsyncStorage = async () => {
    try {
      const testingObj = {
        Email: 'yolomeme444@gmail.com',
        isLoggedIn: false,
      }
      await AsyncStorage.removeItem('userSession');
      // await AsyncStorage.setItem('userSession', JSON.stringify(testingObj));
    } catch (error) {
      console.log(error);
    }
  }

  //! Component initialization
  useEffect(() => {
    // setAsyncStorage();
    checkPermissions();
    validateSession();
  }, []);

  return children;
}