import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
//Libraries
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
//Components
import WeekDate from '../WeekDate'
import { SetLabel, ShowToast, requestMedicalAppointment } from '../.././index'
import { ChangeGastroState, ChangeNeumoState, ChangeOtorrinoState } from '../../store/slices/appointmentsSlice';

export const RequestAppointmentForm = ({Doctor_id}) => {
    const dispatch = useDispatch()
    
    //! GET info from the state in redux
    const Patient_Code = useSelector(state => state.patient.Patient_Code)
    const jwtToken = useSelector(state => state.responsible.jwtToken);

    //! States for the elements of the form.
    const [Description, setDescription] = useState(null);
    const [Week, setWeek] = useState(null);

    //! Loading States
    const [isLoading, setIsLoading] = useState(null);
    const [Success, setSuccess] = useState(null);
    const [Disable, setDisable] = useState(null);
    
    const RequestAppointmentFunct = async () => {
        try {
            if(!Week) {
                ShowToast('my_error', 'Error', 'Seleccione una semana específica')
                return;
            }

            if (!Description) {
                ShowToast('my_error', 'Error', 'Escriba una descripción sobre \nsu solicitud')
                return;
            }
            const {data} = await requestMedicalAppointment(jwtToken, Patient_Code, Doctor_id, Week, Description)

            setIsLoading(true);
            setDisable(true);

            //! change the state of the redux state.
            if (Doctor_id == 1){ dispatch(ChangeOtorrinoState(1)) }
            else if (Doctor_id == 2){ dispatch(ChangeNeumoState(1)) } 
            else { dispatch(ChangeGastroState(1)) }

            if(data.success){
                setTimeout(() => {
                    setIsLoading(false);
                    setSuccess(true);
                    ShowToast('my_success', 'Éxito', 'Su cita se ha solicitado correctamente')
                }, 4000);
            }
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <>
        <Text style={styles.requestMainTitle}>Solicitar cita médica</Text>
        <View style={styles.sectionIconContainer}>
            <View><MaterialCommunityIcons name="playlist-edit" size={24} color="#46929B" /></View>
            <View><Text style={{fontSize: 16, color: '#46929B', fontWeight: 'bold',}}>Brinda la siguiente información previa</Text></View>
        </View>
        <TextInput placeholder='Síntomas o condición a tratar' style={styles.inputSympthoms} onChangeText={text => setDescription(text)} />
        <View style={styles.sectionIconContainer}>
            <View><MaterialCommunityIcons name="calendar-week" size={24} color="#46929B" /></View>
            <View><Text style={{fontSize: 16, color: '#46929B', fontWeight: 'bold',}}>Seleccione una de las semanas disponibles</Text></View>
        </View>
        <WeekDate setWeek={setWeek}/>
        <TouchableOpacity disabled={Disable} style={styles.requestApmtBtn} onPress={() => {RequestAppointmentFunct()}}>
            <Text style={{color: '#ffffff', fontWeight: 600, fontSize: 16,}}><SetLabel isLoading={isLoading} LabelText={'Solicitar Cita'} Success={Success}/></Text>
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
        flex: 1,
    }
})