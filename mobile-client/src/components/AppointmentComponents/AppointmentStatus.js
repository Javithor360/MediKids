import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Octicons } from '@expo/vector-icons';

export const AppointmentStatus = () => {
  return (
    <>
        <View style={[styles.requestAppointmentContainer, styles.btcGreen, styles.shadowC]}>
            <Text style={[styles.requestMainTitle, styles.colorGreen]}>Actividad de citas</Text>
            <View style={[styles.statusContainer, styles.shadowC]}>
                <View style={styles.statusInsideCard}>
                    <View>
                        <Image source={require('../../../assets/graphic-icons/otorrino-icon.png')} style={{width: 50, height: 50, resizeMode: 'contain',}}/>
                    </View>
                    <View style={styles.statusContentC}>
                        <View style={{borderBottomColor: '#c6c6c6', borderBottomWidth: 1,}}><Text style={{fontSize: 18, fontWeight: 'bold', color: '#707070'}}>Otorrinolaringología</Text></View>
                        <Text style={{color: '#707070',}}>Dr. Esteban Gúzman</Text>
                        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                            <Text style={styles.specificStatusText}>PENDIENTE</Text>
                            <TouchableOpacity style={styles.moreInfoBtn}><Text style={{color: '#ffffff'}}>Más Información</Text></TouchableOpacity>
                        </View>
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
        fontWeight: 'bold',
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
        fontWeight: 'bold',
    },
    moreInfoBtn: {
        marginLeft: 8,
        backgroundColor: '#5AB1BB',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4
    }
})