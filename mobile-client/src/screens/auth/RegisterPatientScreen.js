//>> Importing libraries
import { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ImageBackground,  Platform, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker"


//>> Importing components
import  { AuthStylesGlobal, AuthStylesRegisterP }  from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton } from '../../index';
const { height } = Dimensions.get('window');

export const RegisterPatientScreen = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Fecha de nacimiento")

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false)
    if (event.type === 'dismissed') {
      return;
    }
    setDate(currentDate);
    setSelectedDate(currentDate.toLocaleDateString())
  };

  const showMode = (currentMode) => {

    if (Platform.OS === 'android') {
      setShow(true);
      // for iOS, add a button that closes the picker
    }

    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

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
        <View style={AuthStylesGlobal.contentContainer}>
          <View style={AuthStylesGlobal.formContent}>
            <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')}  />
            <Text style={AuthStylesGlobal.title_Text}>Datos del paciente</Text>
            <View style={{flexDirection: 'row', width: '90%', gap: 15}}>
              <TextInput
                autoFocus={true}
                style={[AuthStylesGlobal.input, AuthStylesGlobal.customW50]}
                placeholder="Nombres"
                placeholderTextColor="gray"
              />
              <TextInput
                style={[AuthStylesGlobal.input, AuthStylesGlobal.customW50]}
                placeholder="Apellidos"
                placeholderTextColor="gray"
              />
            </View>
            <TouchableOpacity style={[AuthStylesGlobal.input, AuthStylesGlobal.customW91, AuthStylesRegisterP.inputBtn]} onPress={showDatepicker} activeOpacity={.7}>
                <TextInput style={AuthStylesRegisterP.inputBtnText} editable={false} placeholder="Fecha de nacimiento" value={selectedDate}/>
                <MaterialIcons name="calendar-today" size={24} color="#707070" />
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="spinner"
                is24Hour={true}
                onChange={onChange}
                positiveButton={{label: 'Aceptar', textColor: '#A375FF'}}
                negativeButton={{label: 'Cancelar', textColor: '#707070'}} 
              />
            )}
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
                handlePress={() => {navigation.navigate('ApplicationTab');}}
                haveShadow={true}
              /> 
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

const stylesRegPa = StyleSheet.create({
  inputBtn:{
    paddingHorizontal: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBtnText: {
    fontSize: 16,
    color: '#707070',
    fontFamily: 'poppinsRegular',
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
    borderRadius: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})