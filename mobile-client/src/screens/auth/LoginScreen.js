//>> Importing libraries
import { Text, View, Image, TextInput, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import { MaterialIcons, Entypo, MaterialCommunityIcons as MaterialCommIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//>> Importing components
import  { AuthStylesGlobal }  from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton, loginResponsible } from '../../index';
import { setLogginValues } from '../../store/slices/responsibleSlice';
import { setStatement } from '../../store/slices/starterSlice';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  //! States for the Form.
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);

  //! States for th functioning handler.
  const [Success, setSuccess] = useState(false);

  //! States for statement
  const [isLoading, setIsLoading] = useState(false);

  //! State For disable the button
  const [DisableButton, setDisableButton] = useState(false);
  const [DisableBack, setDisableBack] = useState(false);

  //! State for unavailability the swipe back.
  const [SwipeBck, setSwipeBck] = useState(true);

  //! Show the Emergent Message (toast).
  const showToast = (type, text1, text2) => {
    Toast.show({
      type:type,
      text1:text1,
      text2:text2,
      duration: 4000
    })
  }

  //* Function to handle the label animation.
  const setLabel = () => {
    if(isLoading){
      //? Loading Animation
      return <ActivityIndicator color='white' />
    } else if(!isLoading && Success){ 
      //? Success Label
      return <><Entypo name="check" size={24} color="white" /><Text>Completado</Text></>
    } else if(!isLoading && !Success){
      //? Default Label
      return 'Iniciar Sesión'
    }
  }

  //* Main Function to login the user.
  const userLoggingIn = async () => {
    try {
      //! set the Loading animation
      setIsLoading(true);

      //! Server Query
      const {data} = await loginResponsible(Email, Password);

      //! Disable go back button (after query for enable the try-catch statement).
      setDisableBack(true);

      if(data.success){
        //! Show success message.
        showToast('my_success', 'Éxito', 'Inicio de Sesion completo');

        // //! Set the Async Storage Logged In State.
        const userSession = { Email: Email, isLoggedIn: true, jwtToken: data.token };
        await AsyncStorage.setItem('userSession', JSON.stringify(userSession));

        //! Set the Stater State
        // dispatch(setStatement({Email: Email, State: true}));
      
        // //! SET THE RESPONSIBLE SLICE IN REDUX
        dispatch(setLogginValues({
          FirstNames: data.User.First_Names, 
          LastNames: data.User.Last_Names,
          Email: data.User.Email,
          DUI: data.User.DUI,
          Birthdate: data.User.Birthdate,
          Age: data.User.Age,
          Phone: data.User.Phone,
          ProfilePhotoUrl: data.User.Profile_Photo_Url,
          jwtToken: data.token,
        }))

        //! Close loading animation
        setTimeout(() => {
          setIsLoading(false);
          setSuccess(true);
          setTimeout(() => {
            if(data.User.Profile_Photo_Url == 'https://firebasestorage.googleapis.com/v0/b/medikids-firebase.appspot.com/o/perfil_photos%2Fdefault.png?alt=media&token=39fd3258-c7df-4596-91f5-9d87b4a86216'){
              navigation.navigate('SelectProfilePhotoScreen', {haveButton: false});
            } else {
              navigation.navigate('ApplicationTab');
            }
          }, 3000);
        }, 4000);
      }
    } catch (error) {
      //>> Close loading animation
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(false);
      }, 2500);

      if(error.response.data?.warning != null){
        //>> Show warning message.
        showToast('my_warning', 'Warning', error.response.data.message);
        dispatch(setStatement({Email: Email, State: false}));
        setTimeout(() => navigation.replace('VerifyCodeScreen'), 2000);
      } else {
        //>> Show error message.
        showToast('my_error', 'Error', error.response.data.message);
      }
    }
  }

  //! Disable the send buttom
  useEffect(() => {
    if(isLoading){
      setDisableButton(true);
    } else if(Success){
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [isLoading, Success]);

  //! Disable go back button.
  useEffect(() => {
    if(DisableBack || !SwipeBck){
      navigation.setOptions({
        gestureEnabled: false
      })
    }
    if (DisableBack) {
      BackHandler.addEventListener('hardwareBackPress', () => {
        return true;
      })
    }
  }, [navigation, DisableBack, SwipeBck]);

  //! check the parameters of the navigation.
  useEffect(() => {
    if (route.params != undefined) {
      const {swipeBack} = route.params;
      setSwipeBck(swipeBack);
    }
  }, [route]);

  return (
    <>
      <View style={AuthStylesGlobal.mainContainer}>
        <View style={AuthStylesGlobal.topWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
          <TouchableOpacity activeOpacity={0.5} style={AuthStylesGlobal.buttomCameBack} disabled={DisableButton} onPress={() => navigation.replace('WelcomeScreen')}>
            <MaterialIcons name="arrow-back-ios" size={17} color="white" />
            <Text style={{fontFamily: 'poppinsBold', fontSize: 17, paddingTop: isAN ? 5 : 0, color: 'white'}}>Atrás</Text>
          </TouchableOpacity>
        </View>
        <View style={AuthStylesGlobal.contentContainer} >
          <View style={AuthStylesGlobal.formContent} >
            <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')}  />
            <Text style={AuthStylesGlobal.title_Text}>¡Bienvenido!</Text>

            <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW91]} >
              <MaterialCommIcons name='email-outline' size={24} color={'gray'} style={{marginRight: 6}} />
              <TextInput
                autoFocus={true}
                style={AuthStylesGlobal.inputExtended}
                placeholder="Email"
                placeholderTextColor="gray"
                onChangeText={text => setEmail(text)}
                keyboardType='email-address'
                editable={!DisableButton}
                autoCapitalize='none'
                autoCorrect={false}
              />
            </View>
            
            <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW91]} >
              <MaterialIcons name="lock-outline" size={24} color={'gray'} style={{marginRight: 6}} />
              <TextInput
                style={AuthStylesGlobal.inputExtended}
                secureTextEntry={true}
                placeholder="Contraseña"
                placeholderTextColor="gray"
                onChangeText={text => setPassword(text)}
                editable={!DisableButton}
              />
            </View>

            <Text style={AuthStylesGlobal.TextP} onPress={()=>{
              if(!DisableBack){
                navigation.navigate('ForgotPasswordScreen')
              }
            }}>Olvidé mi contraseña</Text>

            <View style={AuthStylesGlobal.buttonView}>
              <CustomButton 
                bgColor={'#A375FF'}
                paddingV={0}
                paddingH={0}
                marginH={0}
                marginV={isIOS ? 2 : 6}
                width={'100%'}
                height={'100%'}
                BorderRadius={10}
                fontFamily={'poppinsBold'}
                fontSize={16}
                textColor={'white'}
                Label={setLabel()}
                handlePress={() => {userLoggingIn()}}
                haveShadow={true}
                disable={DisableButton}
              /> 
            </View>
            <View style={AuthStylesGlobal.cont2} >
              <Text style={AuthStylesGlobal.TextCount}>¿No tienes una cuenta?</Text>
              <TouchableOpacity>
                <Text style={AuthStylesGlobal.TextReg} disabled={DisableButton} onPress={()=>{
                  if(!DisableBack){
                    navigation.navigate('RegisterScreen')
                  }
                }}>Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={AuthStylesGlobal.bottomWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_buttom.png")}/> 
        </View>
      </View>
    </>
)}