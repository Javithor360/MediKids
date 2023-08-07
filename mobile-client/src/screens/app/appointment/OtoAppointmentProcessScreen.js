import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
//libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
//components
import { ScreenTitle } from '../../../index';
import WeekDate from '../../../components/WeekDate';

export const OtoAppointmentProcessScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.fullScreenContainer}>
        <ScreenTitle 
          Label={"Citas - Otorrinolaringología"}
          IconName={"clipboard-text-multiple"}
          fontSize={20}
          textColor={'#FFFFFF'}
          paddingH={30}
        /> 
        <View style={[styles.doctorBanner, styles.shadowC]}>
          <View style={styles.leftPhotoContainer}>
            <View style={styles.photoContainer}>
              <Image source={require('../../../../assets/default-pics/dr-guzman.png')} style={styles.photoStyles}/>
            </View>
          </View>
          <View style={styles.rightContentContainer}>
            <Text style={styles.drName}>Dr. Esteban Gúzman</Text>
            <View style={styles.subdivisions}></View>
            <View style={styles.insightsContainer}>
              <MaterialCommunityIcons name="stethoscope" size={24} color="white" style={{width: '18%'}}/>
              <Text style={styles.insightsText}>Especialista en Otorrinolaringología</Text>
            </View>
            <View style={styles.insightsContainer}>
              <MaterialIcons name="insights" size={24} color="white" style={{width: '18%'}}/>
              <Text style={styles.insightsText}>Graduado de la universidad de españa con más de 30 años de experiencia</Text>
            </View>
          </View>
        </View>

        <View style={[styles.informationContainer, styles.shadowC]}>
          <View style={styles.infoMainContentC}>
            <Text style={styles.infoMainTitle}>A tener en cuenta</Text>
            <Text style={{color: '#707070'}}>Cada uno de nuestros pacientes recibe una atención personalizada, nuestros médicos se encargan de analizar detalladamente cada uno de los casos para brindar el diagnostico adecuado siempre, es por ello que en cada cita se toma en cuenta la siguiente metodología</Text>
            <View style={styles.contentContainer}>
              <View style={styles.methodsContainer}>
                <View style={styles.methodDContainer}>
                  <View style={styles.roundedIconContainer}>
                    <Image source={require('../../../../assets/icons/conditions.png')} style={styles.iconImageStyle}></Image>
                  </View>
                  <View style={[styles.methodDescContainer, styles.borderB]}>
                    <Text style={styles.pinkText}>Revisión y análisis de sintomas</Text>
                  </View>
                </View>
                <View style={styles.methodDContainer}>
                  <View style={styles.roundedIconContainer}>
                    <Image source={require('../../../../assets/icons/avg_time.png')} style={styles.iconImageStyle}></Image>
                  </View>
                  <View style={[styles.methodDescContainer, styles.borderB]}>
                    <Text style={styles.pinkText}>Tratamiento asignado en un perido de tiempo</Text>
                  </View>
                </View>
                <View style={styles.methodDContainer}>
                  <View style={styles.roundedIconContainer}>
                    <Image source={require('../../../../assets/icons/review.png')} style={styles.iconImageStyle}></Image>
                  </View>
                  <View style={styles.methodDescContainer}>
                    <Text style={styles.pinkText}>Citas de control y seguimiento</Text>
                  </View>
                </View>
              </View>
              <View style={styles.verticalLine}></View>
              <View style={styles.modalitiesContainer}>
                <View style={styles.roundedIconContainer2}>
                  <MaterialCommunityIcons name="account-heart" size={24} color="white" />
                </View>
                <Text style={{color: '#D58C8C', textAlign: 'center',}}>
                  Atención y calidad garantizadas
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.requestAppointmentContainer, styles.shadowC]}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  fullScreenContainer:{
    backgroundColor: '#FFFFFF',
  },
  safeArea:{
    backgroundColor: '#e4e2ff',
  },
  doctorBanner:{
    width: wp('90%'),
    height: 220,
    backgroundColor: '#a375ff',
    alignSelf: 'center',
    borderRadius: 20,
    borderTopWidth: 9,
    borderTopColor: '#CDCDF3',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  leftPhotoContainer:{
    width: '40%',
    height: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoStyles:{
    width: '100%', 
    height: '100%', resizeMode: 'contain',
  },
  rightContentContainer:{
    width: '60%',
    height: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  photoContainer:{
    width: '85%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#CDCDF3',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  insightsContainer:{
    width: '85%',
    marginLeft: 16,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drName: {
    fontSize: 18, 
    color: '#ffffff', fontWeight: 600, marginLeft: 16
  },
  subdivisions:{
    width: '70%', 
    height: 3, backgroundColor: '#fff', marginLeft: 16, marginVertical: 5
  },
  insightsText:{
    width: '82%',  
    fontSize: 13, 
    color: '#ffffff'
  },
  informationContainer: {
    width: wp('90%'),
    // height: 120,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 20,
    borderTopWidth: 9,
    borderTopColor: '#D58C8C',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  shadowC:{
    elevation: 4,
    //iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  infoMainContentC:{
    width: '90%',
    // height: '90%',
    // backgroundColor: '#f1f1f1',
  },
  infoMainTitle: {
    fontSize: 18, 
    color: '#D58C8C', 
    fontWeight: 'bold', 
    alignSelf: 'center', marginBottom: 10
  },
  // paragraphFormat:{
  //   color: '#707070',
  // }
  contentContainer:{
    width: '100%',
    // backgroundColor: '#d8d8d8',
    flexDirection: 'row',
  },
  methodsContainer: {
    marginTop: 10,
    width: '60%',
    // backgroundColor: 'red',
  },
  methodDContainer:{
    width: '100%',
    // height: 80,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  roundedIconContainer:{
    width: '18%',
    height: 40,
    backgroundColor: '#D58C8C',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '2%',
  },
  roundedIconContainer2:{
    width: '30%',
    height: 40,
    backgroundColor: '#D58C8C',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '2%',
  },
  iconImageStyle:{
    width: 30, 
    height: 30, 
    resizeMode: 'contain',
  },
  methodDescContainer:{
    width: '80%',
  },
  borderB:{
    borderBottomWidth: 1,
    borderBottomColor: '#D6D6D6',
  },
  pinkText: {
    color: '#D58C8C', fontWeight: 'bold', marginLeft: 4,
    marginBottom: 4,
  },
  verticalLine: {
    width: 1,
    height: '70%',
    backgroundColor: '#D6D6D6',
    alignSelf: 'center',
    marginHorizontal: '2%'
  },
  modalitiesContainer:{
    width: '36%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  requestAppointmentContainer:{
    // height: 800,
    width: wp('90%'),
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 30,
    borderTopWidth: 9,
    borderTopColor: '#5AB1BB',
    overflow: 'hidden',
  },
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
