
//>> IMPORT LIBRERIES
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Constants from 'expo-constants'
import { useEffect } from 'react';
import { isIOS } from '../constants';
import { useDispatch } from 'react-redux';
import { ChangeSBColor, setStatement } from '../store/slices/starterSlice';
import { AntDesign, FontAwesome, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLogginValues } from '../store/slices/responsibleSlice';
import { setInitialValues } from '../store/slices/patientSlice';
import { useTranslation } from 'react-i18next';

export const ThreePoints = ({setLngModal, setView, view}) => {
  const { t } = useTranslation();
  const navigation = useNavigation()
  const dispatch = useDispatch();

  const OptionsNames = [`${t('ThreePoints.ChangePatient')}`, `${t('ThreePoints.ViewProfile')}`, `${t('ThreePoints.ViewPatient')}`, `${t('ThreePoints.ChangeLangua')}`];
  const OptionIcons = [
    <FontAwesome name="exchange" size={22} color="#A375FF"/>,
    <MaterialIcons name="person" size={22} color="#A375FF" />,
    <MaterialCommunityIcons name="human-male-child" size={22} color="#A375FF" />,
    <Entypo name="language" size={22} color="#A375FF" />
  ]
  const OptionsOPfuncts = {
    1: () => {navigation.navigate('SelectPatientDashboard'); setTimeout(() => { CloseModal() }, 700);},
    2: () => {navigation.navigate('MyAccount'); setTimeout(() => { CloseModal() }, 700);},
    3: () => {navigation.navigate('MyVaccines'); setTimeout(() => { CloseModal() }, 700);},
    4: () => {setLngModal(true);},
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

    navigation.navigate('LoginScreen', {swipeBack: false});
    setTimeout(() => {
      CloseModal();
    }, 700);
  }

  useEffect(() => {
    dispatch(ChangeSBColor('#fff'));
  }, [view]);

  const CloseModal = () => {
    setView(false);
    dispatch(ChangeSBColor('#e4e2ff'));
  }
  
  const GetOption = ({haveUnderline, Name, Icon, funct}) => {
    return (
      <>
        <TouchableOpacity onPress={funct} style={styles.ElementContainer} >
          <View style={{flexDirection: 'row', alignItems: 'center', width: '70%'}}>
            <View style={styles.IconBg}>{Icon}</View>
            <Text style={{fontFamily:'poppinsRegular', fontSize: 17, marginLeft: 10}}>{Name}</Text>
          </View>
          <AntDesign name="right" size={24} color="#707070" />
        </TouchableOpacity>
        { haveUnderline && <View style={{width: '100%', height: 2, backgroundColor: '#a3a3a3', marginVertical: 10}}/> }
      </>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ height: '100%', width: '100%', backgroundColor: '#fff', paddingTop: isIOS ? Constants.statusBarHeight : 0 }}>
        <View style={styles.TopContainer}>
          <Image style={{resizeMode: 'contain', width: 45, height: 45}} source={require('../../assets/logos/Isotype.png')} />
          <Text style={{color:'#616161', fontSize: 26, fontFamily:"poppinsBold", marginLeft:-10}}>{t('ThreePoints.options')}</Text>
          <AntDesign name="close" size={24} color="#707070" onPress={() => CloseModal()}/>
        </View>
        <View style={{width: '100%', paddingHorizontal: 30, paddingTop: 28}}>
          {
            OptionsNames.map((name, i) => {
              let hvu;
              if (i < OptionsNames.length -1 ) { hvu = true};
              return ( <GetOption key={i} haveUnderline={hvu} Name={name} Icon={OptionIcons[i]} funct={OptionsOPfuncts[i+1]}/>)
            })
          }
        </View>
        <View style={{width: '100%', height: 70, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 35, height: '40%'}}>
            <TouchableOpacity onPress={() => {LogoutButton()}} style={[{ height: '20%',width: '85%',borderRadius: 15,backgroundColor: '#fe3838', alignItems: 'center',justifyContent: 'center', marginHorizontal: 'auto', flexDirection: 'row', gap: 10}, styles.ButtomShadow]}>
                <AntDesign name="logout" size={26} color="#fff" />
                <Text style={{color: '#fff', fontSize: 18}}>{t('ThreePoints.signoff')}</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  TopContainer: {
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    //iOS
    shadowColor: '#707070',
    shadowOffset: {width: -2, height: 5},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    //Android
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  ElementContainer: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  IconBg: {
    backgroundColor: '#f3f3f3',
    padding: 10,
    borderRadius: 100,
    shadowColor: '#707070',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    //Android
    elevation: 5,
  },
  ButtomShadow:{
    //IOS
    shadowColor: '#000',
    shadowOffset: {height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    //Android
    elevation: 5,
},
})