import React, { useRef } from 'react';
import { View, ScrollView, Text, Animated, StatusBar, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
const Gastro = () => {
  const { t } = useTranslation();
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
            source={require('../../../../assets/bg/gastro_bg_card.png')}
          />
        </View>
        <View style={styles.waveTopContent}>
          <ImageBackground source={require('../../../../assets/waves/waves_start_top.png')} style={styles.waveImg}></ImageBackground>
          <Text style={styles.title1}>
          {t('Gastro.focuson')}
          </Text>
          <View style={styles.mainInfoContainer}>
            <View style={styles.spcIconContainer}>
              <View style={[styles.iconWrapper, styles.colorYellow]}>
                <Image style={{width: '75%', height: '75%', resizeMode: 'contain',}} source={require('../../../../assets/graphic-icons/gastro-icon.png')}></Image>
              </View>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={{color: '#707070', textAlign: 'justify',}}>{t('Gastro.text1')}</Text>
            </View>
          </View>
          <View style={styles.separator}></View>
          <Text style={styles.title1}>
          {t('Gastro.text2')}
          </Text>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.textPart}>
            {t('Gastro.text3')}
            </Text>
          </View>
          <View style={styles.diseasesMainC}>
            <View style={styles.diseaseCard}>
              <View style={styles.cardIconContainer}>
                <View style={styles.cardIconWrapper}>
                  <Image source={require('../../../../assets/icons/apendice.png')} style={{height: '70%', width: '70%', resizeMode: 'contain',}}></Image>
                </View>
              </View>
              <View style={styles.cardContentContainer}>
                <View style={styles.cardTitle}>
                  <Text style={{fontWeight: "600", fontSize:22, color: '#707070', marginLeft: 10,}}>{t('Gastro.title1')}</Text>
                </View>
                <View style={styles.cardDescription}>
                  <Text style={{width: '93%', marginLeft: 10, color: '#707070'}}>{t('Gastro.text4')}  </Text>
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
                  <Text style={{fontWeight: "600", fontSize:22, color: '#707070', marginLeft: 10,}}>{t('Gastro.title2')}</Text>
                </View>
                <View style={styles.cardDescription}>
                  <Text style={{width: '93%', marginLeft: 10, color: '#707070'}}>{t('Gastro.text5')}  </Text>
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
                  <Text style={{fontWeight: "600", fontSize:22, color: '#707070', marginLeft: 10,}}>{t('Gastro.title3')}</Text>
                </View>
                <View style={styles.cardDescription}>
                  <Text style={{width: '93%', marginLeft: 10, color: '#707070'}}>{t('Gastro.text6')}</Text>
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
                  <Text style={{fontWeight: "600", fontSize:22, color: '#707070', marginLeft: 10,}}>{t('Gastro.title4')}</Text>
                </View>
                <View style={styles.cardDescription}>
                  <Text style={{width: '93%', marginLeft: 10, color: '#707070'}}>{t('Gastro.text7')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.noteContainer}>
              <Image source={require('../../../../assets/icons/focus_icon.png')} style={{width: '10%', height: '80%', resizeMode: 'contain', marginHorizontal: 4}}></Image>
              <Text style={{color: '#707070', width:'75%', textAlign: 'justify', marginHorizontal: 4}}>{t('Gastro.text8')} </Text>
            </View>
          </View>

          <View style={styles.separator}></View>

          <Text style={styles.title1}>
          {t('Gastro.title5')}
          </Text>
          <View style={{flexDirection: 'column', alignItems: 'center', marginTop: 10}}>
            <View style={styles.cardDoctorContainer}>
              <View style={styles.doctorPicContainer}>
                <ImageBackground source={require('../../../../assets/default-pics/dra-garza.png')} style={{height: '100%', width: '100%', alignSelf: 'center', justifyContent: 'center', resizeMode: 'contain'}}></ImageBackground>
              </View>
              <Text style={{alignSelf: 'center', marginVertical: 16, fontWeight: "600", color: '#707070', fontSize: 21}}>Dra. Fátima Garza</Text>
              <Text style={styles.docDescription}>{t('Gastro.text9')}</Text>

              <View style={styles.doctorTitle}>
                <View style={{height: '100%', alignItems: 'center', justifyContent: 'center',}}>
                  <MaterialCommunityIcons name="stethoscope" size={25} color="#707070" />
                </View>
                <View style={{height: '100%', justifyContent: 'center'}}>
                  <Text style={{ color: '#707070'}}>{t('Gastro.text10')}.</Text>
                </View>
              </View>

              <View style={[styles.doctorTitle, {width: '85%'}]}>
                <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                  <MaterialIcons name="stars" size={25} color="#707070" />
                </View>
                <View style={{height: '100%', justifyContent: 'center', width: '75%'}}>
                  <Text style={{ color: '#707070', textAlign: 'center'}}>{t('Gastro.text11')}.</Text>
                </View>
              </View>

              <View style={[styles.doctorTitle, {width: '90%'}]}>
                <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                  <MaterialIcons name="medical-services" size={25} color="#707070" />
                </View>
                <View style={{height: '100%', justifyContent: 'center', width: '90%'}}>
                  <Text style={{ color: '#707070', textAlign: 'center'}}>{t('Gastro.text12')}.</Text>
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

            <TouchableOpacity onPress={()=>navigation.navigate('Appointment') } style={styles.programAppointmentBtn}>
              <Text style={{fontSize: 16, fontWeight: "600", color: 'white'}}>
              {t('Gastro.schedule')}
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
    backgroundColor: '#FDEBD0',
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
    justifyContent: 'center',
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

export default Gastro;