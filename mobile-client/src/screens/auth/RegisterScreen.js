//>> Importing libraries
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, ImageBackground, StyleSheet, Dimensions, BackHandler} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

//>> Importing components
import  { AuthStylesGlobal, AuthStylesRegisterU }  from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton, registerResponsible } from '../../index';
import { setStatement } from '../../store/slices/starterSlice';

//>> Importing icons
import { Feather, AntDesign, MaterialIcons, Entypo, MaterialCommunityIcons as MaterialCommIcons } from '@expo/vector-icons';

const {windowHeight} = Dimensions.get('window').height;

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  //! States for the Form.
  const [FirstNames, setFirstNames] = useState(null);
  const [LastNames, setLastNames] = useState(null);
  const [DUI, setDUI] = useState(null);
  const [Phone, setPhone] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [ConfPass, setConfPass] = useState(null);
  const Birthdate  = '01/01/2000';

  //! States for th functioning handler.
  const [Success, setSuccess] = useState(false);

  //! States for statement
  const [isLoading, setIsLoading] = useState(false);

  //! State For disable the button
  const [DisableButton, setDisableButton] = useState(false);
  const [DisableBack, setDisableBack] = useState(false);

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
      return 'Registrarse'
    }
  }

  //* Main Function to register the user.
  const registerNewUser = async () => {
    try {
      //! set the Loading animation
      setIsLoading(true);

      //! Server Query
      const {data} = await registerResponsible(FirstNames, LastNames, Email, Password, ConfPass, DUI, Birthdate, Phone);
      
      //! Disable go back button (after query for enable the try-catch statement).
      setDisableBack(true);

      if(data.success){
        //! Show success message.
        showToast('my_success', 'Éxito', 'Registro completado correctamente');

        //! Set Async Storage Values
        const userSession = { Email: data.Email, isLoggedIn: false, jwtToken: null}
        await AsyncStorage.setItem('userSession', JSON.stringify(userSession));

        //! Set the Stater State
        dispatch(setStatement({Email: data.Email, State: false}));

        //! Close loading animation
        setTimeout(() => {
          setIsLoading(false);
          setSuccess(true);
          setTimeout(() => {
            navigation.navigate('VerifyCodeScreen');
          }, 3000);
        }, 4000);
      }
    } catch (error) {
      //>> Close loading animation
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(false);
      }, 2000);

      //>> Show error message.
      showToast('my_error', 'Error', error.response.data.message);
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
      if(DisableBack){
          navigation.setOptions({
              gestureEnabled: false
          })
      }
  }, [navigation, DisableBack]);

  useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () => {
          if(DisableBack){
              return true;
          } else {
              return false;
          }
      })
  }, [DisableBack]);
  
  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#e4e2ff',}}
      behavior={'padding'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor:'#fff' }}>
          <View style={AuthStylesGlobal.topWaveContainer}>
            <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
            <TouchableOpacity activeOpacity={0.5} style={AuthStylesGlobal.buttomCameBack} disabled={DisableButton} onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back-ios" size={17} color="white" />
              <Text style={{fontFamily: 'poppinsBold', fontSize: 17, paddingTop: isAN ? 5 : 0, color: 'white'}}>Atrás</Text>
            </TouchableOpacity>
          </View>
          <View style={AuthStylesGlobal.contentContainer}>
            <View style={AuthStylesGlobal.formContent} >
              <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')}  />
              <Text style={AuthStylesRegisterU.Tex_md}>Datos del encargado</Text>
              <View style={{flexDirection: 'row', width: '90%', gap: 15}}>
                <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW50]} >
                  <Feather name="user" size={24} color='gray' style={{marginRight: 6}} />
                  <TextInput
                    style={AuthStylesGlobal.input}
                    autoFocus={true}
                    placeholder="Nombres"
                    placeholderTextColor="gray"
                    onChangeText={text => setFirstNames(text)}
                    editable={!DisableButton}
                  />
                </View>
                <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW50]} >
                  <Feather name="user" size={24} color='gray' style={{marginRight: 6}} />
                  <TextInput
                    style={AuthStylesGlobal.input}
                    placeholder="Apellidos"
                    placeholderTextColor="gray"
                    onChangeText={text => setLastNames(text)}
                    editable={!DisableButton}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row', width: '90%', gap: 15}}>
                <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW50]} >
                  <AntDesign name="idcard" size={24} color="gray" style={{marginRight: 6}} />
                  <TextInput
                    style={AuthStylesGlobal.input}
                    placeholder="DUI"
                    placeholderTextColor="gray"
                    onChangeText={text => setDUI(text)}
                    editable={!DisableButton}
                  />
                </View>
                <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW50]} >
                  <Feather name="phone" size={24} color="gray" style={{marginRight: 6}} />
                  <TextInput
                    style={AuthStylesGlobal.input}
                    placeholder="Telefono"
                    placeholderTextColor="gray"
                    onChangeText={text => setPhone(text)}
                    keyboardType='numeric'
                  editable={!DisableButton}
                  />
                </View>
              </View>
              
              <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW91]} >
                <MaterialCommIcons name='email-outline' size={24} color={'gray'} style={{marginRight: 6}} />
                <TextInput
                  style={AuthStylesGlobal.inputExtended}
                  placeholder="Correo electrónico"
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
                  placeholder="Contraseña"
                  placeholderTextColor="gray"
                  onChangeText={text => setPassword(text)}
                  secureTextEntry={true}
                  editable={!DisableButton}
                />
              </View>
              <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW91]} >
                <MaterialIcons name="lock-outline" size={24} color={'gray'} style={{marginRight: 6}} />
                <TextInput
                  style={AuthStylesGlobal.inputExtended}
                  placeholder="Confirmar Contraseña"
                  placeholderTextColor="gray"
                  onChangeText={text => setConfPass(text)}
                  secureTextEntry={true}
                  editable={!DisableButton}
                />
              </View>
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
                  handlePress={() => {registerNewUser()}}
                  haveShadow={true}
                  disable={DisableButton}
                /> 
              </View>
              <View style={AuthStylesGlobal.cont2} >
                <Text style={AuthStylesGlobal.TextCount}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity disabled={DisableButton}>
                  <Text style={AuthStylesGlobal.TextReg} onPress={()=>navigation.navigate('LoginScreen')}>Inicia sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={AuthStylesGlobal.bottomWaveContainer}>
            <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_buttom.png")}/> 
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}