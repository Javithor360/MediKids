import { View, Text, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Octicons } from '@expo/vector-icons';

export const AppointmentMedicines = () => {
  return (
    <>
        <Text style={[styles.requestMainTitle, styles.colorYellow]}>Medicinas</Text>
        <View style={styles.individualMedicineCard}>
            <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10, marginTop: 10,}}>
                <Octicons name="dot-fill" size={20} color="#F8991E" /> 
                <Text style={styles.medicineTitle}>Acetaminofén</Text>
            </View>

            <View style={{width: '90%', alignSelf: 'center', gap: 10, paddingVertical: 16}}>
                <Text style={{color: '#707070'}}><Text style={{fontWeight: 600 , color: '#F8991E',}}>Descripcion/Laboratorio: </Text>Acetaminofen MK</Text>

                <Text style={{color: '#707070'}}><Text style={{fontWeight: 600 , color: '#F8991E',}}>Dosis: </Text>15 ml cada 8 horas</Text>

                <Text style={{color: '#707070'}}><Text style={{fontWeight: 600 , color: '#F8991E',}}>Instrucciones: </Text>Tomar despues de cada comida</Text>

                <Text style={{color: '#707070'}}><Text style={{fontWeight: 600 , color: '#F8991E'}}>Duración: </Text>2 semanas</Text>
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
        borderColor: '#E6E6E6',
    },
    medicineTitle: {
       fontSize: 16, 
        color: '#F8991E',
    }
})