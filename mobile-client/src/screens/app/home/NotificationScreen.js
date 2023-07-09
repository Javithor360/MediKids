import React from 'react'
import { View,Text,Image} from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'


import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const NotificationScreen = () => {
  return (
    <ScrollView style={styles.SafeAreaView}>
        <View style={styles.Contain} >
            <View style={styles.LineTitulo}></View> 
            <Text style={styles.Novedades}>Novedades</Text>
            <TouchableOpacity style={styles.DeletedAll}>
                <MaterialCommunityIcons name="notification-clear-all" size={50} color="#707070"   />
            </TouchableOpacity>
            <View style={styles.Contain2}>
                <Text style={styles.Nuevos}>Nuevos</Text>

                <View style={styles.Noti} >
                    <View style={styles.ContainImage} >
                        <Image source={require('../../../../assets/graphic-icons/appointment_notification.png')}  style={styles.Image}  />
                    </View>
                    <View style={styles.ContainText} >
                        <View style={styles.ContainTitle}>
                            <View style={styles.notiTypeDate}>
                                <View style={styles.notiTitleC}>
                                    <Text style={styles.CategoriaNoti}>Otorrinolaringología</Text>
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
                                Cita con el doctor Josef Mengele en Otorrinolaringología
                                </Text>
                            </View>
                            <View style={styles.deleteBtnC}>
                                <TouchableOpacity style={styles.Deleted}>
                                    <Text style={styles.TextDeleted}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                
                <Text style={styles.Nuevos}>Anteriores</Text>

                <View style={styles.Noti} >
                    <View style={styles.ContainImage} >
                        <Image source={require('../../../../assets/graphic-icons/next_appointment.png')}  style={styles.Image}  />
                    </View>
                    <View style={styles.ContainText} >
                        <View style={styles.ContainTitle}>
                            <View style={styles.notiTypeDate}>
                                <View style={styles.notiTitleC}>
                                    <Text style={styles.CategoriaNoti}>Cita 20/08/23</Text>
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
                                Cita con el doctor Josef Mengele en Otorrinolaringología
                                </Text>
                            </View>
                            <View style={styles.deleteBtnC}>
                                <TouchableOpacity style={styles.Deleted}>
                                    <Text style={styles.TextDeleted}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.Noti} >
                    <View style={styles.ContainImage} >
                        <Image source={require('../../../../assets/graphic-icons/new_appointment.png')}  style={styles.Image}  />
                    </View>
                    <View style={styles.ContainText} >
                        <View style={styles.ContainTitle}>
                            <View style={styles.notiTypeDate}>
                                <View style={styles.notiTitleC}>
                                    <Text style={styles.CategoriaNoti}>Cita Aceptada</Text>
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
                                Cita con el doctor Josef Mengele en Otorrino
                                </Text>
                            </View>
                            <View style={styles.deleteBtnC}>
                                <TouchableOpacity style={styles.Deleted}>
                                    <Text style={styles.TextDeleted}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.Noti} >
                    <View style={styles.ContainImage} >
                        <Image source={require('../../../../assets/graphic-icons/medication.png')}  style={styles.Image}  />
                    </View>
                    <View style={styles.ContainText} >
                        <View style={styles.ContainTitle}>
                            <View style={styles.notiTypeDate}>
                                <View style={styles.notiTitleC}>
                                    <Text style={styles.CategoriaNoti}>Medicamentos</Text>
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
                                Cita con el doctor Josef Mengele en Otorrinolaringología
                                </Text>
                            </View>
                            <View style={styles.deleteBtnC}>
                                <TouchableOpacity style={styles.Deleted}>
                                    <Text style={styles.TextDeleted}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
   </ScrollView>
  )
}

const styles = StyleSheet.create({
    SafeAreaView:{
        backgroundColor:'white',
        flex:1,
    },
    Contain:{
        height:900,
        width:'100%',
        alignSelf:'center',
        backgroundColor:'white',
    },
    ContainDate:{
        flexDirection:'row',
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 25,
    },
    ContainTitle:{
        flexDirection:'row',
        height: '25%',
    },
    containContent:{
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        paddingTop: 4,
    },
    notiDetailsTextC:{
        height: '100%',
        width: '72%',
    },
    deleteBtnC:{
        height: '100%',
        width: '30%',
        paddingRight: 8,
    },
    Novedades:{
        fontSize:25,
        bottom:'4.5%',
        alignSelf:'flex-start',
        marginLeft:'10%',
        color:'#707070',
    },
    LineTitulo:{
        backgroundColor:'#707070',
        height:2.5,
        width:'5%',
        alignSelf:'flex-start',
        marginTop:'20%',
        marginLeft:'4%',
        bottom:'2.7%',
    },
    Contain2:{
        backgroundColor:'white',
        height:300,
        bottom:30,
    },
    Nuevos:{
        marginBottom:13,
        marginLeft: 20,
        marginBottom: 20,
        fontSize: 29, 
        color: '#707070'
    },
    Noti:{
        backgroundColor:'#D8D7FE',
        height:'30%',
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
    },
    ContainImage:{
        height:'100%',
        width:'20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ContainText:{
        height:'100%',
        width:'80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextDescription:{
        // right:15,
    },
    Deleted:{
        backgroundColor:'white',
        alignSelf: 'center',
        borderRadius: 10,
        width: '90%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextDeleted:{
        alignSelf:'center',
        color:"#707070",
        fontWeight:'bold',
    },
    DeletedAll:{
        color:'#707070',
        flexDirection:'row',
        position:'absolute',
        left:350,
        top:40,
    },
    Image:{
        height:63,
        width:62,
    },
    CategoriaNoti:{
        color:"#707070",
        fontWeight:'bold',
        // right:15,
    },
    notiTypeDate:{
        flexDirection: 'row',
    },
    notiTitleC:{
        width: '65%',
        justifyContent: 'center',
    },
    Time:{
        fontSize:10,
        marginRight: 5,
    },
    Time1:{
        fontSize:10,
    },
    Icon1:{
        marginRight: 2,
    },
    Icon2:{
        marginRight: 2,
    },
})