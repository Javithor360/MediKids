//>> Importing libraries
import { Text, View, Image, TextInput, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons as MaterialCommIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
//>> Importing components
import { AuthStylesGlobal } from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton, getPatients, loginResponsible, SetLabel, ShowToast } from '../../index';
import { setLogginValues } from '../../store/slices/responsibleSlice';
import { setStatement } from '../../store/slices/starterSlice';

export const LoginScreen = () => {
  const { t } = useTranslation();
  const lng = useSelector(state => state.starter.Language);
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

      //! Disable go back button (after query for enable the try-catch statement).
      setDisableBack(true);

      if(data.success){
        //! Show success message.
        ShowToast('my_success', lng ? 'Éxito' : 'Success', lng ? 'Inicio de Sesion completo.' : 'Logged in successfully.');

        //! SET THE RESPONSIBLE SLICE IN REDUX
        dispatch(setLogginValues({
          FirstNames: data.User.First_Names,
          LastNames: data.User.Last_Names,
          Email: data.User.Email,
          DUI: data.User.DUI,
          Birthdate: data.User.Birthdate,
          Age: data.User.Age,
          Phone: data.User.Phone,
          ProfilePhotoUrl: data.User.Profile_Photo_Url,
          Profile_Photo_Name: data.User.Profile_Photo_Name,
          jwtToken: data.token,
        }))

        //! Close loading animation
        setTimeout(() => {
          setIsLoading(false);
          setSuccess(true);

          setTimeout(() => {
            setDisableBack(false)
            //\\ CHECK IF HE ALREADY SET AN PF.
            if(data.User.Profile_Photo_Url == 'https://firebasestorage.googleapis.com/v0/b/medikids-b1d14.appspot.com/o/perfil_photos%2Fdefault.png?alt=media&token=8b5b9e6c-7629-404c-b0cc-9df4d1d1c976&_gl=1*1c1tmav*_ga*MTM1ODc1NDMxMi4xNjk3MzAzMTQ5*_ga_CW55HF8NVT*MTY5NzMwMzE0OS4xLjEuMTY5NzMwNDA4My40MC4wLjA.'){
              navigation.navigate('SelectProfilePhotoScreen', {haveButton: false});

            //\\ CHECK IF THE USER ALREADY HAS PATIENTS REGISTERED.
            } else if (Patients.data.patients.length == 0) {
              navigation.navigate('RegisterPatientScreen');

            //\\ REDIRECT THE USER TO THE DASHBOARD.
            } else {
              navigation.replace('SelectPatientScreen');
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
        ShowToast('my_warning', lng ? 'Aviso' : 'Warning', lng ? error.response.data.message.es : error.response.data.message.en);
        dispatch(setStatement({Email: Email, State: false}));
        setTimeout(() => navigation.replace('VerifyCodeScreen'), 2000);
      } else {
        //>> Show error message.
        ShowToast('my_error', 'Error', lng ? error.response.data.message.es : error.response.data.message.en);
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
            <Text style={{fontFamily: 'poppinsBold', fontSize: 17, paddingTop: isAN ? 5 : 0, color: 'white'}}>{t('loginScn.back')}</Text>
          </TouchableOpacity>
        </View>
        <View style={AuthStylesGlobal.contentContainer} >
          <View style={AuthStylesGlobal.formContent} >
            <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')}  />
            <Text style={AuthStylesGlobal.title_Text}>{t('loginScn.welcomeT')}</Text>

            <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW91]} >
              <MaterialCommIcons name='email-outline' size={24} color={'gray'} style={{marginRight: 6}} />
              <TextInput
                autoFocus={true}
                style={AuthStylesGlobal.inputExtended}
                placeholder={t('loginScn.emailT')}
                placeholderTextColor="gray"
                onChangeText={text => setEmail(text.trim())}
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
                placeholder={t('loginScn.passT')}
                placeholderTextColor="gray"
                onChangeText={text => setPassword(text)}
                editable={!DisableButton}
              />
            </View>

            <Text style={AuthStylesGlobal.TextP} onPress={()=>{
              if(!DisableBack){
                navigation.navigate('ForgotPasswordScreen')
              }
            }}>{t('loginScn.forgotPass')}</Text>

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
                Label={<SetLabel isLoading={isLoading} LabelText={t('loginScn.loginT')} Success={Success}/>}
                handlePress={() => {userLoggingIn()}}
                haveShadow={true}
                disable={DisableButton}
              /> 
            </View>
            <View style={AuthStylesGlobal.cont2} >
              <Text style={AuthStylesGlobal.TextCount}>{t('loginScn.dontHaveA')}</Text>
              <TouchableOpacity>
                <Text style={AuthStylesGlobal.TextReg} disabled={DisableButton} onPress={()=>{
                  if(!DisableBack){
                    navigation.navigate('RegisterScreen')
                  }
                }}>{t('loginScn.signup')}</Text>
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