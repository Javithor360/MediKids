//>> Importing libraries
import { Text, View, Image, TextInput, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons as MaterialCommIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//>> Importing components
import { AuthStylesGlobal } from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton, getImmunizationRecord, getPatients, loginResponsible, SetLabel, ShowToast } from '../../index';
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


  //* Main Function to login the user.
  const userLoggingIn = async () => {
    try {
      //! set the Loading animation
      setIsLoading(true);

      //! Server Query
      const {data} = await loginResponsible(Email, Password);

      //! Patients Query
      const Patients = await getPatients(Email);
      
      //! Vaccines Query
      const Vaccines = await getImmunizationRecord(Patients.data.patients.length != 0 ? Patients.data.patients[0].id : null);

      //! Disable go back button (after query for enable the try-catch statement).
      setDisableBack(true);

      if(data.success){
        //! Show success message.
        ShowToast('my_success', 'Éxito', 'Inicio de Sesion completo');

        // //! Set the Async Storage Logged In State.
        const userSession = { Email: Email, isLoggedIn: true, jwtToken: data.token };
        await AsyncStorage.setItem('userSession', JSON.stringify(userSession));

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
            //\\ CHECK IF HE ALREADY SET AN PF.
            if(data.User.Profile_Photo_Url == 'https://firebasestorage.googleapis.com/v0/b/medikids-firebase.appspot.com/o/perfil_photos%2Fdefault.png?alt=media&token=39fd3258-c7df-4596-91f5-9d87b4a86216'){
              navigation.navigate('SelectProfilePhotoScreen', {haveButton: false});

            //\\ CHECK IF THE USER ALREADY HAS PATIENTS REGISTERED.
            } else if (Patients.data.patients.length == 0) {
              navigation.navigate('RegisterPatientScreen');

            //\\ CHECK IF THE PATIENT HAVE BEEN SETTED THE IMMUNIZATION RECORD.
            } else if (Vaccines.data.immunization_record.length == 0) {
              navigation.navigate('ImmunizationRecordScreen', {Patient_id: Patients.data.patients[0].id});

            //\\ REDIRECT THE USER TO THE DASHBOARD.
            } else {
              navigation.navigate('ApplicationTab');
            }

          }, 3000);
        }, 4000);
      }
    } catch (error) {
      console.log(error)
      
      //>> Close loading animation
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(false);
      }, 2500);

      if(error.response.data?.warning != null){
        //>> Show warning message.
        ShowToast('my_warning', 'Warning', error.response.data.message);
        dispatch(setStatement({Email: Email, State: false}));
        setTimeout(() => navigation.replace('VerifyCodeScreen'), 2000);
      } else {
        //>> Show error message.
        ShowToast('my_error', 'Error', error.response.data.message);
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
      BackHandler.addEventListener('hardwareBackPress', () => {return true})
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
                Label={<SetLabel isLoading={isLoading} LabelText={'Iniciar Sesión'} Success={Success}/>}
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