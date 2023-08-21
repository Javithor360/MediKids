import React, { useRef } from 'react';
import { View, ScrollView, Text, Animated, StatusBar, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
const SpecialtyInfoN = () => {
  const navigation = useNavigation();
  const scrollA = useRef(new Animated.Value(0)).current;
  return (
    <View style={{backgroundColor: '#fff',}}>
      <StatusBar
        StatusBarStyle="default"
      />
      <Animated.ScrollView
        // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.bannerContainer}>
          <Animated.Image
            style={styles.banner(scrollA)}
            source={require('../../../../assets/bg/neumologia_bg_card.png')}
          />
        </View>
        <View style={styles.waveTopContent}>
          <ImageBackground source={require('../../../../assets/waves/waves_start_top.png')} style={styles.waveImg}></ImageBackground>
          <Text style={styles.title1}>
            ¿En que nos enfocamos?
          </Text>
          <View style={styles.mainInfoContainer}>
            <View style={styles.spcIconContainer}>
              <View style={[styles.iconWrapper, styles.colorGreen]}>
                <Image style={{width: '75%', height: '75%', resizeMode: 'contain'}} source={require('../../../../assets/graphic-icons/neumologia-icon.png')}></Image>
              </View>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={{color: '#707070', textAlign: 'justify',}}>Profesionales de la medicina que ha recibido formación en el diagnóstico y tratamiento de las enfermedades del estomago, intestino y las paredes.</Text>
            </View>
          </View>
          <View style={styles.separator}></View>
          <Text style={styles.title1}>
            Enfermedades comunes
          </Text>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.textPart}>
              Estos cirujanos ven una amplia gama de enfermedades y patologías relacionadas con problemas del estomago o paredes intestinales. 
            </Text>
          </View>
          <View style={styles.diseasesMainC}>
            <View style={styles.diseaseCard}>
              <View style={styles.cardIconContainer}>
                <View style={styles.cardIconWrapper}>
                  <Image source={require('../../../../assets/icons/asma_icon.png')} style={{height: '70%', width: '70%', resizeMode: 'contain',}}></Image>
                </View>
              </View>
              <View style={styles.cardContentContainer}>
                <View style={styles.cardTitle}>
                  <Text style={{fontWeight: 600, fontSize:22, color: '#707070', marginLeft: 10,}}>Asma</Text>
                </View>
                <View style={styles.cardDescription}>
                  <Text style={{width: '93%', marginLeft: 10, color: '#707070'}}>El asma causa sibilancias, dificultad para respirar, opresión en el pecho y tos durante la noche o temprano por la mañana.</Text>
                </View>
              </View>
            </View>

            <View style={styles.diseaseCard}>
              <View style={styles.cardIconContainer}>
                <View style={styles.cardIconWrapper}>
                  <Image source={require('../../../../assets/icons/bronquitis_icon.png')} style={{height: '70%', width: '70%', resizeMode: 'contain',}}></Image>
                </View>
              </View>
              <View style={styles.cardContentContainer}>
                <View style={styles.cardTitle}>
                  <Text style={{fontWeight: 600, fontSize:22, color: '#707070', marginLeft: 10,}}>Bronquitis</Text>
                </View>
                <View style={styles.cardDescription}>
                  <Text style={{width: '93%', marginLeft: 10, color: '#707070'}}>La bronquitis aguda suele ser causada por la inflamación de las vías respiratorias debido a infecciones virales. </Text>
                </View>
              </View>
            </View>

            <View style={styles.diseaseCard}>
              <View style={styles.cardIconContainer}>
                <View style={styles.cardIconWrapper}>
                  <Image source={require('../../../../assets/icons/neumonia_icon.png')} style={{height: '70%', width: '70%', resizeMode: 'contain',}}></Image>
                </View>
              </View>
              <View style={styles.cardContentContainer}>
                <View style={styles.cardTitle}>
                  <Text style={{fontWeight: 600, fontSize:22, color: '#707070', marginLeft: 10,}}>Neumonía</Text>
                </View>
                <View style={styles.cardDescription}>
                  <Text style={{width: '93%', marginLeft: 10, color: '#707070'}}>Infección que afecta un pulmón o los dos. Hace que los sacos de aire, o alvéolos, de los pulmones se llenen de líquido o pus. </Text>
                </View>
              </View>
            </View>

            <View style={styles.diseaseCard}>
              <View style={styles.cardIconContainer}>
                <View style={styles.cardIconWrapper}>
                  <Image source={require('../../../../assets/icons/tos_icon.png')} style={{height: '70%', width: '70%', resizeMode: 'contain',}}></Image>
                </View>
              </View>
              <View style={styles.cardContentContainer}>
                <View style={styles.cardTitle}>
                  <Text style={{fontWeight: 600, fontSize:22, color: '#707070', marginLeft: 10,}}>Tos Crónica</Text>
                </View>
                <View style={styles.cardDescription}>
                  <Text style={{width: '93%', marginLeft: 10, color: '#707070'}}>La tos crónica se define como tos que perdura más de 3 semanas y puede llegar a provocar bronquitis o complicaciones más graves</Text>
                </View>
              </View>
            </View>
            <View style={styles.noteContainer}>
              <Image source={require('../../../../assets/icons/focus_icon.png')} style={{width: '10%', height: '80%', resizeMode: 'contain', marginHorizontal: 4}}></Image>
              <Text style={{color: '#707070', width:'75%', textAlign: 'justify', marginHorizontal: 4}}>Todos los pacientes son analizados para un diagnostico mas preciso y tratamiento personalizado </Text>
            </View>
          </View>

          <View style={styles.separator}></View>

          <Text style={styles.title1}>
            Nuestro Especialista
          </Text>
          <View style={{flexDirection: 'column', alignItems: 'center', marginTop: 10}}>
            <View style={styles.cardDoctorContainer}>
              <View style={styles.doctorPicContainer}>
                <ImageBackground source={require('../../../../assets/default-pics/dr-flores.png')} style={{height: '100%', width: '100%', alignSelf: 'center', justifyContent: 'center', resizeMode: 'contain'}}></ImageBackground>
              </View>
              <Text style={{alignSelf: 'center', marginVertical: 16, fontWeight: 600, color: '#707070', fontSize: 21}}>Dr. Adrián Flores</Text>
              <Text style={styles.docDescription}>"La salud es la fuente de la felicidad, y cuidarla desde temprano es mi prioridad"</Text>

              <View style={styles.doctorTitle}>
                <View style={{height: '100%', alignItems: 'center', justifyContent: 'center',}}>
                  <MaterialCommunityIcons name="stethoscope" size={25} color="#707070" />
                </View>
                <View style={{height: '100%', justifyContent: 'center'}}>
                  <Text style={{ color: '#707070'}}>Lorem ipsum, dolor sit amet consectetur.</Text>
                </View>
              </View>

              <View style={styles.doctorTitle}>
                <View style={{height: '100%', alignItems: 'center', justifyContent: 'center',}}>
                  <MaterialIcons name="stars" size={25} color="#707070" />
                </View>
                <View style={{height: '100%', justifyContent: 'center'}}>
                  <Text style={{ color: '#707070'}}>Lorem ipsum, dolor sit amet consectetur.</Text>
                </View>
              </View>

              <View style={styles.doctorTitle}>
                <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                  <MaterialIcons name="medical-services" size={25} color="#707070" />
                </View>
                <View style={{height: '100%', justifyContent: 'center'}}>
                  <Text style={{ color: '#707070'}}>Lorem ipsum, dolor sit amet consectetur.</Text>
                </View>
              </View>

              <View style={styles.separator2}></View>

              <View style={styles.contactSection}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5}}>
                  <MaterialIcons name="mail-outline" size={18} color="#A375FF" />
                  <Text style={{color: '#707070'}}>drflores@medikids.com</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5}}>
                  <MaterialIcons name="phone" size={18} color="#A375FF" />
                  <Text style={{color: '#707070'}}>2525-2525</Text>
                </View>
              </View>
            </View>

              <TouchableOpacity onPress={()=>navigation.navigate("AppointmentStack")} style={styles.programAppointmentBtn}>
              <Text style={{fontSize: 16, fontWeight: 600, color: 'white'}}>
                Agendar cita
              </Text>
          </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = {
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
  banner: scrollA => ({
    height: hp('35%'),
    width: '200%',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-300, 0, 300, 300 + 1],
          outputRange: [-300 / 2, 0, 300 * 0.75, 300 * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-300, 0, 300, 300 + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),

  title1: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 20,
    color: '#707070',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: 'poppinsBold',
  },
  waveTopContent:{
    width: '100%',
  },
  waveImg: {
    flex: 1,
    height: 80,
    resizeMode: 'cover',
  },
  mainInfoContainer: {
    flexDirection: 'row',
    width: '90%',
    height: hp('20%'),
    alignSelf: 'center',
  },
  spcIconContainer: {
    width: '35%',
    height: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    height: '90%',
    width: '90%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    //iOS
    shadowColor: '#707070',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  colorYellow: {
    backgroundColor: '#B2BABB',
  },
  colorBlue: {
    backgroundColor: '#D4E6F1',
  },
  colorGreen: {
    backgroundColor: '#D5F5E3',
  },
  infoTextContainer: {
    width: '65%',
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: wp('93%'),
    height: 1,
    backgroundColor: '#d4d4d4',
    alignSelf: 'center',
    marginVertical: 15,
  },
  textPart: {
    color: '#707070',
    width: wp('85%'),
    textAlign: 'justify',
    marginVertical: 10,
  },
  diseasesMainC: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  diseaseCard: {
    marginHorizontal: 'auto',
    width: '90%',
    height: wp('35%'),
    backgroundColor: '#EFE8F0',
    borderRadius: 10,
    marginBottom: 30,
    flexDirection: 'row',
    elevation: 4,
    //iOS
    shadowColor: '#707070',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
  },
  cardIconContainer: {
    width: '25%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconWrapper:{
    height: '80%',
    width: '80%',
    borderRadius: 12,
    backgroundColor: '#e0c7fc',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    //iOS
    shadowColor: '#707070',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContentContainer:{
    width: '75%',
    height: '100%',
  },
  cardTitle:{
    height: '30%',
    width: '100%',
    justifyContent: 'flex-end',
    marginTop: hp('1%'),
  },
  cardDescription: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
  },
  noteContainer:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  cardDoctorContainer: {
    marginBottom: 10,
    width: wp('85%'),
    height: 515,
    borderRadius: 25,
    borderTopWidth: 10,
    borderTopColor: '#D8D7FE',
    elevation: 4,
    //iOS
    shadowColor: '#707070',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
  },
  doctorPicContainer:{
    width: 130,
    height: 130,
    backgroundColor: 'red',
    borderRadius: 70,
    alignSelf: 'center',
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: '#e6e6fd',
  },
  docDescription: {
    width: '90%',
    alignSelf: 'center',
    color: '#707070',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  doctorTitle: {
    // width: '80%',
    height: '10%',
    alignSelf: 'center',
    marginTop: 5,
    flexDirection: 'row',
    gap: 10,
  },
  separator2: {
    width: '100%',
    height: 1,
    backgroundColor: '#d4d4d4',
    alignSelf: 'center',
    marginVertical: 15,
  },
  contactSection: {
    width: '100%',
    height: hp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5
  },
  programAppointmentBtn: {
    width: '85%',
    height: hp('5%'),
    backgroundColor: '#D58C8C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 20,
    marginBottom: 40
  }
};

export default SpecialtyInfoN;