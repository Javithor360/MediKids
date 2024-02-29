
//>> IMPORT LIBRERIES
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fontisto, FontAwesome5, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
//>> IMPORT COMPONENTS
import { SetLabel, ShowToast, getSingleMedicalAppmt } from '../../index';
import { ChangeGastroState, ChangeNeumoState, ChangeOtorrinoState } from '../../store/slices/appointmentsSlice';

export const AttendingAppointment = ({ appointmentInfo, Doctor_id, setRecordCode, setShowMedicines }) => {
    const lng = useSelector(state => state.starter.Language);
    const dispatch = useDispatch();
    const Info = useSelector(state => state.responsible);
    const Patient = useSelector(state => state.patient);
    const jwtToken = useSelector(state => state.responsible.jwtToken);
    const getDate = () => { return new Date(appointmentInfo.Date).toLocaleDateString() };
    const { t } = useTranslation();
    //! State to the counter
    const [TimeElased, setTimeElased] = useState(null);

    //! State to time left.
    const [TimeLeft, setTimeLeft] = useState(null);

    //! State to points animation
    const [Points, setPoints] = useState('.');

    //! State to see if it 
    const [Running, setRunning] = useState(null);
    const [StopRunning, setStopRunning] = useState(false);

    //! Stop TimeElased.
    const [StopTime, setStopTime] = useState(null);
    
    //! Loading States
    const [isLoading, setIsLoading] = useState(null);
    const [Success, setSuccess] = useState(null);
    const [Disable, setDisable] = useState(null);

    //! FUNCTION TO GET THE TIME OF THE APPOINTMENT
    const createAppmtDateTime = (date, hour) => {
        let HoursSQL = hour.split(':');
        let appointment_hour = new Date(date);

        appointment_hour.setHours(HoursSQL[0]);
        appointment_hour.setMinutes(HoursSQL[1]);
        appointment_hour.setSeconds(HoursSQL[2]);

        return appointment_hour;
    }

    //! Change the Redux state of the appointment.
    const changeReduxAppmtState = (newState) => {
        switch (Doctor_id) {
            case 1:
                dispatch(ChangeOtorrinoState(newState));
                break;
            case 2:
                dispatch(ChangeNeumoState(newState));
                break;
            case 3:
                dispatch(ChangeGastroState(newState));
                break;
        }
    }

    //! FUNCTION TO UPDATE THE APPOINTMENT STATE
    const updateAppmtState = async () => {
        try {
            const {data} = await getSingleMedicalAppmt(jwtToken ,appointmentInfo.id);

            if (data.Appointment[0].State == 4) {
                ShowToast('my_success', lng ? 'Éxito' : 'Success', lng ? 'La cita ha finalizado, en un momento \nsé mostrará la información de esta.' : 'The appointment has ended, the information \nwill be shown shortly.');
                setIsLoading(true);
                setDisable(true);
                setStopTime(TimeElased);
                setStopRunning(true);
                setTimeout(() => {
                    setIsLoading(false);
                    setSuccess(true);
                    setTimeout(() => {
                        changeReduxAppmtState(4);
                        setShowMedicines(true);
                        setRecordCode(data.Record_Code);
                    }, 2000);
                }, 5000);
            } else {
                ShowToast('my_error', 'Error', lng ? 'No hay actualizaciones sobre la \nInformación de la cita.' : 'There are no updates on \nappointment information.');
            }
        } catch (error) {
            console.log(error);
        }
    }

    //! INTERVAL TO CALCULATE THE TIME LEFT
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            const msDif = createAppmtDateTime(appointmentInfo.Date, appointmentInfo.Hour) - now;

            if (msDif <= 0) {
                clearInterval(interval);
                setTimeLeft({hours: 0, minutes: 0, seconds: 0});
                setRunning(true);
            } else {
                const seconds = Math.floor(msDif / 1000) % 60;
                const minutes = Math.floor(msDif / (1000 * 60)) % 60;
                const hours = Math.floor(msDif / (1000 * 60 * 60));
                setRunning(false);
                setTimeLeft({hours: hours, minutes: minutes, seconds: seconds});
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [TimeLeft]);

    //! INTERVAL TO THE POINTS ANIMATION
    useEffect(() => {
        const intervalo = setInterval(() => {
          setPoints(prevPoints => {
            if (prevPoints === '...') {
              return '.';
            } else if (prevPoints === '..') {
              return '...';
            } else {
              return '..';
            }
          });
        }, 550);

        return () => clearInterval(intervalo);
      }, [Points])

    //! INTERVAL TO THE TIME ELAPSED.
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            const msDif = now - createAppmtDateTime(appointmentInfo.Date, appointmentInfo.Hour);
            if (msDif >= 0) {
                const hours = Math.floor(msDif / (1000 * 60 * 60));
                const minutes = Math.floor((msDif % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((msDif % (1000 * 60)) / 1000);
    
                setTimeElased({ hours: hours, minutes: minutes, seconds: seconds })
            } else {
                setTimeElased({hours: 0, minutes: 0, seconds: 0});
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [TimeElased]);

    return (
        <>
            <Text style={styles.requestMainTitle}>{t('attending.text1')}</Text>
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>{t('attending.text2')}:</Text>
                <View style={[styles.personalInfoContainer, styles.withMb]}>
                    <View style={styles.iconBackC}>
                        <View style={styles.iconBack}>
                            <Fontisto name="bed-patient" size={24} color="#ffffff" />
                        </View>
                    </View>
                    <View style={styles.someDetailsC}>
                        <Text style={styles.patientTitle}>{t('attending.text3')}:</Text>
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
                        <Text style={styles.patientTitle}>{t('attending.text4')}</Text>
                        <Text style={{color: '#707070'}} numberOfLines={1}>{Info.FirstNames} {Info.LastNames}</Text>
                    </View> 
                </View>
            </View>

            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>{t('attending.text5')}:</Text>
                <View style={[styles.personalInfoContainer, styles.withMb]}>
                    <View style={styles.iconBackC}>
                        <View style={styles.iconBack}>
                            <FontAwesome5 name="disease" size={24} color="#ffffff" />
                        </View>
                    </View>
                    <View style={styles.someDetailsC}>
                        <Text style={styles.patientTitle}>{t('attending.text6')}:</Text>
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
                        <Text style={styles.patientTitle}>{t('attending.text7')}:</Text>
                        <Text style={{color: '#707070'}} numberOfLines={1}>{getDate()} - {appointmentInfo.Hour}</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.cardContainer, {backgroundColor: '#4c9ca5', marginBottom: 40, height: 370}]}>
                <Text style={[styles.cardTitle, {color: 'white', textAlign: 'center', fontSize: 20, fontStyle: 'italic'}]}>{t('attending.text8')}</Text>
                <View style={[styles.personalInfoContainer, styles.withMb]}>
                    <View style={styles.iconBackC}>
                        <View style={[styles.iconBack, {backgroundColor: 'rgba(255, 255, 255, 0.9)'}]}>
                            <Ionicons name="ios-time" size={24} color="#707070" />
                        </View>
                    </View>
                    <View style={styles.someDetailsC}>
                        <Text style={[styles.patientTitle, {color: 'white', fontWeight: "700"}]}>{t('attending.text9')}:</Text>
                        <Text style={{color: '#fafafa'}} numberOfLines={1}>{TimeLeft != null ? `${TimeLeft.hours < 10 ? `0${TimeLeft.hours}` : TimeLeft.hours}:${TimeLeft.minutes < 10 ? `0${TimeLeft.minutes}` : TimeLeft.minutes}:${TimeLeft.seconds < 10 ? `0${TimeLeft.seconds}` : TimeLeft.seconds}` : 'Cargando...'}</Text>
                    </View>
                </View>

                <View style={styles.personalInfoContainer}>
                    <View style={styles.iconBackC}>
                        <View style={[styles.iconBack, {backgroundColor: 'rgba(255, 255, 255, 0.9)'}]}>
                            <AntDesign name="barschart" size={24} color="#707070" />
                        </View>
                    </View>
                    <View style={styles.someDetailsC}>
                        <Text>
                        <Text style={[styles.patientTitle, {color: 'white', fontWeight: "700"}]}>{t('attending.text10')}: </Text>
                            <Text style={{color: '#fafafa'}} numberOfLines={1}>
                                {StopRunning ? 'Terminado.' : `${Running != null ? `${Running ? `En progreso${Points}` : `Esperando${Points}`}` : `Cargando${Points}`}`}
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={{width: '100%', marginTop: 22, alignItems: 'center'}}>
                    <View style={{height: 2, width: '90%', backgroundColor: 'white'}} />
                </View>
                <View style={{width: '100%', marginTop: 10}}>
                    <Text style={{color: 'white', fontWeight: "700", fontSize: 20, fontStyle: 'italic', textAlign: 'center'}}>{t('attending.text11')}</Text>
                </View>
                <View style={{width: '100%', alignItems: 'center', marginTop: 14}}>
                    <View style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '64%', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 4}}>
                        <Text style={{color: '#666666', fontSize: 30, letterSpacing: 2, textAlign: 'center'}} numberOfLines={1}>
                            {
                                StopTime == null ?
                                    `${TimeElased != null ?
                                        `${TimeElased.hours < 10 ? `0${TimeElased.hours}` : TimeElased.hours}:${TimeElased.minutes < 10 ? `0${TimeElased.minutes}` : TimeElased.minutes}:${TimeElased.seconds < 10 ? `0${TimeElased.seconds}` : TimeElased.seconds}`
                                        :
                                        `...`
                                      }`
                                    :
                                    `${StopTime.hours < 10 ? `0${StopTime.hours}` : StopTime.hours}:${StopTime.minutes < 10 ? `0${StopTime.minutes}` : StopTime.minutes}:${StopTime.seconds < 10 ? `0${StopTime.seconds}` : StopTime.seconds}`}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => updateAppmtState()} disabled={Disable} style={{ backgroundColor: '#393939', width: 120, height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop:14}}>
                        <Text style={{color: '#ffffff', fontSize: 16,}}><SetLabel isLoading={isLoading} LabelText={'Recargar'} Success={Success}/></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    requestMainTitle:{
        fontSize: 20,
        fontWeight: "700",
        color: '#46929B',
        alignSelf: 'center',
        marginVertical: 16,
    },
    cardTitle:{
        fontWeight: "800",
        color: '#4c9ca5',
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
        width: '17%',
        justifyContent: 'center',
    },
    withMb:{
        marginBottom: 20,
    },
    iconBack: {
        borderRadius: 10,
        backgroundColor: '#8cb6bb',
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
        fontWeight: "600",
        color: '#707070',
        fontSize: 16,
    }
})