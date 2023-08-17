
//>> Libraries
import { Text, ScrollView, StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

//>> Components
import { AppointmentStatus, ScreenTitle, getMedicalAppointments } from '../../../index';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeNeumoState, ChangeOtorrinoValues, ChangeOtorrinoState, ChangeNeumoValues, ChangeGastroState, ChangeGastroValues } from '../../../store/slices/appointmentsSlice';

const doctorDescription = {
    otoDoctorInsights: {
        insight1: "Especialista en otorrinolaringología",
        insight2: "Graduado de la universidad de España con más de 30 años de experiencia",
    },
    gastroDoctorInsights: {
        insight1: "Especialista en gastroenterología",
        insight2: "Especialista en gastroenterología graduada de la facultad de Medicina de la UNAM",
    },    
    neuDoctorInsights: {
        insight1: "Especialista en neumología",
        insight2: "Graduado de la Facultad de Medicina de la Universidad Autónoma de Madrid",
    }
  };

export const AppointmentMainScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()

    //! Get elements from the redux state.
    const Patient_Code = useSelector(state => state.patient.Patient_Code);
    const appointmentsState = useSelector(state => state.appointments);
    const jwtToken = useSelector(state => state.responsible.jwtToken);

    //! function to get the values of the appointments
    const getAppointments = async () => {
        try {
            const {data} = await getMedicalAppointments(jwtToken, Patient_Code);

            data.medical_appointments.forEach(appointment => {
                if(appointment.Doctor_id == 1){
                    dispatch(ChangeOtorrinoState(appointment.State));
                    dispatch(ChangeOtorrinoValues({
                        Otorrino_Doctor_id: appointment.Doctor_id,
                        Otorrino_Week: appointment.Week,
                        Otorrino_Description: appointment.Description,
                        Otorrino_Date: appointment.Date,
                        Otorrino_Hour: appointment.Hour,
                    }));
                } else if (appointment.Doctor_id == 2){
                    dispatch(ChangeNeumoState(appointment.State));
                    dispatch(ChangeNeumoValues({
                        Neumo_Doctor_id: appointment.Doctor_id,
                        Neumo_Week: appointment.Week,
                        Neumo_Description: appointment.Description,
                        Neumo_Date: appointment.Date,
                        Neumo_Hour: appointment.Hour,
                    }));
                } else if (appointment.Doctor_id == 3){
                    dispatch(ChangeGastroState(appointment.State));
                    dispatch(ChangeGastroValues({
                        Gastro_Doctor_id: appointment.Doctor_id,
                        Gastro_Week: appointment.Week,
                        Gastro_Description: appointment.Description,
                        Gastro_Date: appointment.Date,
                        Gastro_Hour: appointment.Hour,
                    }))
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAppointments();
    }, [appointmentsState]);

    return (
        <LinearGradient colors={['#e4e2ff', '#e4e2ff', '#FFFFFF', '#FFFFFF']} locations={[0, 0.5, 0.5, 1]} style={{height: '100%'}}>
            <ScrollView style={styles.fullScreenContainer}>
                <View style={{backgroundColor:'#fff'}}>
                    <ScreenTitle
                        Label={"Citas"}
                        IconName={"clipboard-text-multiple"}
                        fontSize={20}
                        textColor={'#FFFFFF'}
                        paddingH={30}
                    />
                    {/* APPOINTMENT STATUS CARD */}
                    {
                        (appointmentsState.OtorrinoState || appointmentsState.NeumoState || appointmentsState.GastroState) &&
                            <View style={[styles.requestAppointmentContainer, styles.btcGreen, styles.shadowC]}>
                                <Text style={[styles.requestMainTitle, styles.colorGreen]}>Actividad de citas</Text>
                                { appointmentsState.OtorrinoState && <AppointmentStatus Doctor_id={appointmentsState.Otorrino_Doctor_id} ImageIcon={require('../../../../assets/graphic-icons/otorrino-icon.png')} DoctorName={'Dr. Esteban Gúzman'} Specialty={'Otorrinolaringología'}/> }
                                { appointmentsState.NeumoState && <AppointmentStatus Doctor_id={appointmentsState.Neumo_Doctor_id} ImageIcon={require('../../../../assets/graphic-icons/neumologia-icon.png')} DoctorName={'Dr. Adrián Flores'} Specialty={'Neumología'}/>}
                                { appointmentsState.GastroState && <AppointmentStatus Doctor_id={appointmentsState.Gastro_Doctor_id} ImageIcon={require('../../../../assets/graphic-icons/gastro-icon.png')} DoctorName={'Dr. Fatima Garza'} Specialty={'Gastroenterología'}/>}
                            </View>
                    }
                    <View style={styles.chooseBanner}>
                        <View style={styles.chooseContent}>
                            <View style={styles.leftIconSctn}>
                                <View style={styles.iconShadow}>
                                    <Image source={require('../../../../assets/graphic-icons/cita-medica.png')} style={{width: '90%', height: '90%', resizeMode: 'contain'}} />
                                </View>
                            </View>
                            <View style={styles.rightTextSctn}>
                                <View style={styles.linee}></View>
                                <Text style={styles.titleBanner}>Elige la especialidad en la que agendarás una cita</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardsContainer}>
                        <View style={styles.card}>
                            <View style={{width: '35%', height: '100%'}}>
                                <Image source={require('../../../../assets/bg/spc_oto.png')} style={{width: '100%', height: '100%', resizeMode: 'cover',}} />
                            </View>
                            <View style={{width: '65%', height: '100%', borderBottomColor: '#D6D6D6',}}>
                                <View style={styles.IconTextSpc}>
                                    <View style={{width: '18%', height: '100%', paddingLeft: 4,}}>
                                        <Image source={require('../../../../assets/graphic-icons/otorrino-icon.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                                    </View>
                                    <View style={styles.spcTitleC}>
                                        <Text style={styles.spcTitle}>Otorrinolaringología</Text>
                                        <Text style={styles.spcDoctor}>Dr. Esteban Gúzman</Text>
                                    </View>
                                </View>
                                <View style={{height: 1, width: '90%', backgroundColor: '#E6E6E6', alignSelf: 'center',}}></View>
                                <View style={{height: '65%', padding: 6}}>
                                    <Text style={{fontSize: 12, color: '#707070',}}>Diagnóstico y tratamiento de las enfermedades del oído, nariz, garganta y alergías</Text>
                                    <TouchableOpacity disabled={appointmentsState.OtorrinoState != null ? true : false} style={styles.apptBtn} onPress={()=>navigation.navigate('AppointmentProcessScreen', {
                                        doctorDescription: doctorDescription.otoDoctorInsights,
                                        doctor: 'Dr. Esteban Gúzman',
                                        speciality: 'Otorrinolaringología',
                                        doctorPhoto: require("../../../../assets/default-pics/dr-guzman.png"),
                                        Doctor_id: 1,
                                    })}>
                                        <Text style={{color: '#fff', fontSize: 13.5,}}>Agendar Cita</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <View style={{width: '35%', height: '100%'}}>
                                <Image source={require('../../../../assets/bg/spc_neu.png')} style={{width: '100%', height: '100%', resizeMode: 'cover',}} />
                            </View>
                            <View style={{width: '65%', height: '100%', borderBottomColor: '#D6D6D6',}}>
                                <View style={styles.IconTextSpc}>
                                    <View style={{width: '18%', height: '100%', paddingLeft: 4,}}>
                                        <Image source={require('../../../../assets/graphic-icons/neumologia-icon.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                                    </View>
                                    <View style={styles.spcTitleC}>
                                        <Text style={styles.spcTitle}>Neumología</Text>
                                        <Text style={styles.spcDoctor}>Dr. Adrián Flores</Text>
                                    </View>
                                </View>
                                <View style={{height: 1, width: '90%', backgroundColor: '#E6E6E6', alignSelf: 'center',}}></View>
                                <View style={{height: '65%', padding: 6}}>
                                    <Text style={{fontSize: 12, color: '#707070',}}>Diagnóstico y tratamiento de enfermedades del sistema y vías respiratorias y pulmones</Text>
                                    <TouchableOpacity style={styles.apptBtn} onPress={()=>navigation.navigate('AppointmentProcessScreen', {
                                        doctorDescription: doctorDescription.neuDoctorInsights,
                                        doctor: 'Dr. Adrian Flores',
                                        speciality: 'Neumología',
                                        doctorPhoto: require("../../../../assets/default-pics/dr-flores.png"),
                                        Doctor_id: 2,
                                    })}>
                                        <Text style={{color: '#fff', fontSize: 13.5,}}>Agendar Cita</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <View style={{width: '35%', height: '100%'}}>
                                <Image source={require('../../../../assets/bg/spc_gas.png')} style={{width: '100%', height: '100%', resizeMode: 'cover',}} />
                            </View>
                            <View style={{width: '65%', height: '100%', borderBottomColor: '#D6D6D6',}}>
                                <View style={styles.IconTextSpc}>
                                    <View style={{width: '18%', height: '100%', paddingLeft: 4,}}>
                                        <Image source={require('../../../../assets/graphic-icons/gastro-icon.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                                    </View>
                                    <View style={styles.spcTitleC}>
                                        <Text style={styles.spcTitle}>Gastroenterología</Text>
                                        <Text style={styles.spcDoctor}>Dra. Fatima Garza</Text>
                                    </View>
                                </View>
                                <View style={{height: 1, width: '90%', backgroundColor: '#E6E6E6', alignSelf: 'center',}}></View>
                                <View style={{height: '65%', padding: 6}}>
                                    <Text style={{fontSize: 12, color: '#707070',}}>Diagnóstico y tratamiento de enfermedades del esófago, el estómago, los intestinos, y el hígado</Text>
                                    <TouchableOpacity style={styles.apptBtn} onPress={()=>navigation.navigate('AppointmentProcessScreen', {
                                        doctorDescription: doctorDescription.gastroDoctorInsights,
                                        doctor: 'Dra. Fatima Garza',
                                        speciality: 'Gastroenterología',
                                        doctorPhoto: require("../../../../assets/default-pics/dra-garza.png"),
                                        Doctor_id: 3,
                                    })}>
                                        <Text style={{color: '#fff', fontSize: 13.5,}}>Agendar Cita</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.requestAppointmentContainer, styles.btcYellow, styles.shadowC]}>
                        <Text style={[styles.requestMainTitle, styles.colorYellow]}>Historial de citas</Text>

                        <Image source={require('../../../../assets/graphic-icons/history.png')} style={{width: 70, height: 70, alignSelf: 'center', marginBottom: 16,}}></Image>
                        <TouchableOpacity style={styles.apptBtn1} onPress={()=>navigation.navigate('HistorialAppointment') }>
                            <Text style={{color: '#fff', fontSize: 13.5,}}>Ver historial</Text>
                        </TouchableOpacity>
                        
                        
                        {/* <Image source={require('../../../../assets/graphic-icons/no_history.png')} style={{width: 70, height: 70, alignSelf: 'center', marginBottom: 10,}}></Image>
                        <Text style={{alignSelf: 'center', marginBottom: 20, color: '#707070'}}>Todavía no hay registros en el historial</Text> */}
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    requestAppointmentContainer:{
        // height: 800,
        width: wp('90%'),
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 30,
        marginBottom: 30,
        borderTopWidth: 9,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EBEBEB',
    },
    fullScreenContainer:{
        height: '100%',
        marginTop: Constants.statusBarHeight
    },
    btcGreen:{
        borderTopColor: '#5AB1BB',
    },
    safeArea:{
      backgroundColor: '#e4e2ff',
    },
    chooseBanner: {
        height: 180,
        width: wp('90%'),
        alignSelf: 'center',
        backgroundColor: '#A375FF',
        borderRadius: 20,
        borderTopWidth: 8,
        borderTopColor: '#CDCDF3',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    colorGreen: {
        color: '#46929B',
    },
    chooseContent: {
        width: '95%',
        height: '70%',
        flexDirection: 'row',
        paddingH: wp('10%'),
        marginTop: hp('1.5%'),
    },
    leftIconSctn: {
        width: '30%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconShadow:{
        width: '90%',
        height: '80%',
        backgroundColor: '#B4B4D6',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightTextSctn:{
        width: '70%',
        height: '100%',
        justifyContent: 'center',
    },
    titleBanner: {
        fontSize: 20,
        fontWeight: 600,
        color: '#ffffff',
        marginHorizontal: 8,
    },
    linee: {
        height: 2,
        width: 40,
        backgroundColor: '#fff',
        marginBottom: 6,
        marginLeft: 8,
    },
    cardsContainer:{
        backgroundColor: '#ffffff',
        width: wp('90%'),
        alignSelf: 'center',
        borderRadius: 20,
        top: -30,
        elevation: 4,
        //iOS
        shadowColor: '#707070',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        paddingVertical: 20,
    },
    card: {
        width: '95%',
        height: 165,
        alignSelf: 'center',
        borderRadius: 18,
        flexDirection: 'row',
        overflow: 'hidden',
        borderBottomColor: '#CDCDF3',
        borderBottomWidth: 5,
        borderColor: '#EBEBEB',
        borderWidth: 1,
        marginBottom: 20,
    },
    IconTextSpc: {
        width: '100%',
        height: '35%',
        flexDirection: 'row',
        // borderBottomColor: '#EBEBEB',
        // borderBottomWidth: 1,
    },
    spcTitleC:{
        flexDirection: 'column',
        width: '82%',
        height: '100%',
        paddingHorizontal: 6,
        justifyContent: 'center',
    },
    spcTitle:{
        color: '#707070',
        fontWeight: 600,
        fontSize: 16,
    },
    spcDoctor:{
        fontSize: 12,
        fontWeight: 600,
        color: '#A375FF',
    },
    apptBtn:{
        width: '60%',
        height: 30,
        backgroundColor: '#D58C8C',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 10,
        right: 10,
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    apptBtn1:{
        width: '35%',
        height: 30,
        backgroundColor: '#D58C8C',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 16,
    },
    requestAppointmentContainer:{
        // height: 800,
        width: wp('90%'),
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 30,
        marginBottom: 30,
        borderTopWidth: 9,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EBEBEB',
    },
    btcYellow:{
        borderTopColor: '#FCC277',
    },
    btcGreen:{
        borderTopColor: '#5AB1BB',
    },
    shadowC:{
        //iOS
        shadowColor: '#707070',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        //Android
        elevation: 5,
        shadowColor: '#707070',
    },
    requestMainTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 16,
    },
    colorYellow:{
        color: '#F8991E',
    },
  });