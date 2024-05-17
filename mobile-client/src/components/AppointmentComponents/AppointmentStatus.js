
//>> Import libreries
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
export const AppointmentStatus = ({ImageIcon, DoctorName, Specialty, Doctor_id}) => {
    const appointmentsState = useSelector(state => state.appointments);
    const navigation = useNavigation()
    const { t } = useTranslation();
    const lng = useSelector(state => state.starter.Language);

    const getAppointmentState = () => {
        let appointmentStateValue;

        if (Doctor_id == 1) { appointmentStateValue = appointmentsState.OtorrinoState }
        else if (Doctor_id == 2) { appointmentStateValue = appointmentsState.NeumoState }
        else if (Doctor_id == 3) { appointmentStateValue = appointmentsState.GastroState }

        if (appointmentStateValue == 1){ return lng ? 'SOLICITADA' : 'REQUESTED' }
        else if (appointmentStateValue == 2){ return lng ? 'PENDIENTE' : 'PENDING' }
        else if (appointmentStateValue == 3){ return lng ? 'EN PROGRESO' : 'IN PROGRESS' }
        else if (appointmentStateValue == 4){ return lng ? 'TERMINADA' : 'FINISHED' }
        else if (appointmentStateValue == 0){ return lng ? 'PROGRAMADA' : 'PROGRAMMED' }
    }
    
    const getAppointmentInfo = () => {
        let appointmentInfo = {
            id: null,
            State: null,
            Doctor_id: null,
            Week: null,
            Description: null,
            Date: null,
            Hour: null,
        }

        if (Doctor_id == 1) {
            appointmentInfo.id = appointmentsState.Otorrino_Appmt_id;
            appointmentInfo.State = appointmentsState.OtorrinoState;
            appointmentInfo.Doctor_id = appointmentsState.Otorrino_Doctor_id;
            appointmentInfo.Week = appointmentsState.Otorrino_Week;
            appointmentInfo.Description = appointmentsState.Otorrino_Description;
            appointmentInfo.Date = appointmentsState.Otorrino_Date;
            appointmentInfo.Hour = appointmentsState.Otorrino_Hour;
        } else if (Doctor_id == 2) {
            appointmentInfo.id = appointmentsState.Neumo_Appmt_id;
            appointmentInfo.State = appointmentsState.NeumoState;
            appointmentInfo.Doctor_id = appointmentsState.Neumo_Doctor_id;
            appointmentInfo.Week = appointmentsState.Neumo_Week;
            appointmentInfo.Description = appointmentsState.Neumo_Description;
            appointmentInfo.Date = appointmentsState.Neumo_Date;
            appointmentInfo.Hour = appointmentsState.Neumo_Hour;
        } else if (Doctor_id == 3){
            appointmentInfo.id = appointmentsState.Gastro_Appmt_id;
            appointmentInfo.State = appointmentsState.GastroState;
            appointmentInfo.Doctor_id = appointmentsState.Gastro_Doctor_id;
            appointmentInfo.Week = appointmentsState.Gastro_Week;
            appointmentInfo.Description = appointmentsState.Gastro_Description;
            appointmentInfo.Date = appointmentsState.Gastro_Date;
            appointmentInfo.Hour = appointmentsState.Gastro_Hour;
        }

        return appointmentInfo;
    }

    const getDoctorPhoto = () => {
        if (Doctor_id == 1) { return require("../../../assets/default-pics/dr-guzman.png") }
        else if (Doctor_id == 2) { return require("../../../assets/default-pics/dr-flores.png") }
        else if (Doctor_id == 3) { return require("../../../assets/default-pics/dra-garza.png") }
    }

    const getDoctorDescription = () => {
        const doctorDescription = {
            otoDoctorInsights: {
                insight1: `${t('appointmentStatus.text1')}`,
                insight2: `${t('appointmentStatus.text2')}`,
            },
            gastroDoctorInsights: {
                insight1: `${t('appointmentStatus.text3')}`,
                insight2: `${t('appointmentStatus.text4')}`,
            },    
            neuDoctorInsights: {
                insight1:`${t('appointmentStatus.text5')}`,
                insight2: `${t('appointmentStatus.text6')}`,
            }
        };

        if (Doctor_id == 1) { return doctorDescription.otoDoctorInsights }
        else if (Doctor_id == 2) { return doctorDescription.neuDoctorInsights }
        else if (Doctor_id == 3) { return doctorDescription.gastroDoctorInsights }
    }

    return (
        <>
            <View style={[styles.statusContainer, styles.shadowC]}>
                <View style={styles.statusInsideCard}>
                    <View>
                        <Image source={ImageIcon} style={{width: 50, height: 50, resizeMode: 'contain',}}/>
                    </View>
                    <View style={styles.statusContentC}>
                        <View style={{borderBottomColor: '#c6c6c6', borderBottomWidth: 1,}}><Text style={{fontSize: 18, fontWeight: "700", color: '#707070'}}>{Specialty}</Text></View>
                        <Text style={{color: '#707070',}}>{DoctorName}</Text>
                        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                            <Text style={styles.specificStatusText}>{getAppointmentState()}</Text>
                            <TouchableOpacity style={styles.moreInfoBtn}
                                onPress={()=>navigation.navigate('AppointmentProcessScreen', {
                                    doctorDescription: getDoctorDescription(),
                                    doctor: DoctorName,
                                    speciality: Specialty,
                                    doctorPhoto: getDoctorPhoto(),
                                    Doctor_id,
                                    appointmentInfo: getAppointmentInfo(),
                            })}>
                                <Text style={{color: '#ffffff'}}>{t('appointmentStatus.text7')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
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
    statusContainer:{
        width: '90%',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignSelf: 'center',
        borderBottomWidth: 9,
        borderBottomColor: '#CDCDF3',
        marginBottom: 16,
        paddingVertical: 16
    },
    statusInsideCard:{
        width: '90%',
        borderRadius: 20,
        // borderWidth: 1,
        // borderColor:'#E6E6E6',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap:12,
        // padding: 10,
    },
    statusContentC:{
        flexDirection: 'column',
        gap: 12
    },
    specificStatusText: {
        color: '#46929B',
        fontWeight: "700",
    },
    moreInfoBtn: {
        marginLeft: 8,
        backgroundColor: '#5AB1BB',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4
    }
})