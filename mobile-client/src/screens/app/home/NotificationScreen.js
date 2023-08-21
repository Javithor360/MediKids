import React from 'react'
import { View,Text,Image} from 'react-native-animatable'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScreenTitle } from '../../../components/ScreenTitleHook';
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants';

export const NotificationScreen = () => {
  return (
    <LinearGradient colors={['#e4e2ff', '#e4e2ff', '#FFFFFF', '#FFFFFF']} locations={[0, 0.5, 0.5, 1]} style={{height: '100%'}}>
        <ScrollView ScrollView style={styles.fullScreenContainer}>
            <ScreenTitle
                Label={"Notificaciones"}
                IconName={"bell-badge-outline"}
                fontSize={20}
                textColor={'#FFFFFF'}
                paddingH={30}
            /> 
            <View style={{marginLeft: 20, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20,}}>
                <Text style={{fontSize: 24, color: '#707070', fontWeight: 600,}}>Recientes</Text>
            </View>
            <View style={styles.Noti} >
                <View style={{width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                    <View style={styles.ContainImage} >
                        <Image source={require('../../../../assets/graphic-icons/appointment_notification.png')}  style={styles.Image}  />
                    </View>
                    <View style={{height: '90%', width: 1.5, backgroundColor: '#c6c6c6', marginHorizontal: 10,}}></View>
                    <View style={styles.ContainText} >
                        <View style={styles.ContainTitle}>
                            <View style={styles.notiTypeDate}>
                                <View style={styles.notiTitleC}>
                                    <Text numberOfLines={1} style={styles.CategoriaNoti}>Próxima cita</Text>
                                </View>
                                <View style={styles.ContainDate}>
                                    <MaterialCommunityIcons name="calendar-month-outline" size={12} color="#707070" style={styles.Icon1}  />
                                    <Text style={styles.Time}>23/6/2023</Text>
                                    <MaterialCommunityIcons name="clock-time-eight-outline" size={12} color="#707070" style={styles.Icon2} />
                                    <Text style={styles.Time1}>7:33</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.containContent}>
                            <View style={styles.notiDetailsTextC}>
                                <Text style={styles.TextDescription}>
                                    Su solicitud de cita ha sido aceptada en otorrrinolaringología
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.deleteBtnC}>
                                <Text style={{color: '#707070',}}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{marginLeft: 20, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20,}}>
                <Text style={{fontSize: 24, color: '#707070', fontWeight: 600,}}>Pasadas</Text>
            </View>
        </ScrollView>
    </LinearGradient>

    
  )
}

const styles = StyleSheet.create({
    fullScreenContainer:{
        backgroundColor: '#FFFFFF',
        marginTop: Constants.statusBarHeight,
    },
    ContainDate:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '50%',
    },
    ContainTitle:{
        flexDirection:'row',
        width: '97%',
    },
    containContent:{
        // width: '85%',
        flexDirection: 'column',
        paddingTop: 4,
    },
    notiDetailsTextC:{
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
        marginBottom: 40,
    },
    ContainImage:{
        // height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ContainText:{
        // height:'100%',
        maxWidth:'80%',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    TextDescription:{
        // right:15,
        // textAlign: 'center',
        color: '#707070',
    },
    Image:{
        height:65,
        width:65,
        // alignSelf: 'center',
    },
    CategoriaNoti:{
        color:"#000000",
        fontWeight:'bold',
        fontSize: 15,
    },
    notiTypeDate:{
        flexDirection: 'row',
        marginBottom: 5,
        // width: '100%',

    },
    notiTitleC:{
        justifyContent: 'center',
        width: '50%',
    },
    Time:{
        fontSize:10,
        marginRight: 5,
        color:"#000000",
        fontWeight:'bold',
    },
    Time1:{
        fontSize:10,
        color:"#000000",
        fontWeight:'bold',
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
    }
})