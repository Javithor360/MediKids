//>> Importing libraries
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, FlatList, BackHandler} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';

import { useTranslation } from 'react-i18next';
//>> Importing components
import { AuthStylesGlobal } from '../../../assets/AuthStyles';
import { ShowToast, getAllImmunizationRecords, getPatients } from '../../index'
import { setInitialValues } from '../../store/slices/patientSlice';
import { setStatement } from '../../store/slices/starterSlice';
import { setLogginValues } from '../../store/slices/responsibleSlice';
import { ResetAppmtState } from '../../store/slices/appointmentsSlice';

//! CREATE SHIMMER
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

//! HOW AccData WILL LOOKS.
// const accountData = [
//   { id: '1', name: 'Daniel Vásquez', image: 'https://firebasestorage.googleapis.com/v0/b/medikids-b1d14.appspot.com/o/perfil_photos%2Fdefault.png?alt=media&token=8b5b9e6c-7629-404c-b0cc-9df4d1d1c976&_gl=1*1c1tmav*_ga*MTM1ODc1NDMxMi4xNjk3MzAzMTQ5*_ga_CW55HF8NVT*MTY5NzMwMzE0OS4xLjEuMTY5NzMwNDA4My40MC4wLjA.' },
//   { id: 'addPatient', name: 'Añadir Paciente' },
// ];

export const SelectPatientScreen = () => {
  const Resp = useSelector(state => state.responsible);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const lng = useSelector(state => state.starter.Language);
  const { t } = useTranslation();
  const [AccData, setAccData] = useState(null);

  const [ReloadSelect, setReloadSelect] = useState(null);

  const [PatientData, setPatientData] = useState(null);

  const [VaccinesData, setVaccinesData] = useState(null);

  const [DisableBtn, setDisableBtn] = useState(false);

  const [ShimmerTime, setShimmerTime] = useState(false);

  const getTruncName = (Name) => {
    let arrName = Name.split(' ');
    return `${arrName[0]} ${arrName[2] != null ? arrName[2] : ''}`
  }
  
  useEffect(() => {
    setTimeout(() => { setShimmerTime(true) }, 1000);
  }, []);

  useEffect(() => {
    (async () => {
      //! Set the Async Storage Logged In State.
      const userSession = { Email: Resp.Email, isLoggedIn: true, jwtToken: Resp.jwtToken };
      await AsyncStorage.setItem('userSession', JSON.stringify(userSession));
    })()
  }, []);


  const renderItem = ({ item }) => {
    if (item.id === 'addPatient') {
      return (
        <TouchableOpacity disabled={DisableBtn} style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}} onPress={() => {navigation.navigate('RegisterPatientDashboard', {loggedIn: true})}} >
          <View style={styles.itemContainer}>
            <Image source={require('../../../assets/icons/add_icon.png')} style={styles.image} />
          </View>
          <Text style={styles.name2}>{item.name}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity disabled={DisableBtn} onPress={() => {ValidatePatient(item.Patient_id)}} style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
          <View style={styles.itemContainer}>
            <ShimmerPlaceHolder visible={ShimmerTime} style={{width: '100%', height: '100%'}}>
              <Image source={{uri: item.image}} style={styles.image} />
            </ShimmerPlaceHolder>
          </View>
          <Text style={styles.name}>{getTruncName(item.name)}</Text>
      </TouchableOpacity>
      );
    }
  };

  const selectPatient = (Patient_id) => {
    PatientData.forEach(patient => {
      if(patient.id == Patient_id) {
        // Change the gender to boolean
        let FinalGender;
        if (patient.Gender == 1) { FinalGender = 'Masculino' }
        else { FinalGender = 'Femenino' }

        //? 1 = MALE; 2 = FEMALE;

        dispatch(setInitialValues({
          Patient_id: patient.id,
          FirstNames: patient.First_Names,
          LastNames: patient.Last_Names,
          Birth_Date: patient.Birthdate,
          Age: patient.Age,
          Gender: FinalGender,
          Blood_Type: patient.Blood_Type,
          Weight: patient.Weight,
          Height: patient.Height,
          Patient_Code: patient.Patient_Code,
          Profile_Photo_Url: patient.Profile_Photo_Url,
          Profile_Photo_Name: patient.Profile_Photo_Name,
        }))
      }
    });
    navigation.replace('ApplicationTab');
  }

  const ValidatePatient = (Patient_id) => {
    let VaccinesFlag = false;
    let VaccinesNotFounded = false;

    //\\ Validate if the patient doesnt have an Immunization Record.
    if (VaccinesData.length != 0) {
      PatientData.forEach(patient => {
        if(patient.id == Patient_id) {
          VaccinesData.forEach(vaccineRec => {
            //>> Flag to close the foreach loop
            if (VaccinesFlag){
              return;
            }
  
            if (patient.id == vaccineRec.Patient_id){
              selectPatient(Patient_id);
              VaccinesFlag = true;
              VaccinesNotFounded = false;
            } else {
              VaccinesNotFounded = true;
            }
          })
          if (VaccinesNotFounded) {
            setDisableBtn(true);
            ShowToast('my_warning', lng ? 'Aviso' : 'Warning', lng ? 'El paciente no tiene registro\n de vacunación.' : 'The patient has no vaccination record.')
            setTimeout(() => {
              navigation.navigate('ImmunizationRecordScreen', {Patient_id})
            }, 2000);
          }
  
        }
      })
    } else {
      setDisableBtn(true);
      ShowToast('my_warning', lng ? 'Aviso' : 'Warning', lng ? 'El paciente no tiene registro\n de vacunación.' : 'The patient has no vaccination record.')
      setTimeout(() => {
        navigation.navigate('ImmunizationRecordScreen', {Patient_id})
      }, 2000);
    }
  }

  const getPatientsFunct = async () => {
    try {
      const {data} = await getPatients(Resp.Email);
      setPatientData(data.patients);

      let AC = [{ id: 'addPatient', name: `${t('selectPatient.addpatient')}`} ];
      
      data.patients.map((patient, id) => {
        const obj = {id: id+1, name: `${patient.First_Names} ${patient.Last_Names}`, image: patient.Profile_Photo_Url, Patient_id: patient.id, Profile_Photo_Name: patient.Profile_Photo_Name == null ? '0' : patient.Profile_Photo_Name};
        AC.unshift(obj);
      })

      if( AC.length >= 5 ) {
        AC.pop();
      }

      setAccData(AC);
      setReloadSelect(false);
    } catch (error) {
      console.log(error);
    }
  }

  const getImmunizationRecordFunc = async () => {
    try {
      const {data} = await getAllImmunizationRecords();
      setVaccinesData(data.PatientVaccines);
    } catch (error) {
      console.log(error)
    }
  }

  const LogoutButton = () => {
    AsyncStorage.removeItem('userSession');

    //\\ Reset the Starter slice in redux
    dispatch(setStatement({
      Email: null,
      State: null,
    }))

    //\\ Reset the Responsible slider in redux
    dispatch(setLogginValues({
      FirstNames: null,
      LastNames: null,
      Email: null,
      Phone: null,
      DUI: null,
      Age: null,
      ProfilePhotoUrl: null,
      Birthdate: null,
      jwtToken: null,
    }))

    //\\ Reset the patient slice in redux
    dispatch(setInitialValues({
      FirstNames: null,
      LastNames: null,
      Birth_Date: null,
      Age: null,
      Gender: null,
      Blood_Type: null,
      Weight: null,
      Height: null,
      Patient_Code: null,
      Profile_Photo_Url: null,
    }))

    navigation.replace('WelcomeScreen')
  }

  //\\ stater function.
  useEffect(() => {
    getPatientsFunct();
    getImmunizationRecordFunc();
    setDisableBtn(false);
    dispatch(ResetAppmtState());
  }, [ReloadSelect]);

  // aux
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    })
  }, []);

  //! check the params.
  useEffect(() => {
    if (route.params != undefined) {
      const {ReloadSelect} = route.params;
      setReloadSelect(ReloadSelect);
    }
  }, [route]);

  return (
      <View style={{ flex: 1, backgroundColor:'#fff' }}>
        <View style={AuthStylesGlobal.topWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_top.png")}/> 
        </View>
        <View style={styles.mainContainer}>
            <View style={styles.topIconContainer}>
              <Image style={{width: 70, height: 70, resizeMode: 'contain',}} source={require('../../../assets/graphic-icons/patients_icon.png')}></Image>
            </View>
            <Text style={AuthStylesGlobal.title_Text2}>{t('selectPatient.selectpatient')}</Text>
            <View style={{width: '90%', alignItems: 'center', justifyContent: 'center',}}>
              <FlatList
                data={AccData}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
            <View style={{width: '100%', height: 60, alignItems: 'center', justifyContent: 'center', marginTop: 20,}}>
              <TouchableOpacity disabled={DisableBtn} onPress={() => {LogoutButton()}} style={styles.logoutBtn}>
                <Text style={{color: '#FFFFFF'}}>{t('selectPatient.signoff')}</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style={AuthStylesGlobal.bottomWaveContainer}>
          <ImageBackground resizeMode='cover' style={AuthStylesGlobal.waveImg} source={require("../../../assets/waves/waves_start_buttom.png")}/> 
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    mainContainer:{
      flex: 1,
      width:'100%',
      // backgroundColor: 'green',
      alignItems: 'center',

    },
    topIconContainer:{
      width: '100%',
      height: 70,
      // backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      padding: 10,
    },
    itemContainer: {
      marginHorizontal: 25,
      marginVertical: 16,
      alignItems: 'center',
      // backgroundColor: 'red',
      height: 100,
      width: 100,
      borderRadius: 10,
      overflow: 'hidden',
    },
    shadow:{
      elevation: 4,
      //IOS
      shadowColor: '#707070',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      resizeMode: 'contain',
    },
    addIcon:{
      width: '80%',
      height: '80%',
      borderRadius: 10,
      resizeMode: 'contain',
    },
    name: {
      color: '#707070',
      fontWeight: "700",
      fontSize: 16,
    },
    name2: {
      color: '#A1A1A1',
      fontWeight: "700",
      fontSize: 14,
    },
    logoutBtn:{
      width: 150,
      height: '60%',
      backgroundColor: '#A375FF',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    }
})