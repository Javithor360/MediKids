import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
//Libraries
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
//Components
import WeekDate from '../WeekDate'

export const RequestAppointmentForm = () => {
  return (
    <>
        <Text style={styles.requestMainTitle}>Solicitar cita médica</Text>
        <View style={styles.sectionIconContainer}>
            <View><MaterialCommunityIcons name="playlist-edit" size={24} color="#46929B" /></View>
            <View><Text style={{fontSize: 16, color: '#46929B', fontWeight: 'bold',}}>Brinda la siguiente información previa</Text></View>
        </View>
        <TextInput placeholder='Síntomas o condición a tratar' style={styles.inputSympthoms}>
        </TextInput>
        <View style={styles.sectionIconContainer}>
            <View><MaterialCommunityIcons name="calendar-week" size={24} color="#46929B" /></View>
            <View><Text style={{fontSize: 16, color: '#46929B', fontWeight: 'bold',}}>Seleccione una de las semanas disponibles</Text></View>
        </View>
        <WeekDate />
        <TouchableOpacity style={styles.requestApmtBtn}>
            <Text style={{color: '#ffffff', fontWeight: 600, fontSize: 16,}}>Solicitar Cita</Text>
        </TouchableOpacity>
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
    sectionIconContainer: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 15,
    },
    inputSympthoms:{
        width: '80%',
        alignSelf: 'center',
        height: 45,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor:'#5AB1BB',
        paddingHorizontal: 10
    },
    requestApmtBtn:{
        width: '50%',
        height: 35,
        alignSelf: 'center',
        backgroundColor: '#5AB1BB',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    }
})