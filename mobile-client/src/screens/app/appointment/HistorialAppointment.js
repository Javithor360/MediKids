//>> IMPORT COMPONENTS
import React, { useEffect, useState } from 'react'
import { Text, ScrollView, StyleSheet, View, Image, TouchableOpacity,Modal } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';

//>> IMPORT COMPONENTS
import { ScreenTitle, getMedicalRecords } from '../../../index';
import { useSelector } from 'react-redux';

export const HistorialAppointment = ({ route }) => {
    // const jwtToken = useSelector(state => state.responsible.jwtToken);
    const { AppointmentsRecord } = route.params;
    
    //! MODAL STATE
    const [view, setView] = useState(false);

    useEffect(() => {
        console.log(AppointmentsRecord)
    }, []);

    const GetModal = () => {
        return (
            <Modal animationType='fade' onDismiss={()=> console.log('close')} onShow={()=>console.log('show')} transparent visible={view}>
                <View style={{ flex:1, backgroundColor:'rgba(1,1,1, 0.5)', justifyContent:'center',}}>
                    <View style={{height:'60%',width:'90%',backgroundColor:'#ffff',left:22,borderRadius:30, overflow: 'hidden'}}>
                        <View style={{width: '100%', height: '12%', alignItems: 'center', paddingVertical: 15, backgroundColor: '#e4e2ff', }}>
                            <Text style={[styles.spcTitle, {fontSize:20,color:'#707070', textShadowColor: 'rgba(0, 0, 0, 0)', fontSize: 24}]}>Detalles de la cita</Text>
                        </View>

                        <View style={{ height:'70%',width:'90%',top:20, alignSelf:'center',}}>
                            <View style={styles.InfoText} >
                                <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16, }}>Especialidad:</Text>
                                <Text style={{ color: '#707070',fontSize:16, }}>Otorrinolaringología</Text>
                            </View>
                            <View style={styles.InfoText} >
                                <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16,marginTop:10, }}>Paciente: </Text>
                                <Text style={{ color: '#707070',fontSize:16,top:10, }}>Alvin Josue Melendez Serrano</Text>
                            </View>
                            <View style={styles.InfoText} >
                                <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16,marginTop:10, }}>Fecha: </Text>
                                <Text style={{ color: '#707070',fontSize:16,top:10, }}>02/08/2023</Text>
                            </View>
                            <View style={styles.InfoText} >
                                <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16,marginTop:10, }}>Hora de Inicio: </Text>
                                <Text style={{ color: '#707070',fontSize:16,top:10, }}>11:19 AM</Text>
                            </View>
                            <View style={[styles.InfoText, {flexDirection: 'column'}]} >
                                <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16,marginTop:10, }}>Diagnostico General:</Text>
                                <Text style={{ color: '#707070',fontSize:16 }}>Sinusitis Alergica</Text>
                            </View>
                            <View style={[styles.InfoText, {flexDirection: 'column'}]} >
                                <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16,marginTop:10, }}>Medicamentos Recetados:</Text>
                                <Text style={{ color: '#707070',fontSize:16 }}>Sinusitis Alergica</Text>
                            </View>
                            <View style={{flexDirection: 'row', width: '100%'}}>
                                <View style={[styles.InfoText, {flexDirection: 'column'}]} >
                                    <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16,marginTop:10, }}>Altura:</Text>
                                    <Text style={{ color: '#707070',fontSize:16 }}>1.35 Mtrs</Text>
                                </View>
                                <View style={[styles.InfoText, {flexDirection: 'column', marginLeft: 50}]} >
                                    <Text style={{ color: '#A375FF', fontWeight: 'bold',fontSize:16,marginTop:10, }}>Peso:</Text>
                                    <Text style={{ color: '#707070',fontSize:16 }}>145.55 lbs</Text>
                                </View>
                            </View>

                        </View>
                        
                        <TouchableOpacity style={styles.apptBtn1} onPress={()=> setView(false)} >
                            <Text style={{color: '#fff', fontSize: 13.5,}}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    const GetCard = ({Record}) => {
        return (
            <View style={styles.card}>
                <View style={{width: '100%', height: '80%', borderBottomColor: '#D6D6D6', marginTop: 8}}>
                    <View style={styles.IconTextSpc}>
                        <View style={{width: '18%', height: '100%', backgroundColor: 'rgba(189, 189, 189, 0.24)', borderRadius: '50%'}}>
                            <Image source={require('../../../../assets/graphic-icons/otorrino-icon.png')} style={{width: '100%', height: '100%', resizeMode: 'contain'}}></Image>
                        </View>
                        <View style={styles.spcTitleC}>
                            <Text style={styles.spcTitle}>Otorrinolaringología</Text>
                        </View>
                    </View>

                    <View style={{width: '100%', alignItems: 'center', marginTop: 10, marginBottom: 9}} >
                        <View style={styles.line2} />
                    </View>

                    <View style={{ paddingHorizontal: 0, alignItems: 'center'}}>
                        <View style={styles.InfoText} >
                            <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Paciente: </Text>
                            <Text style={{ color: '#707070',}}>Alvin Melendez</Text>
                        </View>
                        <View style={styles.InfoText} >
                            <Text style={{ color: '#A375FF', fontWeight: 'bold', }} >Fecha: </Text>
                            <Text style={{ color: '#707070',}}>02/08/2023</Text>
                        </View>
                        <View style={styles.InfoText} >
                            <Text style={{ color: '#A375FF', fontWeight: 'bold', }}>Medico: </Text>
                            <Text style={{ color: '#707070',}}>Robert Opphenhaimer</Text>
                        </View>
                    </View>

                    <View style={{width: '100%', alignItems: 'center', marginTop: 8}}>
                        <TouchableOpacity style={styles.apptBtn} onPress={()=> setView(true)} >
                            <Text style={{color: '#fff', fontSize: 13.5, fontWeight: '600'}}>Más detalles</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <LinearGradient colors={['#e4e2ff', '#e4e2ff', '#FFFFFF', '#FFFFFF']} locations={[0, 0.5, 0.5, 1]} style={{height: '100%'}}>
            <ScrollView style={styles.fullScreenContainer}>
                <GetModal />
                <View style={{backgroundColor:'#fff'}}>
                    <ScreenTitle
                        Label={"Historial de Citas"}
                        IconName={"clipboard-text-multiple"}
                        fontSize={20}
                        textColor={'#FFFFFF'}
                        paddingH={30}
                    />
                    <View style={styles.chooseBanner}>
                        <View style={styles.chooseContent}>
                            <View style={styles.rightTextSctn}>
                                <View style={styles.linee}></View>
                                <Text style={styles.titleBanner}>Historial de Citas Atendidas</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.cardsContainer}>
                        {
                            AppointmentsRecord.map((Record, i) => {
                                return (
                                    <GetCard key={i} Record={Record} />
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
  )
}

const styles = StyleSheet.create({
    fullScreenContainer:{
        height: '100%',
        marginTop: Constants.statusBarHeight
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
        width: '100%',
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
        width: 64,
        backgroundColor: '#fff',
        marginBottom: 6,
        marginLeft: 8,
    },
    line2: {
        height: 2,
        width: '90%',
        backgroundColor: '#B0B0B0',
        borderRadius: 10
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
        width: '92%',
        height: 210,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    spcTitleC:{
        paddingHorizontal: 6,
        justifyContent: 'center',
    },
    spcTitle:{
        color: '#707070',
        fontWeight: 600,
        fontSize: 20,
        fontFamily: 'poppinsBold',
        textShadowColor: 'rgba(0, 0, 0, 0.25)', // Color de la sombra en formato RGBA
        textShadowOffset: { width: 2, height: 2 }, // Desplazamiento en píxeles
        textShadowRadius: 2,
        
    },
    
    apptBtn:{
        width: '50%',
        height: 30,
        backgroundColor: '#a0a0c4',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    apptBtn1:{
        width: '50%',
        height: 30,
        backgroundColor: '#a0a0c4',
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
        // gap:5,
        marginBottom: 5
    },
   
  });