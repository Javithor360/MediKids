//>> Importing libraries
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ImageBackground} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

//>> Importing components
import  { AuthStylesGlobal }  from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton } from '../../index';
const { height } = Dimensions.get('window');

export const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={AuthStylesGlobal.mainContainer}>
        <View style={AuthStylesGlobal.topWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
          <TouchableOpacity activeOpacity={0.5} style={AuthStylesGlobal.buttomCameBack} onPress={() => navigation.navigate('WelcomeScreen')}>
            <MaterialIcons name="arrow-back-ios" size={17} color="white" />
            <Text style={{fontFamily: 'poppinsBold', fontSize: 17, paddingTop: isAN ? 5 : 0, color: 'white'}}>Atrás</Text>
          </TouchableOpacity>
        </View>
        <View style={AuthStylesGlobal.contentContainer} >
          <View style={AuthStylesGlobal.formContent} >
            <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')}  />
            <Text style={AuthStylesGlobal.title_Text}>¡Bienvenido!</Text>
            <TextInput
              autoFocus={true}
              style={[AuthStylesGlobal.input, AuthStylesGlobal.customW90]}
              placeholder="Email"
              placeholderTextColor="gray"
            />
            <TextInput
              style={[AuthStylesGlobal.input, AuthStylesGlobal.customW90]}
              secureTextEntry={true}
              placeholder="Contraseña"
              placeholderTextColor="gray"
            />
            <Text style={AuthStylesGlobal.TextP} onPress={()=>navigation.navigate('ForgotPasswordScreen') }>Olvidé mi contraseña</Text>
            
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
                Label={"Iniciar sesión"}
                handlePress={() => {navigation.navigate('ApplicationTab');}}
                haveShadow={true}
              /> 
            </View>
            <View style={AuthStylesGlobal.cont2} >
              <Text style={AuthStylesGlobal.TextCount}>¿No tienes una cuenta?</Text>
              <TouchableOpacity>
                <Text style={AuthStylesGlobal.TextReg} onPress={()=>navigation.navigate('RegisterScreen')}>Regístrate</Text>
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