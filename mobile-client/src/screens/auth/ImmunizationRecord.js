//>> Importing libraries
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, Modal, TouchableHighlight, BackHandler, KeyboardAvoidingView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from "@react-native-community/datetimepicker"

//>> Importing components
import { AuthStylesGlobal, AuthStylesRegisterP, AuthStylesRegisterU } from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton, DropdownComponent, RegisterPatientsQuery } from '../../index';
import { ScrollView } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";

//>> Importing icons
import { Feather, AntDesign, Fontisto, MaterialCommunityIcons as MaterialCommIcons, Entypo } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const ImmunizationRecord = () => {
  const navigation = useNavigation();
  const Email = useSelector(state => state.responsible.Email);

  //! Datepicker states
  const [date, setDate] = useState(new Date());
  const [LastDate, setLastDate] = useState(new Date());
  const [show, setShow] = useState(false);

  //! Datepicker State
  const [selectedDate, setSelectedDate] = useState("Fecha de Nacimiento");

  //! States for the Form.
  const [FirstNames, setFirstNames] = useState(null);
  const [LastNames, setLastNames] = useState(null);
  const [BloodType, setBloodType] = useState(null);
  const [Gender, setGender] = useState(null);
  const [Weight, setWeight] = useState(null);
  const [Height, setHeight] = useState(null);

  //! States for th functioning handler.
  const [Success, setSuccess] = useState(false);

  //! States for statement
  const [isLoading, setIsLoading] = useState(false);

  //! State For disable the button
  const [DisableButton, setDisableButton] = useState(false);

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
    return <Text>Verificar</Text>
    }
  }

  const registearPatientFunction = async () => {
    try {
      //! set the Loading animation
      setIsLoading(true);

      //! Server Query
      const {data} = await RegisterPatientsQuery(Email, FirstNames, LastNames, BloodType, Gender, Weight, Height, selectedDate);
  

      if(data.success){
        //! Show success message.
        showToast('my_success', 'Éxito', 'Paciente Registrado correctamente');

        //! Close loading animation
        setTimeout(() => {
        setIsLoading(false);
        setSuccess(true);
          setTimeout(() => {
            navigation.navigate('WelcomeScreen');
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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
        return true;
    })
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#e4e2ff',}}
    behavior={'padding'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor:'#fff' }}>
        <View style={AuthStylesGlobal.topWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
          <View style={[AuthStylesGlobal.buttomCameBack]}>
            <Text style={{color: 'white', fontSize: 20, fontFamily: 'poppinsBold'}}>Paso 3</Text>
          </View>
        </View>
        <View style={AuthStylesGlobal.contentContainer}>
          <View style={AuthStylesGlobal.formContent} >
            <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')} />
            <Text style={AuthStylesRegisterU.Tex_md}>Datos del paciente</Text>
            <View style={[AuthStylesGlobal.cont2, {marginTop: -10}]} >
              <Text style={AuthStylesGlobal.TextCount}>¡Necesitamos la informacion del menor para hacer un muy buen trabajo!</Text>
            </View>

            <View>

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
                // handlePress={() => {registearPatientFunction()}}
                onPress={navigation.navigate('ApplicationTab')}
                haveShadow={true}
                disable={DisableButton}
              />
            </View>
          </View>
        </View>
        <View style={AuthStylesGlobal.bottomWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_buttom.png")}/> 
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  
})