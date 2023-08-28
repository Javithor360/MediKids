
//>> libraries
import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient'
import Constants from 'expo-constants';

//>> components
import { PendingAppointment, RequestAppointmentForm, ScreenTitle, NextAppointment, AttendingAppointment, AppointmentResults, AppointmentMedicines } from '../../../index';
import WeekDate from '../../../components/WeekDate';
import { useEffect } from 'react';

export const AppointmentProcessScreen = ({ route }) => {
  const { doctorDescription, doctor, speciality, doctorPhoto, Doctor_id, appointmentInfo } = route.params

  return (
    <LinearGradient colors={['#e4e2ff', '#e4e2ff', '#FFFFFF', '#FFFFFF']} locations={[0, 0.5, 0.5, 1]} style={{height: '100%'}}>
      <ScrollView style={styles.fullScreenContainer}>
        <View style={{backgroundColor:'#fff'}}>
          <ScreenTitle
            Label={`Citas - ${speciality}`}
            IconName={"clipboard-text-multiple"}
            fontSize={17}
            textColor={'#FFFFFF'}
            paddingH={20}
          /> 
          {/* Appointment ComponentWrapper */}
          {
            (appointmentInfo?.State != null) &&
              <View style={[styles.requestAppointmentContainer, styles.shadowC, styles.btcGreen, styles.wMb]}>
                { appointmentInfo.State == 1 && <PendingAppointment /> }
                { appointmentInfo.State == 2 && <NextAppointment appointmentInfo={appointmentInfo} doctor={doctor} /> }
                { appointmentInfo.State == 3 && <AttendingAppointment appointmentInfo={appointmentInfo}/> }
                { appointmentInfo.State == 4 && <AppointmentResults /> }
              </View>
          }
          {/* Medicines Container */}
          {
            (appointmentInfo?.State == 4) &&
              <View style={[styles.requestAppointmentContainer, styles.shadowC, styles.btcYellow, styles.wMb]}>
                <AppointmentMedicines />
              </View>
          }

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
          {
            (appointmentInfo?.State == null) &&
              <View style={[styles.requestAppointmentContainer, styles.shadowC, styles.btcGreen]}>
                <RequestAppointmentForm Doctor_id={Doctor_id} />
              </View>
          }
          
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  fullScreenContainer:{
    height: '100%',
    marginTop: Constants.statusBarHeight
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
    // overflow: 'hidden',
  },
  shadowC:{
    shadowColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    //Android
    elevation: 5,
    shadowColor: '#000',
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
    borderWidth: 1,
    borderColor: '#EBEBEB',
    marginBottom: 30
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
