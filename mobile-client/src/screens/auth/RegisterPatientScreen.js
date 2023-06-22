//>> Importing libraries
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, Modal, TouchableHighlight, BackHandler, KeyboardAvoidingView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from "@react-native-community/datetimepicker"

//>> Importing components
import { AuthStylesGlobal, AuthStylesRegisterP, AuthStylesRegisterU } from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton, DropdownComponent } from '../../index';
import { ScrollView } from "react-native-gesture-handler";
import { TextInputMask } from "react-native-masked-text";

//>> Importing icons
import { Feather, AntDesign, Fontisto, MaterialCommunityIcons as MaterialCommIcons } from '@expo/vector-icons';

export const RegisterPatientScreen = () => {
  const navigation = useNavigation();

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

  //! State For disable the button
  const [DisableButton, setDisableButton] = useState(false);

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
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#e4e2ff',}}
    behavior={'padding'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor:'#fff' }}>
        <View style={AuthStylesGlobal.topWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
          <View style={[AuthStylesGlobal.buttomCameBack]}>
            <Text style={{color: 'white', fontSize: 20, fontFamily: 'poppinsBold'}}>Paso 2</Text>
          </View>
        </View>
        <View style={AuthStylesGlobal.contentContainer}>
          <View style={AuthStylesGlobal.formContent} >
            <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')}  />
            <Text style={AuthStylesRegisterU.Tex_md}>Datos del paciente</Text>
            <View style={[AuthStylesGlobal.cont2, {marginTop: -10}]} >
              <Text style={AuthStylesGlobal.TextCount}>Necesitamos identificar</Text>
            </View>

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
              <DropdownComponent data={[{ label: 'Masculino', value: true }, { label: 'Femenino', value: false },]} setFormValue={setGender} placeholder={'Tipo sangui...'} />
              <DropdownComponent data={[{ label: 'Masculino', value: true }, { label: 'Femenino', value: false },]} setFormValue={setGender} placeholder={'Genero'} />
            </View>
            
            <View style={{flexDirection: 'row', width: '90%', gap: 15}}>
              <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW50]} >
                <MaterialCommIcons name="weight-pound" size={24} color="gray" style={{marginRight: 6}} />
                <TextInputMask
                  style={AuthStylesGlobal.input}
                  placeholder="Peso (lb)"
                  placeholderTextColor="gray"
                  onChangeText={text => setWeight(text)}
                  editable={!DisableButton}
                  maxLength={3}
                  keyboardType='numeric'
                  type="custom"
                  options={{
                    mask: '999',
                    suffixUnit: 'lb'
                  }}
                />
              </View>
              <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW50]} >
                <MaterialCommIcons name="human-male-height" size={24} color="gray" style={{marginRight: 6}} />
                <TextInputMask
                  style={AuthStylesGlobal.input}
                  placeholder="Estatura (m)"
                  placeholderTextColor="gray"
                  onChangeText={text => setHeight(text)}
                  keyboardType='numeric'
                  editable={!DisableButton}
                  maxLength={4}
                  type="custom"
                  options={{
                    mask: '9.99',
                    separator: '.',
                  }}
                />
              </View>
            </View>
            <TouchableOpacity style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW91, AuthStylesRegisterP.inputBtn]} onPress={() => setShow(true)} activeOpacity={.7}>
              <AntDesign name="calendar" size={24} color="#707070" style={{marginRight: 6}} />
              <TextInput style={[AuthStylesGlobal.inputExtended, {color: 'gray'}]} editable={false} value={selectedDate} onPressIn={() => setShow(true)}/>
            </TouchableOpacity>
            

            {/* Show the datepicker */}
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
      </ScrollView>
    </KeyboardAvoidingView>
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