//>> Importing libraries
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, FlatList, BackHandler} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

//>> Importing components
import { AuthStylesGlobal } from '../../../assets/AuthStyles';
import { ShowToast, getAllImmunizationRecords, getPatients } from '../../index'
import { setInitialValues } from '../../store/slices/patientSlice';
import { setStatement } from '../../store/slices/starterSlice';
import { setLogginValues } from '../../store/slices/responsibleSlice';


//! HOW AccData WILL LOOKS.
// const accountData = [
//   { id: '1', name: 'Daniel Vásquez', image: 'https://firebasestorage.googleapis.com/v0/b/medikids-firebase.appspot.com/o/perfil_photos%2Fdefault.png?alt=media&token=39fd3258-c7df-4596-91f5-9d87b4a86216' },
//   { id: 'addPatient', name: 'Añadir Paciente' },
// ];

export const SelectPatientScreen = () => {
  const Resp = useSelector(state => state.responsible);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch()
  
  const [AccData, setAccData] = useState(null);

  const [ReloadSelect, setReloadSelect] = useState(null);

  const [PatientData, setPatientData] = useState(null);

  const [VaccinesData, setVaccinesData] = useState(null);

  const [DisableBtn, setDisableBtn] = useState(false);

  const renderItem = ({ item }) => {
    if (item.id === 'addPatient') {
      return (
        <TouchableOpacity disabled={DisableBtn} style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}} onPress={() => {navigation.navigate('RegisterPatientScreen', {loggedIn: true})}} >
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
            <Image source={{uri: item.image}} style={styles.image} />
          </View>
          <Text style={styles.name}>{item.name}</Text>
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
          FirstNames: patient.First_Names,
          LastNames: patient.Last_Names,
          Birth_Date: patient.Birthdate,
          Age: patient.Age,
          Gender: FinalGender,
          Blood_Type: patient.Blood_Type,
          Weight: patient.Weight,
          Height: patient.Height,
          Patient_Code: patient.Patient_Code,
          Profile_Photo_Url: patient.Profile_Photo_Url
        }))
      }
    });
    navigation.navigate('ApplicationTab');
  }

  const ValidatePatient = (Patient_id) => {
    let VaccinesFlag = false;
    let VaccinesNotFounded = false;

    //\\ Validate if the patient doesnt have an Immunization Record.
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
          ShowToast('my_warning', 'Warning', 'El paciente no tiene registro\n de vacunación')
          setTimeout(() => {
            navigation.navigate('ImmunizationRecordScreen', {Patient_id})
          }, 2000);
        }

      }
    })
  }

  const getPatientsFunct = async () => {
    try {
      const {data} = await getPatients(Resp.Email);
      setPatientData(data.patients);

      let AC = [{ id: 'addPatient', name: 'Añadir Paciente' }];
      
      data.patients.map((patient, id) => {
        const obj = {id: id+1, name: `${patient.First_Names} ${patient.Last_Names}`, image: patient.Profile_Photo_Url, Patient_id: patient.id};
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

    //ZAMPAR ANIMACION DE CARGANDO DANIIIIIII

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

    navigation.navigate('WelcomeScreen')
  }

  //\\ stater function.
  useEffect(() => {
    getPatientsFunct();
    getImmunizationRecordFunc();
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
            <Text style={AuthStylesGlobal.title_Text2}>Seleccione un paciente</Text>
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
                <Text style={{color: '#FFFFFF'}}>Cerrar sesión</Text>
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
      fontWeight: 'bold',
      fontSize: 16,
    },
    name2: {
      color: '#A1A1A1',
      fontWeight: 'bold',
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