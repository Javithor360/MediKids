import { View, Text, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

export const AppointmentResults = () => {
  return (
    <>
        <Text style={[styles.requestMainTitle, styles.colorGreen]}>Resultados de la cita</Text>
        <View style={styles.cardContainer}>
            <View style={[styles.personalInfoContainer, styles.withMb]}>
                <View style={styles.iconBackC}>
                    <View style={styles.iconBack}>
                        <MaterialCommunityIcons name="clipboard-account" size={24} color="#ffffff" />
                    </View>
                </View>
                <View style={styles.someDetailsC}>
                    <Text style={styles.patientTitle}>Registro de datos:</Text>
                </View> 
            </View>
            <View style={styles.contentListContainer}>
                <View style={styles.singleItemC}>
                    <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', gap: 6,}}>
                        <FontAwesome name="child" size={20} color="#46929B" />
                        <Text style={{color: '#707070'}} numberOfLines={1}><Text style={styles.eachTitle}>Paciente: </Text>Alvin Josue Melendez Serranoooo</Text>
                    </View>
                </View>
                <View style={styles.singleItemC2}>
                    <View style={{flexDirection: 'row', gap: 6, alignItems: 'center',}}>
                        <FontAwesome5 name="weight" size={16} color="#46929B" />
                        <Text style={{color: '#707070'}}><Text style={styles.eachTitle}>Peso: </Text>54 lb</Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 6, alignItems: 'center',}}>
                        <MaterialCommunityIcons name="human-male-height" size={20} color="#46929B" />
                        <Text style={{color: '#707070'}}><Text style={styles.eachTitle}>Altura: </Text>1.40 cm</Text>
                    </View>
                </View>
                <View style={styles.singleItemC2}>
                    <View style={{flexDirection: 'row', gap: 6, alignItems: 'center',}}>
                        <FontAwesome5 name="thermometer" size={16} color="#46929B" />
                        <Text style={{color: '#707070'}}><Text style={styles.eachTitle}>Temperatura: </Text>36 °C</Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 6, alignItems: 'center',}}>
                        <MaterialCommunityIcons name="timeline-plus" size={20} color="#46929B" />
                        <Text style={{color: '#707070'}}><Text style={styles.eachTitle}>Edad: </Text>8 a</Text>
                    </View>
                </View>
            </View>
        </View>

        <View style={styles.cardContainer}>
            <View style={[styles.personalInfoContainer, styles.withMb]}>
                <View style={styles.iconBackC}>
                    <View style={styles.iconBack}>
                        <MaterialCommunityIcons name="clipboard-list" size={24} color="#fff" />
                    </View>
                </View>
                <View style={styles.someDetailsC}>
                    <Text style={styles.patientTitle}>Diagnóstico general</Text>
                </View> 
            </View>
            <View style={styles.diagnosDescC}>
                <Text style={{color: '#707070',}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non autem eligendi alias itaque nesciunt quas!</Text>
            </View>
        </View>

        <View style={styles.cardContainer}>
            <View style={[styles.personalInfoContainer, styles.withMb]}>
                <View style={styles.iconBackC}>
                    <View style={styles.iconBack}>
                        <MaterialCommunityIcons name="clipboard-plus" size={24} color="#fff" />
                    </View>
                </View>
                <View style={styles.someDetailsC}>
                    <Text style={styles.patientTitle}>Notas Adicionales</Text>
                </View> 
            </View>
            <View style={styles.diagnosDescC}>
                <Text style={{color: '#707070',}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non autem eligendi alias itaque nesciunt quas!</Text>
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
        fontWeight: 600,
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
        fontWeight: 600,
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