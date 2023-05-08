//>> Importing libraries
import { Text, View, Image, TextInput, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, ImageBackground} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

//>> Importing components
import  { AuthStylesGlobal, AuthStylesRegisterU }  from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton } from '../../index';

export const RegisterScreen = () => {
  const navigation = useNavigation()

  //! States for the Form.
  const [FirstNames, setFirstNames] = useState(null);
  const [LastNames, setLastNames] = useState(null);
  const [DUI, setDUI] = useState(null);
  const [Phone, setPhone] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [ConfPass, setConfPass] = useState(null);

  //! States for th functioning handler.
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);
  
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
        <View style={AuthStylesGlobal.contentContainer}>
          <View style={AuthStylesGlobal.formContent} >
            <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')}  />
            <Text style={AuthStylesRegisterU.Tex_md}>Datos del encargado</Text>
            <View style={{flexDirection: 'row', width: '90%', gap: 15}}>
              <TextInput
                autoFocus={true}
                style={[AuthStylesGlobal.input, AuthStylesGlobal.customW50]}
                placeholder="Nombres"
                placeholderTextColor="gray"
                onChangeText={text => setFirstNames(text)}
              />
              <TextInput
                style={[AuthStylesGlobal.input, AuthStylesGlobal.customW50]}
                placeholder="Apellidos"
                placeholderTextColor="gray"
                onChangeText={text => setLastNames(text)}
              />
            </View>
            <View style={{flexDirection: 'row', width: '90%', gap: 15}}>
              <TextInput
                style={[AuthStylesGlobal.input, AuthStylesGlobal.customW50]}
                placeholder="DUI"
                placeholderTextColor="gray"
                onChangeText={text => setDUI(text)}
              />
              <TextInput
                style={[AuthStylesGlobal.input, AuthStylesGlobal.customW50]}
                placeholder="Telefono"
                placeholderTextColor="gray"
                onChangeText={text => setPhone(text)}
              />
            </View>
            <TextInput
              style={[AuthStylesGlobal.input, AuthStylesGlobal.customW91]}
              placeholder="Correo electrónico"
              placeholderTextColor="gray"
              onChangeText={text => setEmail(text)}
            />
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
                Label={"Siguiente"}
                handlePress={() => {navigation.navigate('RegisterPatientScreen');}}
                haveShadow={true}
              /> 
            </View>
            <View style={AuthStylesGlobal.cont2} >
              <Text style={AuthStylesGlobal.TextCount}>¿Ya tienes una cuenta?</Text>
              <TouchableOpacity>
                <Text style={AuthStylesGlobal.TextReg} onPress={()=>navigation.navigate('LoginScreen')}>Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={AuthStylesGlobal.bottomWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_buttom.png")}/> 
        </View>
      </View>
    </>
  )
}