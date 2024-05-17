
//>> IMPORT LIBRERIES
import { View, Text, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
//>> IMPORT COMPONENTS
import { getSingleMedicalAppmtRecord } from '../../index'

export const AppointmentResults = ({ RecordCode }) => {
    const jwtToken = useSelector(state => state.responsible.jwtToken);
    const PatientInfo = useSelector(state => state.patient);
    const { t } = useTranslation();
    //! State for the Results of the Appointment.
    const [ResultInfo, setResultInfo] = useState(null);

    const getMedicalAppmtRecord = async () => {
        try {
            const {data} = await getSingleMedicalAppmtRecord(jwtToken, RecordCode);
            setResultInfo(data.appointment_record[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMedicalAppmtRecord()
    }, []);

    return (
        <>
            <Text style={[styles.requestMainTitle, styles.colorGreen]}>{t('appointmentResult.text1')}</Text>
            <View style={styles.cardContainer}>
                <View style={[styles.personalInfoContainer, styles.withMb]}>
                    <View style={styles.iconBackC}>
                        <View style={styles.iconBack}>
                            <MaterialCommunityIcons name="clipboard-account" size={24} color="#ffffff" />
                        </View>
                    </View>
                    <View style={styles.someDetailsC}>
                        <Text style={styles.patientTitle}>{t('appointmentResult.text2')}:</Text>
                    </View> 
                </View>
                <View style={styles.contentListContainer}>
                    <View style={styles.singleItemC}>
                        <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', gap: 6,}}>
                            <FontAwesome name="child" size={20} color="#46929B" />
                            <Text style={{color: '#707070'}} numberOfLines={1}><Text style={styles.eachTitle}>{t('appointmentResult.text3')}: </Text>{PatientInfo.FirstNames} {PatientInfo.LastNames}</Text>
                        </View>
                    </View>
                    <View style={styles.singleItemC2}>
                        <View style={{flexDirection: 'row', gap: 6, alignItems: 'center',}}>
                            <FontAwesome5 name="weight" size={16} color="#46929B" />
                            <Text style={{color: '#707070'}}><Text style={styles.eachTitle}>{t('appointmentResult.text4')}: </Text>{ResultInfo?.Weight} lb</Text>
                        </View>
                        <View style={{flexDirection: 'row', gap: 6, alignItems: 'center',}}>
                            <MaterialCommunityIcons name="human-male-height" size={20} color="#46929B" />
                            <Text style={{color: '#707070'}}><Text style={styles.eachTitle}>{t('appointmentResult.text5')}: </Text>{ResultInfo?.Height} mts</Text>
                        </View>
                    </View>
                    <View style={styles.singleItemC2}>
                        <View style={{flexDirection: 'row', gap: 6, alignItems: 'center',}}>
                            <FontAwesome5 name="thermometer" size={16} color="#46929B" />
                            <Text style={{color: '#707070'}}><Text style={styles.eachTitle}>Temp... : </Text>{ResultInfo?.Temperature}°C</Text>
                        </View>
                        <View style={{flexDirection: 'row', gap: 6, alignItems: 'center',}}>
                            <MaterialCommunityIcons name="timeline-plus" size={20} color="#46929B" />
                            <Text style={{color: '#707070'}}><Text style={styles.eachTitle}>{t('appointmentResult.text6')}: </Text>{PatientInfo.Age} {t('appointmentResult.text7')}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.cardContainer, {marginBottom: 35}]}>
                <View style={[styles.personalInfoContainer, styles.withMb]}>
                    <View style={styles.iconBackC}>
                        <View style={styles.iconBack}>
                            <MaterialCommunityIcons name="clipboard-list" size={24} color="#fff" />
                        </View>
                    </View>
                    <View style={styles.someDetailsC}>
                        <Text style={styles.patientTitle}>{t('appointmentResult.text8')}</Text>
                    </View> 
                </View>
                <View style={styles.diagnosDescC}>
                    <Text style={{color: '#707070',}}>{ResultInfo?.Diagnosis_Mobile}</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    requestAppointmentContainer:{
        // height: 800,
        width: wp('80%'),
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 30,
        marginBottom: 30,
        borderTopWidth: 9,
        overflow: 'hidden',
    },
    btcYellow:{
        borderTopColor: '#FCC277',
    },
    shadowC:{
        //iOS
        shadowColor: '#000000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        //Android
        elevation: 5,
        shadowColor: '#000000',
    },
    requestMainTitle:{
        fontSize: 20,
        fontWeight: "700",
        alignSelf: 'center',
        marginVertical: 16,
    },
    colorGreen: {
        color: '#46929B',
    },
    colorYellow:{
        color: '#F8991E',
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
        shadowColor: '#000000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        //Android
        elevation: 5,
        shadowColor: '#000000',
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
        shadowColor: '#000000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        //Android
        elevation: 5,
        shadowColor: '#000000',
    },
    someDetailsC: {
        justifyContent: 'center',
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#D6D6D6',
    },
    patientTitle:{
        fontWeight: "600",
        color: '#46929B',
        fontSize: 16,
    },
    contentListContainer:{
        width: '100%',
        gap: 20
    },
    singleItemC: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    eachTitle: {
        fontWeight: "600",
        color: '#46929B',
        fontSize: 16,
        paddingRight: 10,
    },
    singleItemC2: {
        width: '100%',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
    },
    diagnosDescC: {
        width: '95%',
        alignSelf: 'center',
    },
    individualMedicineCard: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignSelf: 'center',
        paddingRight: 16,
        marginBottom: 16,
        //iOS
        shadowColor: '#707070',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        //Android
        elevation: 5,
        shadowColor: '#707070',
        borderWidth: 1,
        borderColor:' red',
    },
    medicineTitle: {
       fontSize: 16, 
        color: '#F8991E',
    }
})