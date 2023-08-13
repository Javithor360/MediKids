import { Text, StyleSheet, Image } from 'react-native'
//Libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const PendingAppointment = () => {
  return (
    <>
        <Text style={styles.requestMainTitle}>Confirmación de cita</Text>
        <Image source={require('../../../assets/graphic-icons/review.png')} style={styles.imageIconLol}/>
        <Text style={styles.description}>Cuando la cita haya sido confirmanda, en este apartado aparecerá la fecha exacta de la cita y la hora, además de haberse agendado un recordatorio en el calendario</Text>
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
    imageIconLol: {
        width: wp('15%'),
        height: wp('15%'),
        alignSelf: 'center',
    },
    description:{
        width: '80%',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 13,
        color: '#707070',
        marginBottom: 20,
    }
})