import React from 'react'
import { Text, ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

//Libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//Components
import { ScreenTitle } from '../../../index';

export const AppointmentMainScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.fullScreenContainer}>
            <ScreenTitle 
                Label={"Citas"}
                IconName={"clipboard-text-multiple"}
                fontSize={20}
                textColor={'#FFFFFF'}
                paddingH={30}
            /> 
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
                            <TouchableOpacity style={styles.apptBtn}>
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
                                <Text style={styles.spcDoctor}>Dra. Fatima Garza</Text>
                            </View>
                        </View>
                        <View style={{height: 1, width: '90%', backgroundColor: '#E6E6E6', alignSelf: 'center',}}></View>
                        <View style={{height: '65%', padding: 6}}>
                            <Text style={{fontSize: 12, color: '#707070',}}>Diagnóstico y tratamiento de enfermedades del sistema y vías respiratorias y pulmones</Text>
                            <TouchableOpacity style={styles.apptBtn}>
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
                                <Text style={styles.spcDoctor}>Dr. Adrián Flores</Text>
                            </View>
                        </View>
                        <View style={{height: 1, width: '90%', backgroundColor: '#E6E6E6', alignSelf: 'center',}}></View>
                        <View style={{height: '65%', padding: 6}}>
                            <Text style={{fontSize: 12, color: '#707070',}}>Diagnóstico y tratamiento de enfermedades del esófago, el estómago, los intestinos, y el hígado</Text>
                            <TouchableOpacity style={styles.apptBtn}>
                                <Text style={{color: '#fff', fontSize: 13.5,}}>Agendar Cita</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    fullScreenContainer:{
      backgroundColor: '#FFFFFF',
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
    }
  });