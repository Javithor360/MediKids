import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
//libraries
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
//components
import { PendingAppointment, RequestAppointmentForm, ScreenTitle, NextAppointment, AttendingAppointment, AppointmentResults, AppointmentMedicines } from '../../../index';
import WeekDate from '../../../components/WeekDate';

export const AppointmentProcessScreen = ({ route }) => {
  const { doctorDescription, doctor, speciality, doctorPhoto } = route.params

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.fullScreenContainer}>
        <ScreenTitle 
          Label={`Citas - ${speciality}`}
          IconName={"clipboard-text-multiple"}
          fontSize={20}
          textColor={'#FFFFFF'}
          paddingH={30}
        /> 
        {/* Appointment ComponentWrapper */}
        <View style={[styles.requestAppointmentContainer, styles.shadowC, styles.btcGreen, styles.wMb]}>
          {/* <RequestAppointmentForm /> */}
          {/* <PendingAppointment /> */}
          {/* <NextAppointment /> */}
          {/* <AttendingAppointment /> */}
          <AppointmentResults />
        </View>
        {/* Medicines Container */}
        <View style={[styles.requestAppointmentContainer, styles.shadowC, styles.btcYellow, styles.wMb]}>
          <AppointmentMedicines />
        </View>

        <View style={[styles.doctorBanner, styles.shadowC]}>
          <View style={styles.leftPhotoContainer}>
            <View style={styles.photoContainer}>
              <Image source={doctorPhoto} style={styles.photoStyles}/>
            </View>
          </View>
          <View style={styles.rightContentContainer}>
            <Text style={styles.drName}>{doctor}</Text>
            <View style={styles.subdivisions}></View>
            <View style={styles.insightsContainer}>
              <MaterialCommunityIcons name="stethoscope" size={24} color="white" style={{width: '18%'}}/>
              <Text style={styles.insightsText}>{doctorDescription.insight1}</Text>
            </View>
            <View style={styles.insightsContainer}>
              <MaterialIcons name="insights" size={24} color="white" style={{width: '18%'}}/>
              <Text style={styles.insightsText}>{doctorDescription.insight2}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.informationContainer, styles.shadowC, styles.wMb]}>
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
        {/* Request componentWrapper */}
        {/* <View style={[styles.requestAppointmentContainer, styles.shadowC, styles.btcGreen]}>
          <RequestAppointmentForm />
        </View> */}
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
    borderWidth: 3,
    borderColor: '#CDCDF3',
    alignItems: 'center',
    justifyContent: 'flex-end',
    //iOS
    shadowColor: '#707070',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //Android
    elevation: 5,
    shadowColor: '#707070',
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
    //iOS
    shadowColor: '#707070',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //Android
    elevation: 5,
    shadowColor: '#707070',
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
  wMt:{
    marginTop: 30,
  },
  wMb:{
    marginBottom: 30,
  }
})
