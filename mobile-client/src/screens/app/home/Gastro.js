import React, { useRef } from 'react';
import { View, ScrollView, Text, Animated, StatusBar, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
const Gastro = () => {
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
            source={require('../../../../assets/bg/gastro_bg_card.png')}
          />
        </View>
        <Text style={styles.title1}>
            ¿En que nos enfocamos?
        </Text>
        <View style={styles.mainInfoContainer}>
          <View style={styles.spcIconContainer}>
            <View style={styles.iconWrapper}>
              <Image style={{width: '75%', height: '75%', resizeMode: 'contain',}} source={require('../../../../assets/graphic-icons/gastro-icon.png')}></Image>
            </View>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={{color: '#707070', marginLeft: wp('3%'),}}>Profesionales de la medicina que ha recibido formación en el diagnóstico y tratamiento de las enfermedades del estomago,intestino y las paredes .</Text>
          </View>
        </View>
        <View style={styles.separator}></View>
        <Text style={styles.title1}>
          Enfermedades comunes
        </Text>
        <Text style={styles.textPart}>
        Estos cirujanos ven una amplia gama de enfermedades y patologías relacionadas con los sentidos, como problemas del olfato y el gusto o trastornos del equilibrio y la audición. 
        </Text>
        <View style={styles.diseasesMainC}>
          <View style={styles.diseaseCard}>
            <View style={styles.cardIconContainer}>
              <View style={styles.cardIconWrapper}>
                <Image source={require('../../../../assets/icons/apendice.png')} style={{height: '70%', width: '70%', resizeMode: 'contain',}}></Image>
              </View>
            </View>
            <View style={styles.cardContentContainer}>
              <View style={styles.cardTitle}>
                <Text style={{fontWeight: 600, fontSize:22, color: '#707070', marginLeft: 10,}}>Apendicitis</Text>
              </View>
              <View style={styles.cardDescription}>
                <Text style={{width: '93%', marginLeft: 10, color: '#707070'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolorem quibusdam exercitationem excepturi et cupiditate </Text>
              </View>
            </View>
          </View>

          <View style={styles.diseaseCard}>
            <View style={styles.cardIconContainer}>
              <View style={styles.cardIconWrapper}>
                <Image source={require('../../../../assets/icons/diarrea.png')} style={{height: '70%', width: '70%', resizeMode: 'contain',}}></Image>
              </View>
            </View>
            <View style={styles.cardContentContainer}>
              <View style={styles.cardTitle}>
                <Text style={{fontWeight: 600, fontSize:22, color: '#707070', marginLeft: 10,}}>Diarrea</Text>
              </View>
              <View style={styles.cardDescription}>
                <Text style={{width: '93%', marginLeft: 10, color: '#707070'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolorem quibusdam exercitationem excepturi et cupiditate </Text>
              </View>
            </View>
          </View>

          <View style={styles.diseaseCard}>
            <View style={styles.cardIconContainer}>
              <View style={styles.cardIconWrapper}>
                <Image source={require('../../../../assets/icons/vellosidades.png')} style={{height: '70%', width: '70%', resizeMode: 'contain',}}></Image>
              </View>
            </View>
            <View style={styles.cardContentContainer}>
              <View style={styles.cardTitle}>
                <Text style={{fontWeight: 600, fontSize:22, color: '#707070', marginLeft: 10,}}>Enfermedad celiaca</Text>
              </View>
              <View style={styles.cardDescription}>
                <Text style={{width: '93%', marginLeft: 10, color: '#707070'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolorem quibusdam exercitationem excepturi et cupiditate </Text>
              </View>
            </View>
          </View>

          <View style={styles.diseaseCard}>
            <View style={styles.cardIconContainer}>
              <View style={styles.cardIconWrapper}>
                <Image source={require('../../../../assets/icons/microbiota-intestinal.png')} style={{height: '70%', width: '70%', resizeMode: 'contain',}}></Image>
              </View>
            </View>
            <View style={styles.cardContentContainer}>
              <View style={styles.cardTitle}>
                <Text style={{fontWeight: 600, fontSize:22, color: '#707070', marginLeft: 10,}}>Control Intestinal</Text>
              </View>
              <View style={styles.cardDescription}>
                <Text style={{width: '93%', marginLeft: 10, color: '#707070'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolorem quibusdam exercitationem excepturi et cupiditate </Text>
              </View>
            </View>
          </View>
          <View style={styles.noteContainer}>
            <View style={{width: '15%', height: '100%', alignItems: 'center',justifyContent: 'center',}}>
              <Image source={require('../../../../assets/icons/focus_icon.png')} style={{width: '90%', height: '90%', resizeMode: 'contain',}}></Image>
            </View>
            <View style={{width: '85%', height: '100%', justifyContent: 'center'}}>
              <Text style={{color: '#707070'}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab libero nihil odio </Text>
            </View>
          </View>
        </View>

        <View style={styles.separator}></View>

        <Text style={styles.title1}>
          Nuestro especialista
        </Text>
        <View style={styles.cardDoctorContainer}>
          <View style={styles.doctorPicContainer}>
            <ImageBackground source={require('../../../../assets/default-pics/dra-garza.png')} style={{height: '100%', width: '100%', alignSelf: 'center', justifyContent: 'center', resizeMode: 'contain'}}></ImageBackground>
          </View>
          <Text style={{alignSelf: 'center', marginVertical: 16, fontWeight: 600, color: '#707070', fontSize: 21}}>Dra. Fátima Garza</Text>
          <Text style={styles.docDescription}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae veniam magni aliquid ratione molestias ut harum veritatis, illum velit non eaque voluptate officiis alias minima molestiae error aliquam sed? Suscipit.</Text>

          <View style={styles.doctorTitle}>
            <View style={{width: '20%', height: '100%', alignItems: 'center', justifyContent: 'center',}}>
              <MaterialCommunityIcons name="stethoscope" size={25} color="#707070" />
            </View>
            <View style={{width: '80%', height: '100%', justifyContent: 'center'}}>
              <Text style={{ color: '#707070'}}>Lorem ipsum, dolor sit amet consectetur.</Text>
            </View>
          </View>

          <View style={styles.doctorTitle}>
            <View style={{width: '20%', height: '100%', alignItems: 'center', justifyContent: 'center',}}>
              <MaterialIcons name="stars" size={25} color="#707070" />
            </View>
            <View style={{width: '80%', height: '100%', justifyContent: 'center'}}>
              <Text style={{ color: '#707070'}}>Lorem ipsum, dolor sit amet consectetur.</Text>
            </View>
          </View>

          <View style={styles.doctorTitle}>
            <View style={{width: '20%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <MaterialIcons name="medical-services" size={25} color="#707070" />
            </View>
            <View style={{width: '80%', height: '100%', justifyContent: 'center'}}>
              <Text style={{ color: '#707070'}}>Lorem ipsum, dolor sit amet consectetur.</Text>
            </View>
          </View>

          <View style={styles.separator2}></View>

          <View style={styles.contactSection}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5}}>
              <MaterialIcons name="mail-outline" size={18} color="#A375FF" />
              <Text style={{color: '#707070'}}>fatimagarza@medikids.com</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5}}>
              <MaterialIcons name="phone" size={18} color="#A375FF" />
              <Text style={{color: '#707070'}}>2525-2525</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.programAppointmentBtn}>
          <Text style={{fontSize: 16, fontWeight: 600, color: 'white'}}>
            Agendar cita
          </Text>
        </TouchableOpacity>
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
    fontSize: hp('3%'),
    color: '#707070',
    fontWeight: 600,
    marginLeft: 15,
    marginTop: 25,
    marginBottom: 20,
  },
  mainInfoContainer: {
    flexDirection: 'row',
    width: wp('90%'),
    height: hp('15%'),
    marginLeft: 15,
  },
  spcIconContainer: {
    width: '35%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    height: '90%',
    width: '80%',
    borderRadius: 20,
    backgroundColor: '#ffe6e6',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    //iOS
    shadowColor: '#707070',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoTextContainer: {
    width: '65%',
    height: '100%',
    justifyContent: 'center',
  },
  separator: {
    width: wp('93%'),
    height: 1,
    backgroundColor: '#d4d4d4',
    alignSelf: 'center',
    marginVertical: 15,
  },
  textPart: {
    marginLeft: 15,
    color: '#707070',
    width: wp('90%'),
  },
  diseasesMainC: {
    width: wp('88%'),
    height: 520,
    marginTop: 20,
    marginLeft: 25,
    marginBottom: 20,
  },
  diseaseCard: {
    width: '100%',
    height: wp('25%'),
    backgroundColor: '#F8F9F9',
    borderRadius: 10,
    marginBottom: 20,
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
    width: wp('88%'),
    height: hp('5%'),
    // alignSelf: 'center',
    flexDirection: 'row',
    gap: 4
  },
  cardDoctorContainer: {
    marginLeft: 15,
    marginBottom: 10,
    width: wp('85%'),
    height: 550,
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
    width: '100%',
    alignSelf: 'center',
    color: '#707070',
    marginLeft: 20,
  },
  doctorTitle: {
    width: '95%',
    height: '10%',
    alignSelf: 'center',
    marginTop: 5,
    flexDirection: 'row',
    gap: 4,
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
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',    
    borderRadius: 10,
    marginVertical: 20,
  }
};

export default Gastro;