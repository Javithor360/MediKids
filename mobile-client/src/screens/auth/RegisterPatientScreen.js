//>> Importing libraries
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, Modal, TouchableHighlight, BackHandler, KeyboardAvoidingView,} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from "@react-native-community/datetimepicker"
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

//>> Importing components
import { AuthStylesGlobal, AuthStylesRegisterP, AuthStylesRegisterU } from '../../../assets/AuthStyles';
import { isAN, isIOS } from '../../constants';
import { CustomButton, DropdownComponent, RegisterPatientsQuery, SetLabel, ShowToast, getPatients } from '../../index';
import { ScrollView } from "react-native-gesture-handler";
import {MaskedTextInput} from 'react-native-mask-text';

//>> Importing icons
import { Feather, AntDesign, Fontisto, MaterialCommunityIcons as MaterialCommIcons, MaterialIcons } from '@expo/vector-icons';

export const RegisterPatientScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const Email = useSelector(state => state.responsible.Email);
  const lng = useSelector(state => state.starter.Language);
  const { t } = useTranslation();
  //! Parameter State
  const [loggedIn, setLoggedIn] = useState(false);

  //! Datepicker states
  const [date, setDate] = useState(new Date());
  const [LastDate, setLastDate] = useState(new Date());
  const [show, setShow] = useState(false);

  //! Datepicker State
  const [DateToSend, setDateToSend] = useState(null)
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

  //! Dected when the datepicker changes.
  //>> iOS
  const onChange = (e, SelectedDate) => {
    setDate(new Date(SelectedDate));
    setSelectedDate(new Date(SelectedDate).toLocaleDateString());
    setDateToSend(new Date(SelectedDate));
  }
  //>> Android
  const onChangeAN = (e, SelectedDate) => {
    setShow(false);
    if(SelectedDate){
      setDate(new Date(SelectedDate));
      setSelectedDate(new Date(SelectedDate).toLocaleDateString())
      setDateToSend(new Date(SelectedDate));
    }
  }

  const onCancelPicker = () => {
    if(LastDate.toLocaleDateString() == new Date().toLocaleDateString()){
      setSelectedDate('Fecha de nacimiento');
    } else {
      setSelectedDate(new Date(LastDate).toLocaleDateString());
      setDateToSend(new Date(LastDate));
    }
    setDate(LastDate);
    setShow(false)
  }

  const onDonePicker = () => {
    setSelectedDate(new Date(date).toLocaleDateString())
    setDateToSend(new Date(date));
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
                    <Text>{t('registerPatient.cancel')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity underlayColor={'transparent'} activeOpacity={0.3} onPress={onDonePicker} style={[stylesRegPa.btnPickerTex, stylesRegPa.BtnPickerDone]}>
                    <Text>{t('registerPatient.accept')}</Text>
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

  const registearPatientFunction = async () => {
    try {
      //! set the Loading animation
      setIsLoading(true);

      //! Server Query
      const {data} = await RegisterPatientsQuery(Email, FirstNames, LastNames, BloodType, Gender, Weight, Height, DateToSend);

      //! Patients Query
      const Patients = await getPatients(Email);

      if(data.success){
        //\\ GET THE CORRECT PATIENT ID
        let patientId;
        Patients.data.patients.forEach(element => {
          if(element.Patient_Code == data.Patient_Code) {
            patientId = element.id
          }
        });

        //! Show success message.
        ShowToast('my_success', lng ? 'Éxito' : 'Success', lng ? 'Paciente Registrado correctamente.' : 'Patient Registered successfully.');

        //! Close loading animation
        setTimeout(() => {
        setIsLoading(false);
        setSuccess(true);

          setTimeout(() => {
            navigation.navigate('ImmunizationRecordScreen', {Patient_id: patientId});
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
      ShowToast('my_error', 'Error', lng ? error.response.data.message.es : error.response.data.message.en);
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
    if (route.params != undefined) {
      const {loggedIn} = route.params;
      setLoggedIn(loggedIn);
    }
  }, [route]);

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
            {
              loggedIn ?
                <TouchableOpacity activeOpacity={0.5} style={AuthStylesGlobal.buttomCameBack} disabled={DisableButton} onPress={() => navigation.goBack()}>
                  <MaterialIcons name="arrow-back-ios" size={17} color="white" />
                  <Text style={{fontFamily: 'poppinsBold', fontSize: 17, paddingTop: isAN ? 5 : 0, color: 'white'}}>{t('registerPatient.back')}</Text>
                </TouchableOpacity>
                :
                <View style={[AuthStylesGlobal.buttomCameBack]}>
                  <Text style={{color: 'white', fontSize: 20, fontFamily: 'poppinsBold'}}>{t('registerPatient.step2')}</Text>
                </View>
            }
        </View>
        <View style={AuthStylesGlobal.contentContainer}>
          <View style={AuthStylesGlobal.formContent} >
            <Image style={AuthStylesGlobal.logoImage} source={require('../../../assets/logos/Isotype.png')} />
            <Text style={AuthStylesRegisterU.Tex_md}>{t('registerPatient.title')}</Text>
            <View style={[AuthStylesGlobal.cont2, {marginTop: -10}]} >
              <Text style={AuthStylesGlobal.TextCount}>{t('registerPatient.text2')}</Text>
            </View>

            <View style={{flexDirection: 'row', width: '90%', gap: 15}}>
              <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW50]} >
                <Feather name="user" size={24} color='gray' style={{marginRight: 6}} />
                <TextInput
                  style={[AuthStylesGlobal.input, {textAlignVertical: 'top'}]}
                  autoFocus={true}
                  placeholder="Nombres"
                  placeholderTextColor="gray"
                  onChangeText={text => setFirstNames(text.trim())}
                  editable={!DisableButton}
                />
              </View>
              <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW50]} >
                <Feather name="user" size={24} color='gray' style={{marginRight: 6}} />
                <TextInput
                  style={AuthStylesGlobal.input}
                  placeholder="Apellidos"
                  placeholderTextColor="gray"
                  onChangeText={text => setLastNames(text.trim())}
                  editable={!DisableButton}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row', width: '90%', gap: 15}}>
              {/* Blood Type Selecter */}
              <DropdownComponent
                data={[{ label: 'A+', value: 'A+' }, { label: 'O+', value: 'O+' }, { label: 'B+', value: 'B+' }, { label: 'AB+', value: 'AB+' }, { label: 'A-', value: 'A-' }, { label: 'O-', value: 'O-' }, { label: 'B-', value: 'B-' }, { label: 'AB-', value: 'AB-' },]} 
                setFormValue={setBloodType} placeholder={'Tipo sangui...'} disableBtn={DisableButton}
                Icon={<Fontisto style={stylesRegPa.icon} color="black" name="blood-drop" size={20} />}
              />

              {/* Gender Selecter */}
              <DropdownComponent
                data={[{ label: 'Masculino', value: true }, { label: 'Femenino', value: false },]} 
                setFormValue={setGender} placeholder={'Genero'} disableBtn={DisableButton}
                Icon={<AntDesign style={stylesRegPa.icon} color="black" name="pluscircleo" size={20} />}
              />
            </View>
            
            <View style={{flexDirection: 'row', width: '90%', gap: 15}}>
              <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW50]} >
                <MaterialCommIcons name="weight-pound" size={24} color="gray" style={{marginRight: 6}} />
                  <MaskedTextInput
                    style={[AuthStylesGlobal.input, {textAlignVertical: 'top'}]}
                    placeholder="Peso (lb)"
                    placeholderTextColor="gray"
                    onChangeText={text => setWeight(text)}
                    editable={!DisableButton}
                    keyboardType='numeric'
                    mask='999.99'
                  />
              </View>
              <View style={[AuthStylesGlobal.inputBox, AuthStylesGlobal.customW50]} >
                <MaterialCommIcons name="human-male-height" size={24} color="gray" style={{marginRight: 6}} />
                <MaskedTextInput
                  style={[AuthStylesGlobal.input, {textAlignVertical: 'top'}]}
                  placeholder="Estatura (m)"
                  placeholderTextColor="gray"
                  onChangeText={text => setHeight(text)}
                  editable={!DisableButton}
                  mask= '9.99'
                  keyboardType='numeric'
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
                Label={<SetLabel LabelText={'Registrar'} Success={Success} isLoading={isLoading} />}
                handlePress={() => {registearPatientFunction()}}
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
  },
  icon: {
    marginRight: 5,
    color: 'gray'
  },
})