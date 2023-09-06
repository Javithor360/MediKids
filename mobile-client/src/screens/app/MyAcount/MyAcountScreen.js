
//>> IMPORT LIBRERIES
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View,TouchableOpacity, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons, MaterialCommunityIcons, AntDesign, FontAwesome5, Feather } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder'

// >> IMPORT COMPONENTS
import { ScreenTitle } from '../../../index';
import { setStatement } from '../../../store/slices/starterSlice';
import { setLogginValues } from '../../../store/slices/responsibleSlice';
import { setInitialValues } from '../../../store/slices/patientSlice';

//! CREATE SHIMMER
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const MyAcountScreen = () => {
    const responsible = useSelector(state => state.responsible)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isMainScreen, setIsMainScreen] = useState(true);
    const { t } = useTranslation();

    //! Shimmer State
    const [ShimmerTime, setShimmerTime] = useState(false);

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
    }

    useEffect(() => {
        setTimeout(() => { setShimmerTime(true) }, 1000);
    }, []);

  return (
    <LinearGradient colors={['#e4e2ff', '#e4e2ff', '#FFFFFF', '#FFFFFF']} locations={[0, 0.5, 0.5, 1]}>
        <ScrollView style={styles.MainContainer}>
            <View style={{backgroundColor:'#fff'}}>
                <ScreenTitle
                    Label={`${t('account.title')}`}
                    IconName={"account-circle"}
                    fontSize={20}
                    textColor={'#FFFFFF'}
                    paddingH={40}
                    isMainScreen={isMainScreen}
                />
                <View style={styles.containPhoto}>
                    <View style={styles.profilePhotoWrapper}>
                        <ShimmerPlaceHolder visible={ShimmerTime} style={{width: '100%', height: '100%'}}>
                            <Image source={{uri: responsible.ProfilePhotoUrl}} style={{width:'100%', height:'100%'}}/>
                        </ShimmerPlaceHolder>
                    </View>
                </View>
                <View style={styles.ContainerView}>
                    <Text style={styles.DatosText}>{t('account.dataofcharge')}</Text>
                    <View style={styles.InfoContainer}>
                        <View style={styles.ContainCardText}>
                            <View style={{flexDirection: 'row'}}>
                                <AntDesign name="profile" size={24} color="#7225f9" marginLeft='5%' marginTop='1%' />
                                <Text style={styles.TextForImput}>{t('account.givenNames')}:</Text>
                            </View>
                            <Text style={styles.TextWritted}>{responsible.FirstNames} {responsible.LastNames}</Text>
                        </View>
                        <View style={styles.line}></View>

                        <View style={styles.ContainCardText}>
                            <View style={{flexDirection: 'row',}}>
                                <MaterialIcons name="alternate-email" size={24} color="#7225f9" marginLeft='5%' marginTop='1%' />
                                <Text style={styles.TextForImput}>Email:</Text>
                            </View>
                            <Text style={styles.TextWritted}>{responsible.Email}</Text>
                        </View>
                        <View style={styles.line}></View>

                        <View style={styles.ContainCardText}>
                            <View style={{flexDirection: 'row',}}>
                                <AntDesign name="idcard" size={24} color="#7225f9" marginLeft='5%' marginTop='1%' />
                                <Text style={styles.TextForImput}>DUI:</Text>
                            </View>
                            <Text style={styles.TextWritted}>{responsible.DUI}</Text>
                        </View>
                        <View style={styles.line}></View>

                        <View style={styles.ContainCardText}>
                            <View style={{flexDirection: 'row',}}>
                                <AntDesign name="phone" size={24} color="#7225f9" marginLeft='5%' marginTop='1%' />
                                <Text style={styles.TextForImput}>{t('account.phone')}:</Text>
                            </View>
                            <Text style={styles.TextWritted}>{responsible.Phone}</Text>
                        </View>
                    </View>
                    <View style={styles.lineBig}></View>
                    <Text style={[styles.DatosText, {marginTop: '7%'}]}>Acciones</Text>
                    <View style={{width: '100%', height: 70, marginTop: '2%', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {navigation.navigate('SelectProfilePhotoScreen')}} style={[{ height: '75%',width: '90%',borderRadius: 15,backgroundColor: '#FFDEB4',alignItems: 'center',justifyContent: 'center', marginHorizontal: 'auto', flexDirection: 'row', gap: 10}, styles.ButtomShadow]}>
                            <FontAwesome5 name="user-circle" size={24} color="#434343" />
                            <Text style={{color: '#434343', fontSize: 16}}>{t('account.changepic')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', height: 70, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {navigation.navigate('PatientPerfilScreen')}} style={[{ height: '75%',width: '90%',borderRadius: 15,backgroundColor: '#90dfe7',alignItems: 'center',justifyContent: 'center', marginHorizontal: 'auto', flexDirection: 'row', gap: 10}, styles.ButtomShadow]}>
                            <MaterialCommunityIcons name="human-male-child" size={24} color="#434343" />
                            <Text style={{color: '#434343', fontSize: 16}}>{t('account.infopatient')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', height: 70, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {navigation.navigate('SelectPatientDashboard');}} style={[{ height: '75%',width: '90%',borderRadius: 15,backgroundColor: '#b2affb',alignItems: 'center',justifyContent: 'center', marginHorizontal: 'auto', flexDirection: 'row', gap: 10}, styles.ButtomShadow]}>
                            <Feather name="refresh-cw" size={24} color="#434343" />
                            <Text style={{color: '#434343', fontSize: 16}}>{t('account.changepatient')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '100%', height: 70, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 35}}>
                        <TouchableOpacity onPress={() => {LogoutButton()}} style={[{ height: '75%',width: '90%',borderRadius: 15,backgroundColor: '#fff', alignItems: 'center',justifyContent: 'center', marginHorizontal: 'auto', flexDirection: 'row', gap: 10, borderColor: '#ff7171', borderWidth: 2}, styles.ButtomShadow]}>
                            <AntDesign name="logout" size={24} color="#fd4040" />
                            <Text style={{color: '#fd4040', fontSize: 16}}>{t('account.signoff')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
ContainerView: {
    backgroundColor:'#FFFFFF',
    marginTop:-70,
    paddingTop: '20%',
    //iOS
    shadowColor: '#BBBBBB',
    shadowOpacity: 0.115,
    shadowRadius: 3,
    //Android
    elevation: 5,
    shadowOffset: { width: 0, height: -6 },
    shadowColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
    // height: height + 150,
},
InfoContainer: {
    backgroundColor: '#CECEF6',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    //IOS
    shadowColor: '#000',
    shadowOffset: {height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //Android
    elevation: 5,
},
DatosText:{
    fontSize:24,
    fontWeight:'bold',
    color:'#000',
    textAlign: 'center',
    fontStyle:'italic',
},
MainContainer:{
    height:'100%',
    marginTop: Constants.statusBarHeight
},
line:{
    backgroundColor:'#fff',
    height: 2,
    width:'90%',
    alignSelf:'center',
    marginVertical: 15
},
lineBig:{
    backgroundColor:'#707070',
    height: 3,
    width:'80%',
    alignSelf:'center',
    marginTop: '10%',
    borderRadius: 10
},
TextForImput:{
    fontSize:20,
    marginLeft:'3%',
    marginVertical:'1%',
    fontWeight:'bold',
    color:'#7225f9',
},
TextWritted:{
    fontSize:20,
    marginLeft:'5%',
    marginVertical:'1%',
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
containPhoto:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '-5%',
    zIndex: 1000
},
profilePhotoWrapper:{
    height: 130,
    width: 130,
    marginVertical: '2%',
    borderRadius: 100,
    overflow: 'hidden',
 },
 profilePhotoImage:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
 },
})