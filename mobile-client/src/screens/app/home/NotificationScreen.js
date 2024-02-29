
//>> IMPORT LIBRARIES
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native-animatable'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MaterialCommunityIcons, Ionicons, FontAwesome5, FontAwesome, Fontisto, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

//>> IMPORT COMPONENTS
import { ScreenTitle } from '../../../components/ScreenTitleHook';
import { ShowToast, deleteNotification } from '../../../index'

/*
    * TYPE OF NOTIFICATIONS
    \ 1 - Appointment accepted
    \ 2 - Appointment rejected
    \ 3 - Appointment reminder (1:30h before)
    \ 4 - Appointment starting
    \ 5 - Appointment finished
    \ 6 - non-atttendance appmt
*/

export const NotificationScreen = ({route}) => {
    const { DataNotis } = route.params;
    const isFocused = useIsFocused()
    const jwtToken = useSelector(state => state.responsible.jwtToken);
    const lng = useSelector(state => state.starter.Language);
    const { t } = useTranslation();
    //! Notifications State
    const [ActualNotifications, setActualNotifications] = useState(null);
    const [PassedNotifications, setPassedNotifications] = useState(null);

    const getNotis = async () => {
        try {
            setActualNotifications(DataNotis.ActualNotis.reverse());
            setPassedNotifications(DataNotis.PassedNotis.reverse());
        } catch (error) {
            console.log(error)
        }
    }

    const getTime = (dt) => {
        let date = new Date(dt);
        return `${date.getHours()}:${date.getMinutes()}`;
    }

    const getIcon = (type) => {
        switch (type) {
            case 1:
                return <FontAwesome5 name="calendar-day" size={38} color="white" />
            case 2:
                return <FontAwesome5 name="calendar-times" size={38} color="white" />
            case 3:
                return <FontAwesome5 name="concierge-bell" size={38} color="white" />
            case 4:
                return <AntDesign name="playcircleo" size={38} color="white" />
            case 5:
                return <FontAwesome name="calendar-check-o" size={38} color="white" />
            case 6:
                return <MaterialCommunityIcons name="file-cancel" size={38} color="white" />
        }
    }

    const getTitle = (Title, Type) => {
        if (lng) {
            switch (Type) {
                case 1:
                    return 'Cita Aceptada';
                case 2:
                    return 'Cita Rechazada';
                case 3:
                    return 'Aviso de Cita';
                case 4:
                    return 'Inicio de Cita';
                case 5:
                    return 'Cita Finalizada';
                case 6:
                    return `Inasistencia`;
            }
        } else {
            switch (Type) {
                case 1:
                    return 'Appmt. Accepted';
                case 2:
                    return 'Appmt. Rejected';
                case 3:
                    return 'Appmt. Reminder';
                case 4:
                    return 'Starting Appmt.';
                case 5:
                    return 'Appmt. Finished';
                case 6:
                    return `non-attendance`
            }
        }
    }

    const getDescription = (Title, Type) => {
        if (lng) {
            switch (Type) {
                case 1:
                    return `El doctor encargado ha aceptado su cita en ${Title}`;
                case 2:
                    return `Se ha tomado la decisión de rechazar su cita en ${Title}.`;
                case 3:
                    return `Recordatorio para su cita en ${Title}, faltan menos de 90 minutos.`;
                case 4:
                    return `Su cita en ${Title} ha tomado inicio, verificar información en citas.`;
                case 5:
                    return `Cita en ${Title} finalizada de manera correcta, verifique el historial.`;
                case 6:
                    return `Usted no asistió a su cita en ${Title}, por lo cual se cancelo.`;
            }
        } else {
            switch (Type) {
                case 1:
                    return `The doctor in charge has accepted your appointment in ${Title}`;
                case 2:
                    return `The decision has been made to decline your appointment in ${Title}.`;
                case 3:
                    return `Reminder for your appointment at ${Title}, less than 90 min left.`;
                case 4:
                    return `Your citation in ${Title} has started, verify information in appointments.`;
                case 5:
                    return `Appointment in ${Title} completed successfully, check the history`;
                case 6:
                    return `You did not attend your appointment at ${Title}, so it was cancelled.`;
            }
        }
    }

    const deleteNoti = async (id, kn, Type) => {
        try {
            const { data } = await deleteNotification(jwtToken, id, Type);
            if (data.success) {
                ShowToast('my_success', lng ? 'Éxito' : 'Success', lng ? 'Notificación eliminada.' : 'Notification removed.')
                if (kn) {
                    const newArr = ActualNotifications.filter((el) => el.id != id);
                    setActualNotifications(newArr);
                } else {
                    const newArr = PassedNotifications.filter((el) => el.id != id);
                    setPassedNotifications(newArr);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNotis()
    }, [isFocused]);

    const NotiCard = ({Noti, kn}) => {
        return (
            <View style={styles.Noti} >
                <View style={{width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                    <View style={styles.ContainImage} >
                        {getIcon(Noti.Type)}
                    </View>
                    <View style={{height: '90%', width: 1.5, backgroundColor: '#c6c6c6', marginHorizontal: 10,}}></View>
                    <View style={styles.ContainText} >
                        <View style={styles.ContainTitle}>
                            <View style={styles.notiTypeDate}>
                                <View style={styles.notiTitleC}>
                                    <Text numberOfLines={1} style={styles.CategoriaNoti}>{getTitle(Noti.Title, Noti.Type)}</Text>
                                </View>
                                <View style={styles.ContainDate}>
                                    <MaterialCommunityIcons name="timer-sand" size={10.5} color="#707070" style={styles.Icon1}  />
                                    <Text style={styles.Time}>{new Date(Noti.DateTime).toLocaleDateString()}</Text>
                                    <Text style={styles.Time1}>{getTime(Noti.DateTime)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.containContent}>
                            <View>
                                <Text style={styles.TextDescription}>
                                    {getDescription(Noti.Title, Noti.Type)}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => deleteNoti(Noti.id, kn, Noti.Type)} style={styles.deleteBtnC}>
                                <Text style={{color: '#707070'}}>{t('noti.deleted')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <LinearGradient colors={['#e4e2ff', '#e4e2ff', '#FFFFFF', '#FFFFFF']} locations={[0, 0.5, 0.5, 1]} style={{height: '100%'}}>
            <ScrollView ScrollView style={styles.fullScreenContainer}>
                <View style={{backgroundColor:'#fff'}}>
                    <ScreenTitle
                        Label={`${t('noti.title')}`}
                        IconName={"bell-outline"}
                        fontSize={20}
                        textColor={'#FFFFFF'}
                        paddingH={30}
                    /> 
                    {
                        (ActualNotifications != null || PassedNotifications != null) && (ActualNotifications?.length != 0 || PassedNotifications?.length != 0) ?
                        <>
                            {/* NOTIFICACIONES ACTUALES */}
                            <View style={{marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignContent: 'center', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 24, color: '#707070', fontWeight: "600",}}>{t('noti.text1')}</Text>
                                <View style={{width: '60%', height: 3, borderRadius: 10, backgroundColor: '#666666'}}/>
                            </View>
                            {
                                ActualNotifications != null && ActualNotifications.length != 0 ?
                                    ActualNotifications.map((el, i) => {
                                        return <NotiCard key={i} Noti={el} kn={true} />
                                    })
                                    :
                                    <View style={styles.NotNotisCard}>
                                        <Text style={{fontFamily: 'poppinsRegular', fontSize: 16, marginTop: 5, marginBottom: 5}}>{t('noti.text2')}.</Text>
                                        <Ionicons name="md-notifications-off-outline" size={38} color="black" />
                                    </View>
                            }

                            {/* NOTIFICACIONES PASADAS */}
                            <View style={{marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 20, alignContent: 'center', justifyContent: 'space-between', marginTop: 20}}>
                                <Text style={{fontSize: 24, color: '#707070', fontWeight: "600",}}>{t('noti.text3')}</Text>
                                <View style={{width: '65%', height: 3, borderRadius: 10, backgroundColor: '#666666'}}/>
                            </View>
                            {
                                PassedNotifications != null && PassedNotifications.length != 0 ?
                                    PassedNotifications.map((el, i) => {
                                        return <NotiCard key={i} Noti={el} kn={false} />
                                    })
                                    :
                                    <View style={styles.NotNotisCard}>
                                        <Text style={{fontFamily: 'poppinsRegular', fontSize: 16, marginTop: 5, marginBottom: 5}}>{t('noti.text4')}.</Text>
                                        <Ionicons name="md-notifications-off-outline" size={38} color="black" />
                                    </View>
                            }
                        </>
                        :
                        <View style={{width: '100%', height: 500}} >
                            <View style={styles.NotNotisContainer}>
                                <Text style={{fontFamily: 'poppinsRegular', fontSize: 20, color: '#606060', marginBottom: 10, marginTop: 15}}>{t('noti.text5')}.</Text>
                                <Ionicons name="notifications-off" size={130} color="#606060" />
                            </View>
                        </View>
                    }

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
    ContainDate:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '35%',
    },
    ContainTitle:{
        flexDirection:'row',
        width: '100%',
    },
    containContent:{
        // width: '85%',
        flexDirection: 'column',
        paddingTop: 4,
    },

    Novedades:{
        fontSize:25,
        bottom:'4.5%',
        alignSelf:'flex-start',
        marginLeft:'10%',
        color:'#707070',
    },
    Nuevos:{
        marginBottom:13,
        marginLeft: 20,
        marginBottom: 20,
        fontSize: 29, 
        color: '#707070'
    },
    Noti:{
        borderWidth: 1,
        borderLeftWidth: 7,
        borderLeftColor: '#bdbcde',
        borderTopColor: '#E6E6E6',
        borderRightColor: '#E6E6E6',
        borderBottomColor: '#E6E6E6',
        // borderColor: '#E6E6E6',
        backgroundColor:'#f3f3f3',
        width:'90%',
        alignSelf:'center',
        borderRadius:20,
        marginTop:'2%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        //iOS
        shadowColor: '#707070',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        //more..
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    ContainImage:{
        // height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bdbcde',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 8,

    },
    ContainText:{
        // height:'100%',
        maxWidth:'80%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    TextDescription:{
        color: '#707070',
        
    },
    Image:{
        height:50,
        width:50,
        // alignSelf: 'center',
    },
    CategoriaNoti:{
        color:"#000000",
        fontWeight:'600',
        fontSize: 14,
    },
    notiTypeDate:{
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between'
        // width: '100%',

    },
    notiTitleC:{
        justifyContent: 'center',
        width: '65%',
    },
    Time:{
        fontSize:9,
        marginRight: 5,
        color:"#000000",
        fontWeight:'bold',
    },
    Time1:{
        fontSize:9,
        color:"#000000",
        fontWeight:'600',
    },
    Icon1:{
        marginRight: 2,
        color:"#000000",
        fontWeight:'bold',
    },
    Icon2:{
        marginRight: 2,
        color:"#000000",
        fontWeight:'bold',
    },
    deleteBtnC:{
        alignSelf: 'center',
        marginTop: 18,
        backgroundColor: '#fff',
        width: 80,
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:'#c6c6c6',
        borderWidth: 1,
    }, 
    NotNotisContainer: {
        borderColor: '#c2c2c2',
        borderWidth: 1,
        marginHorizontal: 24,
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 8,
        elevation: 3,
        //iOS
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        height: '100%'
    },
    NotNotisCard: {
        backgroundColor: '#f9f9f9',
        marginHorizontal: 20,
        height: 150,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 3,
        //iOS
        shadowColor: '#707070',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        justifyContent: 'center',
        alignItems: 'center',
    }
})