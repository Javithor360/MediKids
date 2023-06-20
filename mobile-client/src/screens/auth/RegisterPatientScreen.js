//>> Importing libraries
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, ImageBackground, Modal, TouchableHighlight, BackHandler,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker"


//>> Importing components
import  { AuthStylesGlobal, AuthStylesRegisterP }  from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton } from '../../index';

export const RegisterPatientScreen = () => {
  const navigation = useNavigation();

  //! Datepicker states
  const [date, setDate] = useState(new Date());
  const [LastDate, setLastDate] = useState(new Date());
  const [show, setShow] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState("Fecha de nacimiento")

  //! Dected when the datepicker changes.
  //>> iOS
  const onChange = (e, SelectedDate) => {
    setDate(new Date(SelectedDate));
    setSelectedDate(new Date(SelectedDate).toLocaleDateString())
  }
  //>> Android
  const onChangeAN = (e, SelectedDate) => {
    setShow(false);
    if(SelectedDate){
      setDate(new Date(SelectedDate));
      setSelectedDate(new Date(SelectedDate).toLocaleDateString())
    }
  }

  const onCancelPicker = () => {
    if(LastDate.toLocaleDateString() == new Date().toLocaleDateString()){
    setSelectedDate('Fecha de nacimiento');
    } else {
      setSelectedDate(new Date(LastDate).toLocaleDateString());
    }
    setDate(LastDate);
    setShow(false)
  }
  const onDonePicker = () => {
    setSelectedDate(new Date(date).toLocaleDateString())
    setShow(false)
    setLastDate(new Date(date));
  } 

  const getDatePicker = () => {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode='date'
        display="spinner"
        is24Hour={true}
        onChange={isAN ? onChangeAN : onChange}
        positiveButton={{label: 'Aceptar', textColor: '#A375FF'}}
        negativeButton={{label: 'Cancelar', textColor: '#707070'}}
        textColor={'#000'}
        style={{marginTop: '10%'}}
      />
    )
  }

  const renderDatePicker = () => {
    return (
      isIOS ? (
        <Modal transparent={true} animationType="slide" visible={show} onRequestClose={() => setShow(!show)}>
          <View style={stylesRegPa.modalScreen}>
            <TouchableHighlight underlayColor={'#fff'} style={stylesRegPa.pickerContainer}>
              <View>
                <View>
                  <View>{getDatePicker()}</View>
                  <TouchableOpacity underlayColor={'transparent'} activeOpacity={0.3} onPress={onCancelPicker} style={[stylesRegPa.btnPickerTex, stylesRegPa.BtnPickerCancel]}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity underlayColor={'transparent'} activeOpacity={0.3} onPress={onDonePicker} style={[stylesRegPa.btnPickerTex, stylesRegPa.BtnPickerDone]}>
                    <Text>Aceptar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </Modal>
      ) : (
        <>{getDatePicker()}</>
      )
    )
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
        return true;
    })
  }, []);

  return (
    
    <>
      <View style={AuthStylesGlobal.mainContainer}>
        <View style={AuthStylesGlobal.topWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
          <View style={[AuthStylesGlobal.buttomCameBack]}>
              <Text style={{color: 'white', fontSize: 20, fontFamily: 'poppinsBold'}}>Paso 2</Text>
          </View>
        </View>
        <View style={AuthStylesGlobal.contentContainer}>
          <View style={AuthStylesGlobal.formContent}>
            <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')}  />
            <Text style={AuthStylesGlobal.title_Text}>Datos del paciente</Text>
            <View style={{flexDirection: 'row', width: '90%', gap: 15}}>
            <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW50]} >
              <TextInput
                autoFocus={true}
                style={AuthStylesGlobal.input}
                placeholder="Nombres"
                placeholderTextColor="gray"
              />
            </View>
            <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW50]} >
              <TextInput
                style={AuthStylesGlobal.input}
                placeholder="Apellidos"
                placeholderTextColor="gray"
              />
            </View>
              
            </View>
            <TouchableOpacity style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW91, AuthStylesRegisterP.inputBtn]} onPress={() => setShow(true)} activeOpacity={.7}>
                <TextInput style={AuthStylesRegisterP.inputBtnText} editable={false} placeholder="Fecha de nacimiento" value={selectedDate} onPressIn={() => setShow(true)}/>
                <MaterialIcons name="calendar-today" size={24} color="#707070" />
            </TouchableOpacity>
            {show && renderDatePicker()}
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
  pickerContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: '35%',
    position: 'absolute',
    bottom: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.30,
    shadowRadius: 4
  },
  modalScreen: {
    flex: 1
  },
  btnPickerTex: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnPickerCancel: {
    left: 0,
  },
  BtnPickerDone: {
    right: 0
  }
})