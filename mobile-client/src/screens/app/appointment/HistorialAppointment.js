import React, { useEffect, useState } from 'react'
import { Text, ScrollView, StyleSheet, View, Image, TouchableOpacity,Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

//Libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


//Components
import { ScreenTitle, getMedicalRecords } from '../../../index';
import { useSelector } from 'react-redux';

export const HistorialAppointment = ({ route }) => {
    const jwtToken = useSelector(state => state.responsible.jwtToken);
    const { AppointmentsRecord } = route.params;
    
    const [view, setView] = useState(false);

    useEffect(() => {
        console.log(AppointmentsRecord);
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.fullScreenContainer}>
                <ScreenTitle 
                    Label={"Citas-Historial"}
                    IconName={"clipboard-text-multiple"}
                    fontSize={20}
                    textColor={'#FFFFFF'}
                    paddingH={30}
                /> 
                <View style={styles.chooseBanner}>
                    <View style={styles.chooseContent}>
                    
                        <View style={styles.rightTextSctn}>
                            <View style={styles.linee}></View>
                            <Text style={styles.titleBanner}>Historial de citas atendidas</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cardsContainer}>
                <View style={styles.card}>
                        
                        <View style={{width: '65%', height: '100%', borderBottomColor: '#D6D6D6',left:20,}}>
                            <View style={styles.IconTextSpc}>
                                <View style={{width: '18%', height: '100%', paddingLeft: 4,}}>
                                    <Image source={require('../../../../assets/graphic-icons/otorrino-icon.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                                </View>
                                <View style={styles.spcTitleC}>
                                    <Text style={styles.spcTitle}>Otorrinolaringología</Text>
                            
                                </View>
                            </View>
                        
                            <View style={{  height: '65%',padding: 6,}}>
                        
                                    <View style={styles.InfoText} >
                                        <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Paciente:</Text>
                                        <Text style={{ color: '#707070',}}>Alvin Josue Melendez Serrano</Text>
                                    </View>
                                    <View style={styles.InfoText} >
                                        <Text style={{ color: '#A375FF', fontWeight: 'bold', }} >Fecha:</Text>
                                        <Text style={{ color: '#707070',}}>02/08/2023</Text>
                                        <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Hora:</Text>
                                        <Text style={{ color: '#707070',}}>10:30 AM</Text>
                                    </View>
                                    <View style={styles.InfoText} >
                                        <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Medico:</Text>
                                        <Text style={{ color: '#707070',}}>Robert Opphenhaimer</Text>
                                    </View>
                        
                                <TouchableOpacity style={styles.apptBtn} onPress={()=> setView(true)} >
                                    <Text style={{color: '#fff', fontSize: 13.5,}}>Mas detalles</Text>
                                </TouchableOpacity>
                                
                                <Modal 
                                
                                animationType='fade'
                                onDismiss={()=> console.log('close')}
                                onShow={()=>console.log('show')}
                                transparent
                                visible={view}
                                
                                >
                                    <View
                                    style={{
                                        flex:1,
                                        backgroundColor:'rgba(1,1,1, 0.5)',
                                        justifyContent:'center',}}
                                    >
                                        <View style={{height:'35%',width:'90%',backgroundColor:'#ffff',left:22,borderRadius:30,}}>
                                        <Text style={{alignSelf:'center',top:10,fontSize:20,color:'#707070',fontWeight:'bold',}}>Detalles de la cita</Text>
                                            <View style={{ height:'70%',width:'90%',top:20, alignSelf:'center',}}>
                                            
                                            

                                                <View style={styles.InfoText} >
                                                    <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16, }}>Especialidad:</Text>
                                                    <Text style={{ color: '#707070',fontSize:16, }}>Otorrinolaringología</Text>
                                                </View>
                                                <View style={styles.InfoText} >
                                                    <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16,marginTop:10,  }}>Paciente:</Text>
                                                    <Text style={{ color: '#707070',fontSize:16,top:10, }}>Alvin Josue Melendez Serrano</Text>
                                                </View>
                                                <View style={styles.InfoText} >
                                                    <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16,marginTop:10,  }}>Fecha:</Text>
                                                    <Text style={{ color: '#707070',fontSize:16,top:10, }}>02/08/2023</Text>
                                                </View>
                                                <View style={styles.InfoText} >
                                                    <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16,marginTop:10,  }}>Hora de Inicio:</Text>
                                                    <Text style={{ color: '#707070',fontSize:16,top:10, }}>11:19 AM</Text>
                                                </View>
                                                <View style={styles.InfoText} >
                                                    <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16,marginTop:10, }}>Diagnostico General:</Text>
                                                    <Text style={{ color: '#707070',fontSize:16,top:10, }}>Sinusitis Alergica</Text>
                                                </View>
                                                
                                                <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16,marginTop:10,  }}>Medicamentos recetados:</Text>
                                                <Text style={{ color: '#707070',fontSize:16,top:10, }}>Acetaminofen,Morfina,Mumia,Tetratomisil500</Text>
                                                

                                            </View>
                                            
                                        <TouchableOpacity style={styles.apptBtn1} onPress={()=> setView(false)} >
                                    <Text style={{color: '#fff', fontSize: 13.5,}}>Cerrar</Text>
                                </TouchableOpacity>
                                        

                                            

                                        </View>

                                    </View>

                                </Modal>
                            </View>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={{width: '65%', height: '100%', borderBottomColor: '#D6D6D6',left:20,}}>
                            <View style={styles.IconTextSpc}>
                                <View style={{width: '18%', height: '100%', paddingLeft: 4,}}>
                                    <Image source={require('../../../../assets/graphic-icons/neumologia-icon.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                                </View>
                                <View style={styles.spcTitleC}>
                                    <Text style={styles.spcTitle}>Neumología</Text>
                                </View>
                            </View>
                            <View style={{  height: '65%',padding: 6,}}>
                                    <View style={styles.InfoText} >
                                        <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Paciente:</Text>
                                        <Text style={{ color: '#707070',}}>Alvin Josue Melendez Serrano</Text>
                                    </View>
                                    <View style={styles.InfoText} >
                                        <Text style={{ color: '#A375FF', fontWeight: 'bold', }} >Fecha:</Text>
                                        <Text style={{ color: '#707070',}}>02/08/2023</Text>
                                        <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Hora:</Text>
                                        <Text style={{ color: '#707070',}}>10:30 AM</Text>
                                    </View>
                                    <View style={styles.InfoText} >
                                        <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Medico:</Text>
                                        <Text style={{ color: '#707070',}}>Robert Opphenhaimer</Text>
                                    </View>
                                <TouchableOpacity style={styles.apptBtn} onPress={()=> setView(true)}>
                                    <Text style={{color: '#fff', fontSize: 13.5,}}>Mas detalles</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={{width: '65%', height: '100%', borderBottomColor: '#D6D6D6',left:20,}}>
                            <View style={styles.IconTextSpc}>
                                <View style={{width: '18%', height: '100%', paddingLeft: 4,}}>
                                    <Image source={require('../../../../assets/graphic-icons/gastro-icon.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                                </View>
                                <View style={styles.spcTitleC}>
                                    <Text style={styles.spcTitle}>Gastroenterología</Text>
                                </View>
                            </View>
                            <View style={{ height: '65%',padding: 6,}}>
                                    <View style={styles.InfoText} >
                                        <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Paciente:</Text>
                                        <Text style={{ color: '#707070',}}>Alvin Josue Melendez Serrano</Text>
                                    </View>
                                    <View style={styles.InfoText} >
                                        <Text style={{ color: '#A375FF', fontWeight: 'bold', }} >Fecha:</Text>
                                        <Text style={{ color: '#707070',}}>02/08/2023</Text>
                                        <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Hora:</Text>
                                        <Text style={{ color: '#707070',}}>10:30 AM</Text>
                                    </View>
                                    <View style={styles.InfoText} >
                                        <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Medico:</Text>
                                        <Text style={{ color: '#707070',}}>Robert Opphenhaimer</Text>
                                    </View>
                        
                                <TouchableOpacity style={styles.apptBtn}      onPress={()=> setView(true)}>
                                    <Text style={{color: '#fff', fontSize: 13.5,}}>Mas detalles</Text>
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
        height: 100,
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
        backgroundColor: '#A375FF',
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
        height: 140,
        alignSelf: 'center',
        borderRadius: 18,
        flexDirection: 'row',
        overflow: 'hidden',
        borderBottomColor: '#CDCDF3',
        borderBottomWidth: 5,
        borderColor: '#EBEBEB',
        borderWidth: 1,
        marginBottom: 20,
        backgroundColor:'#ffff',
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
    
    apptBtn:{
        width: '50%',
        height: 30,
        backgroundColor: '#B4B4D6',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 10,
        left:'95%',
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    apptBtn1:{
        width: '50%',
        height: 30,
        backgroundColor: '#B4B4D6',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 20,
        left:'25%',
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    InfoText:{
        
      
        flexDirection:'row',
        gap:5,

    },
   
  });