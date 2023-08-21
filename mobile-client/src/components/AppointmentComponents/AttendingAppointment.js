import { Text, StyleSheet, View } from 'react-native'
//Libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
//icons
import { Fontisto } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import TimerComponent from '../Timer';
import { useEffect, useState } from 'react';

export const AttendingAppointment = ({ appointmentInfo }) => {
    const Info = useSelector(state => state.responsible);
    const Patient = useSelector(state => state.patient);
    const getDate = () => { return new Date(appointmentInfo.Date).toLocaleDateString() };

    // State for the real hour.
    const [CurrentTime, setCurrentTime] = useState(null);

    //!CLOCK INTERVAL
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);


    return (
        <>
            <Text style={styles.requestMainTitle}>Información de la cita</Text>
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>Informacion Personal:</Text>
                <View style={[styles.personalInfoContainer, styles.withMb]}>
                    <View style={styles.iconBackC}>
                        <View style={styles.iconBack}>
                            <Fontisto name="bed-patient" size={24} color="#ffffff" />
                        </View>
                    </View>
                    <View style={styles.someDetailsC}>
                        <Text style={styles.patientTitle}>Atendiendo paciente:</Text>
                        <Text style={{color: '#707070'}} numberOfLines={1}>{Patient.FirstNames} {Patient.LastNames}</Text>
                    </View> 
                </View>

                <View style={styles.personalInfoContainer}>
                    <View style={styles.iconBackC}>
                        <View style={styles.iconBack}>
                            <MaterialCommunityIcons  name="mother-heart" size={24} color="#ffffff" />
                        </View>
                    </View>
                    <View style={styles.someDetailsC}>
                        <Text style={styles.patientTitle}>Encargado</Text>
                        <Text style={{color: '#707070'}} numberOfLines={1}>{Info.FirstNames} {Info.LastNames}</Text>
                    </View> 
                </View>
            </View>

            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>Informacion de la cita:</Text>
                <View style={[styles.personalInfoContainer, styles.withMb]}>
                    <View style={styles.iconBackC}>
                        <View style={styles.iconBack}>
                            <FontAwesome5 name="disease" size={24} color="#ffffff" />
                        </View>
                    </View>
                    <View style={styles.someDetailsC}>
                        <Text style={styles.patientTitle}>Motivo de la cita:</Text>
                        <Text style={{color: '#707070'}} numberOfLines={1}>{appointmentInfo.Description}</Text>
                    </View> 
                </View>

                <View style={styles.personalInfoContainer}>
                    <View style={styles.iconBackC}>
                        <View style={styles.iconBack}>
                            <MaterialCommunityIcons name="clock-start" size={24} color="#ffffff" />
                        </View>
                    </View>
                    <View style={styles.someDetailsC}>
                        <Text style={styles.patientTitle}>Fecha y hora de inicio:</Text>
                        <Text style={{color: '#707070'}} numberOfLines={1}>{getDate()} - {appointmentInfo.Hour}</Text>
                    </View>
                </View>
            </View>
            <TimerComponent />
        </>
    )
}

const styles = StyleSheet.create({
    requestMainTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#46929B',
        alignSelf: 'center',
        marginVertical: 16,
    },
    cardTitle:{
        fontWeight: 800,
        color: '#5AB1BB',
        fontSize: 16,
        marginBottom: 12,
    },
    cardContainer: {
        width: wp('80%'),
        borderRadius: 20,
        backgroundColor: '#fff',
        padding: 16,
        alignSelf: 'center',
        marginBottom: 16,
        flexDirection: 'column',
        //iOS
        shadowColor: '#707070',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        //Android
        elevation: 5,
        shadowColor: '#707070',
        borderWidth: 1,
        borderColor: '#E6E6E6',
    },
    personalInfoContainer:{
        flexDirection: 'row',
        gap: 10,
        width: '100%',
    },
    iconBackC:{
        width: '15%',
    },
    withMb:{
        marginBottom: 20,
    },
    iconBack: {
        borderRadius: 10,
        backgroundColor: '#96C1C6',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        //iOS
        shadowColor: '#707070',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        //Android
        elevation: 5,
        shadowColor: '#707070',
    },
    someDetailsC: {
        justifyContent: 'center',
        width: '80%',
    },
    patientTitle:{
        fontWeight: 600,
        color: '#707070',
        fontSize: 16,
    }
})